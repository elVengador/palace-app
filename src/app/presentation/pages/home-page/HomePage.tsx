import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from '../../../../core/presentation/atomic/atoms/Button/Button';
import { Title } from '../../../../core/presentation/atomic/atoms/Title/Title';
import { Footer } from '../../../../core/presentation/atomic/organisms/Footer/Footer';
import { Header } from '../../../../core/presentation/atomic/organisms/Header/Header';
import { Page } from '../../atomic/templates/Page/Page';

import './HomePage.scss';

export default function HomePage(): JSX.Element {

    const header = <Header />
    const footer = <Footer />

    const Home = () => (
        <div className='home-page'>
            <div className="logo" />
            <Title content='Palace' color='fg' size='lg' />
            <br />
            <p>
                Application to manage your notes as your second mind,
                it could became in your memory palace
            </p>
            <ul>
                <li>
                    <Link to="auth/sign-up" >
                        <Button content='Sign Up !' icon="running" size='lg' />
                    </Link>
                </li>
                <li>
                    <Link to="auth" >
                        <Button content='Sign In' color='dark' icon="sign-in-alt" />
                    </Link>
                </li>
            </ul>
        </div>
    )

    return (
        <Page main={Home()} header={header} footer={footer} />
    )
}
