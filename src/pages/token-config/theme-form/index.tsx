import type { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import schema from "./schema";
import Button from "@components/button";
import Typography from "@components/typography";
import Input from "@components/input";
import Modal from "@components/modal";
import { fontFamilyTokens } from "@token/fonts/family/types";
import { fontHeightTokens } from "@token/fonts/height/types";
import { fontSpacingTokens } from "@token/fonts/spacing/types";
import { fontParagraphSpacingTokens } from "@token/fonts/paragraph-spacing/types";
import { fontSizeTokens } from "@token/fonts/size/types";
import { fontWeightTokens } from "@token/fonts/weight/types";
import { dimensionValuesTokens } from "@token/sizes/dimensions/types";
import { colorValuesTokens, fontValuesTokens } from "@token/theme/types";
import { borderRadiusValuesTokens } from "@token/sizes/border-radius/types";
import { borderWidthValuesTokens } from "@token/sizes/border-width/types";
import { spacingValuesTokens } from "@token/sizes/spacing/types";
import BaseForm from "./base-form";
import Token from "./token";
import Palette from "./palette";

type ThemeFormValues = z.infer<typeof schema>;

const modes = ["light", "dark"] as const;

const ThemeForm = ({
  onSubmit,
}: {
  onSubmit: (values: ThemeFormValues) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBaseFormOpen, setIsBaseFormOpen] = useState(false);
  const { watch, setValue, handleSubmit, register } = useForm<ThemeFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  // --- Color options for theme.color ---
  const colorOptions = [
    ...Object.keys(watch("base.color.collection") ?? {}),
    "foundation.white",
    "foundation.black",
  ];

  function handleColorPreview(color: string, scale?: string): string {
    console.log(color, scale);
    if (color === "foundation.white")
      return watch("base.color.foundations")?.white ?? "";
    if (color === "foundation.black")
      return watch("base.color.foundations")?.black ?? "";

    if (watch("base.color.collection")?.[color] && scale)
      return String(watch("base.color.collection")?.[color][scale]);
    return "";
  }

  return (
    <>
      <div className="flex gap-2">
        <Button onClick={() => setIsBaseFormOpen(true)}>
          Create Base Theme
        </Button>
        <Button onClick={() => setIsOpen(true)}>Create Theme</Button>
      </div>
      <Modal isOpen={isBaseFormOpen} onClose={() => setIsBaseFormOpen(false)}>
        <BaseForm
          onSubmit={(value) => {
            console.log("base submit", value);
            setValue("base", value);
          }}
        />
      </Modal>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <form
          className="flex flex-col gap-2 p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography variant="h2">Theme Properties</Typography>
          <Typography>Name</Typography>
          <Input placeholder="Name" {...register("name")} />
          <Typography variant="h3">Theme Colors</Typography>
          <Token
            keys={Array.from(colorValuesTokens)}
            data={colorOptions}
            value={watch(`color`)}
            onChange={(k, v) => setValue(`color.${k}`, v)}
          />
          <Typography variant="h3">Theme Font Family</Typography>
          <Token
            keys={Array.from(fontValuesTokens)}
            data={Array.from(fontFamilyTokens)}
            value={watch(`font.family`)}
            onChange={(k, v) => setValue(`font.family.${k}`, v)}
          />
          <Typography variant="h3">Theme Font Height</Typography>
          <Token
            keys={Array.from(fontValuesTokens)}
            data={Array.from(fontHeightTokens)}
            value={watch(`font.height`)}
            onChange={(k, v) => setValue(`font.height.${k}`, v)}
          />
          <Typography variant="h3">Theme Font Spacing</Typography>
          <Token
            keys={Array.from(fontValuesTokens)}
            data={Array.from(fontSpacingTokens)}
            value={watch(`font.spacing`)}
            onChange={(k, v) => setValue(`font.spacing.${k}`, v)}
          />
          <Typography variant="h3">Theme Font Size</Typography>
          <Token
            keys={Array.from(fontValuesTokens)}
            data={Array.from(fontSizeTokens)}
            value={watch(`font.size`)}
            onChange={(k, v) => setValue(`font.size.${k}`, v)}
          />
          <Typography variant="h3">Theme Font Weight</Typography>
          <Token
            keys={Array.from(fontValuesTokens)}
            data={Array.from(fontWeightTokens)}
            value={watch(`font.weight`)}
            onChange={(k, v) => setValue(`font.weight.${k}`, v)}
          />
          <Typography variant="h3">Theme Font Paragraph Spacing</Typography>
          <Token
            keys={Array.from(fontValuesTokens)}
            data={Array.from(fontParagraphSpacingTokens)}
            value={watch(`font.paragraphSpacing`)}
            onChange={(k, v) => setValue(`font.paragraphSpacing.${k}`, v)}
          />
          <Typography variant="h3">Theme Size Border Width</Typography>
          <Token
            keys={Array.from(borderWidthValuesTokens)}
            data={Array.from(dimensionValuesTokens)}
            value={watch(`size.border.width`)}
            onChange={(k, v) => setValue(`size.border.width.${k}`, String(v))}
          />
          <Typography variant="h3">Theme Size Border Radius</Typography>
          <Token
            keys={Array.from(borderRadiusValuesTokens)}
            data={Array.from(dimensionValuesTokens)}
            value={watch(`size.border.radius`)}
            onChange={(k, v) => setValue(`size.border.radius.${k}`, String(v))}
          />
          <Typography variant="h3">Theme Size Spacing</Typography>
          <Token
            keys={Array.from(spacingValuesTokens)}
            data={Array.from(dimensionValuesTokens)}
            value={watch(`size.spacing`)}
            onChange={(k, v) => setValue(`size.spacing.${k}`, String(v))}
          />
          <Typography variant="h3">Palette (light/dark)</Typography>
          <Typography>
            For each palette property, select a color from your collection or
            theme color.
          </Typography>
          {modes.map((mode) => (
            <div key={mode}>
              <Typography variant="h4">
                {mode.charAt(0).toUpperCase() + mode.slice(1)} Palette
              </Typography>
              <Typography variant="h5">Surface</Typography>
              <Palette
                section="surface"
                colors={colorOptions}
                value={watch(`palette.${mode}`)}
                onChange={(section, token, prop, value) =>
                  setValue(`palette.${mode}.${section}.${token}.${prop}`, value)
                }
                onColorPreview={handleColorPreview}
              />
              <Typography variant="h5">Text</Typography>
              <Palette
                section="text"
                colors={colorOptions}
                value={watch(`palette.${mode}`)}
                onChange={(section, token, prop, value) =>
                  setValue(`palette.${mode}.${section}.${token}.${prop}`, value)
                }
                onColorPreview={handleColorPreview}
              />
              <Typography variant="h5">Icon</Typography>
              <Palette
                section="icon"
                colors={colorOptions}
                value={watch(`palette.${mode}`)}
                onChange={(section, token, prop, value) =>
                  setValue(`palette.${mode}.${section}.${token}.${prop}`, value)
                }
                onColorPreview={handleColorPreview}
              />
              <Typography variant="h5">Border</Typography>
              <Palette
                section="border"
                colors={colorOptions}
                value={watch(`palette.${mode}`)}
                onChange={(section, token, prop, value) =>
                  setValue(`palette.${mode}.${section}.${token}.${prop}`, value)
                }
                onColorPreview={handleColorPreview}
              />
            </div>
          ))}
          <Button type="submit">Save Theme</Button>
        </form>
      </Modal>
    </>
  );
};

export default ThemeForm;
