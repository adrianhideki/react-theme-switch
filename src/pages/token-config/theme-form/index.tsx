import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import schema from "./schema";
import type { z } from "zod";
import { useCallback, useMemo, useState } from "react";
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

const colorScales = [
  "100",
  "150",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "1000",
  "1100",
  "1200",
] as const;

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
  const [editingColor, setEditingColor] = useState<string | null>(null);
  const [newColorName, setNewColorName] = useState("");
  const [newColorScales, setNewColorScales] = useState<Record<number, string>>(
    {}
  );
  const methods = useForm<ThemeFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  const collectionColors = useMemo(
    () => Object.entries(methods.watch("base.color.collection") ?? {}),
    [methods]
  );

  const foundations = useMemo(
    () => methods.watch("base.color.foundations") ?? {},
    [methods]
  );

  const handleAddColor = useCallback(() => {
    if (!newColorName) return;
    methods.setValue(`base.color.collection.${newColorName}`, {
      ...newColorScales,
    } as Record<number, string>);
    setNewColorName("");
    setNewColorScales({});
  }, [methods, newColorName, newColorScales]);

  const handleEditColor = useCallback(
    (name: string) => {
      setEditingColor(name);
      setNewColorName(name);
      setNewColorScales(
        methods.getValues(`base.color.collection.${name}`) ?? {}
      );
    },
    [methods]
  );

  const handleSaveEditColor = useCallback(() => {
    if (!editingColor) return;
    if (editingColor !== newColorName) {
      methods.unregister(`base.color.collection.${editingColor}`);
    }
    methods.setValue(`base.color.collection.${newColorName}`, {
      ...newColorScales,
    });
    setEditingColor(null);
    setNewColorName("");
    setNewColorScales({});
  }, [editingColor, methods, newColorName, newColorScales]);

  const handleRemoveColor = useCallback(
    (name: string) => {
      methods.unregister(`base.color.collection.${name}`);
      const current = { ...methods.getValues("base.color.collection") };
      delete current[name];
      methods.setValue("base.color.collection", current);
    },
    [methods]
  );

  const paletteColorOptions = useMemo(
    () =>
      [
        ...Object.keys(methods.watch("base.color.collection") ?? {}),
        "foundation.white",
        "foundation.black",
      ].map((name) => ({ value: name, label: name })),
    [methods]
  );

  const baseFontFamily = useMemo(
    () => methods.watch("base.font.family") ?? {},
    [methods]
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
  const baseFontHeight = methods.watch("base.font.height") ?? {};
  const baseFontSpacing = methods.watch("base.font.spacing") ?? {};
  const baseFontSize = methods.watch("base.font.size") ?? {};
  const baseFontWeight = methods.watch("base.font.weight") ?? {};
  const baseFontParagraphSpacing =
    methods.watch("base.font.paragraphSpacing") ?? {};

  // --- Dimension options for theme.size.border.width, radius, spacing (show property name) ---
  const baseDimensions = methods.watch("base.size.dimension") ?? {};
  const dimensionOptions = dimensionValuesTokens
    .filter((k) => baseDimensions[k] !== undefined)
    .map((k) => ({
      value: k,
      label: String(k),
    }));

  // --- Color options for theme.color ---
  const colorOptions = [
    ...Object.keys(methods.watch("base.color.collection") ?? {}),
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
          const colorValue = methods.watch(fieldPath);
          const scaleValue = methods.watch(scalePath);
          return (
            <div key={token} className="flex flex-col">
              <span>{token}</span>
              <Select
                items={paletteColorOptions}
                getKey={(item) => item.value}
                getLabel={(item) => item.label}
                value={colorValue as string}
                onChange={(v) =>
                  methods.setValue(
                    fieldPath,
                    v as ColorValues | FoundationValues
                  )
                }
              />
              <Select
                items={colorScales.map((s) => ({
                  value: s,
                  label: String(s),
                }))}
                getKey={(item) => item.value}
                getLabel={(item) => item.label}
                value={scaleValue as string}
                onChange={(v) => methods.setValue(scalePath, v)}
              />
              <div
                style={{
                  width: 24,
                  height: 24,
                  background: getColorPreview(
                    methods.getValues("base.color.collection") ?? {},
                    methods.getValues("base.color.foundations") ?? {},
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
      <Button onClick={() => setIsOpen(true)}>Create Theme</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-8 p-4"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            {/* --- BASE PROPERTIES SECTION --- */}
            <Typography variant="h2">Base Properties</Typography>
            {/* Base Colors Collection Table */}
            <Typography variant="h3">Base Colors Collection</Typography>
            <table className="w-full border">
              <thead>
                <tr>
                  <th className="border px-2 py-1">Color Name</th>
                  <th className="border px-2 py-1">Scales</th>
                  <th className="border px-2 py-1">Preview</th>
                  <th className="border px-2 py-1">Actions</th>
                </tr>
              </thead>
              <tbody>
                {collectionColors.map(([name, scales]) => (
                  <tr key={name}>
                    <td className="border px-2 py-1">{name}</td>
                    <td className="border px-2 py-1">
                      {Object.entries(scales).map(([scale, value]) => (
                        <span key={scale} className="inline-block mr-2">
                          <b>{scale}:</b> {+value}
                        </span>
                      ))}
                    </td>
                    <td className="border px-2 py-1">
                      {Object.entries(scales).map(([scale, value]) => (
                        <span
                          key={scale}
                          className="inline-block mr-1"
                          style={{
                            width: 20,
                            height: 20,
                            background: +value,
                            border: "1px solid #ccc",
                            display: "inline-block",
                          }}
                          title={`${name} ${scale}`}
                        />
                      ))}
                    </td>
                    <td className="border px-2 py-1">
                      <Button
                        type="button"
                        onClick={() => handleEditColor(name)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        onClick={() => handleRemoveColor(name)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="border px-2 py-1">
                    <Input
                      placeholder="Color name"
                      value={newColorName}
                      onChange={(e) => setNewColorName(e.target.value)}
                    />
                  </td>
                  <td className="border px-2 py-1">
                    {colorScales.map((scale) => (
                      <span key={scale} className="inline-block mr-2">
                        <Input
                          placeholder={String(scale)}
                          value={newColorScales[scale] || ""}
                          onChange={(e) =>
                            setNewColorScales((s) => ({
                              ...s,
                              [scale]: e.target.value,
                            }))
                          }
                          style={{ width: 60 }}
                        />
                      </span>
                    ))}
                  </td>
                  <td className="border px-2 py-1">
                    {colorScales.map((scale) => (
                      <span
                        key={scale}
                        className="inline-block mr-1"
                        style={{
                          width: 20,
                          height: 20,
                          background: newColorScales[scale] || "#fff",
                          border: "1px solid #ccc",
                          display: "inline-block",
                        }}
                        title={`${newColorName} ${scale}`}
                      />
                    ))}
                  </td>
                  <td className="border px-2 py-1">
                    {editingColor ? (
                      <Button type="button" onClick={handleSaveEditColor}>
                        Save
                      </Button>
                    ) : (
                      <Button type="button" onClick={handleAddColor}>
                        Add
                      </Button>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            {/* Base Foundations */}
            <Typography variant="h3">Base Foundations</Typography>
            <div className="flex gap-4">
              <div>
                <Input
                  {...methods.register("base.color.foundations.white")}
                  placeholder="White"
                />
                <div
                  style={{
                    width: 24,
                    height: 24,
                    background: foundations.white ?? "#fff",
                    border: "1px solid #ccc",
                    marginTop: 4,
                  }}
                />
              </div>
              <div>
                <Input
                  {...methods.register("base.color.foundations.black")}
                  placeholder="Black"
                />
                <div
                  style={{
                    width: 24,
                    height: 24,
                    background: foundations.black ?? "#fff",
                    border: "1px solid #ccc",
                    marginTop: 4,
                  }}
                />
              </div>
            </div>
            {/* Base Font Family */}
            <Typography variant="h3">Base Font Family</Typography>
            <div className="flex flex-wrap gap-4">
              {fontFamilyTokens.map((key) => (
                <Input
                  key={key}
                  placeholder={key}
                  {...methods.register(`base.font.family.${key}`)}
                />
              ))}
            </div>
            {/* Base Font Height */}
            <Typography variant="h3">Base Font Height</Typography>
            <div className="flex flex-wrap gap-4">
              {fontHeightTokens.map((key) => (
                <Input
                  key={key}
                  placeholder={key}
                  type="number"
                  {...methods.register(`base.font.height.${key}`)}
                />
              ))}
            </div>
            {/* Base Font Spacing */}
            <Typography variant="h3">Base Font Spacing</Typography>
            <div className="flex flex-wrap gap-4">
              {fontSpacingTokens.map((key) => (
                <Input
                  key={key}
                  placeholder={key}
                  type="number"
                  {...methods.register(`base.font.spacing.${key}`)}
                />
              ))}
            </div>
            {/* Base Font Paragraph Spacing */}
            <Typography variant="h3">Base Font Paragraph Spacing</Typography>
            <div className="flex flex-wrap gap-4">
              {fontParagraphSpacingTokens.map((key) => (
                <Input
                  key={key}
                  placeholder={key}
                  type="number"
                  {...methods.register(`base.font.paragraphSpacing.${key}`)}
                />
              ))}
            </div>
            {/* Base Font Size */}
            <Typography variant="h3">Base Font Size</Typography>
            <div className="flex flex-wrap gap-4">
              {fontSizeTokens.map((key) => (
                <Input
                  key={key}
                  placeholder={key}
                  type="number"
                  {...methods.register(`base.font.size.${key}`)}
                />
              ))}
            </div>
            {/* Base Font Weight */}
            <Typography variant="h3">Base Font Weight</Typography>
            <div className="flex flex-wrap gap-4">
              {fontWeightTokens.map((key) => (
                <Input
                  key={key}
                  placeholder={key}
                  type="number"
                  {...methods.register(`base.font.weight.${key}`)}
                />
              ))}
            </div>
            {/* Base Size Dimension */}
            <Typography variant="h3">Base Size Dimension</Typography>
            <div className="flex flex-wrap gap-4">
              {dimensionValuesTokens.map((key) => (
                <Input
                  key={key}
                  placeholder={String(key)}
                  type="number"
                  {...methods.register(`base.size.dimension.${key}`)}
                />
              ))}
            </div>

            {/* --- OTHER PROPERTIES SECTION --- */}
            <Typography variant="h2">Other Properties</Typography>
            {/* Theme Name */}
            <Input placeholder="Theme Name" {...methods.register("name")} />
            {/* Theme Colors */}
            <Typography variant="h3">Theme Colors</Typography>
            <div className="flex flex-wrap gap-4">
              {colorValuesTokens.map((field) => (
                <Select<{ value: string; label: string }>
                  key={field}
                  items={colorOptions}
                  getKey={(item) => item.value}
                  getLabel={(item) => item.label}
                  value={methods.watch(`color.${field}`)}
                  onChange={(v) => methods.setValue(`color.${field}`, v)}
                />
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
                  value={methods.watch(`font.family.${key}`)}
                  onChange={(v) => methods.setValue(`font.family.${key}`, v)}
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
                  value={methods.watch(`font.height.${key}`)}
                  onChange={(v) => methods.setValue(`font.height.${key}`, v)}
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
                  value={methods.watch(`font.spacing.${key}`)}
                  onChange={(v) => methods.setValue(`font.spacing.${key}`, v)}
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
                  value={methods.watch(`font.size.${key}`)}
                  onChange={(v) => methods.setValue(`font.size.${key}`, v)}
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
                  value={methods.watch(`font.weight.${key}`)}
                  onChange={(v) => methods.setValue(`font.weight.${key}`, v)}
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
                  value={methods.watch(`font.paragraphSpacing.${key}`)}
                  onChange={(v) =>
                    methods.setValue(`font.paragraphSpacing.${key}`, v)
                  }
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
                  value={methods.watch(`size.border.width.${key}`)}
                  onChange={(v) =>
                    methods.setValue(`size.border.width.${key}`, v)
                  }
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
                  value={methods.watch(`size.border.radius.${key}`)}
                  onChange={(v) =>
                    methods.setValue(`size.border.radius.${key}`, v)
                  }
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
                  value={methods.watch(`size.spacing.${key}`)}
                  onChange={(v) => methods.setValue(`size.spacing.${key}`, v)}
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
        </FormProvider>
      </Modal>
    </>
  );
};

export default ThemeForm;
