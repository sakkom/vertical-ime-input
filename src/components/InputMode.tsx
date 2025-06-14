import { useEffect } from "react";
import { useEditorState } from "../hooks/useEditorState";
import { useEditorInput } from "../hooks/useEditorInput";
import { useDisplayContent } from "../hooks/useDisplayContent";
import { EditorContainer } from "../components/EditorContainer";
import { EditorInput } from "../components/EditorInput";
import { CharacterGrid } from "../components/CharacterGrid";
import { CharPos } from "../types";

interface InputModeProps {
  lineLength?: number;
  cellSize?: number;
  onTextUpdate?: (content: CharPos[]) => void;
}

export default function InputMode({
  lineLength = 20,
  cellSize = 30,
  onTextUpdate,
}: InputModeProps) {
  const editor = useEditorState();
  const input = useEditorInput(editor, lineLength);
  const displayContent = useDisplayContent(
    editor.content,
    editor.imeText,
    editor.isIme,
  );

  useEffect(() => {
    onTextUpdate?.(editor.content);
  }, [editor.content, onTextUpdate]);

  return (
    <EditorContainer cellSize={cellSize} lineLength={lineLength}>
      <EditorInput
        ref={input.inputRef}
        cursor={editor.cursor}
        isIme={editor.isIme}
        cellSize={cellSize}
        onChange={input.handleChange}
        onCompositionStart={input.handleCompositionStart}
        onCompositionEnd={input.handleCompositionEnd}
        onKeyDown={input.handleKeyDown}
      />
      <CharacterGrid
        characters={displayContent}
        cursor={editor.cursor}
        cellSize={cellSize}
        isIme={editor.isIme}
      />
    </EditorContainer>
  );
}
