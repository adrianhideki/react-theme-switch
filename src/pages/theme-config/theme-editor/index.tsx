import { useCallback, useEffect, type ChangeEvent } from "react";
import type { ColorModeValue, ColorValue, Theme } from "@theme/types";
import ColorEditor from "./color-editor";
import Typography from "@components/typography";
import Input from "@components/input";
import FontEditor, { type FontEditorValue } from "./font-editor";
import { useForm, type FieldPath } from "react-hook-form";
import Button from "@components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v3";
import schema from "./schema";

type ThemeEditorProps = {
  theme?: Theme;
  onSave?: (value: ThemeValues) => void;
};

type ThemeValues = z.infer<typeof schema>;

const ThemeEditor = ({ theme, onSave }: ThemeEditorProps) => {
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { ...theme } as ThemeValues,
  });

  useEffect(() => {
    if (!theme) return;

    setValue("colors", theme.colors);
    setValue("fonts", theme.fonts);

    setValue("radius", theme.radius);
    setValue("name", theme.name ?? "");
    setValue("spacing", theme.spacing);
  }, [theme, setValue]);

  const handleFormSubmit = (value: ThemeValues) => {
    if (!onSave) return;

    onSave(value);
  };

  const handleColorChange = useCallback(
    (field: FieldPath<ThemeValues>) => {
      return (e: ChangeEvent<{ value: ColorValue<ColorModeValue> }>) =>
        setValue(field, e.target.value);
    },
    [setValue]
  );

  const handleFontChange = useCallback(
    (field: FieldPath<ThemeValues>) => {
      return (e: ChangeEvent<{ value: FontEditorValue }>) =>
        setValue(field, e.target.value);
    },
    [setValue]
  );

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Typography variant="h2">Colors</Typography>
      <div className="flex flex-wrap gap-2 justify-evenly md:justify-start">
        <ColorEditor
          onChange={handleColorChange("colors.primary")}
          value={getValues("colors.primary")}
          backgroundValue={getValues("colors.background")}
          name="Primary"
        />
        <ColorEditor
          onChange={handleColorChange("colors.secondary")}
          value={getValues("colors.secondary")}
          backgroundValue={getValues("colors.background")}
          name="Secondary"
        />
        <ColorEditor
          onChange={handleColorChange("colors.tertiary")}
          value={getValues("colors.tertiary")}
          backgroundValue={getValues("colors.background")}
          name="Tertiary"
        />
        <ColorEditor
          onChange={handleColorChange("colors.background")}
          value={getValues("colors.background")}
          name="Background"
        />
        <ColorEditor
          onChange={handleColorChange("colors.text")}
          value={getValues("colors.text")}
          backgroundValue={getValues("colors.background")}
          name="Text"
        />
        <ColorEditor
          onChange={handleColorChange("colors.border")}
          value={getValues("colors.border")}
          backgroundValue={getValues("colors.background")}
          name="Border"
        />
        <ColorEditor
          onChange={handleColorChange("colors.error")}
          value={getValues("colors.error")}
          backgroundValue={getValues("colors.background")}
          name="Error"
        />
        <ColorEditor
          onChange={handleColorChange("colors.success")}
          value={getValues("colors.success")}
          backgroundValue={getValues("colors.background")}
          name="Success"
        />
        <ColorEditor
          onChange={handleColorChange("colors.warning")}
          value={getValues("colors.warning")}
          backgroundValue={getValues("colors.background")}
          name="Warning"
        />
        <ColorEditor
          onChange={handleColorChange("colors.info")}
          value={getValues("colors.info")}
          backgroundValue={getValues("colors.background")}
          name="Info"
        />
        <ColorEditor
          onChange={handleColorChange("colors.paper")}
          value={getValues("colors.paper")}
          backgroundValue={getValues("colors.background")}
          name="Paper"
        />
      </div>
      <Typography variant="h2">Typography</Typography>
      <div className="flex flex-wrap gap-2">
        <FontEditor
          value={getValues("fonts.h1")}
          onChange={handleFontChange("fonts.h1")}
          name="Heading 1"
          error={
            errors.fonts?.h1?.size?.message ??
            errors.fonts?.h1?.family?.message ??
            errors.fonts?.h1?.weight?.message
          }
        />
        <FontEditor
          value={getValues("fonts.h2")}
          onChange={handleFontChange("fonts.h2")}
          name="Heading 2"
          error={
            errors.fonts?.h2?.size?.message ??
            errors.fonts?.h2?.family?.message ??
            errors.fonts?.h2?.weight?.message
          }
        />
        <FontEditor
          value={getValues("fonts.h3")}
          onChange={handleFontChange("fonts.h3")}
          name="Heading 3"
          error={
            errors.fonts?.h3?.size?.message ??
            errors.fonts?.h3?.family?.message ??
            errors.fonts?.h3?.weight?.message
          }
        />
        <FontEditor
          value={getValues("fonts.h4")}
          onChange={handleFontChange("fonts.h4")}
          name="Heading 4"
          error={
            errors.fonts?.h4?.size?.message ??
            errors.fonts?.h4?.family?.message ??
            errors.fonts?.h4?.weight?.message
          }
        />
        <FontEditor
          value={getValues("fonts.h5")}
          onChange={handleFontChange("fonts.h5")}
          name="Heading 5"
          error={
            errors.fonts?.h5?.size?.message ??
            errors.fonts?.h5?.family?.message ??
            errors.fonts?.h5?.weight?.message
          }
        />
        <FontEditor
          value={getValues("fonts.h6")}
          onChange={handleFontChange("fonts.h6")}
          name="Heading 6"
          error={
            errors.fonts?.h6?.size?.message ??
            errors.fonts?.h6?.family?.message ??
            errors.fonts?.h6?.weight?.message
          }
        />
        <FontEditor
          value={getValues("fonts.subtitle")}
          onChange={handleFontChange("fonts.subtitle")}
          name="Subtitle"
          error={
            errors.fonts?.subtitle?.size?.message ??
            errors.fonts?.subtitle?.family?.message ??
            errors.fonts?.subtitle?.weight?.message
          }
        />
        <FontEditor
          value={getValues("fonts.subtitle-secondary")}
          onChange={handleFontChange("fonts.subtitle-secondary")}
          name="Subtitle"
          error={
            errors.fonts?.["subtitle-secondary"]?.size?.message ??
            errors.fonts?.["subtitle-secondary"]?.family?.message ??
            errors.fonts?.["subtitle-secondary"]?.weight?.message
          }
        />
        <FontEditor
          value={getValues("fonts.body")}
          onChange={handleFontChange("fonts.body")}
          name="Body"
          error={
            errors.fonts?.body?.size?.message ??
            errors.fonts?.body?.family?.message ??
            errors.fonts?.body?.weight?.message
          }
        />
        <FontEditor
          value={getValues("fonts.body-secondary")}
          onChange={handleFontChange("fonts.body-secondary")}
          name="Body"
          error={
            errors.fonts?.["body-secondary"]?.size?.message ??
            errors.fonts?.["body-secondary"]?.family?.message ??
            errors.fonts?.["body-secondary"]?.weight?.message
          }
        />
        <FontEditor
          value={getValues("fonts.button")}
          onChange={handleFontChange("fonts.button")}
          name="Button"
          error={
            errors.fonts?.button?.size?.message ??
            errors.fonts?.button?.family?.message ??
            errors.fonts?.button?.weight?.message
          }
        />
        <FontEditor
          value={getValues("fonts.caption")}
          onChange={handleFontChange("fonts.caption")}
          name="Caption"
          error={
            errors.fonts?.caption?.size?.message ??
            errors.fonts?.caption?.family?.message ??
            errors.fonts?.caption?.weight?.message
          }
        />
      </div>
      <Typography variant="h2">Additional configs</Typography>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <Typography className="w-16" variant="h4">
            Name
          </Typography>
          <Input
            type="text"
            {...register("name")}
            error={errors.name?.message}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Typography className="w-16" variant="h4">
            Spacing
          </Typography>
          <Input
            type="number"
            {...register("spacing", { valueAsNumber: true })}
            error={errors.spacing?.message}
          />
          {errors.spacing?.message && (
            <Typography className="text-error">
              {errors.spacing.message}
            </Typography>
          )}
        </div>
        <div className="flex gap-2 items-center">
          <Typography className="w-16" variant="h4">
            Radius
          </Typography>
          <Input
            type="number"
            {...register("radius", { valueAsNumber: true })}
            error={errors.radius?.message}
          />
          {errors.radius?.message && (
            <Typography className="text-error">
              {errors.radius.message}
            </Typography>
          )}
        </div>
        <div className="flex sm:flex-col lg:flex-row gap-2">
          <Button className="w-full" type="submit">
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ThemeEditor;
