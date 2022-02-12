import React, { useState } from 'react';

import './NoteOperations.scss';
import { Title } from '../../../../../core/presentation/atomic/atoms/Title/Title';
import { Main } from '../../../../../core/presentation/atomic/molecules/Main/Main';
import { Button } from '../../../../../core/presentation/atomic/atoms/Button/Button';
import { useNavigate } from 'react-router';
import { InputStatus, Select } from '../../../../../core/presentation/atomic/atoms/Select/Select';
import { TextArea } from '../../../../../core/presentation/atomic/atoms/TextArea/TextArea';
import { QUERY_GET_TAGS_BY_USER } from '../../../../infraestructure/repository/tag/tag.gql';
import { AddNoteInput, NotesOutput, Tag } from '../../../../domain/entities';
import { useMutation, useQuery } from '@apollo/client';
import { MUTATION_ADD_NOTE } from '../../../../infraestructure/repository/note/note.gql';

interface NoteOperationsProps {
    title?: string;
}

export const NotesOperations = ({
    title = 'Add Note'
}: NoteOperationsProps): JSX.Element => {

    const [tagValue, setTagValue] = useState<string>('12');
    const [tagState, setTagState] = useState<InputStatus>('default');
    const [noteValue, setNoteValue] = useState('111');
    const [noteState, setNoteState] = useState<InputStatus>('default');
    const navigate = useNavigate();

    const { error: errorGetTagsByUser, loading, data: dataGetTagsByUser } = useQuery<{ getTagsByUser: Tag[] }, string>(QUERY_GET_TAGS_BY_USER, {
        pollInterval: 1000 * 60 * 30,
    })

    const [addNote, { error: errorAddNote, loading: loadingAddNote }] = useMutation<{ addNote: NotesOutput }, { addNoteInput: AddNoteInput }>(MUTATION_ADD_NOTE)

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
                        type="alpha"
                        events={{ onClick: () => onNavigateNotesPage() }}
                    />
                    <Title content={title} />
                    <Button
                        content=""
                        size="sm"
                        icon="check"
                        type="alpha"
                        events={{ onClick: () => onAddNote() }}
                    />
                </div>
                <div className="note-operations--body">
                    {/* <textarea name="" id="" ></textarea> */}
                    <Title content={'12/12/12'} />
                    <Select
                        value={tagValue}
                        setValue={setTagValue}
                        state={tagState}
                        setState={setTagState}
                        options={mapTagsToSelect()}
                    />
                    <div style={{ height: 'calc(100vh - 230px)' }}>
                        <TextArea
                            value={noteValue}
                            setValue={setNoteValue}
                            state={noteState}
                            setState={setNoteState}
                            attributes={{ placeholder: 'Write you note here:\nYou can format text with Markdown' }}
                        />
                    </div>
                </div>
            </>
        </Main>
    );
};
