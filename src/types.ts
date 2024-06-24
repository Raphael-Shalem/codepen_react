export interface ISandBoxCode {
    html: string;
    css: string;
    js: string;
}

export type TeditorVariant = "html" | "css" | "js"

export type TeditorWidthVariant = "htmlWidth" | "cssWidth" | "jsWidth"


export interface Idimentions {
    htmlWidth: number;
    cssWidth: number;
    jsWidth: number;
}