import React, { useEffect } from 'react'

import './SignInPage.scss';
import { Footer } from '../../atomic/organisms/Footer/Footer';
// import { FormSignUp } from '../../atomic/organisms/FormSignUp/FormSignUp';
import { Header } from '../../atomic/organisms/Header/Header';
import { Page } from '../../atomic/templates/Page/Page';
import { FormSignIn } from '../../atomic/organisms/FormSignIn/FormSignIn';

export default function SignIn(): JSX.Element {

    useEffect(() => {
        console.log('main useefect');
    }, [])


    const header = <Header title="Mind Notes" />
    const footer = <Footer title="2021 - elVengador" />
    const main = <div className="sign-up--wrapper">
        <FormSignIn />
    </div>

    return (
        <Page main={main} header={header} footer={footer} />
    )
}

