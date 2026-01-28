import { ATTRACTIONS_DATA } from "@/data/attractions";
import Image from "next/image";

const Attractions = () => {
  return (
    <section className="ats">
      <div className="ats__tc">
        <div className="ats__tc__c1">
          <h2 className="ats__tt">Essential Recommended Highlights</h2>
          <p className="ats__st">Hand-picked Eco-conscious Locations</p>
        </div>
        <p className="ats__d">
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
                <h3 className="ats__atc__tt">{item.title}</h3>
                <p className="ats__atc__d">{item.desc}</p>
                <div className="ats__atc__t">
                  <span className="ats__atc__sm">{item.price}</span>
                  <a href="#" className="ats__atc__btn">
                    Read now
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
