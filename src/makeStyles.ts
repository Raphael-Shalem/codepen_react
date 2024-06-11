import { createMakeStyles } from "tss-react";
const primary = '#3677CB';

export const theme = {
   // "blue":         '#3AE',
    "darkBlue":     '#29D',
    "brightBlue":   '#4BF',
    "green":        '#3B9',
    "darkGreen":    '#2A8',
  //  "red":          "#E56",
    "darkRed":      "#D45",
    "normalFont":   22,
    "buttonShadow": '2px 3px 4px rgba(0,0,0,0.2)',
    primary:       primary,
    primaryDark:   '#1657AB',
    red:           '#E34',
    primaryBright: '#0647FF33',
    secondary:     '#D55950',
    darkText:      '#445',
    brightText:    '#99A',
    hoverText:     '#BBC',
    blueText:      primary,
    blue:          '#3351AB',
    button:        '#DDDDEA',
    menu:          primary,
    gridUnit:      primary,
    gridUnitRed:   '#F44',
    navBar:        '#FF7666',
    menuText:      '#334',
    brightGrey:    '#F8F8F9',
    brightGrey2:   '#EEEEF1',
    brightGrey3:   '#E9E9EF',
    temp:          primary,
    toolTip:       '#111111B0'
}

function useTheme() {
    return theme;
}

export const { makeStyles } = createMakeStyles({ useTheme });