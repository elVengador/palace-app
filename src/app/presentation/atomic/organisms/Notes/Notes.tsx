import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import './Notes.scss';
import { Title } from '../../../../../core/presentation/atomic/atoms/Title/Title';
import { NoteItem } from '../../molecules/NoteItem/NoteItem';
import { Main } from '../../../../../core/presentation/atomic/molecules/Main/Main';
import { NoteOutput, UpdateNoteInput } from '../../../../domain/entities';
import { MUTATION_UPDATE_NOTE, QUERY_NOTES_BY_USER } from '../../../../infraestructure/repository/note/note.gql';
import { TextArea } from '../../../../../core/presentation/atomic/atoms/TextArea/TextArea';
import { InputStatus } from '../../../../../core/presentation/utils/interfaces.utils';
import { IconButton } from '../../../../../core/presentation/atomic/atoms/IconButton/IconButton';

interface HeaderProps {
    title: string;
}

export const Notes = ({ }: HeaderProps): JSX.Element => {

    const noteCharacterLimit = 3000
    const [noteValue, setNoteValue] = useState('');
    const [noteState, setNoteState] = useState<InputStatus>('default');

    const [selectedNote, setSelectedNote] = useState<NoteOutput | null>(null)
    const [showNoteForm, setShowNoteForm] = useState(false)
    const navigate = useNavigate();

    const { error: errorGetNotesOutput, data: dataGetNotesOutPut } = useQuery<{ getNotesByUser: NoteOutput[] }>(QUERY_NOTES_BY_USER)

    const [updateNote, { error: errorUpdateNote }] =
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

    // const buildNotes = (notes: NoteOutput[]) => notes.map(cur => <NoteItem
    //     content={cur.value}
    //     date={cur.creationDate}
    //     tags={cur.tags}
    //     onClick={() => setSelectedNote(cur)}
    //     key={cur._id}
    // />)

    // const buildNoteSelected = () => {
    //     if (!selectedNote) { return <h1>No hay nota seleccionada</h1> }
    //     return <NoteItem
    //         content={selectedNote.value}
    //         date={selectedNote.creationDate}
    //         tags={selectedNote.tags}
    //         size='full'
    //         attributes={{
    //             style: { height: 'calc(100vh - 160px)' }
    //         }}
    //     />
    // }

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

    // const onHideEditNote = () => {
    //     setNoteValue('')
    //     setShowNoteForm(false)
    // }

    const onNavigateNoteForm = () => navigate("/notes/add")

    return (
        <Main>
            <>
                {errorGetNotesOutput && <h1>{errorGetNotesOutput.message}</h1>}
                {errorUpdateNote && <h1>{errorUpdateNote.message}</h1>}
                {
                    !selectedNote && <>
                        <div className="notes--header">
                            <div className="options-top">
                                <div></div>
                                <div>
                                    <IconButton
                                        icon='plus'
                                        color='fg'
                                        attributes={{ title: 'Add note' }}
                                        events={{ onClick: () => onNavigateNoteForm() }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="notes--items">
                            {
                                dataGetNotesOutPut?.getNotesByUser &&
                                dataGetNotesOutPut?.getNotesByUser.map(cur => <NoteItem
                                    content={cur.value}
                                    date={cur.creationDate}
                                    tags={cur.tags}
                                    onClick={() => setSelectedNote(cur)}
                                    key={cur._id}
                                />)
                            }
                        </div>
                    </>

                }
                {
                    selectedNote && <>
                        <div className="note-operations--header">
                            <IconButton
                                icon='arrow-left'
                                color='fg'
                                attributes={{ title: 'Back' }}
                                events={{ onClick: () => setSelectedNote(null) }}
                            />
                            <Title content="Update" />
                            <div>
                                {!showNoteForm && <IconButton
                                    icon='pen'
                                    color='fg'
                                    attributes={{ title: 'Edit Note' }}
                                    events={{ onClick: () => onShowEditNote(selectedNote) }}
                                />}
                                {/* {showNoteForm && <Button
                                    content=""
                                    size="sm"
                                    icon="times"
                                    events={{ onClick: () => onHideEditNote() }}
                                    attributes={{ title: 'Cancel' }}
                                />} */}
                                {showNoteForm && <IconButton
                                    icon='check'
                                    color='fg'
                                    attributes={{ title: 'Save Note' }}
                                    events={{
                                        onClick: () => onUpdateNote({
                                            noteId: selectedNote._id,
                                            updateNoteInput: {
                                                tagId: selectedNote.tags[0]._id,
                                                value: noteValue
                                            }
                                        })
                                    }}
                                />}
                            </div>
                        </div>
                        <div className="notes--item-selected">
                            {!showNoteForm && <NoteItem
                                content={selectedNote.value}
                                date={selectedNote.creationDate}
                                tags={selectedNote.tags}
                                size='full'

                            />}

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
