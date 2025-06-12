import Page from "@components/page";
import { defaultTheme } from "@theme/base/theme/defaultTheme";
import { transformTheme } from "@theme/base/theme/transformTheme";
import { validateTheme } from "@theme/base/theme/validateTheme";

const ThemeV2 = () => {
  return (
    <Page>
      <div>
        {validateTheme(defaultTheme).errors.map((error) => {
          return <div>{error}</div>;
        })}
      </div>
      <div>
        {Object.entries(transformTheme(defaultTheme)!.font!).map(
          ([key, value]) => {
            return (
              <>
                <div>{String(key)}</div>
                <div>{JSON.stringify(value)}</div>
                <br />
              </>
            );
          }
        )}
      </div>
      <div>
        {Object.entries(transformTheme(defaultTheme)!.palette!.dark!).map(
          ([key, value]) => {
            return (
              <>
                <div>{String(key)}</div>
                <div>{JSON.stringify(value)}</div>
                <br />
              </>
            );
          }
        )}
      </div>
    </Page>
  );
};

export default ThemeV2;
