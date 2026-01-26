import type { ExtendedRefs, ReferenceType } from "@floating-ui/react";
import type { CSSProperties, Dispatch, SetStateAction } from "react";
import { createContext, useContext } from "react";

type SelectContextProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  refs: ExtendedRefs<ReferenceType>;
  floatingStyles: CSSProperties;
  floatingId: string;
};

export const SelectContext = createContext<SelectContextProps | null>(null);

export function useSelectContext() {
  const ctx = useContext(SelectContext);

  if (!ctx) {
    throw new Error(
      "useSelectContext must be used within SelectContextProvider",
    );
  }

  return ctx;
}
