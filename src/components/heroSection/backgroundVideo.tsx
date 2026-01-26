"use client";
import { useEffect, useState } from "react";
import { HTMLMotionProps, motion } from "framer-motion";

export interface backgroundVideoProps extends HTMLMotionProps<"video"> {
  className?: string;
}

export function BackgroundVideo({ className, ...props }: backgroundVideoProps) {
  return <></>;
}
