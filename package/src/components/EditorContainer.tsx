interface EditorContainerProps {
  cellSize: number;
  gridGap: number;
  lineLength: number;
  children: React.ReactNode;
}

export function EditorContainer({
  cellSize,
  gridGap,
  lineLength,
  children,
}: EditorContainerProps) {
  const displayCellSize = cellSize + gridGap;

  return (
    <div
      className="w-full flex justify-center relative overflow-auto"
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
