import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import './Notes.scss';
import { Title } from '../../../../../core/presentation/atomic/atoms/Title/Title';
import { NoteItem } from '../../molecules/NoteItem/NoteItem';
import { Main } from '../../../../../core/presentation/atomic/molecules/Main/Main';
import { NoteOutput } from '../../../../domain/entities';
import { QUERY_NOTES_BY_USER } from '../../../../infraestructure/repository/note/note.gql';
import { Button } from '../../../../../core/presentation/atomic/atoms/Button/Button';
import { InputStatus, TextArea } from '../../../../../core/presentation/atomic/atoms/TextArea/TextArea';


interface HeaderProps {
    title: string;
}

export const Notes = ({
    title = ''
}: HeaderProps): JSX.Element => {

    const noteCharacterLimit = 3000
    const [noteValue, setNoteValue] = useState('');
    const [noteState, setNoteState] = useState<InputStatus>('default');

    const [selectedNote, setSelectedNote] = useState<NoteOutput | null>(null)
    const [showNoteForm, setShowNoteForm] = useState(false)
    const navigate = useNavigate();

    const { error: errorGetNotesOutput, loading, data: dataGetNotesOutPut } = useQuery<{ getNotesByUser: NoteOutput[] }>(QUERY_NOTES_BY_USER)

    const buildNotes = (notes: NoteOutput[]) => notes.map(cur => <NoteItem
        content={cur.value}
        date={cur.creationDate}
        tags={cur.tags}
        onClick={() => setSelectedNote(cur)}
        key={cur._id}
    />)

    const buildNoteSelected = () => {
        if (!selectedNote) { return <h1>No hay nota seleccionada</h1> }
        return <NoteItem
            content={selectedNote.value}
            date={selectedNote.creationDate}
            tags={selectedNote.tags}
            size='full'
        />
    }

    const onNavigateNoteForm = () => navigate("/notes/add")

    return (
        <Main>
            <>
                {errorGetNotesOutput && <h1>{errorGetNotesOutput.message}</h1>}
                {loading && <h1>loading</h1>}
                {
                    !selectedNote && <>
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

                }
                {
                    selectedNote && <>
                        <div className="note-operations--header">
                            <Button
                                content=""
                                size="sm"
                                icon="arrow-left"
                                type="alpha"
                                events={{ onClick: () => setSelectedNote(null) }}
                            />
                            <Title content={title} />
                            <div>
                                {!showNoteForm && <Button
                                    content=""
                                    size="sm"
                                    icon="pen"
                                    type="alpha"
                                    events={{ onClick: () => setShowNoteForm(true) }}
                                />}
                                {showNoteForm && <Button
                                    content=""
                                    size="sm"
                                    icon="check"
                                    type="alpha"
                                    events={{ onClick: () => setShowNoteForm(false) }}
                                />}
                            </div>
                        </div>
                        <div className="notes--item-selected">
                            {!showNoteForm && buildNoteSelected()}
                            {showNoteForm && <TextArea
                                value={noteValue}
                                setValue={setNoteValue}
                                state={noteState}
                                setState={setNoteState}
                                pattern={`^(.|\n){2,${noteCharacterLimit}}$`}
                                attributes={{ placeholder: `Write you note here:\nYou can format text with Markdown\nmin: 2 , max: ${noteCharacterLimit} characters` }}
                            />}
                        </div>
                    </>
                }
            </>
        </Main >
    );
};
