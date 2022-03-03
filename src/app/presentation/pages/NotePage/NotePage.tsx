import React from 'react'

import './NotePage.scss';
import { Footer2 } from '../../../../core/presentation/atomic/organisms/Footer/Footer';
import { Header } from '../../../../core/presentation/atomic/organisms/Header/Header';
import { Page } from '../../atomic/templates/Page/Page';
import { NotesOperations } from '../../atomic/organisms/NoteOperations/NoteOperations';

export default function NotesPage(): JSX.Element {

    // const [watchPreview, setWatchPreview] = useState(false)

    // const previewButton = <Button content='' icon={'eye'} events={{ onClick: () => setWatchPreview(!watchPreview) }} />

    const header = <Header />
    const footer = <Footer2 />
    // const rightMenu = <EmptyMenu bodyComponents={[previewButton]} />
    const main = <NotesOperations />

    return (
        <Page main={main} header={header} footer={footer} />
    )
}

