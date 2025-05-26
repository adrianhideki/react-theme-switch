import Page from "@components/page";
import Select from "@components/select";
import Typography from "@components/typography";
import { useThemeCollection } from "@hooks/useThemeCollection";
import { useState } from "react";
import ThemeEditor from "./theme-editor";

const ThemeConfig = () => {
  const { themes } = useThemeCollection();
  const [_, setThemeId] = useState<string>();

  const handleSelectChange = (value: string) => {
    setThemeId(value);
  };

  return (
    <Page>
      <Typography variant="h1">Choose the theme:</Typography>
      <Select
        items={themes}
        keyField="id"
        getLabel={(item) => String(item["name"])}
        onChange={handleSelectChange}
      />
      <ThemeEditor />
    </Page>
  );
};

export default ThemeConfig;
