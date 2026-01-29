"use client";
import { useTranslations } from "next-intl";
import { FaMapMarkerAlt } from "react-icons/fa";

const Map = () => {
  const t = useTranslations();
  return (
    <section className="py-20 max-w-300 mx-auto px-6 relative overflow-hidden">
      {/* Background Large Text */}
      <div className="absolute bottom-0 right-10 text-[150px] font-serif italic text-stone-100/60 pointer-events-none select-none -z-10 translate-y-10">
        Okayama
      </div>

      <div className="grid lg:grid-cols-12 gap-16 items-center">
        {/* LEFT: CONTENT & DISCOVERY */}
        <div className="lg:col-span-5 order-2 lg:order-1 space-y-10">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-6 h-px bg-green-700/50"></div>
              <span className="text-green-800 font-bold text-[9px] uppercase tracking-[0.4em] leading-none">
                {t("map.label")}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-serif text-stone-900 leading-[1.15] tracking-tight">
              {t("map.title_main")} <br />
              <span className="italic text-stone-400 font-light">
                {t("map.title_italic")}
              </span>
            </h2>

            <p className="text-stone-500 text-sm leading-relaxed font-light max-w-95 italic">
              {t("map.description")}
            </p>
          </div>

          {/* Modern Grid Legend */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {[
              { key: "riverside", icon: "🛶" },
              { key: "museums", icon: "🖼️" },
              { key: "teahouses", icon: "🍵" },
              { key: "kojima", icon: "👖" },
            ].map((item) => (
              <div
                key={item.key}
                className="group flex items-center gap-3 p-3.5 bg-white rounded-xl border border-stone-100 hover:border-green-200 hover:shadow-sm transition-all duration-500 cursor-pointer"
              >
                <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400 group-hover:text-green-800 transition-colors">
                  {t(`map.legend.${item.key}`)}
                </span>
              </div>
            ))}
          </div>

          {/* Premium Navigation Trigger */}
          <div className="pt-4">
            <button
              onClick={() =>
                window.open(
                  "https://maps.google.com/?q=Kurashiki+Bikan+Historical+Quarter",
                  "_blank",
                )
              }
              className="group relative flex items-center gap-6"
            >
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-stone-900 flex items-center justify-center text-white group-hover:bg-green-800 transition-all duration-500 z-10 relative shadow-lg">
                  <FaMapMarkerAlt
                    size={18}
                    className="group-hover:animate-bounce"
                  />
                </div>
                <div className="absolute inset-0 bg-green-200 rounded-full animate-ping opacity-15"></div>
              </div>

              <div className="text-left">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-green-700 mb-0.5">
                  {t("map.nav_label")}
                </p>
                <p className="font-serif text-lg italic text-stone-800 group-hover:text-green-900 transition-all">
                  {t("map.nav_action")}
                </p>
                <div className="h-px w-6 group-hover:w-full bg-green-800/30 transition-all duration-500 mt-1"></div>
              </div>
            </button>
          </div>
        </div>

        {/* RIGHT: ARTISTIC MAP CARD */}
        <div className="lg:col-span-7 order-1 lg:order-2 relative">
          <div className="absolute -inset-4 border border-stone-100 rounded-[5rem] -z-10 rotate-1 group-hover:rotate-0 transition-transform duration-1000"></div>

          <div className="relative group px-5">
            <div className="absolute top-10 -right-5 z-30 bg-green-900 shadow-2xl p-5 rounded-3xl border border-stone-100 rotate-12 group-hover:rotate-0 transition-all duration-700">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-serif italic text-white">
                  Kurashiki
                </span>
                <span className="text-[9px] font-black uppercase tracking-widest text-stone-300">
                  Okayama, JP
                </span>
              </div>
            </div>

            <div className="relative h-137.5 w-full bg-white p-1.5 rounded-4xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-green-200 overflow-hidden">
              <iframe
                title="Kurashiki Interactive Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.4357736630043!2d133.7684126763402!3d34.59562779013898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35515647a505b8cf%3A0x633d778a48b59363!2sKurashiki%20Bikan%20Historical%20Quarter!5e0!3m2!1sen!2smm!4v1700000000000!5m2!1sen!2smm"
                className="w-full h-full rounded-[1.6rem] grayscale group-hover:grayscale-0 contrast-[1.05] brightness-[0.98] transition-all duration-1000 ease-in-out"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;
