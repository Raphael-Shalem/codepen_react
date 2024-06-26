import { makeAutoObservable } from 'mobx';
import { initialState } from './initialState';
import { updateDimentionsAction } from './actions/updateDimentionsAction';
import { updateScreenSizeAction } from './actions/updateScreenSizeAction';
import { IscreenSize, TeditorVariant } from 'types';


export default class DimentsionsStore {

    editorDimentions = initialState;

    constructor() {
        makeAutoObservable(this);
    }

    updateDimentions = (variant: string, newWidth: number) => {
        updateDimentionsAction(this.editorDimentions, variant, newWidth)
    };

    updateScreenSize = (screenSize: IscreenSize ) => {
        updateScreenSizeAction(this.editorDimentions, screenSize)
    };

    toggleShowResult = () => {
        this.editorDimentions.showResult = !this.editorDimentions.showResult
    };

    selectEditor = (val: TeditorVariant) => {
        this.editorDimentions.textEditorsArray = [`${ val }`]
    };

}

