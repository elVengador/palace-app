import React from 'react'

import './TagsPage.scss';
import { Footer } from '../../../../core/presentation/atomic/organisms/Footer/Footer';
import { Header } from '../../../../core/presentation/atomic/organisms/Header/Header';
import { Page } from '../../atomic/templates/Page/Page';
import { Tags } from '../../atomic/organisms/Tags/Tags';
import { Menu } from '../../../../core/presentation/atomic/organisms/Menu/Menu';

export default function TagsPage(): JSX.Element {

    const header = <Header />
    const footer = <Footer />
    const leftMenu = <Menu />
    const main = <Tags />

    return (
        <Page main={main} header={header} footer={footer} leftMenu={leftMenu} />
    )
}

