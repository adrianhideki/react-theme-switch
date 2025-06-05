import type { Theme } from "./types";

export const defaultTheme: Theme = {
  name: "default",
  id: crypto.randomUUID().toString(),
  colors: {
    primary: {
      main: { light: "#bb86fc", dark: "#3700b3" },
      contrast: { dark: "#ffffff", light: "#000000" },
    },
    secondary: {
      main: { light: "#66fff9", dark: "#03dac6" },
      contrast: { dark: "#000000", light: "#000000" },
    },
    background: {
      main: { light: "#ffffff", dark: "#121212" },
      contrast: { dark: "#ffffff", light: "#000000" },
    },
    text: {
      main: { light: "#000000", dark: "#ffffff" },
      contrast: { dark: "#ffffff", light: "#000000" },
    },
    border: {
      main: { light: "#e0e0e0", dark: "#424242" },
      contrast: { dark: "#ffffff", light: "#000000" },
    },
    error: {
      main: { light: "#ffcccb", dark: "#b00020" },
      contrast: { dark: "#ffffff", light: "#000000" },
    },
    success: {
      main: { light: "#c8e6c9", dark: "#388e3c" },
      contrast: { dark: "#ffffff", light: "#000000" },
    },
    warning: {
      main: { light: "#fff3e0", dark: "#f57c00" },
      contrast: { dark: "#ffffff", light: "#000000" },
    },
    info: {
      main: { light: "#bbdefb", dark: "#1976d2" },
      contrast: { dark: "#ffffff", light: "#000000" },
    },
    paper: {
      main: { light: "#f5f5f5", dark: "#1e1e1e" },
      contrast: { dark: "#ffffff", light: "#000000" },
    },
    tertiary: {
      main: { light: "#ffeb3b", dark: "#fbc02d" },
      contrast: { dark: "#000000", light: "#000000" },
    },
  },
  fonts: {
    h1: {
      size: "2rem",
      family: "Arial, sans-serif",
      weight: 750,
    },
    h2: {
      size: "1.75rem",
      family: "Arial, sans-serif",
      weight: 750,
    },
    h3: {
      size: "1.5rem",
      family: "Arial, sans-serif",
      weight: 750,
    },
    h4: {
      size: "1.25rem",
      family: "Arial, sans-serif",
      weight: 750,
    },
    h5: {
      size: "1rem",
      family: "Arial, sans-serif",
      weight: 750,
    },
    h6: {
      size: "0.875rem",
      family: "Arial, sans-serif",
      weight: 750,
    },
    subtitle: {
      size: "0.875rem",
      family: "Arial, sans-serif",
      weight: 600,
    },
    "subtitle-secondary": {
      size: "0.875rem",
      family: "Arial, sans-serif",
      weight: 500,
    },
    body: {
      size: "1rem",
      family: "Arial, sans-serif",
      weight: 500,
    },
    "body-secondary": {
      size: "0.875rem",
      family: "Arial, sans-serif",
      weight: 500,
    },
    button: {
      size: "0.875rem",
      family: "Arial, sans-serif",
      weight: 500,
    },
    caption: {
      size: "0.75rem",
      family: "Arial, sans-serif",
      weight: 500,
    },
  },
  spacing: 8,
  radius: 0,
};
