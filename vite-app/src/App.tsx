import { useState } from "react";
import InputMode from "./components/InputMode";
import type { CharPos } from "./types";
// import { VerticalInput, type CharPos } from "vertical-ime-input";
import { Reader } from "./components/Reader";

function App() {
  const [text, setText] = useState<CharPos[]>([]);

  return (
    <>
      <InputMode onTextUpdate={setText} />
      {/* <VerticalInput gridGap={20} /> */}
      <Reader text={text} />
    </>
  );
}

export default App;
