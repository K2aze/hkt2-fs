"use client";

import { useTranslations } from "next-intl";

const TravelInfo = () => {
  const t = useTranslations();

  return (
    <section className="py-18 pt-8 max-w-[1200px] mx-auto px-6 bg-[#f8f7f4] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40%] h-full bg-stone-100/50 rounded-l-[100px] pointer-events-none"></div>

      <div className="max-w-[1300px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* LEFT: VISUAL COMPOSITION */}
          <div className="lg:w-1/2 sm:mb-8 relative w-full">
            <div className="relative w-full aspect-[1.1/1] h-[350px] md:h-auto group/img">
              <div className="absolute inset-0 rounded-[2rem] rounded-tr-[8rem] overflow-hidden shadow-2xl transition-all duration-700 group-hover/img:rounded-tr-[2rem] group-hover/img:rounded-bl-[8rem]">
                <img
                  src="/images/canalRef.jpg"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-110"
                  alt="Kurashiki Aesthetic"
                />
                <div className="absolute inset-0 bg-stone-900/10 group-hover/img:bg-transparent transition-colors"></div>
              </div>

              <div className="absolute -top-6 -right-6 w-24 h-24 bg-green-700 rounded-full flex flex-col items-center justify-center text-white shadow-2xl rotate-6 group-hover/img:rotate-0 transition-all duration-500">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-80">
                  Best of
                </span>
                <span className="text-2xl font-serif italic">2025</span>
              </div>

              <div className="absolute -inset-4 border border-stone-200 rounded-[2.5rem] rounded-tr-[9rem] -z-10 group-hover/img:translate-x-2 group-hover/img:translate-y-2 transition-transform duration-500"></div>
            </div>

            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 lg:left-auto lg:right-0 lg:translate-x-8 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-[240px] border border-stone-100">
              <div className="space-y-2">
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse"></div>
                  <div className="w-1.5 h-1.5 bg-stone-300 rounded-full"></div>
                </div>
                <p className="text-[10px] font-black text-green-900 uppercase tracking-widest">
                  {t("practical.tip_label")}
                </p>
                {/* စာသားအရောင်ကို text-stone-700 သို့ ပြောင်းလိုက်ပါသည် */}
                <p className="text-[13px] font-serif italic text-stone-700 leading-snug">
                  {t("practical.tip_text")}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: CONTENT */}
          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-green-700"></div>
                <span className="text-green-800 font-black text-[10px] uppercase tracking-[0.4em]">
                  {t("practical.label")}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-stone-950 leading-[1.1]">
                {t("practical.title_part1")} <br />
                {/* မှိန်နေတဲ့ text-stone-400 ကို text-stone-500/60 သို့မဟုတ် ပိုရင့်အောင် ပြင်ထားပါတယ် */}
                <span className="italic font-light text-stone-500">
                  {t("practical.title_part2")}
                </span>
              </h2>
            </div>

            <div className="grid gap-6">
              <div className="group flex gap-8 pb-6 border-b border-stone-200">
                {/* 01 ကို ပိုမြင်သာအောင် text-stone-400 ပြောင်းလိုက်ပါတယ် */}
                <div className="text-stone-400 text-3xl font-serif italic group-hover:text-green-700 transition-colors duration-500">
                  01
                </div>
                <div className="space-y-2">
                  <h3 className="font-black text-[11px] uppercase tracking-[0.2em] text-stone-950">
                    {t("practical.access_title")}
                  </h3>
                  {/* Description ကို text-stone-600 သို့ ပြောင်းလိုက်ပါသည် */}
                  <p className="text-stone-600 text-[14px] font-normal leading-relaxed max-w-md">
                    {t("practical.access_desc")}
                  </p>
                </div>
              </div>

              <div className="group flex gap-8 pb-6 border-b border-stone-200">
                <div className="text-stone-400 text-3xl font-serif italic group-hover:text-green-700 transition-colors duration-500">
                  02
                </div>
                <div className="space-y-2">
                  <h3 className="font-black text-[11px] uppercase tracking-[0.2em] text-stone-950">
                    {t("practical.time_title")}
                  </h3>
                  {/* Description ကို text-stone-600 သို့ ပြောင်းလိုက်ပါသည် */}
                  <p className="text-stone-600 text-[14px] font-normal leading-relaxed max-w-md">
                    {t("practical.time_desc")}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <button className="px-6 py-3 bg-green-950 text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-green-800 transition-all shadow-lg active:scale-95">
                {t("practical.explore")}
              </button>
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white bg-stone-200 flex items-center justify-center overflow-hidden"
                  >
                    <img
                      src={`https://i.pravatar.cc/100?img=${i + 10}`}
                      alt="user"
                    />
                  </div>
                ))}
                {/* traveled text ကို text-stone-500 သို့ ပြောင်းပါသည် */}
                <div className="pl-4 text-[10px] font-bold text-stone-500 uppercase tracking-tighter self-center">
                  {t("practical.travelled")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelInfo;
