import React from 'react'

import './SignInPage.scss';
import { Footer } from '../../../../core/presentation/atomic/organisms/Footer/Footer';
import { Page } from '../../atomic/templates/Page/Page';
import { FormSignIn } from '../../atomic/organisms/FormSignIn/FormSignIn';
import { Header } from '../../../../core/presentation/atomic/organisms/Header/Header';

export default function SignIn(): JSX.Element {
    const header = <Header />
    const footer = <Footer />
    const main = <div className="sign-up--wrapper">
        <FormSignIn />
    </div>

    return (
        <Page main={main} header={header} footer={footer} />
    )
}
