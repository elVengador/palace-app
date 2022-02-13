import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import './Notes.scss';
import { Title } from '../../../../../core/presentation/atomic/atoms/Title/Title';
import { NoteItem } from '../../molecules/NoteItem/NoteItem';
import { Main } from '../../../../../core/presentation/atomic/molecules/Main/Main';
import { NoteOutput } from '../../../../domain/entities';
import { QUERY_NOTES_BY_USER } from '../../../../infraestructure/repository/note/note.gql';
import { Button } from '../../../../../core/presentation/atomic/atoms/Button/Button';


interface HeaderProps {
    title: string;
}

export const Notes = ({
    title = ''
}: HeaderProps): JSX.Element => {

    const { error: errorGetNotesOutput, loading, data: dataGetNotesOutPut } = useQuery<{ getNotesByUser: NoteOutput[] }>(QUERY_NOTES_BY_USER)
    const navigate = useNavigate();

    const buildNotes = (notes: NoteOutput[]) => notes.map(cur => <NoteItem
        content={cur.value}
        date={cur.creationDate}
        tags={cur.tags}
        onClick={() => console.log('ok')}
        key={cur._id}
    />)

    const onNavigateNoteForm = () => navigate("/notes/add")

    return (
        <Main>
            <>
                {errorGetNotesOutput && <h1>{errorGetNotesOutput.message}</h1>}
                {loading && <h1>loading</h1>}
                <div className="notes--header">
                    <div className="options-top">
                        <Title content={title} />
                        <Button
                            content=""
                            size="sm"
                            icon="plus"
                            type="alpha"
                            events={{ onClick: () => onNavigateNoteForm() }}
                        />
                    </div>
                </div>
                <div className="notes--items">
                    {
                        dataGetNotesOutPut?.getNotesByUser &&
                        buildNotes(dataGetNotesOutPut?.getNotesByUser)
                    }
                </div>
            </>
        </Main >
    );
};
