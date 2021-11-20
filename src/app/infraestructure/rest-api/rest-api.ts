import { LOCAL_URI } from "./enviroments"

export const GET = async<R, P = never>(url: string, params?: P): Promise<R> => {
    const res = await fetch(`${LOCAL_URI}${url}`, {
        body: params ? JSON.stringify(params) : undefined
    })
    return <R>await res.json()
}

export const POST = async<R, P = never>(url: string, params?: P): Promise<R> => {
    const res = await fetch(`${LOCAL_URI}${url}`, {
        method: 'POST',
        body: params ? JSON.stringify(params) : undefined
    })
    return <R>await res.json()
}

