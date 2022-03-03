import React, { useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router';
import { useParams } from "react-router-dom";

import './NoteOperations.scss';
import { Main } from '../../../../../core/presentation/atomic/molecules/Main/Main';
import { Select } from '../../../../../core/presentation/atomic/molecules/Select/Select';
import { TextArea } from '../../../../../core/presentation/atomic/atoms/TextArea/TextArea';
import { QUERY_GET_TAGS_BY_USER } from '../../../../infraestructure/repository/tag/tag.gql';
import { AddNoteInput, NoteOutput, Tag } from '../../../../domain/entities';
import { MUTATION_ADD_NOTE, QUERY_NOTES_BY_USER } from '../../../../infraestructure/repository/note/note.gql';
import { InputStatus } from '../../../../../core/presentation/utils/interfaces.utils';
import { IconButton } from '../../../../../core/presentation/atomic/atoms/IconButton/IconButton';
import { NotePreview } from '../../molecules/NotePreview/NotePreview';
import { AlertContext } from '../../../../../App';

interface NoteOperationsProps {
    title?: string;
}

export const NotesOperations = ({

}: NoteOperationsProps): JSX.Element => {
    const alertContext = useContext(AlertContext)

    const NOTE_CHARACTER_LIMIT = 3000
    const [watchPreview, setWatchPreview] = useState(false)
    const [tagValue, setTagValue] = useState<string>('12');
    const [tagState, setTagState] = useState<InputStatus>('default');
    const [noteValue, setNoteValue] = useState('');
    const [noteState, setNoteState] = useState<InputStatus>('default');
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const idNote = params.id
        console.log('id:', idNote);
    }, [params])

    const { loading, data: dataGetTagsByUser } = useQuery<{ getTagsByUser: Tag[] }, string>(QUERY_GET_TAGS_BY_USER, {
        pollInterval: 1000 * 60 * 30,
    })

    const [addNote, { loading: loadingAddNote }] = useMutation<{ addNote: NoteOutput }, { addNoteInput: AddNoteInput }>
        (MUTATION_ADD_NOTE,
            {
                onCompleted: () => navigate("/notes"),
                onError: () => { alertContext?.addErrorAlert() },
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
            })

    const mapTagsToSelect = () => {
        if (!dataGetTagsByUser) { return [] }
        return dataGetTagsByUser.getTagsByUser.map(cur => ({ label: `#${cur.value}`, value: cur._id }))
    }

    const isInvalidForm = () => {
        const invalidInputs = [tagState, noteState]
            .filter(cur => cur !== 'success')
        return invalidInputs.length
    }

    const onAddNote = () => {
        try {
            if (isInvalidForm()) { return alertContext?.addErrorAlert('Invalid inputs') }

            addNote({
                variables: {
                    addNoteInput: {
                        tagId: tagValue,
                        value: noteValue
                    }
                }
            })
        } catch (err) {
            console.log(err);
            alertContext?.addErrorAlert('Invalid inputs')
        }
    }
    const onNavigateNotesPage = () => navigate("/notes")

    return (
        <Main>
            <>
                {loading && <h2>Loading</h2>}
                {loadingAddNote && <h2>Loading AN</h2>}
                <div className="note-operations--header">
                    <IconButton
                        icon="arrow-left"
                        color='fg'
                        events={{ onClick: () => onNavigateNotesPage() }}
                        attributes={{ title: 'Back' }}
                    />
                    <div className='right-options'>
                        {!watchPreview && <IconButton
                            icon="eye"
                            color='fg'
                            events={{ onClick: () => setWatchPreview(true) }}
                            attributes={{ title: 'Show preview' }}
                        />}
                        {watchPreview && <IconButton
                            icon="eye-slash"
                            color='fg'
                            events={{ onClick: () => setWatchPreview(false) }}
                            attributes={{ title: 'Hide preview' }}
                        />}
                        <IconButton
                            icon="check"
                            color='fg'
                            events={{ onClick: () => onAddNote() }}
                            attributes={{ title: 'Add note' }}
                        />
                    </div>
                </div>
                {
                    !watchPreview && <div className="note-operations--body">
                        {/* <textarea name="" id="" ></textarea> */}
                        <Select
                            value={tagValue}
                            setValue={setTagValue}
                            labelValue="Tag"
                            state={tagState}
                            setState={setTagState}
                            options={mapTagsToSelect()}
                        />
                        <div className="info">
                            <small>{`${noteValue.length} of ${NOTE_CHARACTER_LIMIT}`}</small>
                        </div>
                        <div >
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
                                    style: { height: 'calc(100vh - 290px)' }
                                }}
                            />
                        </div>
                    </div>
                }

                {
                    watchPreview && <NotePreview content={noteValue} />
                }
            </>
        </Main>
    );
};
