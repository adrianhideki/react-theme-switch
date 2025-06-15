import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldPath } from "react-hook-form";
import z from "zod";
import { baseThemeConfigSchema } from "../schema";
import { useCallback } from "react";
import Typography from "@components/typography";
import ColorCollection from "./color-collection";
import ColorFoundation from "./color-foundation";
import BaseToken from "./base-token";
import type {
  FontFamily,
  FontHeight,
  FontParagraphSpacing,
  FontSize,
  FontSpacing,
  FontWeight,
} from "@token/fonts";
import { fontFamilyTokens } from "@token/fonts/family/types";
import { fontHeightTokens } from "@token/fonts/height/types";
import { fontSpacingTokens } from "@token/fonts/spacing/types";
import { fontParagraphSpacingTokens } from "@token/fonts/paragraph-spacing/types";
import { fontSizeTokens } from "@token/fonts/size/types";
import { fontWeightTokens } from "@token/fonts/weight/types";
import type { DimensionValues } from "@token/sizes";
import { dimensionValuesTokens } from "@token/sizes/dimensions/types";
import Button from "@components/button";
import type { PartialTheme } from "@token/theme";

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

  const getHandleTokenChange = useCallback(
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
        <Typography variant="h2">Base Properties</Typography>
        <Typography variant="h3">Colors Collection</Typography>
        <ColorCollection
          collection={watch("color.collection")}
          onColorAdd={handleAddColor}
          onColorEdit={handleSaveEditColor}
          onColorRemove={handleRemoveColor}
        />
        {errors.color?.collection && (
          <Typography className="text-error">
            {String(errors.color.collection?.message)}
          </Typography>
        )}
        <ColorFoundation
          data={getValues("color.foundations")}
          onChange={handleColorFoundationChange}
        />
        {errors?.color?.foundations?.message && (
          <Typography className="text-error">
            {String(errors?.color?.foundations?.message)}
          </Typography>
        )}
        {errors?.color?.foundations?.white && (
          <Typography className="text-error">
            {String(errors?.color?.foundations?.white.message)}
          </Typography>
        )}
        {errors?.color?.foundations?.black && (
          <Typography className="text-error">
            {String(errors?.color?.foundations?.black.message)}
          </Typography>
        )}
        <Typography variant="h3">Font Family</Typography>
        <BaseToken<FontFamily, string>
          tokens={fontFamilyTokens}
          data={getValues("font.family") as Record<FontFamily, string>}
          onChange={getHandleTokenChange("font.family")}
          error={
            errors.font?.family as Record<FontFamily, { message?: string }>
          }
        />
        {errors?.font?.family?.message && (
          <Typography className="text-error">
            {String(errors?.font?.family?.message)}
          </Typography>
        )}
        <Typography variant="h3">Font Height</Typography>
        <BaseToken<FontHeight, number>
          tokens={fontHeightTokens}
          data={getValues("font.height") as Record<FontHeight, number>}
          onChange={getHandleTokenChange("font.height")}
          type="number"
          error={
            errors.font?.height as Record<FontHeight, { message?: string }>
          }
        />
        {errors?.font?.height?.message && (
          <Typography className="text-error">
            {String(errors?.font?.height?.message)}
          </Typography>
        )}
        <Typography variant="h3">Font Spacing</Typography>
        <BaseToken<FontSpacing, number>
          tokens={fontSpacingTokens}
          data={getValues("font.spacing") as Record<FontSpacing, number>}
          onChange={getHandleTokenChange("font.spacing")}
          type="number"
          error={
            errors.font?.spacing as Record<FontSpacing, { message?: string }>
          }
        />
        {errors?.font?.spacing?.message && (
          <Typography className="text-error">
            {String(errors?.font?.spacing?.message)}
          </Typography>
        )}
        <Typography variant="h3">Font Paragraph Spacing</Typography>
        <BaseToken<FontParagraphSpacing, number>
          tokens={fontParagraphSpacingTokens}
          data={
            getValues("font.paragraphSpacing") as Record<
              FontParagraphSpacing,
              number
            >
          }
          onChange={getHandleTokenChange("font.paragraphSpacing")}
          type="number"
          error={
            errors.font?.paragraphSpacing as Record<
              FontParagraphSpacing,
              { message?: string }
            >
          }
        />
        {errors?.font?.paragraphSpacing?.message && (
          <Typography className="text-error">
            {String(errors?.font?.paragraphSpacing?.message)}
          </Typography>
        )}
        <Typography variant="h3">Font Size</Typography>
        <BaseToken<FontSize, number>
          tokens={fontSizeTokens}
          data={getValues("font.size") as Record<FontSize, number>}
          onChange={getHandleTokenChange("font.size")}
          type="number"
          error={errors.font?.size as Record<FontSize, { message?: string }>}
        />
        {errors?.font?.size?.message && (
          <Typography className="text-error">
            {String(errors?.font?.size?.message)}
          </Typography>
        )}
        <Typography variant="h3">Font Weight</Typography>
        <BaseToken<FontWeight, number>
          tokens={fontWeightTokens}
          data={getValues("font.weight") as Record<FontWeight, number>}
          onChange={getHandleTokenChange("font.weight")}
          type="number"
          error={
            errors.font?.weight as Record<FontWeight, { message?: string }>
          }
        />
        {errors?.font?.weight?.message && (
          <Typography className="text-error">
            {String(errors?.font?.weight?.message)}
          </Typography>
        )}
        <Typography variant="h3">Dimensions</Typography>
        <BaseToken<DimensionValues, number>
          tokens={dimensionValuesTokens}
          data={getValues("size.dimension") as Record<DimensionValues, number>}
          onChange={getHandleTokenChange("size.dimension")}
          type="number"
          error={
            errors.size?.dimension as unknown as Record<
              DimensionValues,
              { message?: string }
            >
          }
        />
        {errors?.size?.dimension?.message && (
          <Typography className="text-error">
            {String(errors?.size?.dimension?.message)}
          </Typography>
        )}
        <Button type="submit">Save</Button>
      </form>
    </div>
  );
};

export default BaseForm;
