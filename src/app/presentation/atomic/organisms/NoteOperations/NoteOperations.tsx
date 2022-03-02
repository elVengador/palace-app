import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router';
import { useParams } from "react-router-dom";

import './NoteOperations.scss';
import { Title } from '../../../../../core/presentation/atomic/atoms/Title/Title';
import { Main } from '../../../../../core/presentation/atomic/molecules/Main/Main';
import { Button } from '../../../../../core/presentation/atomic/atoms/Button/Button';
import { Select } from '../../../../../core/presentation/atomic/molecules/Select/Select';
import { TextArea } from '../../../../../core/presentation/atomic/atoms/TextArea/TextArea';
import { QUERY_GET_TAGS_BY_USER } from '../../../../infraestructure/repository/tag/tag.gql';
import { AddNoteInput, NoteOutput, Tag } from '../../../../domain/entities';
import { MUTATION_ADD_NOTE, QUERY_NOTES_BY_USER } from '../../../../infraestructure/repository/note/note.gql';
import { useMarkdown } from '../../../../../core/presentation/utils/hooks/useMarkdown';
import { InputStatus } from '../../../../../core/presentation/utils/interfaces.utils';

interface NoteOperationsProps {
    title?: string;
    watchPreview: boolean;
}

export const NotesOperations = ({
    title = 'Add Note',
    ...props
}: NoteOperationsProps): JSX.Element => {

    const noteCharacterLimit = 3000
    const [tagValue, setTagValue] = useState<string>('12');
    const [tagState, setTagState] = useState<InputStatus>('default');
    const [noteValue, setNoteValue] = useState('');
    const [noteState, setNoteState] = useState<InputStatus>('default');
    const navigate = useNavigate();
    const { markdownToHtml } = useMarkdown()
    const params = useParams();

    useEffect(() => {
        const idNote = params.id
        console.log('id:', idNote);
    }, [params])

    // const {} = useLazyQuery()

    const { error: errorGetTagsByUser, loading, data: dataGetTagsByUser } = useQuery<{ getTagsByUser: Tag[] }, string>(QUERY_GET_TAGS_BY_USER, {
        pollInterval: 1000 * 60 * 30,
    })

    const [addNote, { error: errorAddNote, loading: loadingAddNote }] = useMutation<{ addNote: NoteOutput }, { addNoteInput: AddNoteInput }>
        (MUTATION_ADD_NOTE,
            {
                onCompleted: () => navigate("/notes"),
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
    const onAddNote = () => {
        try {
            console.log('VVV', tagValue, noteValue, tagState, noteState)
            if (tagState !== 'success') { return console.log('tag invalid'); }
            if (noteState !== 'success') { return console.log('note invalida'); }

            // addNote({ variables: addNoteInput:{ tagId: tagValue, value: noteValue } })
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
        }
    }
    const onNavigateNotesPage = () => navigate("/notes")
    // const onUpdateNote = () => { console.log('update note'); }

    return (
        <Main>
            <>
                {errorGetTagsByUser && <h2>error: nose puede obtener los tags</h2>}
                {errorAddNote && <h2>error: nose puede agregar notas</h2>}
                {loading && <h2>Loading</h2>}
                {loadingAddNote && <h2>Loading AN</h2>}
                <div className="note-operations--header">
                    <Button
                        content=""
                        size="sm"
                        icon="arrow-left"
                        events={{ onClick: () => onNavigateNotesPage() }}
                    />
                    <Title content={title} />
                    <Button
                        content=""
                        size="sm"
                        icon="check"
                        events={{ onClick: () => onAddNote() }}
                    />
                </div>
                {
                    !props.watchPreview && <div className="note-operations--body">
                        {/* <textarea name="" id="" ></textarea> */}
                        <div className="info">
                            <Title content={`${noteValue.length} / ${noteCharacterLimit}`} />
                            <Title content={'12/12/12'} />
                        </div>
                        <Select
                            value={tagValue}
                            setValue={setTagValue}
                            state={tagState}
                            setState={setTagState}
                            options={mapTagsToSelect()}
                        />
                        <div >
                            <TextArea
                                value={noteValue}
                                setValue={setNoteValue}
                                state={noteState}
                                setState={setNoteState}
                                pattern={`^(.|\n){2,${noteCharacterLimit}}$`}
                                attributes={{
                                    placeholder: `Write you note here:
                                    You can format text with Markdown
                                    min: 2 , max: ${noteCharacterLimit} characters`,
                                    style: { height: 'calc(100vh - 230px)' }
                                }}
                            />
                        </div>
                    </div>
                }

                {
                    props.watchPreview && <div className='note-operations--body'>
                        <div className="info">
                            <Title content={`#`} />
                            <Title content={'12/12/12'} />
                        </div>
                        <div
                            style={{ height: 'calc(100vh - 200px)' }}
                            className="preview"
                            dangerouslySetInnerHTML={{ __html: markdownToHtml(noteValue) }}
                        ></div>
                    </div>
                }
            </>
        </Main>
    );
};
