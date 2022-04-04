import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import './Notes.scss';
import { NoteItem } from '../../molecules/NoteItem/NoteItem';
import { Main } from '../../../../../core/presentation/atomic/molecules/Main/Main';
import { NoteOutput } from '../../../../domain/entities';
import { QUERY_NOTES_BY_USER } from '../../../../infraestructure/repository/note/note.gql';
import { IconButton } from '../../../../../core/presentation/atomic/atoms/IconButton/IconButton';
import { AlertContext } from '../../../../../App';
interface NotesProps {
    stateToShowPreviewNote: (note: NoteOutput) => void,
    stateToAddNote: () => void,
}

export const Notes = ({
    stateToShowPreviewNote,
    stateToAddNote
}: NotesProps): JSX.Element => {

    const alertContext = useContext(AlertContext)
    const navigate = useNavigate();
    const { data: dataGetNotesOutPut } = useQuery<{ getNotesByUser: NoteOutput[] }>(QUERY_NOTES_BY_USER, {
        onError: (err) => {
            console.log(err);
            if (err.message === 'Unauthorized') {
                console.log('dont hast token');
                alertContext?.addErrorAlert('Ups, your session expired')
                return navigate('/auth')
            }
            alertContext?.addErrorAlert()
        }
    })

    return (
        <Main>
            <>
                <div className="notes--header">
                    <div className="options-top">
                        <div></div>
                        <div>
                            <IconButton
                                icon='plus'
                                color='fg'
                                attributes={{ title: 'Add note' }}
                                events={{ onClick: () => stateToAddNote() }}
                            />
                        </div>
                    </div>
                </div>
                <div className="notes--items">
                    {
                        dataGetNotesOutPut?.getNotesByUser &&
                        dataGetNotesOutPut?.getNotesByUser.map(cur => <NoteItem
                            content={cur.value}
                            dateInISO={cur.creationDate}
                            tags={cur.tags}
                            onClick={() => {
                                console.log('change to show preview')
                                stateToShowPreviewNote(cur)
                            }}
                            key={cur._id}
                        />)
                    }
                </div>
            </>
        </Main>
    );
};
