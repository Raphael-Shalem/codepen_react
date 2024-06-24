import { makeAutoObservable } from 'mobx';
import { ISandBoxCode } from 'types';
import { initialState } from './initialState';


export default class SandBoxStore {

    sandBoxCode: ISandBoxCode = initialState;

    constructor() {
        makeAutoObservable(this);
    }

    updateSandBox = (input: Partial<ISandBoxCode>) => {
          Object.assign(this.sandBoxCode, input)
    };

}

