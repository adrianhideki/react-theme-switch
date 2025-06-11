import Page from "@components/page";
import { defaultTheme } from "@theme/base/theme/defaultTheme";
import { validateTheme } from "@theme/base/theme/validateTheme";

const ThemeV2 = () => {
  return (
    <Page>
      <div>{JSON.stringify(validateTheme(defaultTheme))}</div>
      <div>{JSON.stringify(defaultTheme)}</div>
    </Page>
  );
};

export default ThemeV2;
