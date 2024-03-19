import type { Config } from "tailwindcss";
import { createThemes } from "tw-colors";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        createThemes(
            {
                blue: {
                    primary: "#131167",
                    secondary: "#e5e7fd",
                },
                orange: {
                    primary: "#d38122",
                    secondary: "#f5e1ce",
                },
            },
            { defaultTheme: "blue" }
        ),
    ],
};
export default config;
