import React from 'react'

import './SignInPage.scss';
import { Footer2 } from '../../../../core/presentation/atomic/organisms/Footer/Footer';
import { Header } from '../../../../core/presentation/atomic/organisms/Header/Header';
import { Page } from '../../atomic/templates/Page/Page';
import { FormSignIn } from '../../atomic/organisms/FormSignIn/FormSignIn';
// import { AlertContext } from '../../../../App';  // <-- add context

export default function SignIn(): JSX.Element {
    // const ss = useContext(AlertContext);         // <-- getAlertContext
    const header = <Header />
    const footer = <Footer2 />
    const main = <div className="sign-up--wrapper">
        <FormSignIn />
    </div>

    // const cc = () => ss?.addSA(Math.random().toString()) // <-- create function

    return (
        <Page main={main} header={header} footer={footer} />
    )
}
