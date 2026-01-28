import { COLLECTION_DATA } from "@/data/collection";
import Image from "next/image";

const randomItems = [...COLLECTION_DATA]
  .sort(() => Math.random() - 0.5)
  .slice(0, 4);

const Collection = () => {
  return (
    <section className="clt">
      <div>
        <h2 className="clt__tt">Curated Collection</h2>
        <p className="clt__st">{`Kurashiki's Living Spirit`}</p>
      </div>

      <ul className="clt__lt">
        {randomItems.map((item) => (
          <li key={item.id} className="clt__it">
            <article className="clt__atc">
              <span className="clt__atc__tag">{item.tag}</span>
              <h3 className="clt__atc__tt">{item.title}</h3>
              <a className="clt__atc__link" href={item.to}>
                Read
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
