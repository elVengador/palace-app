import { ReadLocalStorageInput, ReadSessionStorageInput, SaveLocalStorageInput, SaveSessionStorageInput, StorageOutput } from "./storage.entities"

export type SaveLocal = (params: SaveLocalStorageInput) => void
export type SaveSession = (params: SaveSessionStorageInput) => void
export type ReadLocal = (params: ReadLocalStorageInput) => StorageOutput
export type ReadSession = (params: ReadSessionStorageInput) => StorageOutput
