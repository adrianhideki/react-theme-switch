import { useState } from "react";
import viteLogo from "/vite.svg";
import { useTheme } from "@hooks/useTheme";
import Button from "@components/button";
import Typography from "@components/typography";
import Select from "@components/select";
import Page from "@components/page";

const Home = () => {
  const { toggleMode, mode } = useTheme();
  const [count, setCount] = useState(0);

  const handleModeClick = () => {
    toggleMode();
  };

  return (
    <Page>
      <div className="container m-auto flex flex-col gap-4">
        <div className=" w-full flex flex-col gap-4">
          <Button className="max-w-20" onClick={handleModeClick} disabled>
            Switch Mode
          </Button>
          <p>{mode}</p>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
        </div>
        <Select
          items={[
            { value: 0, description: "test" },
            { value: 1, description: "test 1" },
          ]}
          onChange={(item) => console.log(item)}
        />
        <Typography variant="h1" className="text-primary">
          Primary Color
        </Typography>
        <Typography variant="h2" className="text-secondary">
          Secondary Color
        </Typography>
        <Typography variant="h3" className="text-tertiary">
          Tertiary Color
        </Typography>
        <div className="flex flex-col gap-2">
          <Button
            className="w-12"
            onClick={() => setCount((count) => count + 1)}
          >
            count is {count}
          </Button>
          <Typography variant="body">
            Edit <code>src/App.tsx</code> and save to test HMR
          </Typography>
        </div>
        <Typography variant="body" className="read-the-docs">
          Click on the Vite and React logos to learn more
        </Typography>
        <Typography variant="body" className="read-the-docs">
          Click on the Vite and React logos to learn more
        </Typography>
        <Typography variant="body" className="read-the-docs">
          Click on the Vite and React logos to learn more
        </Typography>
        <Typography variant="body" className="read-the-docs">
          Click on the Vite and React logos to learn more
        </Typography>
        <Typography variant="body" className="read-the-docs">
          Click on the Vite and React logos to learn more
        </Typography>
        <Typography variant="body" className="read-the-docs">
          Click on the Vite and React logos to learn more
        </Typography>
        <Typography variant="body" className="read-the-docs">
          Click on the Vite and React logos to learn more
        </Typography>
      </div>
    </Page>
  );
};

export default Home;
