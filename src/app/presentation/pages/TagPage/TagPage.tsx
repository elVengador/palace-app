import React, { useEffect } from 'react'

import './TagPage.scss';
import { Footer } from '../../../../core/presentation/atomic/organisms/Footer/Footer';
import { Header } from '../../../../core/presentation/atomic/organisms/Header/Header';
import { Page } from '../../atomic/templates/Page/Page';
import { Tags } from '../../atomic/organisms/Tags/Tags';

export default function TagsPage(): JSX.Element {

    useEffect(() => {
        console.log('main useefect');
    }, [])

    const header = <Header title="Mind Notes" />
    const footer = <Footer title="2021 - elVengador" />
    const main = <Tags />

    return (
        <Page main={main} header={header} footer={footer} />
    )
}

