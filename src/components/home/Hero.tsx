"use client";
import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__img">
        <Image
          src={"/images/hero.png"}
          alt="hero"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          preload={true}
          style={{ objectFit: "cover" }}
        />
      </div>

      <p className="bg-green-600/30 mt-5 backdrop-blur-md text-white border border-green-700/30 px-5 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.4em] mb-8 inline-block opacity-90">
        Timeless Beauty, Sustainably Shared
      </p>
      <h1 className="text-4xl md:text-5xl lg:text-[65px] font-serif text-white leading-[1.1] md:leading-[1.1] tracking-tighter italic mb-8">
        Beauty That Endures Through The Ages
      </h1>
      <p className="not-italic font-light text-stone-200 text-lg md:text-2xl lg:text-[22px] block mt-8 md:mt-8 tracking-normal max-w-3xl mx-auto leading-relaxed opacity-90">
        Discover the ancient heritage and natural serenity of Kurashiki
      </p>
      <Link
        href={"/booking"}
        className="bg-green-700 text-white px-10 py-4 rounded-full font-black text-[12px] uppercase tracking-widest hover:bg-white hover:text-emerald-900 transition-all shadow-2xl flex items-center gap-4 group mt-12"
      >
        <span>Book your Journey now</span>
        <ArrowRight />
      </Link>
    </section>
  );
}
