import { COLLECTION_DATA } from "@/data/collection";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const randomItems = [...COLLECTION_DATA]
  .sort(() => Math.random() - 0.5)
  .slice(0, 4);

const Collection = () => {
  return (
    <section className="clt">
      <div>
        <h2 className="text-green-600 font-bold text-[9px] uppercase tracking-[0.3em] mb-2 block">
          Curated Collection
        </h2>
        <p className="text-3xl md:text-4xl font-serif text-stone-900 leading-tight">{`Kurashiki's Living Spirit`}</p>
      </div>

      <ul className="grid grid-cols-2 grid-rows-2 gap-4 tablet:grid-rows-1 tablet:grid-cols-4">
        {randomItems.map((item) => (
          <li key={item.id} className="aspect-3/4">
            <article className="w-full h-full relative flex flex-col p-4 justify-end ">
              <span className="bg-green-600 text-white px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest w-fit mb-auto">
                {item.tag}
              </span>
              <h3 className="text-lg font-serif italic mb-2 leading-tight text-white">
                {item.title}
              </h3>
              <a
                className="text-white underline flex items-center gap-2 font-black"
                href={item.to}
              >
                <span>Read</span>
                <ArrowRight />
              </a>
              <div className="clt__img">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  preload={true}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </article>
          </li>
        ))}
      </ul>

      <a href="#" className="clt__link">
        Explore more
      </a>
    </section>
  );
};

export default Collection;
