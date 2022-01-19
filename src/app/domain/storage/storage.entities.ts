export interface SaveLocalStorageInput {
    key: string,
    value: string
}

export interface SaveSessionStorageInput {
    key: string,
    value: string
}

export interface ReadLocalStorageInput {
    key: string
}

export interface ReadSessionStorageInput {
    key: string
}

export type StorageOutput = string | null
