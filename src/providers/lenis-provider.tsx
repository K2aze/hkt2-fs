"use client";
import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";
interface lenisProviderProps {
  children: ReactNode;
}

export function LenisProvider({ children }: lenisProviderProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        syncTouch: true,
        touchMultiplier: 4,
      }}
    >
      {children}
    </ReactLenis>
  );
}
