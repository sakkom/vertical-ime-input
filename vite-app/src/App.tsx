import { useState } from "react";
import InputMode from "./components/InputMode";
import { CharPos } from "./types";
// import { VerticalInput, type CharPos } from "vertical-ime-input";

function App() {
  const [text, setText] = useState<CharPos[]>([]);

  return (
    <>
      <InputMode gridGap={20} onTextUpdate={setText} />;
      {/* <VerticalInput gridGap={20} /> */}
    </>
  );
}

export default App;
