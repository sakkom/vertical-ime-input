import { useMemo } from "react";
import { CharPos } from "../types";

export function useDisplayContent(
  content: CharPos[],
  imeText: CharPos[] | null,
  isIme: boolean,
) {
  return useMemo(() => {
    if (isIme && imeText && imeText.length > 0) {
      return [...content, ...imeText];
    }
    return content;
  }, [content, isIme, imeText]);
}
