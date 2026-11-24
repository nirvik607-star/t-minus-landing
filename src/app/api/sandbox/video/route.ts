import { NextRequest } from "next/server";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VIDEO_PATH = path.join(process.cwd(), "master_blackhole_boomerang.mp4");

function nodeStreamToWeb(stream: fs.ReadStream): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    start(controller) {
      stream.on("data", (chunk: Buffer | string) => {
        const buf = typeof chunk === "string" ? Buffer.from(chunk) : chunk;
        controller.enqueue(new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength));
      });
      stream.on("end", () => controller.close());
      stream.on("error", (err) => controller.error(err));
    },
    cancel() {
      stream.destroy();
    },
  });
}

export async function GET(req: NextRequest) {
  if (!fs.existsSync(VIDEO_PATH)) {
    return new Response("Master blackhole video not found.", { status: 404 });
  }

  const stat = fs.statSync(VIDEO_PATH);
  const fileSize = stat.size;
  const range = req.headers.get("range");

  if (range) {
    const match = /^bytes=(\d+)-(\d*)$/.exec(range.trim());
    if (!match) {
      return new Response("Invalid Range header", {
        status: 416,
        headers: { "Content-Range": `bytes */${fileSize}` },
      });
    }
    const start = Number(match[1]);
    const end = match[2] ? Math.min(Number(match[2]), fileSize - 1) : fileSize - 1;

    if (Number.isNaN(start) || Number.isNaN(end) || start > end || start >= fileSize) {
      return new Response("Requested Range Not Satisfiable", {
        status: 416,
        headers: { "Content-Range": `bytes */${fileSize}` },
      });
    }

    const chunkSize = end - start + 1;
    const stream = fs.createReadStream(VIDEO_PATH, { start, end });
    return new Response(nodeStreamToWeb(stream), {
      status: 206,
      headers: {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": String(chunkSize),
        "Content-Type": "video/mp4",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  const stream = fs.createReadStream(VIDEO_PATH);
  return new Response(nodeStreamToWeb(stream), {
    status: 200,
    headers: {
      "Content-Length": String(fileSize),
      "Accept-Ranges": "bytes",
      "Content-Type": "video/mp4",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
