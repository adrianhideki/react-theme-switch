import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import schema from "./schema";
import type { z } from "zod";
import { useState } from "react";
import Button from "@components/button";
import Typography from "@components/typography";
import Input from "@components/input";
import Modal from "@components/modal";
import Select from "@components/select";
import type { FontFamily } from "@token/fonts/family/types";
import type { FontHeight } from "@token/fonts/height/types";
import type { FontSpacing } from "@token/fonts/spacing/types";
import type { FontParagraphSpacing } from "@token/fonts/paragraph-spacing/types";
import type { FontSize } from "@token/fonts/size/types";
import type { FontWeight } from "@token/fonts/weight/types";
import type { DimensionValues } from "@token/sizes/dimensions/types";
import type { ColorScaleValues } from "@token/colors";
import type { ColorValues } from "@token/theme/types";

// --- Type helpers ---
const fontFamilyKeys: FontFamily[] = ["headline", "content"];
const fontHeightKeys: FontHeight[] = [
  "4xl",
  "3xl",
  "2xl",
  "xl",
  "lg",
  "md",
  "base",
  "sm",
  "xs",
];
const fontSpacingKeys: FontSpacing[] = ["lg", "md", "xs", "base"];
const fontParagraphSpacingKeys: FontParagraphSpacing[] = ["base"];
const fontSizeKeys: FontSize[] = [
  "4xl",
  "3xl",
  "2xl",
  "xl",
  "lg",
  "md",
  "base",
  "sm",
  "xs",
];
const fontWeightKeys: FontWeight[] = ["regular", "medium", "semiBold", "bold"];
const dimensionKeys: DimensionValues[] = [
  0, 25, 50, 100, 150, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200,
  1300, 1400, 1500, 1600, 1700, 1800, 1900,
];
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

const fontValueKeys = [
  "label",
  "labelLong",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hyperlink",
  "hyperlinkHover",
  "caption",
  "body",
  "bodyShort",
  "bodyLong",
] as const;

const borderWidthKeys = ["xs", "sm", "md"] as const;
const borderRadiusKeys = [
  "none",
  "3xs",
  "2xs",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "pill",
] as const;
const spacingKeys = [
  "4xs",
  "3xs",
  "2xs",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
] as const;

// --- Helper for color preview ---
function getColorPreview(
  collection: Record<string, Record<string, string>>,
  foundations: { white?: string; black?: string },
  color: string,
  scale?: string
): string {
  if (color === "foundation.white") return foundations.white ?? "";
  if (color === "foundation.black") return foundations.black ?? "";
  if (collection[color] && scale) return collection[color][scale] ?? "";
  return "";
}

type ThemeFormValues = z.infer<typeof schema>;

const ThemeForm = ({
  onSubmit,
}: {
  onSubmit: (values: ThemeFormValues) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingColor, setEditingColor] = useState<string | null>(null);
  const [newColorName, setNewColorName] = useState("");
  const [newColorScales, setNewColorScales] = useState<
    Partial<Record<string, string>>
  >({});
  const methods = useForm<ThemeFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  // --- Color collection helpers ---
  const collectionColors = Object.entries(
    methods.watch("base.color.collection") ?? {}
  );
  const foundations = methods.watch("base.color.foundations") ?? {};

  const handleAddColor = () => {
    if (!newColorName) return;
    methods.setValue(`base.color.collection.${newColorName}`, {
      ...newColorScales,
    } as Record<ColorScaleValues, string>);
    setNewColorName("");
    setNewColorScales({});
  };
  const handleEditColor = (name: string) => {
    setEditingColor(name);
    setNewColorName(name);
    setNewColorScales(methods.getValues(`base.color.collection.${name}`) ?? {});
  };
  const handleSaveEditColor = () => {
    if (!editingColor) return;
    if (editingColor !== newColorName) {
      methods.unregister(`base.color.collection.${editingColor}`);
    }
    methods.setValue(`base.color.collection.${newColorName}`, {
      ...newColorScales,
    } as Record<ColorScaleValues, string>);
    setEditingColor(null);
    setNewColorName("");
    setNewColorScales({});
  };
  const handleRemoveColor = (name: string) => {
    methods.unregister(`base.color.collection.${name}`);
    const current = { ...methods.getValues("base.color.collection") };
    delete current[name];
    methods.setValue("base.color.collection", current);
  };

  // --- Palette color select options ---
  const paletteColorOptions = [
    ...Object.keys(methods.watch("base.color.collection") ?? {}),
    "foundation.white",
    "foundation.black",
  ].map((name) => ({ value: name, label: name }));

  // --- Font family options for theme.font.family (show property name) ---
  const baseFontFamily = methods.watch("base.font.family") ?? {};
  const fontFamilyOptions = fontFamilyKeys
    .filter((k) => baseFontFamily[k])
    .map((k) => ({ value: k, label: k }));

  // --- Font numeric options for theme.font.height, spacing, size, weight, paragraphSpacing (show property name) ---
  function getFontKeyOptions<T extends string>(
    baseObj: Record<T, number> | undefined,
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
  const dimensionOptions = dimensionKeys
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
                      {Object.entries(scales as Record<string, string>).map(
                        ([scale, value]) => (
                          <span key={scale} className="inline-block mr-2">
                            <b>{scale}:</b> {value}
                          </span>
                        )
                      )}
                    </td>
                    <td className="border px-2 py-1">
                      {Object.entries(scales as Record<string, string>).map(
                        ([scale, value]) => (
                          <span
                            key={scale}
                            className="inline-block mr-1"
                            style={{
                              width: 20,
                              height: 20,
                              background: value,
                              border: "1px solid #ccc",
                              display: "inline-block",
                            }}
                            title={`${name} ${scale}`}
                          />
                        )
                      )}
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
              {fontFamilyKeys.map((key) => (
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
              {fontHeightKeys.map((key) => (
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
              {fontSpacingKeys.map((key) => (
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
              {fontParagraphSpacingKeys.map((key) => (
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
              {fontSizeKeys.map((key) => (
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
              {fontWeightKeys.map((key) => (
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
              {dimensionKeys.map((key) => (
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
              {(
                [
                  "primary",
                  "secondary",
                  "accent",
                  "success",
                  "error",
                  "information",
                  "warning",
                  "neutral-light",
                  "neutral-dark",
                ] as ColorValues[]
              ).map((field) => (
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
                <Select<{
                  value: FontFamily;
                  label: FontFamily;
                }>
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
                <Select<{
                  value: FontHeight;
                  label: FontHeight;
                }>
                  key={key}
                  items={getFontKeyOptions(baseFontHeight, fontHeightKeys)}
                  getKey={(item) => item.value}
                  getLabel={(item) => item.label}
                  value={methods.watch(`font.height.${key}`)}
                  onChange={(v) => methods.setValue(`font.height.${key}`, +v)}
                />
              ))}
            </div>
            {/* Theme Font Spacing */}
            <Typography variant="h3">Theme Font Spacing</Typography>
            <div className="flex flex-wrap gap-4">
              {fontValueKeys.map((key) => (
                <Select
                  key={key}
                  items={getFontKeyOptions(baseFontSpacing, fontSpacingKeys)}
                  getKey={(item) => item.value}
                  getLabel={(item) => item.label}
                  value={methods.watch(`font.spacing.${key}`)}
                  onChange={(v) => methods.setValue(`font.spacing.${key}`, +v)}
                />
              ))}
            </div>
            {/* Theme Font Size */}
            <Typography variant="h3">Theme Font Size</Typography>
            <div className="flex flex-wrap gap-4">
              {fontValueKeys.map((key) => (
                <Select
                  key={key}
                  items={getFontKeyOptions(baseFontSize, fontSizeKeys)}
                  getKey={(item) => item.value}
                  getLabel={(item) => item.label}
                  value={methods.watch(`font.size.${key}`)}
                  onChange={(v) => methods.setValue(`font.size.${key}`, +v)}
                />
              ))}
            </div>
            {/* Theme Font Weight */}
            <Typography variant="h3">Theme Font Weight</Typography>
            <div className="flex flex-wrap gap-4">
              {fontValueKeys.map((key) => (
                <Select
                  key={key}
                  items={getFontKeyOptions(baseFontWeight, fontWeightKeys)}
                  getKey={(item) => item.value}
                  getLabel={(item) => item.label}
                  value={methods.watch(`font.weight.${key}`)}
                  onChange={(v) => methods.setValue(`font.weight.${key}`, +v)}
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
                    fontParagraphSpacingKeys
                  )}
                  getKey={(item) => item.value}
                  getLabel={(item) => item.label}
                  value={methods.watch(`font.paragraphSpacing.${key}`)}
                  onChange={(v) =>
                    methods.setValue(`font.paragraphSpacing.${key}`, +v)
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
                    methods.setValue(`size.border.width.${key}`, +v)
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
                    methods.setValue(`size.border.radius.${key}`, +v)
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
                  onChange={(v) => methods.setValue(`size.spacing.${key}`, +v)}
                />
              ))}
            </div>
            {/* Palette (surface only for brevity, repeat for text, icon, border as needed) */}
            <Typography variant="h3">Palette (light/dark)</Typography>
            <Typography>
              For each palette property, select a color from your collection or
              theme color.
            </Typography>
            <div className="flex flex-col gap-4">
              {["light", "dark"].map((mode) => (
                <div key={mode}>
                  <Typography variant="h4">
                    {mode.charAt(0).toUpperCase() + mode.slice(1)} Palette
                  </Typography>
                  <Typography variant="h5">Surface</Typography>
                  <div className="flex flex-wrap gap-4">
                    {[
                      {
                        name: "primary.default",
                        label: "Surface Primary Default",
                      },
                      {
                        name: "primary.defaultHover",
                        label: "Surface Primary Hover",
                      },
                      {
                        name: "primary.defaultSubtle",
                        label: "Surface Primary Subtle",
                      },
                      {
                        name: "primary.defaultSubtleHover",
                        label: "Surface Primary Subtle Hover",
                      },
                      {
                        name: "primary.defaultSubtleHoverAlt",
                        label: "Surface Primary Subtle Hover Alt",
                      },
                      {
                        name: "secondary.default",
                        label: "Surface Secondary Default",
                      },
                      {
                        name: "secondary.defaultHover",
                        label: "Surface Secondary Hover",
                      },
                      {
                        name: "secondary.defaultSubtle",
                        label: "Surface Secondary Subtle",
                      },
                      {
                        name: "secondary.defaultSubtleHover",
                        label: "Surface Secondary Subtle Hover",
                      },
                      {
                        name: "disabled.default",
                        label: "Surface Disabled Default",
                      },
                      { name: "error.default", label: "Surface Error Default" },
                      {
                        name: "error.defaultHover",
                        label: "Surface Error Hover",
                      },
                      {
                        name: "error.defaultSubtle",
                        label: "Surface Error Subtle",
                      },
                      {
                        name: "error.defaultSubtleHover",
                        label: "Surface Error Subtle Hover",
                      },
                      {
                        name: "success.default",
                        label: "Surface Success Default",
                      },
                      {
                        name: "success.defaultHover",
                        label: "Surface Success Hover",
                      },
                      {
                        name: "success.defaultSubtle",
                        label: "Surface Success Subtle",
                      },
                      {
                        name: "success.defaultSubtleHover",
                        label: "Surface Success Subtle Hover",
                      },
                      {
                        name: "information.default",
                        label: "Surface Information Default",
                      },
                      {
                        name: "information.defaultHover",
                        label: "Surface Information Hover",
                      },
                      {
                        name: "information.defaultSubtle",
                        label: "Surface Information Subtle",
                      },
                      {
                        name: "information.defaultSubtleHover",
                        label: "Surface Information Subtle Hover",
                      },
                      {
                        name: "warning.default",
                        label: "Surface Warning Default",
                      },
                      {
                        name: "warning.defaultHover",
                        label: "Surface Warning Hover",
                      },
                      {
                        name: "warning.defaultSubtle",
                        label: "Surface Warning Subtle",
                      },
                      {
                        name: "warning.defaultSubtleHover",
                        label: "Surface Warning Subtle Hover",
                      },
                      { name: "default.default", label: "Surface Default" },
                      { name: "page.default", label: "Surface Page Default" },
                      {
                        name: "pageAlternative.default",
                        label: "Surface Page Alternative Default",
                      },
                      {
                        name: "alternative.default",
                        label: "Surface Alternative Default",
                      },
                    ].map((field) => {
                      const fieldPath =
                        `palette.${mode}.surface.${field.name}.color` as const;
                      const scalePath =
                        `palette.${mode}.surface.${field.name}.scale` as const;
                      const colorValue = methods.watch(fieldPath);
                      const scaleValue = methods.watch(scalePath);
                      return (
                        <div key={field.name} className="flex flex-col">
                          <span>{field.label}</span>
                          <Select
                            items={paletteColorOptions}
                            getKey={(item) => item.value}
                            getLabel={(item) => item.label}
                            value={colorValue as unknown as string}
                            onChange={(v) => methods.setValue(fieldPath, v)}
                          />
                          <Select
                            items={colorScales.map((s) => ({
                              value: s,
                              label: String(s),
                            }))}
                            getKey={(item) => item.value}
                            getLabel={(item) => item.label}
                            value={scaleValue as unknown as string}
                            onChange={(v) => methods.setValue(scalePath, v)}
                          />
                          <div
                            style={{
                              width: 24,
                              height: 24,
                              background: getColorPreview(
                                methods.getValues("base.color.collection") ??
                                  {},
                                methods.getValues("base.color.foundations") ??
                                  {},
                                colorValue,
                                scaleValue
                              ),
                              border: "1px solid #ccc",
                              marginTop: 4,
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <Button type="submit">Save Theme</Button>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

export default ThemeForm;
