import ColorEditor from "./color-editor";

const ThemeEditor = () => {
  return (
    <div>
      <span>Theme config</span>
      <ColorEditor name="primary" onChange={(value) => console.log(value)} />
      <span>Colors</span>
      <span>Typography</span>
      <span>Additional configs</span>
    </div>
  );
};

export default ThemeEditor;
