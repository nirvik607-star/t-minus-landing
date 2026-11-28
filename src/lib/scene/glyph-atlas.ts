/**
 * Rasterises the brand glyph set into a one-row atlas at device resolution.
 * The first glyphs form a ramp from sparse to dense so the shader can pick a
 * glyph by how much light a cell holds; the asterisk is kept for accents.
 *
 * The set is the app's: ^ - t + = T *  (no dots or colons).
 */

/** Density ramp, sparse to dense, then the reserved asterisk. */
export const RAMP_GLYPHS = ["-", "^", "+", "=", "t", "T"] as const;
export const RESERVED_GLYPHS = ["*"] as const;
export const BRAND_GLYPHS = [...RAMP_GLYPHS, ...RESERVED_GLYPHS] as const;

export interface GlyphAtlas {
  canvas: HTMLCanvasElement;
  /** Glyphs in atlas order: the ramp, then reserved glyphs. */
  order: string[];
  /** How many of them form the density ramp. */
  ramp: number;
  cellW: number;
  cellH: number;
}

export function buildGlyphAtlas(
  cellWDev: number,
  cellHDev: number,
  fontFamily: string,
  weight = 600
): GlyphAtlas {
  const cw = Math.max(4, Math.round(cellWDev));
  const ch = Math.max(4, Math.round(cellHDev));
  const fontPx = Math.round(ch * 1.3);
  const font = `${weight} ${fontPx}px ${fontFamily}`;

  const probe = document.createElement("canvas");
  probe.width = cw;
  probe.height = ch;
  const pctx = probe.getContext("2d", { willReadFrequently: true })!;

  // Vertical placement: centre the cap height of "T" in the cell and keep
  // every glyph on that shared baseline, as it would sit in a line of type.
  pctx.font = font;
  const mT = pctx.measureText("T");
  const cap = mT.actualBoundingBoxAscent || fontPx * 0.7;
  const baseline = Math.round(ch / 2 + cap / 2);

  const draw = (ctx: CanvasRenderingContext2D, glyph: string, x0: number) => {
    ctx.font = font;
    ctx.textBaseline = "alphabetic";
    ctx.textAlign = "center";
    ctx.fillStyle = "#fff";
    ctx.fillText(glyph, x0 + cw / 2, baseline);
  };

  const order: string[] = [...BRAND_GLYPHS];

  const canvas = document.createElement("canvas");
  canvas.width = cw * order.length;
  canvas.height = ch;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  order.forEach((g, i) => {
    ctx.save();
    ctx.beginPath();
    ctx.rect(i * cw, 0, cw, ch);
    ctx.clip();
    draw(ctx, g, i * cw);
    ctx.restore();
  });

  return { canvas, order, ramp: RAMP_GLYPHS.length, cellW: cw, cellH: ch };
}
