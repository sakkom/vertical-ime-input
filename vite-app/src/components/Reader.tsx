import { CharPos } from "../types";

interface ReaderProps {
  text: CharPos[];
  lineLength?: number;
  gridGap?: number;
  cellSize?: number;
}

export function Reader({
  text,
  lineLength = 20,
  cellSize = 30,
  gridGap = 2,
}: ReaderProps) {
  const displayCellSize = cellSize + gridGap;
  let endXposIndex = text.length > 0 ? text[text.length - 1].xPos : 0;
  const textWidth = endXposIndex++;

  return (
    <div
      className="w-full flex justify-end"
      style={{ height: `${displayCellSize * lineLength}px` }}
    >
      <div
        className="relative"
        style={{
          width: `${displayCellSize * textWidth}px`,
          height: `${displayCellSize * lineLength}px`,
        }}
      >
        {text.map((CharObj, index) => (
          <div
            key={index}
            className="absolute flex items-center justify-center bg-gray-200"
            style={{
              top: `${CharObj.yPos * displayCellSize + gridGap / 2}px`,
              right: `${CharObj.xPos * displayCellSize + gridGap / 2}px`,
              width: `${cellSize}px`,
              height: `${cellSize}px`,
              fontSize: `${cellSize * 0.6}px`,
              writingMode: "vertical-rl",
              zIndex: 10,
            }}
          >
            {CharObj.char}
          </div>
        ))}
      </div>
    </div>
  );
}
