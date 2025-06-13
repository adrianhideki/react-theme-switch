import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import schema from "./schema";
import type { z } from "zod";
import { useMemo, useState } from "react";
import Button from "@components/button";
import Typography from "@components/typography";
import Input from "@components/input";
import Modal from "@components/modal";
import Select from "@components/select";
import { fontFamilyTokens } from "@token/fonts/family/types";
import { fontHeightTokens } from "@token/fonts/height/types";
import { fontSpacingTokens } from "@token/fonts/spacing/types";
import { fontParagraphSpacingTokens } from "@token/fonts/paragraph-spacing/types";
import { fontSizeTokens } from "@token/fonts/size/types";
import { fontWeightTokens } from "@token/fonts/weight/types";
import { dimensionValuesTokens } from "@token/sizes/dimensions/types";
import {
  colorValuesTokens,
  fontValuesTokens,
  themePaletteSurfaceTokens,
  themePaletteTextTokens,
  themePaletteIconTokens,
  themePaletteBorderTokens,
  type ColorValues,
  type FoundationValues,
} from "@token/theme/types";
import { borderRadiusValuesTokens } from "@token/sizes/border-radius/types";
import { borderWidthValuesTokens } from "@token/sizes/border-width/types";
import { spacingValuesTokens } from "@token/sizes/spacing/types";
import { colorScaleValuesTokens } from "@token/colors/types";
import BaseForm from "./base-form";

type ThemeFormValues = z.infer<typeof schema>;

// --- Helper for color preview ---
function getColorPreview(
  collection: Record<string, Record<string, string>>,
  foundations: { white?: string; black?: string },
  color: string,
  scale?: number
): string {
  if (color === "foundation.white") return foundations.white ?? "";
  if (color === "foundation.black") return foundations.black ?? "";
  if (collection[color] && scale)
    return String(collection[color][String(scale)]);
  return "";
}

const fontValueKeys = fontValuesTokens;
const borderWidthKeys = borderWidthValuesTokens;
const borderRadiusKeys = borderRadiusValuesTokens;
const spacingKeys = spacingValuesTokens;

const ThemeForm = ({
  onSubmit,
}: {
  onSubmit: (values: ThemeFormValues) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBaseFormOpen, setIsBaseFormOpen] = useState(false);
  const { watch, getValues, setValue, handleSubmit, register } =
    useForm<ThemeFormValues>({
      resolver: zodResolver(schema),
      defaultValues: {},
    });

  const paletteColorOptions = useMemo(
    () =>
      [
        ...Object.keys(watch("base.color.collection") ?? {}),
        "foundation.white",
        "foundation.black",
      ].map((name) => ({ value: name, label: name })),
    [watch]
  );

  const baseFontFamily = useMemo(
    () => watch("base.font.family") ?? {},
    [watch]
  );

  const fontFamilyOptions = useMemo(
    () =>
      fontFamilyTokens
        .filter((k) => baseFontFamily[k])
        .map((k) => ({ value: k, label: k })),
    [baseFontFamily]
  );

  // --- Font numeric options for theme.font.height, spacing, size, weight, paragraphSpacing (show property name) ---
  function getFontKeyOptions<T extends string>(
    baseObj: Partial<Record<T, number | undefined>>,
    keys: readonly T[]
  ) {
    return keys
      .filter((k) => baseObj && baseObj[k] !== undefined)
      .map((k) => ({
        value: k,
        label: k,
      }));
  }
  const baseFontHeight = watch("base.font.height") ?? {};
  const baseFontSpacing = watch("base.font.spacing") ?? {};
  const baseFontSize = watch("base.font.size") ?? {};
  const baseFontWeight = watch("base.font.weight") ?? {};
  const baseFontParagraphSpacing = watch("base.font.paragraphSpacing") ?? {};

  // --- Dimension options for theme.size.border.width, radius, spacing (show property name) ---
  const baseDimensions = watch("base.size.dimension") ?? {};
  const dimensionOptions = dimensionValuesTokens
    .filter((k) => baseDimensions[k] !== undefined)
    .map((k) => ({
      value: k,
      label: String(k),
    }));

  // --- Color options for theme.color ---
  const colorOptions = [
    ...Object.keys(getValues("base.color.collection") ?? {}),
    "foundation.white",
    "foundation.black",
  ].map((name) => ({ value: name, label: name }));

  // --- Palette field renderer ---
  function renderPaletteFields(
    mode: "light" | "dark",
    section: "surface" | "text" | "icon" | "border",
    tokens: readonly string[]
  ) {
    return (
      <div className="flex flex-wrap gap-4">
        {tokens.map((token) => {
          const fieldPath =
            `palette.${mode}.${section}.${token}.color` as const;
          const scalePath =
            `palette.${mode}.${section}.${token}.scale` as const;

          const colorValue = getValues(fieldPath);
          const scaleValue = getValues(scalePath);

          return (
            <div key={token} className="flex flex-col">
              <span>{token}</span>
              <Select
                items={paletteColorOptions}
                getKey={(item) => item.value}
                getLabel={(item) => item.label}
                value={colorValue as string}
                onChange={(v) =>
                  setValue(fieldPath, v as ColorValues | FoundationValues)
                }
              />
              <Select
                items={colorScaleValuesTokens.map((s) => ({
                  value: s,
                  label: String(s),
                }))}
                getKey={(item) => item.value}
                getLabel={(item) => item.label}
                value={scaleValue as string}
                onChange={(v) => setValue(scalePath, v)}
              />
              <div
                style={{
                  width: 24,
                  height: 24,
                  background: getColorPreview(
                    getValues("base.color.collection") ?? {},
                    getValues("base.color.foundations") ?? {},
                    colorValue,
                    Number(scaleValue!)
                  ),
                  border: "1px solid #ccc",
                  marginTop: 4,
                }}
              />
            </div>
          );
        })}
      </div>
    );
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
          <Typography variant="h2">Other Properties</Typography>
          <Input placeholder="Theme Name" {...register("name")} />
          <Typography variant="h3">Theme Colors</Typography>
          <div className="flex flex-wrap gap-4">
            {colorValuesTokens.map((field) => (
              <div key={field.replace("-", " ")}>
                <Typography className="capitalize">{field}</Typography>
                <Select<{ value: string; label: string }>
                  items={colorOptions}
                  getKey={(item) => item.value}
                  getLabel={(item) => item.label}
                  value={watch(`color.${field}`)}
                  onChange={(v) => setValue(`color.${field}`, v)}
                />
              </div>
            ))}
          </div>
          {/* Theme Font Family */}
          <Typography variant="h3">Theme Font Family</Typography>
          <div className="flex flex-wrap gap-4">
            {fontValueKeys.map((key) => (
              <Select
                key={key}
                items={fontFamilyOptions}
                getKey={(item) => item.value}
                getLabel={(item) => item.label}
                value={watch(`font.family.${key}`)}
                onChange={(v) => setValue(`font.family.${key}`, v)}
              />
            ))}
          </div>
          {/* Theme Font Height */}
          <Typography variant="h3">Theme Font Height</Typography>
          <div className="flex flex-wrap gap-4">
            {fontValueKeys.map((key) => (
              <Select
                key={key}
                items={getFontKeyOptions(baseFontHeight, fontHeightTokens)}
                getKey={(item) => item.value}
                getLabel={(item) => item.label}
                value={watch(`font.height.${key}`)}
                onChange={(v) => setValue(`font.height.${key}`, v)}
              />
            ))}
          </div>
          {/* Theme Font Spacing */}
          <Typography variant="h3">Theme Font Spacing</Typography>
          <div className="flex flex-wrap gap-4">
            {fontValueKeys.map((key) => (
              <Select
                key={key}
                items={getFontKeyOptions(baseFontSpacing, fontSpacingTokens)}
                getKey={(item) => item.value}
                getLabel={(item) => item.label}
                value={watch(`font.spacing.${key}`)}
                onChange={(v) => setValue(`font.spacing.${key}`, v)}
              />
            ))}
          </div>
          {/* Theme Font Size */}
          <Typography variant="h3">Theme Font Size</Typography>
          <div className="flex flex-wrap gap-4">
            {fontValueKeys.map((key) => (
              <Select
                key={key}
                items={getFontKeyOptions(baseFontSize, fontSizeTokens)}
                getKey={(item) => item.value}
                getLabel={(item) => item.label}
                value={watch(`font.size.${key}`)}
                onChange={(v) => setValue(`font.size.${key}`, v)}
              />
            ))}
          </div>
          {/* Theme Font Weight */}
          <Typography variant="h3">Theme Font Weight</Typography>
          <div className="flex flex-wrap gap-4">
            {fontValueKeys.map((key) => (
              <Select
                key={key}
                items={getFontKeyOptions(baseFontWeight, fontWeightTokens)}
                getKey={(item) => item.value}
                getLabel={(item) => item.label}
                value={watch(`font.weight.${key}`)}
                onChange={(v) => setValue(`font.weight.${key}`, v)}
              />
            ))}
          </div>
          {/* Theme Font Paragraph Spacing */}
          <Typography variant="h3">Theme Font Paragraph Spacing</Typography>
          <div className="flex flex-wrap gap-4">
            {fontValueKeys.map((key) => (
              <Select
                key={key}
                items={getFontKeyOptions(
                  baseFontParagraphSpacing,
                  fontParagraphSpacingTokens
                )}
                getKey={(item) => item.value}
                getLabel={(item) => item.label}
                value={watch(`font.paragraphSpacing.${key}`)}
                onChange={(v) => setValue(`font.paragraphSpacing.${key}`, v)}
              />
            ))}
          </div>
          {/* Theme Size Border Width */}
          <Typography variant="h3">Theme Size Border Width</Typography>
          <div className="flex flex-wrap gap-4">
            {borderWidthKeys.map((key) => (
              <Select
                key={key}
                items={dimensionOptions}
                getKey={(item) => item.value}
                getLabel={(item) => item.label}
                value={watch(`size.border.width.${key}`)}
                onChange={(v) => setValue(`size.border.width.${key}`, v)}
              />
            ))}
          </div>
          {/* Theme Size Border Radius */}
          <Typography variant="h3">Theme Size Border Radius</Typography>
          <div className="flex flex-wrap gap-4">
            {borderRadiusKeys.map((key) => (
              <Select
                key={key}
                items={dimensionOptions}
                getKey={(item) => item.value}
                getLabel={(item) => item.label}
                value={watch(`size.border.radius.${key}`)}
                onChange={(v) => setValue(`size.border.radius.${key}`, v)}
              />
            ))}
          </div>
          {/* Theme Size Spacing */}
          <Typography variant="h3">Theme Size Spacing</Typography>
          <div className="flex flex-wrap gap-4">
            {spacingKeys.map((key) => (
              <Select
                key={key}
                items={dimensionOptions}
                getKey={(item) => item.value}
                getLabel={(item) => item.label}
                value={watch(`size.spacing.${key}`)}
                onChange={(v) => setValue(`size.spacing.${key}`, v)}
              />
            ))}
          </div>
          {/* Palette (surface, text, icon, border) */}
          <Typography variant="h3">Palette (light/dark)</Typography>
          <Typography>
            For each palette property, select a color from your collection or
            theme color.
          </Typography>
          {["light", "dark"].map((mode) => (
            <div key={mode}>
              <Typography variant="h4">
                {mode.charAt(0).toUpperCase() + mode.slice(1)} Palette
              </Typography>
              <Typography variant="h5">Surface</Typography>
              {renderPaletteFields(
                mode as "light" | "dark",
                "surface",
                themePaletteSurfaceTokens
              )}
              <Typography variant="h5">Text</Typography>
              {renderPaletteFields(
                mode as "light" | "dark",
                "text",
                themePaletteTextTokens
              )}
              <Typography variant="h5">Icon</Typography>
              {renderPaletteFields(
                mode as "light" | "dark",
                "icon",
                themePaletteIconTokens
              )}
              <Typography variant="h5">Border</Typography>
              {renderPaletteFields(
                mode as "light" | "dark",
                "border",
                themePaletteBorderTokens
              )}
            </div>
          ))}
          <Button type="submit">Save Theme</Button>
        </form>
      </Modal>
    </>
  );
};

export default ThemeForm;
