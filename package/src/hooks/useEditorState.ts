import { useState } from "react";
import type { CharPos, CursorPos } from "../types";

export function useEditorState() {
  const [content, setContent] = useState<CharPos[]>([]);
  const [cursor, setCursor] = useState<CursorPos>({ xPos: 0, yPos: 0 });
  const [isIme, setIsIme] = useState(false);
  const [imeText, setImeText] = useState<CharPos[] | null>(null);

  const updateContentAndCursor = (newContent: CharPos[], endPos: CursorPos) => {
    setContent(newContent);
    setCursor(endPos);
  };

  return {
    content,
    cursor,
    isIme,
    imeText,
    setContent,
    setCursor,
    setIsIme,
    setImeText,
    updateContentAndCursor,
  };
}
