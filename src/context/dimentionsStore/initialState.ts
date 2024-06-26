import { TeditorVariant } from "types";

export const initialState = {
   htmlWidth: window.innerWidth/3,
   cssWidth: window.innerWidth/3,
   jsWidth: window.innerWidth/3,
   textEditorsArray: ['html', 'css', 'js'] as TeditorVariant[],
   smallScreen: false,
   showResult: true
}
