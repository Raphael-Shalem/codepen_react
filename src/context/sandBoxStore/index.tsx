import { makeAutoObservable } from 'mobx';
import { Icode } from 'types';
import { initialState } from './initialState';


export default class SandBoxStore {

    code: Icode = initialState;

    constructor() {
        makeAutoObservable(this);
    }

    updateSandBox = (input: Partial<Icode>) => {
          Object.assign(this.code, input)
    };

}

