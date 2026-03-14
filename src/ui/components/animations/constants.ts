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
  "@keyframes floatInFocus": {
    "0%": {
      opacity: 0,
      filter: "blur(14px)",
      transform: "translate3d(0, 32px, 0) scale(0.94) rotate(-0.6deg)",
    },
    "65%": {
      opacity: 1,
      filter: "blur(0)",
      transform: "translate3d(0, -6px, 0) scale(1.01) rotate(0deg)",
    },
    "100%": {
      opacity: 1,
      filter: "blur(0)",
      transform: "translate3d(0, 0, 0)",
    },
  },
  animationName: "floatInFocus",
  animationDelay: "0.15s",
  animationDuration: "0.85s",
  animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
  transformOrigin: "50% 60%",
  willChange: "transform, opacity, filter",
});

export { fadeInUp, fadeInUpTranslateXY };
