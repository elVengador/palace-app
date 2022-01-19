import { ReadLocalStorageInput, ReadSessionStorageInput, SaveLocalStorageInput, SaveSessionStorageInput } from "../../domain/storage/storage.entities"

export const saveLocalStorage = ({ key, value }: SaveLocalStorageInput): void => {
    localStorage.setItem(key, value)
}

export const saveSessionStorage = ({ key, value }: SaveSessionStorageInput): void => {
    sessionStorage.setItem(key, value)
}

export const readLocalStorage = ({ key }: ReadLocalStorageInput): string | null => {
    return localStorage.getItem(key)
}

export const readSessionStorage = ({ key }: ReadSessionStorageInput): string | null => {
    return sessionStorage.getItem(key)
}
