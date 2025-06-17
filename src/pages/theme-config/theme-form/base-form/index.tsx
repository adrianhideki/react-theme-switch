import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldPath } from "react-hook-form";
import z from "zod";
import { baseThemeConfigSchema } from "../schema";
import { useCallback } from "react";
import Typography from "@components/typography";
import ColorCollection from "./color-collection";
import ColorFoundation from "./color-foundation";
import BaseTheme from "./base-theme";
import Button from "@components/button";
import {
  type PartialTheme,
  type FontFamily,
  fontFamilyTokens,
  type FontHeight,
  fontHeightTokens,
  type FontSpacing,
  fontSpacingTokens,
  type FontParagraphSpacing,
  fontParagraphSpacingTokens,
  type FontSize,
  fontSizeTokens,
  type FontWeight,
  fontWeightTokens,
  type DimensionValues,
  dimensionValuesTokens,
} from "theme-token-manager";

type BaseThemeFormValues = z.infer<typeof baseThemeConfigSchema>;

type BaseFormProps = {
  onSubmit: (values: BaseThemeFormValues) => void;
  initialValue?: PartialTheme["base"];
};

const BaseForm = ({ onSubmit, initialValue }: BaseFormProps) => {
  const {
    getValues,
    setValue,
    unregister,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<BaseThemeFormValues>({
    resolver: zodResolver(baseThemeConfigSchema),
    defaultValues: {
      ...initialValue,
    },
  });

  const handleAddColor = useCallback(
    (name: string, scales: Record<number | string, string>) => {
      setValue(`color.collection.${name}`, {
        ...scales,
      } as Record<number, string>);
    },
    [setValue]
  );

  const handleSaveEditColor = useCallback(
    (
      oldName: string,
      name: string,
      scales: Record<number | string, string>
    ) => {
      if (oldName !== name) {
        unregister(`color.collection.${oldName}`);
      }

      setValue(`color.collection.${name}`, {
        ...scales,
      });
    },
    [setValue, unregister]
  );

  const handleRemoveColor = useCallback(
    (name: string) => {
      unregister(`color.collection.${name}`);
      const current = { ...getValues("color.collection") };
      delete current[name];
      setValue("color.collection", current);
    },
    [getValues, setValue, unregister]
  );

  const handleColorFoundationChange = useCallback(
    (data: { white: string; black: string }) => {
      setValue("color.foundations", data);
    },
    [setValue]
  );

  const getHandleThemeChange = useCallback(
    <TKey extends string | number, TResult extends string | number>(
      path: FieldPath<BaseThemeFormValues>
    ) => {
      return (data: Record<TKey, TResult>) => {
        setValue(path, data);
      };
    },
    [setValue]
  );

  return (
    <div>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4">Base Properties</Typography>
        <Typography variant="h5">Colors Collection</Typography>
        <ColorCollection
          collection={watch("color.collection")}
          onColorAdd={handleAddColor}
          onColorEdit={handleSaveEditColor}
          onColorRemove={handleRemoveColor}
        />
        {errors.color?.collection && (
          <Typography className="text-text-text-error-default-default">
            {String(errors.color.collection?.message)}
          </Typography>
        )}
        <ColorFoundation
          data={getValues("color.foundations")}
          onChange={handleColorFoundationChange}
        />
        {errors?.color?.foundations?.message && (
          <Typography className="text-text-error-default">
            {String(errors?.color?.foundations?.message)}
          </Typography>
        )}
        {errors?.color?.foundations?.white && (
          <Typography className="text-text-error-default">
            {String(errors?.color?.foundations?.white.message)}
          </Typography>
        )}
        {errors?.color?.foundations?.black && (
          <Typography className="text-text-error-default">
            {String(errors?.color?.foundations?.black.message)}
          </Typography>
        )}
        <Typography variant="h5">Font Family</Typography>
        <BaseTheme<FontFamily, string>
          themes={fontFamilyTokens}
          data={getValues("font.family") as Record<FontFamily, string>}
          onChange={getHandleThemeChange("font.family")}
          error={
            errors.font?.family as Record<FontFamily, { message?: string }>
          }
        />
        {errors?.font?.family?.message && (
          <Typography className="text-text-error-default">
            {String(errors?.font?.family?.message)}
          </Typography>
        )}
        <Typography variant="h5">Font Height</Typography>
        <BaseTheme<FontHeight, number>
          themes={fontHeightTokens}
          data={getValues("font.height") as Record<FontHeight, number>}
          onChange={getHandleThemeChange("font.height")}
          type="number"
          error={
            errors.font?.height as Record<FontHeight, { message?: string }>
          }
        />
        {errors?.font?.height?.message && (
          <Typography className="text-text-error-default">
            {String(errors?.font?.height?.message)}
          </Typography>
        )}
        <Typography variant="h5">Font Spacing</Typography>
        <BaseTheme<FontSpacing, number>
          themes={fontSpacingTokens}
          data={getValues("font.spacing") as Record<FontSpacing, number>}
          onChange={getHandleThemeChange("font.spacing")}
          type="number"
          error={
            errors.font?.spacing as Record<FontSpacing, { message?: string }>
          }
        />
        {errors?.font?.spacing?.message && (
          <Typography className="text-text-error-default">
            {String(errors?.font?.spacing?.message)}
          </Typography>
        )}
        <Typography variant="h5">Font Paragraph Spacing</Typography>
        <BaseTheme<FontParagraphSpacing, number>
          themes={fontParagraphSpacingTokens}
          data={
            getValues("font.paragraphSpacing") as Record<
              FontParagraphSpacing,
              number
            >
          }
          onChange={getHandleThemeChange("font.paragraphSpacing")}
          type="number"
          error={
            errors.font?.paragraphSpacing as Record<
              FontParagraphSpacing,
              { message?: string }
            >
          }
        />
        {errors?.font?.paragraphSpacing?.message && (
          <Typography className="text-text-error-default">
            {String(errors?.font?.paragraphSpacing?.message)}
          </Typography>
        )}
        <Typography variant="h5">Font Size</Typography>
        <BaseTheme<FontSize, number>
          themes={fontSizeTokens}
          data={getValues("font.size") as Record<FontSize, number>}
          onChange={getHandleThemeChange("font.size")}
          type="number"
          error={errors.font?.size as Record<FontSize, { message?: string }>}
        />
        {errors?.font?.size?.message && (
          <Typography className="text-text-error-default">
            {String(errors?.font?.size?.message)}
          </Typography>
        )}
        <Typography variant="h5">Font Weight</Typography>
        <BaseTheme<FontWeight, number>
          themes={fontWeightTokens}
          data={getValues("font.weight") as Record<FontWeight, number>}
          onChange={getHandleThemeChange("font.weight")}
          type="number"
          error={
            errors.font?.weight as Record<FontWeight, { message?: string }>
          }
        />
        {errors?.font?.weight?.message && (
          <Typography className="text-text-error-default">
            {String(errors?.font?.weight?.message)}
          </Typography>
        )}
        <Typography variant="h5">Dimensions</Typography>
        <BaseTheme<DimensionValues, number>
          themes={dimensionValuesTokens}
          data={getValues("size.dimension") as Record<DimensionValues, number>}
          onChange={getHandleThemeChange("size.dimension")}
          type="number"
          error={
            errors.size?.dimension as unknown as Record<
              DimensionValues,
              { message?: string }
            >
          }
        />
        {errors?.size?.dimension?.message && (
          <Typography className="text-text-error-default">
            {String(errors?.size?.dimension?.message)}
          </Typography>
        )}
        <Button type="submit">Save</Button>
      </form>
    </div>
  );
};

export default BaseForm;
