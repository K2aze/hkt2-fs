"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";

const Page = () => {
  const t = useTranslations();
  return (
    <section
      id="home"
      className="relative min-h-screen md:h-[110vh] flex items-center justify-center overflow-hidden bg-stone-900"
    >
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
      >
        <img
          src="/images/k1.jpg"
          className="w-full h-full object-cover brightness-[0.55]"
          alt="Kurashiki"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-green-900/80"></div>
      </motion.div>

      <div className="relative z-10 text-center px-6 md:px-8 py-20 flex justify-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-7xl w-full mx-auto"
        >
          {/* Subtitle with better margin */}
          <span className="bg-green-600/30 mt-5 backdrop-blur-md text-white border border-green-700/30 px-5 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.4em] mb-8 inline-block opacity-90">
            {t("hero.subtitle") || "Timeless Beauty, Sustainably Shared"}
          </span>

          {/* Main Title - Added leading-tight and responsive padding */}
          <h2 className="text-4xl md:text-5xl lg:text-[65px] font-serif text-white leading-[1.1] md:leading-[1.1] tracking-tighter italic mb-8">
            {t("hero.title")}

            {/* Subheading - Added clear margin-top and better leading */}
            <span className="not-italic font-light text-stone-200 text-lg md:text-2xl lg:text-[22px] block mt-8 md:mt-8 tracking-normal max-w-3xl mx-auto leading-relaxed opacity-90">
              {t("hero.subheading")}
            </span>
          </h2>

          {/* Button with more spacing */}
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            <button // သင်သွားချင်တဲ့ Page ရဲ့ Path လမ်းကြောင်းကို ထည့်ပါ
              className="bg-green-700 text-white px-10 py-4 rounded-full font-black text-[12px] uppercase tracking-widest hover:bg-white hover:text-emerald-900 transition-all shadow-2xl flex items-center gap-4 group"
            >
              {t("hero.button") || "Start Discovery"}
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* --- Bottom Left Info --- */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-8 md:bottom-12 md:left-16 z-20 hidden sm:flex items-center gap-6 text-white/80"
      >
        <div className="relative flex items-center justify-center">
          <div className="absolute w-12 h-12 border border-white/30 rounded-full animate-ping"></div>

          {/* ဒီနေရာကို <a> ကနေ <button> ပြောင်းလဲလိုက်ပါတယ် */}
          <button
            onClick={() => {
              const section = document.getElementById("attractions");
              if (section) {
                section.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className="relative w-12 h-12 border border-white/50 rounded-full flex items-center justify-center text-xl hover:bg-white hover:text-green-900 transition-colors duration-300 group cursor-pointer"
          >
            <FaArrowDown className="text-sm animate-bounce" />
          </button>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] md:text-[11px] font-medium tracking-[0.2em] leading-tight max-w-[200px] italic uppercase">
            {t("hero.guide_text") ||
              "A conscious traveler’s guide to the beauty of Kurashiki"}
          </span>
          <div className="h-[1px] w-12 bg-green-500/50 mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Page;
