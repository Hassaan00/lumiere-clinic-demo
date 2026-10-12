import type { Config } from "tailwindcss";
const config: Config = { content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: { extend: { colors: { gold: { DEFAULT: "#B8954A", light: "#D9C08A", dark: "#8C6D2E" }, cream: { DEFAULT: "#FBF6EC", dark: "#F1E7D3" }, ink: "#2A2418" },
  fontFamily: { serif: ["Georgia", "Cambria", "serif"] } } }, plugins: [] };
export default config;
