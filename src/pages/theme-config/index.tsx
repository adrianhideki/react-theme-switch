import Page from "@components/page";
import Select from "@components/select";
import Typography from "@components/typography";
import { useThemeCollection } from "@hooks/useThemeCollection";
import { useEffect, useState } from "react";
import ThemeEditor from "./theme-editor";

const ThemeConfig = () => {
  const { themes, updateCurrentTheme } = useThemeCollection();
  const [themeId, setThemeId] = useState<string>();

  useEffect(() => {
    if (!themeId) return;
    updateCurrentTheme(themes.findIndex((t) => t.id === themeId));
  }, [themeId]);

  const handleSelectChange = (value: string) => {
    console.log(themeId);
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
      <ThemeEditor theme={themes.find((t) => t.id === themeId) ?? themes[0]} />
    </Page>
  );
};

export default ThemeConfig;
