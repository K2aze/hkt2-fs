import { GlobeIcon, UpdownIcon } from "@/components/ui/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import styles from "./LanguageSwitchMobile.module.scss";
import { useTranslations } from "next-intl";
import { LANGUAGE } from "../constants/language";
import { useState } from "react";
import { useChangeLocale } from "../hook/useChangeLocale";

const LanguageSwitchMobile = () => {
  const t = useTranslations("language");
  const { locale, changeLocale } = useChangeLocale();
  const [selected, setSelected] = useState<string>(locale);

  return (
    <Select>
      <SelectTrigger className={styles.trigger}>
        <GlobeIcon size={24} strokeWidth={1.5} />
        <span className={styles.triggerCode}>{t("language")}</span>
        <UpdownIcon size={20} strokeWidth={1.5} />
      </SelectTrigger>
      <SelectContent>
        {LANGUAGE.map((lang) => (
          <SelectItem
            key={lang.code}
            aria-selected={lang.code == locale}
            onClick={() => {
              setSelected(lang.code);
              changeLocale(lang.code);
            }}
            selected={selected == lang.code}
          >
            {t(`options.${lang.code}`)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitchMobile;
