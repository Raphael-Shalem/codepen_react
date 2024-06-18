import { minEditorWidth } from "constants";
import { Idimentions } from "types";


export const updateDimentionsAction = (dimentions: Idimentions, variant: string, newWidth: number) => {

    const { htmlWidth, cssWidth } = dimentions;

    if (variant === 'html') {

        let newWidthHtml = Math.max(minEditorWidth*2, newWidth);
        let newWidthCss  = Math.max(minEditorWidth,(cssWidth + htmlWidth - newWidth))
        let newWidthJs   = Math.max(minEditorWidth, window.innerWidth - newWidthHtml - newWidthCss)

        if (newWidthHtml + newWidthCss + newWidthJs > window.innerWidth) {
            return
        }

        if ( newWidth <= minEditorWidth*2 ) {
            newWidthHtml = minEditorWidth*2;
            newWidthCss = cssWidth + (htmlWidth - minEditorWidth*2)
        }

        dimentions.htmlWidth = newWidthHtml;
        dimentions.cssWidth = newWidthCss;
        dimentions.jsWidth = newWidthJs;
       
    }
    
    if (variant === 'css') {
        const newWidthHtml = Math.max(minEditorWidth*2, htmlWidth + newWidth);
        const newWidthCss  = Math.max(minEditorWidth, newWidth - minEditorWidth)
        let   newWidthJs   = Math.max(minEditorWidth, window.innerWidth - htmlWidth - newWidthCss)

        
        if (newWidth <= 0) {
            newWidthJs = window.innerWidth - newWidthHtml - newWidthCss
            dimentions.htmlWidth = newWidthHtml;
        }

        dimentions.cssWidth = newWidthCss
        dimentions.jsWidth = newWidthJs;
    }
    
};