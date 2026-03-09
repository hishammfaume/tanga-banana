import type { ThemeOptions } from "@mui/material/styles";

const Card: ThemeOptions["components"] = {
  MuiCard: {
    styleOverrides: {
      root({ theme, elevation = 4 }) {
        return {
          boxShadow: theme.shadows[elevation],
          ...(elevation === 0 && {
            boxShadow: "none",
          }),
        };
      },
    },
  },
};

export default Card;
