import React, { useEffect } from 'react'
import { useNote } from '../../../infraestructure/controllers/note.controller'
// import { api } from '../../../infraestructure/rest-api'

// interface Pokemon {
//     name: string,
//     sprites: {
//         front_default: string
//     }
// }

export default function HomePage(): JSX.Element {
    const { notes } = useNote()
    // const [pokemon, setPokemon] = useState<Pokemon | null>(null)

    useEffect(() => {
        console.log('main useefect');
    }, [])

    return (
        <div>
            {notes.map(cur => (<div key={cur.id}>{cur.text}</div>))}
        </div>
    )
}

