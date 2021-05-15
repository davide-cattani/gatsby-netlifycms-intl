import defaultColors from "../util/default-colors.json"
import { lightness, transparentize, darken } from "@theme-ui/color"
const theme = {
  colors: {
    ...defaultColors,
    text: defaultColors.text,
    background: defaultColors.background,
    primary: defaultColors.siteColor,
    muted: transparentize(defaultColors.text, 0.7),
    cardBg: defaultColors.background,
    borderColor: lightness(defaultColors.background, 0.5),
    inputBorder: lightness(defaultColors.background, 0.5),
    inputBackground: defaultColors.background,
    socialIcons: lightness("siteColor", 0.4),
    socialIconsHover: lightness("siteColor", 0.3),
    buttonColor: lightness("siteColor", 0.7),
    buttonHoverBg: lightness("siteColor", 0.4),
    buttonHoverColor: lightness("siteColor", 0.6),
  },
  links: {
    postLink: {
      color: "muted",
      "&:hover": {
        color: "text",
      },
    },
  },
  variants: {
    button: {
      bg: "siteColor",
      color: "buttonColor",
      "&:hover": {
        bg: "buttonHoverBg",
        color: "buttonHoverColor",
      },
    },
    socialIcons: {
      a: {
        color: "socialIcons",
        ":hover": {
          color: "socialIconsHover",
        },
      },
    },
  },
}

export default theme
