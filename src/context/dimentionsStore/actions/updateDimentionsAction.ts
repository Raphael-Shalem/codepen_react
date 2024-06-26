import { minEditorWidth } from "myConstants";
import { IeditorDimentions } from "types";


export const updateDimentionsAction = (editorDimentions: IeditorDimentions, variant: string, newWidth: number) => {

    const { htmlWidth, cssWidth } = editorDimentions;

    if (variant === 'html') {

        let newWidthHtml = Math.max(minEditorWidth*2, newWidth);
        let newWidthCss  = Math.max(minEditorWidth,(cssWidth + htmlWidth - newWidth))
        let newWidthJs   = Math.max(minEditorWidth, window.innerWidth - newWidthHtml - newWidthCss)

        if ( newWidth <= minEditorWidth*2 ) {
            newWidthHtml = minEditorWidth*2;
            newWidthCss = cssWidth + (htmlWidth - minEditorWidth*2)
        }

        if (newWidthHtml > htmlWidth && (newWidthHtml + newWidthCss + newWidthJs - minEditorWidth > window.innerWidth)) {
            return
        }

        editorDimentions.htmlWidth = newWidthHtml;
        editorDimentions.cssWidth = newWidthCss;
        editorDimentions.jsWidth = newWidthJs;
       
    }
    
    if (variant === 'css') {

        const newWidthHtml = Math.max(minEditorWidth*2, htmlWidth + newWidth);
        const newWidthCss  = Math.max(minEditorWidth, newWidth - minEditorWidth)
        let   newWidthJs   = Math.max(minEditorWidth, window.innerWidth - htmlWidth - newWidthCss)

        if (newWidth <= 0) {
            newWidthJs = window.innerWidth - newWidthHtml - newWidthCss
            editorDimentions.htmlWidth = newWidthHtml;
        }

        editorDimentions.jsWidth = newWidthJs;

         if ( newWidthCss + htmlWidth + newWidthJs > window.innerWidth) {
             return
         }

        editorDimentions.cssWidth = newWidthCss
    }
    
};