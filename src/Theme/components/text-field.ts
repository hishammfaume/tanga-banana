import type { ThemeOptions } from "@mui/material/styles";

const TextField: ThemeOptions["components"] = {
  MuiTextField: {
    styleOverrides: {},
    defaultProps: {
      slotProps: {
        input: {
          sx(theme) {
            return {
              ...theme.typography.body2,
            };
          },
        },
      },
    },
  },

  MuiFormLabel: {
    styleOverrides: {
      root: {
        fontSize: ".87rem",
        marginTop: ".13rem",
      },
    },
  },
};

declare module "@mui/material/TextField" {}

export default TextField;
