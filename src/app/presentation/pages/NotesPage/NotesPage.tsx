import React, { useState } from 'react'

import './NotesPage.scss';
import { Header } from '../../../../core/presentation/atomic/organisms/Header/Header';
import { Page } from '../../atomic/templates/Page/Page';
import { Notes } from '../../atomic/organisms/Notes/Notes';
// import { Menu } from '../../../../core/presentation/atomic/organisms/Menu/Menu';
import { MenuFooter } from '../../atomic/organisms/MenuFooter/MenuFooter';
import { MENU } from '../config.util';
import { useNotePage } from '../../atomic/organisms/Notes/useNotesPage';
import { NotesOperations } from '../../atomic/organisms/NoteOperations2/NoteOperations';
import { NoteForm } from '../../atomic/molecules/NoteForm2/NoteForm';

export default function NotesPage(): JSX.Element {
    const [title, setTitle] = useState('Notes')
    const {
        selectedNote,
        stateToAddNote,
        stateToEditNote,
        stateToShowNotes,
        stateToShowPreviewNote,
        notesPageState
    } = useNotePage(setTitle)

    const header = <Header title={title} />
    const footer = <MenuFooter menuItems={MENU} />
    const main = () => {
        if (notesPageState === 'LIST') return <Notes
            stateToShowPreviewNote={stateToShowPreviewNote}
            stateToAddNote={stateToAddNote}
        />
        if (notesPageState === 'VIEW' && selectedNote) return <NotesOperations
            selectedNote={selectedNote}
            stateToShowNotes={stateToShowNotes}
            stateToEditNote={stateToEditNote}
        />
        if (notesPageState === 'EDIT' || notesPageState === 'ADD') return <NoteForm
            initialNote={selectedNote}
            stateToShowNotes={stateToShowNotes}
            stateToShowPreviewNote={stateToShowPreviewNote}
        />
        return <h1>Invalid option</h1>
    }

    return (
        <Page main={main()} header={header} footer={footer} />
    )
}

