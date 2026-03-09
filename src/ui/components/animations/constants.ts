import { Theme } from "@mui/material/styles";
import type { SystemStyleObject } from "@mui/system";

const defaultTransitions = {
  animationFillMode: "both",
  opacity: 0,
  transform: "translateY(20px)",
  animationDelay: "0.2s",
  animationIterationCount: 1,
  animationTimingFunction: "ease-out",
  animationDuration: "0.5s",
} as const;

const createAnimation = <X extends SystemStyleObject<Theme>>(styles: X): X => {
  return {
    ...defaultTransitions,
    ...styles,
  };
};

const fadeInUp = createAnimation({
  "@keyframes fadeInUp": {
    from: {
      opacity: 0,
      transform: "translateY(5px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  animationName: "fadeInUp",
  animationDelay: "0.5s",
});

const fadeInUpTranslateXY = createAnimation({
  "@keyframes fadeInUpTranslateXY": {
    from: {
      opacity: 0,
      transform: "translate3d(-5px, 5px, 0)",
    },
    to: {
      opacity: 1,
      transform: "translate3d(0, 0, 0)",
    },
  },
  animationName: "fadeInUpTranslateXY",
  animationDelay: "0.3s",
});

export { fadeInUp, fadeInUpTranslateXY };
