"use client";

import { ArtifactPill } from "intertext-dev/react";

/**
 * Foto dentro del titular (skill Intertext, paquete `intertext-dev`).
 * Las medidas en `em` siguen a la tipografía; se agranda con el mouse, el teclado o al tocar.
 */
export function InlineMedia({ src, alt, width = "1.9em", height = ".78em" }: { src: string; alt: string; width?: string; height?: string }) {
  return (
    <ArtifactPill
      src={src}
      alt={alt}
      width={width}
      height={height}
      fit="crop"
      radius="0px"
      hoverExpand
      tabIndex={0}
      expandedWidth="3.6em"
      expandedHeight="2.4em"
    />
  );
}
