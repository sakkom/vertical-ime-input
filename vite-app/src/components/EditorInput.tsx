import React, { forwardRef } from "react";
import type { CursorPos } from "../types";

interface EditorInputProps {
  cursor: CursorPos;
  isIme: boolean;
  cellSize: number;
  gridGap: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCompositionStart: () => void;
  onCompositionEnd: (e: React.CompositionEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const EditorInput = forwardRef<HTMLInputElement, EditorInputProps>(
  (
    {
      cursor,
      isIme,
      cellSize,
      gridGap,
      onChange,
      onCompositionStart,
      onCompositionEnd,
      onKeyDown,
    },
    ref,
  ) => {
    const displayCellSize = cellSize + gridGap;

    return (
      <input
        ref={ref}
        className="absolute focus:outline-none text-center bg-gray-200"
        style={{
          top: `${cursor.yPos * displayCellSize + gridGap / 2}px`,
          right: `${0 * displayCellSize + gridGap / 2}px`,
          width: `${cellSize}px`,
          height: `${cellSize}px`,
          backgroundColor: isIme ? "transparent" : "",
          fontSize: `${cellSize * 0.6}px`,
          opacity: isIme ? 0 : 1,
          writingMode: "vertical-rl",
          transform: "scale(1.1)",
          transformOrigin: "top right",
          zIndex: 20,
        }}
        onChange={onChange}
        onCompositionStart={onCompositionStart}
        onCompositionEnd={onCompositionEnd}
        onKeyDown={onKeyDown}
        type="text"
        autoFocus
      />
    );
  },
);

EditorInput.displayName = "EditorInput";
