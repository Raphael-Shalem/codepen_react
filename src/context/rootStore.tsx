import React, { useContext, createContext, useRef } from 'react';
import SandBoxStore from './sandBoxStore';
import DimentsionsStore from './dimentionsStore';



export default class RootStore {

    sandBoxStore: SandBoxStore;
    dimentsionsStore: DimentsionsStore;

    constructor() {
        this.sandBoxStore = new SandBoxStore();
        this.dimentsionsStore = new DimentsionsStore();
    }
}


const RootStoreContext = createContext<RootStore>({} as RootStore);

export const useStore = () => useContext(RootStoreContext);

type PropsType = {
    children: React.ReactNode;
};

export const RootStoreProvider = ({ children }: PropsType) => {

    const store = useRef(new RootStore());
   
    return <RootStoreContext.Provider value={store.current}>{children}</RootStoreContext.Provider>;
};
