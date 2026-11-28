/**
 * Rasterises the brand glyph set into a one-row atlas at device resolution.
 * The first glyphs form a ramp from sparse to dense so the shader can pick a
 * glyph by how much light a cell holds.
 *
 * The brand's twist on text-mode drawing is that the field is made of the
 * letter T. Five of the six steps of the ramp are a T: tone comes from case,
 * weight and size, not from switching to other characters. A dash carries the
 * faintest light, and the asterisk is kept for accents.
 */

interface RampGlyph {
  ch: string;
  weight: number;
  /** Size relative to the cell's normal glyph size. */
  scale: number;
}

/** Density ramp, sparse to dense. */
const RAMP: RampGlyph[] = [
  { ch: "-", weight: 500, scale: 1 },
  { ch: "t", weight: 400, scale: 0.86 },
  { ch: "t", weight: 600, scale: 1 },
  { ch: "T", weight: 500, scale: 0.94 },
  { ch: "T", weight: 600, scale: 1.04 },
  { ch: "T", weight: 700, scale: 1.14 },
];
export const RAMP_GLYPHS = RAMP.map((g) => g.ch);
/** Accents: the asterisk, and a heavier T for the hottest cells. */
export const RESERVED_GLYPHS = ["*", "T"] as const;
export const BRAND_GLYPHS = [...RAMP_GLYPHS, ...RESERVED_GLYPHS];

export interface GlyphAtlas {
  canvas: HTMLCanvasElement;
  /** Glyphs in atlas order: the ramp, then reserved glyphs. */
  order: string[];
  /** How many of them form the density ramp. */
  ramp: number;
  /** 1-based atlas index of the heavy signal T. */
  signal: number;
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
  const rampFont = (g: RampGlyph) => `${g.weight} ${Math.round(fontPx * g.scale)}px ${fontFamily}`;

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

  const signalFont = `700 ${Math.round(ch * 1.62)}px ${fontFamily}`;
  const draw = (
    ctx: CanvasRenderingContext2D,
    glyph: string,
    x0: number,
    heavy = false,
    ramp?: RampGlyph
  ) => {
    ctx.font = heavy ? signalFont : ramp ? rampFont(ramp) : font;
    ctx.textBaseline = "alphabetic";
    ctx.textAlign = "center";
    ctx.fillStyle = "#fff";
    ctx.fillText(glyph, x0 + cw / 2, heavy ? Math.round(ch * 0.97) : baseline);
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
    draw(ctx, g, i * cw, i === order.length - 1, RAMP[i]);
    ctx.restore();
  });

  return {
    canvas,
    order,
    ramp: RAMP_GLYPHS.length,
    signal: order.length,
    cellW: cw,
    cellH: ch,
  };
}
