import React, { useState } from 'react'

import { Header } from '../../../../core/presentation/atomic/organisms/Header/Header';
import { Page } from '../../atomic/templates/Page/Page';
import { MenuFooter } from '../../atomic/organisms/MenuFooter/MenuFooter';
import { MENU } from '../config.util';
import { Title } from '../../../../core/presentation/atomic/atoms/Title/Title';
import { SignOut } from '../../../../core/presentation/atomic/molecules/SignOut/SignOut';

export default function UserPage(): JSX.Element {
    const [title] = useState('User')

    const header = <Header title={title} rightElementOptions={<SignOut />} />
    const footer = <MenuFooter menuItems={MENU} />
    const main = () => {
        const style = {
            background: 'var(--bg)',
            height: 'calc(100vh - 120px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }
        return <main style={{ ...style, flexDirection: 'column' }}>
            <Title content='User Page' color='fg' size='lg' />
            <p style={{ color: 'var(--fg)' }}>-- in working --</p>
        </main>
    }

    return (
        <Page main={main()} header={header} footer={footer} />
    )
}
