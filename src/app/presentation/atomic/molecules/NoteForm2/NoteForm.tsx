import React, { useContext, useState } from 'react';

import './NoteForm.scss';
import { InputStatus } from '../../../../../core/presentation/utils/interfaces.utils';
import { TextArea } from '../../../../../core/presentation/atomic/atoms/TextArea/TextArea';
import { Select } from '../../../../../core/presentation/atomic/molecules/Select/Select';
import { AddNoteInput, NoteOutput, Tag, UpdateNoteInput } from '../../../../domain/entities';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_GET_TAGS_BY_USER } from '../../../../infraestructure/repository/tag/tag.gql';
import { MUTATION_ADD_NOTE, MUTATION_UPDATE_NOTE, QUERY_NOTES_BY_USER } from '../../../../infraestructure/repository/note/note.gql';
import { AlertContext } from '../../../../../App';
import { IconButton } from '../../../../../core/presentation/atomic/atoms/IconButton/IconButton';

interface NoteFormProps {
    initialNote?: NoteOutput | null,
    stateToShowPreviewNote: (note: NoteOutput | null) => void;
    stateToShowNotes: () => void
}

export const NoteForm = ({
    initialNote = null,
    stateToShowPreviewNote,
    stateToShowNotes,
}: NoteFormProps): JSX.Element => {

    const alertContext = useContext(AlertContext)

    const NOTE_CHARACTER_LIMIT = 3000
    const [tagValue, setTagValue] = useState<string>(initialNote?.tags[0]._id || '');
    const [tagState, setTagState] = useState<InputStatus>('default');
    const [noteValue, setNoteValue] = useState(initialNote?.value || '')
    const [noteState, setNoteState] = useState<InputStatus>('default')

    const { loading, data: dataGetTagsByUser } = useQuery<{ getTagsByUser: Tag[] }, string>
        (QUERY_GET_TAGS_BY_USER, { pollInterval: 1000 * 60 * 30, })

    const [addNote,] = useMutation<{ addNote: NoteOutput }, { addNoteInput: AddNoteInput }>
        (MUTATION_ADD_NOTE,
            {
                update(cache, { data }) {
                    console.log('DATA:', data)
                    const newNote = data?.addNote
                    const existtingNotes = cache.readQuery<{ getNotesByUser: NoteOutput[] }>({ query: QUERY_NOTES_BY_USER })
                    if (existtingNotes && newNote) {
                        const notesByUser = existtingNotes?.getNotesByUser
                        const getNotesByUser = [...notesByUser, newNote]
                        cache.writeQuery({
                            query: QUERY_NOTES_BY_USER,
                            data: { getNotesByUser: getNotesByUser }
                        })
                    }
                }
            }
        )

    const [updateNote] =
        useMutation<{ updateNote: NoteOutput }, { noteId: string, updateNoteInput: UpdateNoteInput }>
            (MUTATION_UPDATE_NOTE, {
                onError: (err) => {
                    console.log(err);
                    alertContext?.addErrorAlert('')
                }
            })

    const isInvalidForm = () => {
        const invalidInputs = [tagState, noteState]
            .filter(cur => cur !== 'success')
        return invalidInputs.length
    }

    const onAddNote = (addNoteInput: AddNoteInput) => {
        console.log('onAdd note');
        try {
            if (isInvalidForm()) { return alertContext?.addErrorAlert('Invalid inputs') }

            addNote({
                variables: { addNoteInput },
                onCompleted: () => {
                    stateToShowNotes()
                }
            })
        } catch (err) {
            console.log(err);
            alertContext?.addErrorAlert('Invalid inputs')
        }
    }
    const onUpdateNote = (noteId: string, updateNoteInput: UpdateNoteInput) => {
        console.log('on update note');
        try {
            if (!initialNote) { return }
            updateNote({
                variables: { noteId, updateNoteInput },
                onCompleted: (data) => {
                    stateToShowPreviewNote(data.updateNote)
                    console.log('completed');
                },
            })
        } catch (err) {
            console.log(err);
        }
    }

    const mapTagsToSelect = () => {
        if (!dataGetTagsByUser) { return [] }
        return dataGetTagsByUser.getTagsByUser.map(cur => ({ label: `#${cur.value}`, value: cur._id }))
    }

    if (initialNote) { //form to edit
        return <>
            <div className="note-operations--header">
                <IconButton
                    icon='arrow-left'
                    color='fg'
                    attributes={{ title: 'Back' }}
                    events={{

                        onClick: () => {
                            stateToShowPreviewNote(initialNote)
                        }
                    }}
                />
                <div>
                    <IconButton
                        icon='check'
                        color='fg'
                        attributes={{ title: 'Update Note' }}
                        events={{
                            onClick: () => onUpdateNote(initialNote._id, {
                                tagId: tagValue, value: noteValue
                            })
                        }}
                    />
                </div>
            </div>

            <form onSubmit={() => onUpdateNote(initialNote._id, {
                tagId: tagValue, value: noteValue
            })}>
                {loading && <h1>Loading</h1>}
                {!loading && <Select
                    value={tagValue}
                    setValue={setTagValue}
                    labelValue="Tag"
                    state={tagState}
                    setState={setTagState}
                    options={mapTagsToSelect()}
                    attributes={{ id: 'select-tag' }}
                />}

                <div className="info">
                    <small>{`${noteValue.length} of ${NOTE_CHARACTER_LIMIT}`}</small>
                </div>

                <TextArea
                    value={noteValue}
                    setValue={setNoteValue}
                    state={noteState}
                    setState={setNoteState}
                    pattern={`^(.|\n){2,${NOTE_CHARACTER_LIMIT}}$`}
                    attributes={{
                        placeholder: `Write you note here:
                    You can format text with Markdown
                    min: 2 , max: ${NOTE_CHARACTER_LIMIT} characters`,
                        style: { height: 'calc(100vh - 250px)' }
                    }}
                />
            </form>
        </>
    }

    return (
        //form to add
        <>
            <div className="note-operations--header">
                <IconButton
                    icon='arrow-left'
                    color='fg'
                    attributes={{ title: 'Back' }}
                    events={{ onClick: () => stateToShowNotes() }}
                />

                <div>
                    <IconButton
                        icon='check'
                        color='fg'
                        attributes={{ title: 'Save Note' }}
                        events={{ onClick: () => onAddNote({ tagId: tagValue, value: noteValue }) }}
                    />
                </div>
            </div>

            <form onSubmit={() => onAddNote({ tagId: tagValue, value: noteValue })}>
                {loading && <h1>Loading</h1>}
                {!loading && <Select
                    value={tagValue}
                    setValue={setTagValue}
                    labelValue="Tag"
                    state={tagState}
                    setState={setTagState}
                    options={mapTagsToSelect()}
                    attributes={{ id: 'select-tag' }}
                />}

                <div className="info">
                    <small>{`${noteValue.length} of ${NOTE_CHARACTER_LIMIT}`}</small>
                </div>

                <TextArea
                    value={noteValue}
                    setValue={setNoteValue}
                    state={noteState}
                    setState={setNoteState}
                    pattern={`^(.|\n){2,${NOTE_CHARACTER_LIMIT}}$`}
                    attributes={{
                        placeholder: `Write you note here:
                    You can format text with Markdown
                    min: 2 , max: ${NOTE_CHARACTER_LIMIT} characters`,
                        style: { height: 'calc(100vh - 250px)' }
                    }}
                />
            </form>
        </>
    );
};
