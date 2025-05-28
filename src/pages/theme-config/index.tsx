import Page from "@components/page";
import Select from "@components/select";
import Typography from "@components/typography";
import { useThemeCollection } from "@hooks/useThemeCollection";
import ThemeEditor from "./theme-editor";
import Button from "@components/button";
import type { Theme } from "@theme/types";

const ThemeConfig = () => {
  const {
    themes,
    updateCurrentTheme,
    addTheme,
    currentTheme,
    deleteTheme,
    updateTheme,
  } = useThemeCollection();

  const handleSelectChange = (value: number) => {
    updateCurrentTheme(value);
  };

  const handleDuplicateClick = () => {
    const theme = themes[currentTheme];
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
      id: themes[currentTheme].id,
    });
  };

  return (
    <Page>
      <Typography variant="h1">Choose the theme:</Typography>
      <div className="flex w-full gap-2">
        <Select
          items={themes.map((t, index) => ({ ...t, index }))}
          keyField="index"
          value={currentTheme}
          getLabel={(item) => String(item["name"])}
          onChange={(value) => handleSelectChange(+value)}
          className="w-full"
        />
        <Button
          disabled={themes.length <= 1}
          className="w-10"
          onClick={handleDeleteTheme}
        >
          Delete
        </Button>
        <Button
          disabled={currentTheme === undefined}
          className="w-10"
          onClick={handleDuplicateClick}
        >
          Duplicate
        </Button>
      </div>
      <ThemeEditor onSave={handleFormSave} theme={themes[currentTheme]} />
    </Page>
  );
};

export default ThemeConfig;
