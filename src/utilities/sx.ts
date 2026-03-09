import type { SxProps, Theme } from "@mui/material/styles";

const mergeSxProps = (
  ...sx: Array<SxProps<Theme> | undefined | false>
): SxProps<Theme> => {
  const valid = sx.filter(Boolean) as SxProps<Theme>[];

  if (valid.length === 0) return {};

  return valid.reduce<SxProps<Theme>>((acc, curr) => {
    // handle function-style sx props by resolving both against the theme
    if (typeof acc === "function" || typeof curr === "function") {
      return (theme) => {
        const accVal = typeof acc === "function" ? acc(theme) : acc;
        const currVal = typeof curr === "function" ? curr(theme) : curr;
        return { ...(accVal as object), ...(currVal as object) };
      };
    }

    // merge arrays by concatenation
    if (Array.isArray(acc) || Array.isArray(curr)) {
      const accArr = Array.isArray(acc) ? acc : [acc];
      const currArr = Array.isArray(curr) ? curr : [curr];
      return [...accArr, ...currArr] as SxProps<Theme>;
    }

    // plain object merge
    return { ...(acc as object), ...(curr as object) };
  }, {} as SxProps<Theme>);
};

export { mergeSxProps };
