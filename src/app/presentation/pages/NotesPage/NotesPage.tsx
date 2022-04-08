import React, { useState } from 'react'

import './NotesPage.scss';
import { Header } from '../../../../core/presentation/atomic/organisms/Header/Header';
import { Page } from '../../atomic/templates/Page/Page';
import { Notes } from '../../atomic/organisms/Notes/Notes';
import { MenuFooter } from '../../atomic/organisms/MenuFooter/MenuFooter';
import { MENU } from '../config.util';
import { useNotePage } from '../../atomic/organisms/Notes/useNotesPage';
import { NotesOperations } from '../../atomic/organisms/NoteOperations/NoteOperations';
import { NoteForm } from '../../atomic/organisms/NoteForm/NoteForm';
import { SignOut } from '../../../../core/presentation/atomic/molecules/SignOut/SignOut';

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

    const header = <Header title={title} rightElementOptions={<SignOut />} />
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

