export interface ISandBoxCode {
    html: string;
    css: string;
    js: string;
}

export type TeditorVariant = "html" | "css" | "js"

export type TeditorWidthVariant = "htmlWidth" | "cssWidth" | "jsWidth"


export interface IeditorDimentions {
    htmlWidth: number;
    cssWidth: number;
    jsWidth: number;
    smallScreen: boolean;
    showResult: boolean;
    textEditorsArray: TeditorVariant[];
}

export interface IscreenSize {
   height: number;
   width: number;
}

