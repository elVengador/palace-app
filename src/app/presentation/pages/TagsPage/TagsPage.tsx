import React from 'react'

import './TagsPage.scss';
// import { Footer2 } from '../../../../core/presentation/atomic/organisms/Footer/Footer';
import { Header } from '../../../../core/presentation/atomic/organisms/Header/Header';
import { Page } from '../../atomic/templates/Page/Page';
import { Tags } from '../../atomic/organisms/Tags/Tags';
// import { Menu } from '../../../../core/presentation/atomic/organisms/Menu/Menu';
import { MenuFooter } from '../../atomic/organisms/MenuFooter/MenuFooter';
import { MENU } from '../config.util';

export default function TagsPage(): JSX.Element {

    const header = <Header />
    const footer = <MenuFooter menuItems={MENU} />
    // const leftMenu = <Menu />
    const main = <Tags />

    return (
        <Page main={main} header={header} footer={footer} />
    )
}

