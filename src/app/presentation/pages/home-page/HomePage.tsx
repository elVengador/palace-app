import React from 'react'
import { Link } from 'react-router-dom';
// import { useNote } from '../../../application/controllers/note.controller'

import './HomePage.scss';

export default function HomePage(): JSX.Element {

    return (
        <div className='home-page'>
            <h1>Palace</h1>
            <div className="logo" />
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
                <li>
                    <Link to="tags" >tags</Link>
                </li>
            </ul>
        </div>
    )
}

