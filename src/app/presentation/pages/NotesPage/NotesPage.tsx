import React from 'react'

import './NotesPage.scss';
import { Header } from '../../../../core/presentation/atomic/organisms/Header/Header';
import { Page } from '../../atomic/templates/Page/Page';
import { Notes } from '../../atomic/organisms/Notes/Notes';
// import { Menu } from '../../../../core/presentation/atomic/organisms/Menu/Menu';
import { MenuFooter } from '../../atomic/organisms/MenuFooter/MenuFooter';
import { MENU } from '../config.util';

export default function NotesPage(): JSX.Element {

    const header = <Header />
    const footer = <MenuFooter menuItems={MENU} />
    const main = <Notes title="Notes" />
    // const leftMenu = <Menu />

    return (
        <Page main={main} header={header} footer={footer} />
    )
}

