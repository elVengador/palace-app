import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import './Notes.scss';
import { Title } from '../../../../../core/presentation/atomic/atoms/Title/Title';
import { NoteItem } from '../../molecules/NoteItem/NoteItem';
import { Main } from '../../../../../core/presentation/atomic/molecules/Main/Main';
import { NoteOutput, UpdateNoteInput } from '../../../../domain/entities';
import { MUTATION_UPDATE_NOTE, QUERY_NOTES_BY_USER } from '../../../../infraestructure/repository/note/note.gql';
import { Button } from '../../../../../core/presentation/atomic/atoms/Button/Button';
import { TextArea } from '../../../../../core/presentation/atomic/atoms/TextArea/TextArea';
import { InputStatus } from '../../../../../core/presentation/utils/interfaces.utils';

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

    const [updateNote, { error: errorUpdateNote, loading: loadingUpdateNote }] =
        useMutation<{ updateNote: NoteOutput }, { noteId: string, updateNoteInput: UpdateNoteInput }>
            (MUTATION_UPDATE_NOTE,
            // {
            //     onCompleted: () => navigate("/notes"),
            //     update(cache, { data }) {
            //         console.log('DATA:', data)
            //         const newNote = data?.addNote
            //         const existtingNotes = cache.readQuery<{ getNotesByUser: NoteOutput[] }>({ query: QUERY_NOTES_BY_USER })
            //         if (existtingNotes && newNote) {
            //             const notesByUser = existtingNotes?.getNotesByUser
            //             const getNotesByUser = [...notesByUser, newNote]
            //             cache.writeQuery({
            //                 query: QUERY_NOTES_BY_USER,
            //                 data: { getNotesByUser: getNotesByUser }
            //             })
            //         }
            //     }
            // }
        )

    useEffect(() => {
        if (selectedNote) {
            setNoteValue(selectedNote.value)
            console.log('change selectedNote');
        }
    }, [selectedNote])

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
            attributes={{
                style: { height: 'calc(100vh - 160px)' }
            }}
        />
    }

    const onUpdateNote = ({ noteId, updateNoteInput }: { noteId: string, updateNoteInput: UpdateNoteInput }) => {
        try {
            updateNote({
                variables: { noteId, updateNoteInput },
                onCompleted: (data) => {
                    setShowNoteForm(false)
                    setSelectedNote(data.updateNote)
                },
            })
        } catch (err) {
            console.log(err);
        }
    }

    const onShowEditNote = (note: NoteOutput) => {
        setNoteValue(note.value)
        setShowNoteForm(true)
    }

    const onHideEditNote = () => {
        setNoteValue('')
        setShowNoteForm(false)
    }

    const onNavigateNoteForm = () => navigate("/notes/add")

    return (
        <Main>
            <>
                {errorGetNotesOutput && <h1>{errorGetNotesOutput.message}</h1>}
                {loading && <h1>loading</h1>}
                {errorUpdateNote && <h1>{errorUpdateNote.message}</h1>}
                {loadingUpdateNote && <h1>loadingUpdateNote</h1>}
                {
                    !selectedNote && <>
                        <div className="notes--header">
                            <div className="options-top">
                                <div></div>
                                <Title content={`${title} (${dataGetNotesOutPut?.getNotesByUser.length})`} />
                                <Button
                                    content=""
                                    size="sm"
                                    icon="plus"
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
                                events={{ onClick: () => setSelectedNote(null) }}
                                attributes={{ title: 'Back' }}
                            />
                            <Title content="Update" />
                            <div>
                                {!showNoteForm && <Button
                                    content=""
                                    size="sm"
                                    icon="pen"
                                    events={{ onClick: () => onShowEditNote(selectedNote) }}
                                    attributes={{ title: 'Edit' }}
                                />}
                                {showNoteForm && <Button
                                    content=""
                                    size="sm"
                                    icon="times"
                                    events={{ onClick: () => onHideEditNote() }}
                                    attributes={{ title: 'Cancel' }}
                                />}
                                {showNoteForm && <Button
                                    content=""
                                    size="sm"
                                    icon="check"
                                    events={{
                                        onClick: () => onUpdateNote({
                                            noteId: selectedNote._id,
                                            updateNoteInput: {
                                                tagId: selectedNote.tags[0]._id,
                                                value: noteValue
                                            }
                                        })
                                    }}
                                    attributes={{ title: 'Save' }}
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
                                attributes={{
                                    placeholder: `Write you note here:
                                You can format text with Markdown
                                min: 2 , max: ${noteCharacterLimit} characters`,
                                    style: { height: 'calc(100vh - 120px)' }
                                }}
                            />}
                        </div>
                    </>
                }
            </>
        </Main >
    );
};
