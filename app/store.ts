import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react"

class Store {
    teste = 'Teste mobx'
    userData = {}

    constructor() {
        makeAutoObservable(this)
    }

    // Actions
    changeTeste = (word: string) => {
        this.teste = word
    }
}

const store = new Store()

const StoreContext = createContext(store)

export const useStoreContext = () => useContext(StoreContext)

export default store
