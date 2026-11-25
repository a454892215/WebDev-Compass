import {
  ColorAction,
  SpacingControl,
  ShadowCard,
} from "../dist/tokens/tokens.js";
const action: string = ColorAction;
const spacing: string = SpacingControl;
const shadowColor: string = ShadowCard.color;
// @ts-expect-error Generated color tokens are strings, not numeric values.
const wrong: number = ColorAction;
void [action, spacing, shadowColor, wrong];
