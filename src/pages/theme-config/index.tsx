import Page from "@components/page";
import Typography from "@components/typography";
import Select from "@components/select";
import Button from "@components/button";
import ThemeForm from "./theme-form";
import { useTheme, useThemeCollection, type Theme } from "theme-token-manager";

const ThemeConfig = () => {
  const { referenceTheme } = useTheme();
  const {
    themes,
    currentTheme,
    updateCurrentTheme,
    addTheme,
    deleteTheme,
    updateTheme,
  } = useThemeCollection();

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

  return (
    <Page>
      <Typography variant="h4">Choose the theme theme:</Typography>
      <div className="flex w-full gap-2">
        <Select
          items={themes}
          getKey={(item) => item.id ?? ""}
          value={currentTheme}
          getLabel={(item) => String(item["name"])}
          onChange={(value) => handleSelectChange(value)}
          className="w-full"
        />
        <Button disabled={themes.length <= 1} onClick={handleDeleteTheme}>
          Delete
        </Button>
        <Button
          disabled={currentTheme === undefined}
          onClick={handleDuplicateClick}
        >
          Duplicate
        </Button>
      </div>
      <div>
        <ThemeForm
          initialValue={referenceTheme}
          onSubmit={(values) => {
            updateTheme({ ...values, id: currentTheme } as Theme);
          }}
        />
      </div>
    </Page>
  );
};

export default ThemeConfig;
