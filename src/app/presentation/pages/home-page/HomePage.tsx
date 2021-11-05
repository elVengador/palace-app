import React, { useEffect, useState } from 'react'
import { api } from '../../../infraestructure/rest-api'

interface Pokemon {
    name: string,
    sprites: {
        front_default: string
    }
}

export default function HomePage(): JSX.Element {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null)

    useEffect(() => {
        console.log('call poke', 1);
        const a = async () => {
            console.log('call into async');
            const res = await api.GET<Pokemon>('pokemon/ditto')
            console.log('res', res);
            setPokemon(res)
        }
        a()
    }, [])
    // const pokemon = async () => await api.GET<number, Empty>('pokemon/2', {})
    console.log('POKEMON:', pokemon);

    return (
        <div>
            {
                pokemon && <img src={pokemon.sprites.front_default} />
            }
            {pokemon && ` Hola ${pokemon['name']}`}
            {!pokemon && 'No hay pokemon :('}
        </div>
    )
}

