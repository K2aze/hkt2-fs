"use client";
import { ATMOSPHERE_DATA, selectProps } from "@/data/atmosphere";
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
      <h2 className="ap__tt">Atmosphere</h2>
      <p className="ap__d">Four Seasons of Kurashiki</p>

      <div className="ap__wrp">
        <div className="ap__bw">
          <button className="ap__btn" onClick={() => handleSelect("spring")}>
            Spring
          </button>
          <button className="ap__btn" onClick={() => handleSelect("summer")}>
            Summner
          </button>
          <button className="ap__btn" onClick={() => handleSelect("autumn")}>
            Autumn
          </button>
          <button
            className="ap__btn"
            onClick={() => handleSelect("nightlight")}
          >
            Night Light
          </button>
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
