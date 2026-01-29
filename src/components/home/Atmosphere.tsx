"use client";
import { ATMOSPHERE_DATA, selectProps } from "@/data/atmosphere";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

const Atmosphere = () => {
  const [selected, setSelected] = useState<selectProps>("summer");
  const handleSelect = (f: selectProps) => {
    if (selected == f) return;
    setSelected(f);
  };
  return (
    <section className="ap">
      <h2 className="text-green-700 font-bold text-xs uppercase tracking-widest">
        Atmosphere
      </h2>
      <p className="text-4xl font-serif italic text-stone-900 mb-8 leading-tight">
        Four Seasons of Kurashiki
      </p>

      <div className="ap__wrp">
        <div className="grid grid-cols-4 gap-2 tablet:grid-cols-1 min-w-2xs">
          {ATMOSPHERE_DATA.map((item) => (
            <button
              key={item.id}
              className={clsx("p-4 rounded-md border border-neutral-400", {
                ["bg-green-700 text-white"]: item.id == selected,
              })}
              onClick={() => handleSelect(item.id)}
            >
              {item.id}
            </button>
          ))}
        </div>

        {ATMOSPHERE_DATA.map((item) => (
          <div
            className="ap__iw"
            key={item.id}
            style={selected == item.id ? {} : { display: "none" }}
          >
            {item.imgs.map((url, idx) => (
              <button className="ap__iw__img" key={idx}>
                <Image
                  alt="q"
                  src={url}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  preload={true}
                  style={{ objectFit: "cover" }}
                />
              </button>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Atmosphere;
