import { createMakeStyles } from "tss-react";

export const theme = {
   black:    '#111',
   darkGrey: '#23232A'
}

function useTheme() {
    return theme;
}

export const { makeStyles } = createMakeStyles({ useTheme });