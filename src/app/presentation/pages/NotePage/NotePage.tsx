import React, { useState } from 'react'

import './NotePage.scss';
import { Footer2 } from '../../../../core/presentation/atomic/organisms/Footer/Footer';
import { Header } from '../../../../core/presentation/atomic/organisms/Header/Header';
import { Page } from '../../atomic/templates/Page/Page';
import { Menu } from '../../../../core/presentation/atomic/organisms/Menu/Menu';
import { NotesOperations } from '../../atomic/organisms/NoteOperations/NoteOperations';
import { EmptyMenu } from '../../../../core/presentation/atomic/organisms/EmptyMenu/EmptyMenu';
import { Button } from '../../../../core/presentation/atomic/atoms/Button/Button';

export default function NotesPage(): JSX.Element {

    const [watchPreview, setWatchPreview] = useState(false)

    const previewButton = <Button content='' icon={'eye'} type='alpha' events={{ onClick: () => setWatchPreview(!watchPreview) }} />

    const header = <Header />
    const footer = <Footer2 />
    const leftMenu = <Menu />
    const rightMenu = <EmptyMenu bodyComponents={[previewButton]} />
    const main = <NotesOperations watchPreview={watchPreview} />

    return (
        <Page main={main} header={header} footer={footer} leftMenu={leftMenu} rightMenu={rightMenu} />
    )
}

