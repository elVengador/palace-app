
import React from 'react';

import './NoteOperations.scss';
import { NoteOutput } from '../../../../domain/entities';
import { IconButton } from '../../../../../core/presentation/atomic/atoms/IconButton/IconButton';
import { NotePreview } from '../NotePreview/NotePreview';

interface NoteOperationsProps {
    selectedNote: NoteOutput,
    stateToShowNotes: () => void,
    stateToEditNote: (note: NoteOutput) => void,
}

export const NotesOperations = ({
    selectedNote,
    stateToShowNotes,
    stateToEditNote
}: NoteOperationsProps): JSX.Element => {

    return <>
        <div className="note-operations--header">
            <IconButton
                icon='arrow-left'
                color='fg'
                attributes={{ title: 'Back' }}
                events={{
                    onClick: () => {
                        // stateToShowNotes()
                        stateToShowNotes()
                        console.log('back')
                    }
                }}
            />
            <div>
                <IconButton
                    icon='pen'
                    color='fg'
                    attributes={{ title: 'Edit Note' }}
                    events={{
                        onClick: () => {
                            // stateToEditNote(selectedNote)
                            stateToEditNote(selectedNote)
                            console.log('efit notes')
                        }
                    }}
                />
            </div>
        </div>
        <div className="notes--item-selected">
            <NotePreview
                content={selectedNote.value}
            />
        </div>
    </>
};
