import { CharPos, CursorPos } from "../types";

export function calcNewCursor(cursor: CursorPos, lineLength: number) {
  const newYPos = cursor.yPos + 1;

  if (newYPos >= lineLength) {
    return {
      xPos: cursor.xPos + 1,
      yPos: 0,
    } as CursorPos;
  }

  return {
    xPos: cursor.xPos,
    yPos: newYPos,
  } as CursorPos;
}

export function stringToCharPos(
  value: string,
  startPos: CursorPos,
  lineLength: number,
) {
  const chars: CharPos[] = [];
  let pos: CursorPos = { ...startPos };
  for (const char of value) {
    chars.push({ char, xPos: pos.xPos, yPos: pos.yPos });
    pos = calcNewCursor(pos, lineLength);
  }

  return { chars, endPos: pos };
}

export function calcMaxXPosition(
  displayContent: CharPos[],
  cursorXPos: number,
) {
  let displayMaxX = 0;
  for (const char of displayContent) {
    if (char.xPos > displayMaxX) {
      displayMaxX = char.xPos;
    }
  }

  return Math.max(displayMaxX, cursorXPos);
}

//BackSpace処理
export function handleBackSpace(
  content: CharPos[],
  cursor: CursorPos,
  lineLength: number,
) {
  if (cursor.yPos > 0) {
    const newCursor: CursorPos = { xPos: cursor.xPos, yPos: cursor.yPos - 1 };
    const newContent = content.filter(
      (char) => !(char.xPos === newCursor.xPos && char.yPos === newCursor.yPos),
    );

    return { newContent, newCursor };
  }

  if (cursor.xPos > 0) {
    return handlePrevLine(content, cursor, lineLength);
  }

  return { newContent: content, newCursor: cursor };
}

function handlePrevLine(
  content: CharPos[],
  cursor: CursorPos,
  lineLength: number,
) {
  const reversedContent = [...content].reverse();
  const prevChar = reversedContent.find((char) => char.xPos == cursor.xPos - 1);

  if (prevChar) {
    return handlePrevChar(prevChar, content, lineLength);
  } else {
    const newCursor = { xPos: cursor.xPos - 1, yPos: 0 };
    return { newContent: content, newCursor };
  }
}

function handlePrevChar(
  prevChar: CharPos,
  content: CharPos[],
  lineLength: number,
) {
  if (prevChar?.yPos === lineLength - 1) {
    const newCursor: CursorPos = { xPos: prevChar.xPos, yPos: prevChar.yPos };
    const newContent = content.filter(
      (char) => !(char.xPos === prevChar.xPos && char.yPos === prevChar.yPos),
    );

    return { newContent, newCursor };
  } else {
    const newCursor = { xPos: prevChar.xPos, yPos: prevChar.yPos + 1 };
    return { newContent: content, newCursor };
  }
}
////ここまでBackSpace処理
