import React, { useContext, createContext, useRef } from 'react';
import { makeAutoObservable } from 'mobx';
import { IcodeType } from 'types';


export default class SandBoxStore {

    code: IcodeType = {
        html: "",
        css: "",
        js: ""
    }

    constructor() {
        makeAutoObservable(this);
    }

    updateSandBox = (input: Partial<IcodeType>) => {
          Object.assign(this.code, input)
    };

}


const SandBoxStoreContext = createContext<SandBoxStore>({} as SandBoxStore);

export const useSandBoxStore = () => useContext(SandBoxStoreContext);


type PropsType = {
    children: React.ReactNode;
};

export const SandBoxStoreProvider = ({ children }: PropsType) => {

    const store = useRef(new SandBoxStore());
   
    return <SandBoxStoreContext.Provider value={store.current}>{children}</SandBoxStoreContext.Provider>;
};
