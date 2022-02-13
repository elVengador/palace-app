import React from 'react'

import './NotePage.scss';
import { Footer } from '../../../../core/presentation/atomic/organisms/Footer/Footer';
import { Header } from '../../../../core/presentation/atomic/organisms/Header/Header';
import { Page } from '../../atomic/templates/Page/Page';
import { Menu } from '../../../../core/presentation/atomic/organisms/Menu/Menu';
import { NotesOperations } from '../../atomic/organisms/NoteOperations/NoteOperations';

export default function NotesPage(): JSX.Element {

    const header = <Header />
    const footer = <Footer />
    const leftMenu = <Menu />
    const main = <NotesOperations />

    return (
        <Page main={main} header={header} footer={footer} leftMenu={leftMenu} />
    )
}

