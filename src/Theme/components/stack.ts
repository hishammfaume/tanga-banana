import type { ThemeOptions } from "@mui/material/styles";

const Stack: ThemeOptions["components"] = {
  MuiStack: {
    defaultProps: {
      direction: "column",
    },
    styleOverrides: {
      root: {
        marginLeft: 0,
      },
    },
  },
};

export default Stack;
