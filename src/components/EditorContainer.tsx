interface EditorContainerProps {
  cellSize: number;
  lineLength: number;
  gridGap: number;
  children: React.ReactNode;
}

export function EditorContainer({
  cellSize,
  lineLength,
  gridGap,
  children,
}: EditorContainerProps) {
  const displayCellSize = cellSize + gridGap;

  return (
    <div
      className="w-full flex justify-center items-center relative overflow-auto mt-[32px]"
      style={{ height: `${displayCellSize * lineLength}px` }}
    >
      <div
        className="relative"
        style={{
          width: `${displayCellSize}px`,
          height: `${displayCellSize * lineLength}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
