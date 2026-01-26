"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import styles from "./test.module.scss";
import { useState } from "react";
import { LANGUAGE } from "@/features/language/constants/language";

const Page = () => {
  const [selected, setSelected] = useState<string>(LANGUAGE[0].code);

  return (
    <div className={styles.test}>
      <Select>
        <SelectTrigger>Language</SelectTrigger>
        <SelectContent>
          {LANGUAGE.map((lang) => (
            <SelectItem
              key={lang.code}
              onClick={() => setSelected(lang.code)}
              selected={selected == lang.code}
            >
              {lang.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Page;
