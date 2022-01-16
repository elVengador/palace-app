import React, { useEffect } from 'react'

import './SignIn.scss';
import { Footer } from '../../atomic/organisms/Footer/Footer';
// import { FormSignUp } from '../../atomic/organisms/FormSignUp/FormSignUp';
import { Header } from '../../atomic/organisms/Header/Header';
import { Page } from '../../atomic/templates/Page/Page';

export default function SignIn(): JSX.Element {

    useEffect(() => {
        console.log('main useefect');
    }, [])


    const header = <Header title="Mind Notes" />
    const footer = <Footer title="2021 - elVengador" />
    const main = <div className="sign-up--wrapper">
        {/* <FormSignUp /> */}
        <h1>SignIn</h1>
    </div>

    return (
        <Page main={main} header={header} footer={footer} />
    )
}

