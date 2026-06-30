import type { CSSProperties } from "react";

type WatermarkMask = {
  x: number;
  y: number;
  width: number;
  height: number;
  shiftX?: number;
  shiftY?: number;
  feather?: number;
};

type Props = {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  loading?: "eager" | "lazy";
  decoding?: "async" | "sync" | "auto";
  fetchPriority?: "high" | "low" | "auto";
  mask?: WatermarkMask;
};

export function ProjectImage({ src, alt, className, style, loading = "lazy", decoding = "async", fetchPriority, mask }: Props) {
  return (
    <div className={["project-image", className].filter(Boolean).join(" ")}>
      <img src={src} alt={alt} style={style} loading={loading} decoding={decoding} fetchPriority={fetchPriority} />
      {mask ? (
        <div
          className="project-image-mask"
          aria-hidden
          style={
            {
              "--mask-x": `${mask.x}%`,
              "--mask-y": `${mask.y}%`,
              "--mask-w": `${mask.width}%`,
              "--mask-h": `${mask.height}%`,
              "--mask-shift-x": `${mask.shiftX ?? -18}%`,
              "--mask-shift-y": `${mask.shiftY ?? 0}%`,
              "--mask-feather": `${mask.feather ?? 18}px`,
            } as CSSProperties
          }
        >
          <img src={src} alt="" style={style} loading={loading} decoding={decoding} />
        </div>
      ) : null}
    </div>
  );
}