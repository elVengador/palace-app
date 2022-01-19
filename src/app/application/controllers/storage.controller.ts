import { ReadLocalStorageInput, ReadSessionStorageInput, SaveLocalStorageInput, SaveSessionStorageInput } from "../../domain/storage/storage.entities";
import { ReadLocal, ReadSession, SaveLocal, SaveSession } from "../../domain/storage/storage.use-case";
import { storage } from '../../infraestructure/storage';

export const saveLocal: SaveLocal = (params: SaveLocalStorageInput) => {
    storage.saveLocalStorage(params)
}

export const readLocal: ReadLocal = (params: ReadLocalStorageInput) => {
    return storage.readLocalStorage(params)
}

export const saveSession: SaveSession = (params: SaveSessionStorageInput) => {
    storage.saveSessionStorage(params)
}

export const readSession: ReadSession = (params: ReadSessionStorageInput) => {
    return storage.readSessionStorage(params)
}
