import { minEditorWidth } from "constants";
import { Idimentions } from "types";


export const updateScreenSizeAction = (dimentions: Idimentions, newWidth: number) => {
    const { htmlWidth, cssWidth } = dimentions;

        let newHtmlWidth = htmlWidth;
        let newCssWidth = cssWidth;
        let newJsWidth = Math.max(minEditorWidth, newWidth - htmlWidth - cssWidth);

        if ( newJsWidth === minEditorWidth ) {
            newCssWidth = Math.max(minEditorWidth, newWidth - htmlWidth);
        }

        if ( newCssWidth === minEditorWidth ) {
            newHtmlWidth = newWidth;
        }

        dimentions.htmlWidth = newHtmlWidth;
        dimentions.cssWidth = newCssWidth;
        dimentions.jsWidth = newJsWidth;
}