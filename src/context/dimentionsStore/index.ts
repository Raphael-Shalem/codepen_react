import { makeAutoObservable } from 'mobx';
import { initialState } from './initialState';
import { updateDimentionsAction } from './actions/updateDimentionsAction';
import { updateScreenSizeAction } from './actions/updateScreenSizeAction';


export default class DimentsionsStore {

    dimentions = initialState;

    constructor() {
        makeAutoObservable(this);
    }

    updateDimentions = (variant: string, newWidth: number) => {
        updateDimentionsAction(this.dimentions, variant, newWidth)
    };

    updateScreenSize = (screenWidth: number) => {
        updateScreenSizeAction(this.dimentions, screenWidth)
    };

}

