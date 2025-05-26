import type { Theme } from "@theme/types";
import ColorEditor from "./color-editor";
import Typography from "@components/typography";
import Input from "@components/input";

type ThemeEditorProps = {
  theme: Theme;
};

const ThemeEditor = ({ theme }: ThemeEditorProps) => {
  return (
    <>
      <Typography variant="h2">Colors</Typography>
      <div className="flex flex-wrap gap-2">
        <ColorEditor name="Primary" onChange={(value) => console.log(value)} />
        <ColorEditor
          name="Secondary"
          onChange={(value) => console.log(value)}
        />
        <ColorEditor name="Tertiary" onChange={(value) => console.log(value)} />
        <ColorEditor
          name="Background"
          onChange={(value) => console.log(value)}
        />
        <ColorEditor name="Text" onChange={(value) => console.log(value)} />
        <ColorEditor name="Border" onChange={(value) => console.log(value)} />
        <ColorEditor name="Error" onChange={(value) => console.log(value)} />
        <ColorEditor name="Success" onChange={(value) => console.log(value)} />
        <ColorEditor name="Warning" onChange={(value) => console.log(value)} />
        <ColorEditor name="Info" onChange={(value) => console.log(value)} />
        <ColorEditor name="Paper" onChange={(value) => console.log(value)} />
      </div>
      <Typography variant="h2">Typography</Typography>
      <Typography variant="h2">Additional configs</Typography>
      <Input
        type="email"
        disabled={true}
        onChange={(e) => console.log(e.target.value)}
      />
    </>
  );
};

export default ThemeEditor;
