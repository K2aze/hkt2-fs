"use client";
import { useTranslations } from "next-intl";
import {
  FaChevronRight,
  FaRegCalendarCheck,
  FaRegCompass,
  FaRegListAlt,
} from "react-icons/fa";

const TripPlaner = () => {
  const t = useTranslations();
  return (
    <section
      id="plan-trip"
      className="py-20 bg-[#FCFCFA] border border-y-green-200 mb-10"
    >
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Header - Simple & Centered */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif text-green-800 mb-4">
            {t("planner.title")}
          </h2>
          <div className="w-12 h-[1px] bg-green-600 mx-auto"></div>
        </div>

        {/* The 3-Step Information Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Step 1 */}
          <div className="text-center space-y-4">
            <div className="text-green-700 flex justify-center">
              <FaRegCompass size={24} />
            </div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-900">
              {t("planner.discovery.label")}
            </h4>
            <p className="text-[13px] text-stone-500 leading-relaxed font-light px-4">
              {t("planner.discovery.desc")}
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center space-y-4 border-x border-stone-100">
            <div className="text-green-700 flex justify-center">
              <FaRegListAlt size={24} />
            </div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-900">
              {t("planner.essentials.label")}
            </h4>
            <p className="text-[13px] text-stone-500 leading-relaxed font-light px-4">
              {t("planner.essentials.desc")}
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center space-y-4">
            <div className="text-green-700 flex justify-center">
              <FaRegCalendarCheck size={24} />
            </div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-900">
              {t("planner.booking.label")}
            </h4>
            <p className="text-[13px] text-stone-500 leading-relaxed font-light px-4">
              {t("planner.booking.desc")}
            </p>
          </div>
        </div>

        {/* Clean Call to Action */}
        <div className="flex justify-center">
          <button className="group relative px-12 py-5 overflow-hidden rounded-full bg-white border border-stone-200 transition-all hover:border-green-800">
            <div className="relative z-10 flex items-center gap-4">
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-green-800">
                {t("planner.cta")}
              </span>
              <FaChevronRight
                size={10}
                className="text-stone-400 group-hover:text-green-800 transition-colors"
              />
            </div>
            {/* Subtle slide-up background on hover */}
            <div className="absolute inset-0 bg-stone-50 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TripPlaner;
