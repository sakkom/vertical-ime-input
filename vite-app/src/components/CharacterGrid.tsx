import { useMemo } from "react";
import { CharPos, CursorPos } from "../types";
import { calcMaxXPosition } from "../utils/input";

interface CharacterGridProps {
  characters: CharPos[];
  cursor: CursorPos;
  isIme: boolean;
  cellSize: number;
  gridGap: number;
}

export function CharacterGrid({
  characters,
  cursor,
  cellSize,
  isIme,
  gridGap,
}: CharacterGridProps) {
  const displayCellSize = cellSize + gridGap;

  const maxXPosition = useMemo(() => {
    return calcMaxXPosition(characters, cursor.xPos);
  }, [characters, cursor.xPos]);

  return (
    <>
      {characters.map((charObj, index) => {
        const relativeXpos = charObj.xPos - maxXPosition;
        const isLastChar = characters.length - 1 === index;

        return (
          charObj.char && (
            <div
              key={index}
              className="absolute flex items-center justify-center bg-gray-200"
              style={{
                top: `${charObj.yPos * displayCellSize + gridGap / 2}px`,
                right: `${relativeXpos * displayCellSize + gridGap / 2}px`,
                width: `${cellSize}px`,
                height: `${cellSize}px`,
                fontSize: `${cellSize * 0.6}px`,
                writingMode: "vertical-rl",
                zIndex: 10,
                ...(isLastChar &&
                  isIme && {
                    transform: "scale(1.1)",
                    transformOrigin: "top right",
                  }),
              }}
            >
              {charObj.char}
            </div>
          )
        );
      })}
    </>
  );
}
