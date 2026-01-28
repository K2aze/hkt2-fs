"use client";
import { ESSENCE_DATA } from "@/data/essence";

const Essence = () => {
  return (
    <section className="ess">
      <h2 className="ess__tt">The Essence of Kurashiki.Eco</h2>
      <p>
        Beyond sightseeing, we invite you to experience a harmonious balance
        between ancient traditions and modern sustainability.
      </p>

      <ul className="ess__wrp">
        {ESSENCE_DATA.map((item) => (
          <li key={item.id}>
            <article className="ess__atc">
              <div className="ess__atc__icon">
                <item.icon size={32} />
              </div>
              <h3 className="ess__atc__tt">{item.title}</h3>
              <p className="ess__atc__d">{item.desc}</p>
            </article>
          </li>
        ))}
      </ul>

      <a href="#" className="ess__msl">
        Learn more about our mission
      </a>
    </section>
  );
};

export default Essence;
