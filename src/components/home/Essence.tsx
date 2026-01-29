"use client";
import { ESSENCE_DATA } from "@/data/essence";

const Essence = () => {
  return (
    <section className="mx-auto p-4 max-w-300">
      <h2 className="text-4xl md:text-5xl font-serif italic text-stone-900 mb-6 text-center">
        The Essence of Kurashiki.Eco
      </h2>
      <p className=" text-green-700 max-w-2xl mx-auto leading-relaxed italic text-sm md:text-base text-center">
        Beyond sightseeing, we invite you to experience a harmonious balance
        between ancient traditions and modern sustainability.
      </p>

      <ul className="grid tablet:grid-cols-3 gap-2 tablet:grid-rows-1 mt-4">
        {ESSENCE_DATA.map((item) => (
          <li key={item.id} className="w-full text-center">
            <article className="grid gap-4 border-stone-300 border px-4 py-6 h-full rounded-lg items-center bg-linear-to-b from-green-100 p-4">
              <div className="mx-auto p-4 bg-green-700 text-white rounded-full">
                <item.icon size={32} />
              </div>
              <h3 className="text-2xl font-serif italic mb-4">{item.title}</h3>
              <p className="text-stone-500 text-sm px-4">{item.desc}</p>
            </article>
          </li>
        ))}
      </ul>

      <a
        href="#"
        className="block w-fit mx-auto mt-4 text-sm font-black uppercase tracking-wide text-green-800 border-b border-green-800 pb-2 hover:text-green-600 hover:border-green-600 transition-all"
      >
        Learn more about our mission
      </a>
    </section>
  );
};

export default Essence;
