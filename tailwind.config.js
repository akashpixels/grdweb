/** @type {Config} */

const config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.2s ease-out infinite",
      },
      height: {
        inherit: "inherit",
      },
      colors: {
        "custom-primary": "#111827",
        "custom-secondary": "#F9B03C",
        "custom-subSecondary": "#FDEBC8",
        "custom-white": "#F9F9F8",
        "custom-blue": "#3FB9B5",
        "custom-orange": "#EEA839",
        "custom-dark-orange": "#F03307",
        "custom-jungle-green": "#1d8484",
      },
      textColor: {
        "custom-primary": "#111827",
        "custom-secondary": "#F9B03C",
        "custom-subSecondary": "#FDEBC8",
        "custom-white": "#d0d0d0",
        "custom-blue": "#F1F5F9",
        "custom-orange": "#EEA839",
        "custom-dark-orange": "#F03307",
        "custom-jungle-green": "#1d8484",
      },

      borderColor: (theme) => ({
        primary: theme("colors.custom-primary"),
        secondary: theme("colors.custom-secondary"),
        subSecondary: theme("colors.custom-subSecondary"),
      }),
    },
  },
  plugins: [],
};

export default config;
