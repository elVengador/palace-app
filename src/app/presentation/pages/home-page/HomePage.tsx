import React, { useEffect } from 'react'
import { useNote } from '../../../application/controllers/note.controller'
// import { desicions } from '../../../infraestructure/utils/design-tokens';
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
        <div >
            <h1>Home PAge</h1>
            <div className='bg-2'>
                {notes.map(cur => (<div key={cur.id}>{cur.text}</div>))}
            </div>
        </div>
    )
}

