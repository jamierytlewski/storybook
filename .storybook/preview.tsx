import type { Preview } from "@storybook/react";
import {
  withThemeByDataAttribute,
  withThemeByClassName,
} from "@storybook/addon-styling";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export const decorators = [
  withThemeByDataAttribute({
    themes: {
      light: "light",
      dark: "dark",
    },
    defaultTheme: "light",
    attributeName: "data-mode",
  }), // Adds theme switching support.
  withThemeByClassName({
    themes: {
      light: "light",
      dark: "dark",
    },
    defaultTheme: "light",
  }), // Adds theme switching support.
  (Story) => (
    <BrowserRouter>
      {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
      <Story />
    </BrowserRouter>
  ), // NOTE: requires setting "darkMode" to "class" in your tailwind config
];

export default preview;
