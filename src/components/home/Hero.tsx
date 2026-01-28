"use client";
import { useEffect, useState } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__img">
        <Image
          src={"/images/k1.jpg"}
          alt="hero"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          preload={true}
          style={{ objectFit: "cover" }}
        />
      </div>

      <p className="hero__s">Timeless Beauty, Sustainably Shared</p>
      <h1 className="hero_m">Beauty That Endures Through The Ages</h1>
      <p className="hero_p">
        Discover the ancient heritage and natural serenity of Kurashiki
      </p>
      <Link href={"/booking"} className="hero__l">
        <span>Book your Journey now</span>
        <ArrowRight />
      </Link>
    </section>
  );
}
