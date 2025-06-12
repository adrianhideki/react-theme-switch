import Page from "@components/page";
import Select from "@components/select";
import Typography from "@components/typography";
import Button from "@components/button";
import { useThemeCollection } from "@hooks/useThemeCollection";
import ThemeEditor from "./theme-editor";
import type { Theme } from "@theme/types";
import { useEffect } from "react";

const ThemeConfig = () => {
  const {
    themes,
    updateCurrentTheme,
    addTheme,
    currentTheme,
    deleteTheme,
    updateTheme,
  } = useThemeCollection();

  useEffect(() => {
    console.log(themes.length);
  });

  const handleSelectChange = (value: string) => {
    updateCurrentTheme(value);
  };

  const handleDuplicateClick = () => {
    const theme = themes.find((t) => t.id === currentTheme);

    if (!theme) return;

    addTheme({
      ...theme,
      name: theme.name?.concat(" copy"),
      id: crypto.randomUUID().toString(),
    });
  };

  const handleDeleteTheme = () => {
    deleteTheme(currentTheme);
  };

  const handleFormSave = (value: Theme) => {
    updateTheme({
      ...value,
      id: currentTheme,
    });
  };

  return (
    <Page>
      <Typography variant="h1">Choose the theme:</Typography>
      <div className="flex w-full gap-2">
        <Select
          items={themes}
          keyField="id"
          value={currentTheme}
          getLabel={(item) => String(item["name"])}
          onChange={(value) => handleSelectChange(value)}
          className="w-full"
        />
        <Button
          disabled={themes.length <= 1}
          className="min-w-10"
          onClick={handleDeleteTheme}
        >
          Delete
        </Button>
        <Button
          disabled={currentTheme === undefined}
          onClick={handleDuplicateClick}
        >
          Duplicate
        </Button>
      </div>
      <ThemeEditor
        onSave={handleFormSave}
        theme={themes.find((t) => t.id === currentTheme)}
      />
    </Page>
  );
};

export default ThemeConfig;
