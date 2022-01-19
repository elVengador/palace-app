import React, { useEffect } from 'react'

import './NotePage.scss';
import { Footer } from '../../atomic/organisms/Footer/Footer';
// import { FormSignUp } from '../../atomic/organisms/FormSignUp/FormSignUp';
import { Header } from '../../atomic/organisms/Header/Header';
import { Page } from '../../atomic/templates/Page/Page';
// import { Notes } from '../../atomic/organisms/Notes/Notes';
// import { Main } from '../../atomic/molecules/Main/Main';

export default function NotesPage(): JSX.Element {

    useEffect(() => {
        console.log('main useefect');
    }, [])


    const header = <Header title="Mind Notes" />
    const footer = <Footer title="2021 - elVengador" />
    const main = <h1>Note operations</h1>

    return (
        <Page main={main} header={header} footer={footer} />
    )
}

