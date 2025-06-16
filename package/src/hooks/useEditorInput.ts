import { useRef } from "react";
import { stringToCharPos, handleBackSpace } from "../utils/input";

export function useEditorInput(editor: any, lineLength: number) {
  const inputRef = useRef<HTMLInputElement>(null);

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (editor.isIme) {
      const { chars } = stringToCharPos(value, editor.cursor, lineLength);
      editor.setImeText(chars);
      return;
    } else {
      const { chars, endPos } = stringToCharPos(
        value,
        editor.cursor,
        lineLength,
      );
      const newContent = [...editor.content, ...chars];

      editor.setContent(newContent);
      editor.setCursor(endPos);
      clearInput();
      return;
    }
  };

  const handleCompositionStart = () => {
    editor.setIsIme(true);
  };

  const handleCompositionEnd = (
    e: React.CompositionEvent<HTMLInputElement>,
  ) => {
    editor.setIsIme(false);

    const value = e.currentTarget.value;
    if (!value) return;

    const { chars, endPos } = stringToCharPos(value, editor.cursor, lineLength);
    const newContent = [...editor.content, ...chars];

    editor.setContent(newContent);
    editor.setCursor(endPos);
    editor.setImeText(null);
    clearInput();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (editor.isIme) return; //IMEは標準で処理

    if (e.code === "Backspace") {
      e.preventDefault();

      const { newContent, newCursor } = handleBackSpace(
        editor.content,
        editor.cursor,
        lineLength,
      );
      editor.setContent(newContent);
      editor.setCursor(newCursor);
      clearInput();
      return;
    }

    if (e.code === "Enter") {
      e.preventDefault();

      const newCursor = { xPos: editor.cursor.xPos + 1, yPos: 0 };
      editor.setCursor(newCursor);
      clearInput();
      return;
    }

    if (e.code === "Space") {
      e.preventDefault();

      let newCursor = {
        xPos: editor.cursor.xPos,
        yPos: editor.cursor.yPos + 1,
      };
      if (newCursor.yPos === lineLength) {
        newCursor = {
          xPos: newCursor.xPos + 1,
          yPos: 0,
        };
      }

      editor.setCursor(newCursor);
      clearInput();
      return;
    }
  };

  return {
    inputRef,
    handleChange,
    handleCompositionStart,
    handleCompositionEnd,
    handleKeyDown,
  };
}
