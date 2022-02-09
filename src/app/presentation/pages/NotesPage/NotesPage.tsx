import React from 'react'

import './NotesPage.scss';
import { Footer } from '../../../../core/presentation/atomic/organisms/Footer/Footer';
import { Header } from '../../../../core/presentation/atomic/organisms/Header/Header';
import { Page } from '../../atomic/templates/Page/Page';
import { Notes } from '../../atomic/organisms/Notes/Notes';
import { Menu } from '../../../../core/presentation/atomic/organisms/Menu/Menu';

export default function NotesPage(): JSX.Element {

    const header = <Header />
    const footer = <Footer />
    const main = <Notes title="Notes" />
    const leftMenu = <Menu />

    return (
        <Page main={main} header={header} footer={footer} leftMenu={leftMenu} />
    )
}

