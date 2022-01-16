import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useNote } from '../../../application/controllers/note.controller'

import './HomePage.scss';

export default function HomePage(): JSX.Element {
    const { notes } = useNote()
    // const [pokemon, setPokemon] = useState<Pokemon | null>(null)

    useEffect(() => {
        console.log('main useefect');
    }, [])

    return (
        <div >
            <h1>-- Mind Notes --</h1>
            <ul>
                <li>
                    <Link to="auth" >Sign In</Link>
                </li>
                <li>
                    <Link to="auth/sign-up" >Sign Up</Link>
                </li>
                <li>
                    <Link to="user" >User</Link>
                </li>
                <li>
                    <Link to="notes" >Notes</Link>
                </li>
            </ul>

            <div className='bg-2'>
                {notes.map(cur => (<div key={cur.id}>{cur.text}</div>))}
            </div>
            <div className="logo">

            </div>
        </div>
    )
}

