import type { Config } from "tailwindcss";
const { heroui } = require("@heroui/react");
const path = require("path"); // 👈 Importando o manipulador de caminhos

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // 👇 A MÁGICA ACONTECE AQUI (Garante que o Windows ache a pasta)
    path.join(__dirname, "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"),
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};
export default config;