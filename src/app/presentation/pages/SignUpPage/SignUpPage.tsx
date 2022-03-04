import React from 'react'

import './SignUpPage.scss';
// import { Footer } from '../../../../core/presentation/atomic/organisms/Footer/Footer';
import { FormSignUp } from '../../atomic/organisms/FormSignUp/FormSignUp';
// import { Header } from '../../../../core/presentation/atomic/organisms/Header/Header';
import { Page } from '../../atomic/templates/Page/Page';
import { Header } from '../../../../core/presentation/atomic/organisms/Header/Header';
import { Footer } from '../../../../core/presentation/atomic/organisms/Footer/Footer';

export default function SignUp(): JSX.Element {

    const header = <Header />
    const footer = <Footer />
    const main = <div className="sign-up--wrapper">
        <FormSignUp />
    </div>

    return (
        <Page main={main} header={header} footer={footer} />
    )
}

