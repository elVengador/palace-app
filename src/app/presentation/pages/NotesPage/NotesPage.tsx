import React from 'react'

import './NotesPage.scss';
import { Footer } from '../../atomic/organisms/Footer/Footer';
import { Header } from '../../atomic/organisms/Header/Header';
import { Page } from '../../atomic/templates/Page/Page';
import { Notes } from '../../atomic/organisms/Notes/Notes';

export default function NotesPage(): JSX.Element {

    const header = <Header title="Mind Notes" />
    const footer = <Footer title="2021 - elVengador" />
    const main = <Notes title="Notes" />

    return (
        <Page main={main} header={header} footer={footer} />
    )
}

