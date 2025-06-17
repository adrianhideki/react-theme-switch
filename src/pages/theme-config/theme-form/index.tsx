import type { z } from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import schema from "./schema";
import Button from "@components/button";
import Typography from "@components/typography";
import Input from "@components/input";
import Modal from "@components/modal";
import { fontFamilyThemes } from "@theme/fonts/family/types";
import { fontHeightThemes } from "@theme/fonts/height/types";
import { fontSpacingThemes } from "@theme/fonts/spacing/types";
import { fontParagraphSpacingThemes } from "@theme/fonts/paragraph-spacing/types";
import { fontSizeThemes } from "@theme/fonts/size/types";
import { fontWeightThemes } from "@theme/fonts/weight/types";
import { dimensionValuesThemes } from "@theme/sizes/dimensions/types";
import {
  colorValuesThemes,
  fontValuesThemes,
  type ColorValues,
  type FoundationValues,
  type PartialTheme,
} from "@theme/theme/types";
import { borderRadiusValuesThemes } from "@theme/sizes/border-radius/types";
import { borderWidthValuesThemes } from "@theme/sizes/border-width/types";
import { spacingValuesThemes } from "@theme/sizes/spacing/types";
import BaseForm from "./base-form";
import Token from "./token";
import Palette from "./palette";

type ThemeFormValues = z.infer<typeof schema>;

const modes = ["light", "dark"] as const;

type ThemeFormProps = {
  initialValue?: PartialTheme;
  onSubmit: (values: ThemeFormValues) => void;
};

const ThemeForm = ({ onSubmit, initialValue }: ThemeFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBaseFormOpen, setIsBaseFormOpen] = useState(false);
  const {
    watch,
    setValue,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ThemeFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...initialValue,
    },
  });

  useEffect(() => {
    reset({
      ...initialValue,
    });
  }, [reset, initialValue]);

  // --- Color options for theme.color ---
  const colorOptions = [
    ...Object.keys(watch("base.color.collection") ?? {}),
    "foundation.white",
    "foundation.black",
  ];

  // --- Color options for theme.color ---
  const paletteColorOptions = [
    ...Object.keys(watch("color") ?? {}),
    "foundation.white",
    "foundation.black",
  ];

  function handleColorPreview(color: string, scale?: string): string {
    if (color === "foundation.white")
      return watch("base.color.foundations")?.white ?? "";
    if (color === "foundation.black")
      return watch("base.color.foundations")?.black ?? "";

    const value = watch("color")?.[color as ColorValues];

    if (watch("base.color.collection")?.[value] && scale)
      return String(watch("base.color.collection")?.[value][scale]);

    return "";
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
    setIsOpen(false);
  };

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
          initialValue={initialValue?.base}
          onSubmit={(value) => {
            setValue("base", value);
            setIsBaseFormOpen(false);
          }}
        />
      </Modal>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <form className="flex flex-col gap-4 p-4" onSubmit={handleFormSubmit}>
          <Typography variant="h4">Theme Properties</Typography>
          <Typography>Name</Typography>
          <Input placeholder="Name" {...register("name")} />
          {errors.name?.message && (
            <Typography className="text-text-error-default">
              {String(errors.name?.message)}
            </Typography>
          )}
          <Typography variant="h5">Theme Colors</Typography>
          <Token
            keys={Array.from(colorValuesThemes)}
            data={colorOptions}
            value={watch(`color`)}
            onChange={(k, v) => setValue(`color.${k}`, v)}
            errors={errors.color}
          />
          {errors.color?.message && (
            <Typography className="text-text-error-default">
              {String(errors.color?.message)}
            </Typography>
          )}
          <Typography variant="h5">Theme Font Family</Typography>
          <Token
            keys={Array.from(fontValuesThemes)}
            data={Array.from(fontFamilyThemes)}
            value={watch(`font.family`)}
            onChange={(k, v) => setValue(`font.family.${k}`, v)}
            errors={errors.font?.family}
          />
          {errors.font?.family?.message && (
            <Typography className="text-text-error-default">
              {String(errors.font?.family?.message)}
            </Typography>
          )}
          <Typography variant="h5">Theme Font Height</Typography>
          <Token
            keys={Array.from(fontValuesThemes)}
            data={Array.from(fontHeightThemes)}
            value={watch(`font.height`)}
            onChange={(k, v) => setValue(`font.height.${k}`, v)}
            errors={errors.font?.height}
          />
          {errors.font?.height?.message && (
            <Typography className="text-text-error-default">
              {String(errors.font?.height?.message)}
            </Typography>
          )}
          <Typography variant="h5">Theme Font Spacing</Typography>
          <Token
            keys={Array.from(fontValuesThemes)}
            data={Array.from(fontSpacingThemes)}
            value={watch(`font.spacing`)}
            onChange={(k, v) => setValue(`font.spacing.${k}`, v)}
            errors={errors.font?.spacing}
          />
          {errors.font?.spacing?.message && (
            <Typography className="text-text-error-default">
              {String(errors.font?.spacing?.message)}
            </Typography>
          )}
          <Typography variant="h5">Theme Font Size</Typography>
          <Token
            keys={Array.from(fontValuesThemes)}
            data={Array.from(fontSizeThemes)}
            value={watch(`font.size`)}
            onChange={(k, v) => setValue(`font.size.${k}`, v)}
            errors={errors.font?.size}
          />
          {errors.font?.size?.message && (
            <Typography className="text-text-error-default">
              {String(errors.font?.size?.message)}
            </Typography>
          )}
          <Typography variant="h5">Theme Font Weight</Typography>
          <Token
            keys={Array.from(fontValuesThemes)}
            data={Array.from(fontWeightThemes)}
            value={watch(`font.weight`)}
            onChange={(k, v) => setValue(`font.weight.${k}`, v)}
            errors={errors.font?.weight}
          />
          {errors.font?.weight?.message && (
            <Typography className="text-text-error-default">
              {String(errors.font?.weight?.message)}
            </Typography>
          )}
          <Typography variant="h5">Theme Font Paragraph Spacing</Typography>
          <Token
            keys={Array.from(fontValuesThemes)}
            data={Array.from(fontParagraphSpacingThemes)}
            value={watch(`font.paragraphSpacing`)}
            onChange={(k, v) => setValue(`font.paragraphSpacing.${k}`, v)}
            errors={errors.font?.paragraphSpacing}
          />
          {errors.font?.paragraphSpacing?.message && (
            <Typography className="text-text-error-default">
              {String(errors.font?.paragraphSpacing?.message)}
            </Typography>
          )}
          <Typography variant="h5">Theme Size Border Width</Typography>
          <Token
            keys={Array.from(borderWidthValuesThemes)}
            data={Array.from(dimensionValuesThemes)}
            value={watch(`size.border.width`)}
            onChange={(k, v) => setValue(`size.border.width.${k}`, v)}
            errors={errors?.size?.border?.width}
          />
          {errors?.size?.border?.width?.message && (
            <Typography className="text-text-error-default">
              {String(errors?.size?.border?.width?.message)}
            </Typography>
          )}
          <Typography variant="h5">Theme Size Border Radius</Typography>
          <Token
            keys={Array.from(borderRadiusValuesThemes)}
            data={Array.from(dimensionValuesThemes)}
            value={watch(`size.border.radius`)}
            onChange={(k, v) => setValue(`size.border.radius.${k}`, v)}
            errors={errors?.size?.border?.radius}
          />
          {errors?.size?.border?.radius?.message && (
            <Typography className="text-text-error-default">
              {String(errors?.size?.border?.radius?.message)}
            </Typography>
          )}
          <Typography variant="h5">Theme Size Spacing</Typography>
          <Token
            keys={Array.from(spacingValuesThemes)}
            data={Array.from(dimensionValuesThemes)}
            value={watch(`size.spacing`)}
            onChange={(k, v) => setValue(`size.spacing.${k}`, v)}
            errors={errors?.size?.spacing}
          />
          {errors?.size?.spacing?.message && (
            <Typography className="text-text-error-default">
              {String(errors?.size?.spacing?.message)}
            </Typography>
          )}
          <Typography variant="h5">Palette (light/dark)</Typography>
          <Typography>
            For each palette property, select a color from your collection or
            theme color.
          </Typography>
          {modes.map((mode) => (
            <div key={mode} className="flex flex-col gap-2">
              <Typography variant="h4">
                {mode.charAt(0).toUpperCase() + mode.slice(1)} Palette
              </Typography>
              <Typography variant="h5">Surface</Typography>
              <Palette
                section="surface"
                colors={paletteColorOptions}
                value={watch(`palette.${mode}`)}
                onChange={(section, theme, prop, value) =>
                  setValue(
                    `palette.${mode}.${section}.${theme}.${prop}`,
                    prop === "color"
                      ? (value as ColorValues | FoundationValues)
                      : +value
                  )
                }
                onColorPreview={handleColorPreview}
                errors={errors.palette?.[mode]}
              />
              <Typography variant="h5">Text</Typography>
              <Palette
                section="text"
                colors={paletteColorOptions}
                value={watch(`palette.${mode}`)}
                onChange={(section, theme, prop, value) =>
                  setValue(
                    `palette.${mode}.${section}.${theme}.${prop}`,
                    prop === "color"
                      ? (value as ColorValues | FoundationValues)
                      : +value
                  )
                }
                onColorPreview={handleColorPreview}
                errors={errors.palette?.[mode]}
              />
              <Typography variant="h5">Icon</Typography>
              <Palette
                section="icon"
                colors={paletteColorOptions}
                value={watch(`palette.${mode}`)}
                onChange={(section, theme, prop, value) =>
                  setValue(
                    `palette.${mode}.${section}.${theme}.${prop}`,
                    prop === "color"
                      ? (value as ColorValues | FoundationValues)
                      : +value
                  )
                }
                onColorPreview={handleColorPreview}
                errors={errors.palette?.[mode]}
              />
              <Typography variant="h5">Border</Typography>
              <Palette
                section="border"
                colors={paletteColorOptions}
                value={watch(`palette.${mode}`)}
                onChange={(section, theme, prop, value) =>
                  setValue(
                    `palette.${mode}.${section}.${theme}.${prop}`,
                    prop === "color"
                      ? (value as ColorValues | FoundationValues)
                      : +value
                  )
                }
                onColorPreview={handleColorPreview}
                errors={errors.palette?.[mode]}
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
