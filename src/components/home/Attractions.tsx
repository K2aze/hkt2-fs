import { ATTRACTIONS_DATA } from "@/data/attractions";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const Attractions = () => {
  return (
    <section className="ats">
      <div className="flex justify-between gap-8">
        <div className="space-y-2">
          <h2 className="text-green-700 font-bold text-[9px] uppercase tracking-[0.2em]">
            Essential Recommended Highlights
          </h2>
          <p className="text-3xl md:text-4xl font-serif italic text-stone-900 leading-tight">
            Hand-picked Eco-conscious Locations
          </p>
        </div>
        <p className="text-stone-500 text-sm md:text-xs max-w-xs leading-relaxed italic self-end">
          Locations We believe in travel that gives back to the earth and the
          local Kurashiki community, preserving our beauty for generations to
          come
        </p>
      </div>

      <ul className="ats__l">
        {ATTRACTIONS_DATA.map((item) => (
          <li key={item.id}>
            <article className="ats__atc">
              <div className="ats__atc__ic">
                <Image
                  src={item.imgUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  preload={true}
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className="ats__atc__ct">
                <h3 className="text-lg font-serif italic text-stone-900 group-hover:text-green-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-4 line-clamp-2 italic">
                  {item.desc}
                </p>
                <div className="flex grow justify-between items-end">
                  <span className="px-2 py-1 bg-green-200 rounded-full text-xs">
                    {item.price}
                  </span>
                  <a
                    href="#"
                    className="underline text-green-600 flex items-center gap-1"
                  >
                    <span>Read now</span>
                    <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Attractions;
