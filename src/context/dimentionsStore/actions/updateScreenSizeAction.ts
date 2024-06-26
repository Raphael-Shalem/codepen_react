import { editorVariants, minEditorWidth } from "myConstants";
import { IeditorDimentions, IscreenSize } from "types";

export const updateScreenSizeAction = (editorDimentions: IeditorDimentions, screenSize: IscreenSize) => {

    const newWidth = screenSize.width;
    const newHeight = screenSize.height;
    const minimizeScreen = newWidth < 700 || newHeight < 450;

    const { htmlWidth, cssWidth, smallScreen } = editorDimentions;

        let newHtmlWidth = htmlWidth;
        let newCssWidth = cssWidth;
        let newJsWidth = Math.max(minEditorWidth, newWidth - htmlWidth - cssWidth);

        if ( newJsWidth === minEditorWidth ) {
            newCssWidth = Math.max(minEditorWidth, newWidth - htmlWidth);
        }

        if ( newCssWidth === minEditorWidth ) {
            newHtmlWidth = newWidth - minEditorWidth;
        }

        if ( minimizeScreen && !smallScreen ) {
            editorDimentions.smallScreen = true
            editorDimentions.textEditorsArray = ['html']
            editorDimentions.htmlWidth = window.innerWidth/3
            editorDimentions.cssWidth = window.innerWidth/3
            editorDimentions.jsWidth = window.innerWidth/3
        }
        if ( !minimizeScreen && smallScreen ) {
            editorDimentions.smallScreen = false
            editorDimentions.textEditorsArray = editorVariants
        }

        editorDimentions.htmlWidth = newHtmlWidth;
        editorDimentions.cssWidth = newCssWidth;
        editorDimentions.jsWidth = newJsWidth;

}