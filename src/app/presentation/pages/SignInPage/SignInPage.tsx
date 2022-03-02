import React from 'react'

import './SignInPage.scss';
import { Footer2 } from '../../../../core/presentation/atomic/organisms/Footer/Footer';
import { Page } from '../../atomic/templates/Page/Page';
import { FormSignIn } from '../../atomic/organisms/FormSignIn/FormSignIn';
import { Header2 } from '../../../../core/presentation/atomic/organisms/Header2/Header';
// import { AlertContext } from '../../../../App';  // <-- add context

export default function SignIn(): JSX.Element {
    // const ss = useContext(AlertContext);         // <-- getAlertContext
    const header = <Header2 />
    const footer = <Footer2 />
    const main = <div className="sign-up--wrapper">
        <FormSignIn />
    </div>

    return (
        <Page main={main} header={header} footer={footer} />
    )
}
