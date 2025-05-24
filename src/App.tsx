import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { setMode, mode } = useTheme();
  const [count, setCount] = useState(0);

  const handleModeClick = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };

  return (
    <div className="w-full bg-background text-text">
      <div className="container m-auto flex flex-col gap-4">
        <div className=" w-full flex flex-col gap-4">
          <button
            className="bg-primary hover:brightness-120 hover:transition p-2 rounded-default max-w-20"
            onClick={handleModeClick}
          >
            Switch Mode
          </button>
          <p>{mode}</p>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h2 className="text-h1 font-h1 font-wh1 text-primary">Primary Color</h2>
        <h2 className="text-h2 font-h2 font-wh2 text-secondary">
          Secondary Color
        </h2>
        <h2 className="text-h3 font-h3 font-wh3 text-tertiary">
          Tertiary Color
        </h2>
        <div className="flex flex-col gap-2">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  );
}

export default App;
