export const saveLocalStorage = (key: string, value: string): void => {
    localStorage.setItem(key, value)
}

export const saveSessionStorage = (key: string, value: string): void => {
    sessionStorage.setItem(key, value)
}

export const readLocalStorage = (key: string): string | null => {
    return localStorage.getItem(key)
}

export const readSessionStorage = (key: string): string | null => {
    return sessionStorage.getItem(key)
}
