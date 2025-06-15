## Overview
🪢 a React library for natural vertical writing flow for creative writing.

📹 **Demo** https://www.youtube.com/watch?v=6YN5IDenTfU

## Features
- **Small Library (package size: 4.3 kB)** - Fast and smooth writing experience
- **Multi-language IME Support (Tested)**
  - Japanese & Korean: Direct key mapping
  - Traditional Chinese & Cantonese: Pinyin input with spaces    
- **Coordinate Data Retrieval** - xy coordinate data (CharPos type) for DB mapping and layout control
- **Always Center Input** - Input cursor always centered for natural writing flow
- **Enjoy the Whitespace!** - Free line breaks & spacing for creative thinking

## Installation
```bash
npm i vertical-ime-input
```
## Usage
```typescript
import { VerticalInput, type CharPos } from 'vertical-ime-input';
// CharPos: { char: string, xPos: number, yPos: number }

function App() {
  const [text, setText] = useState<CharPos[]>([]);
  
  return (
    <VerticalInput onTextUpdate={setText} />
  );
}
```
**Props:**
- `onTextUpdate`: Callback function to receive character position data
- `lineLength`: Maximum characters per vertical line (default: 20)
- `cellSize`: Character cell size in pixels (default: 30)```
