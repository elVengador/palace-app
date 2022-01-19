import React from 'react';

import './NoteOperations.scss';
import { Title } from '../../atoms/Title/Title';
import { NoteItem, Tag } from '../../molecules/NoteItem/NoteItem';
import { Main } from '../../molecules/Main/Main';

interface NoteOperationsss {
    id: string,
    content: string,
    date: string,
    tags: Tag[]
}

interface NoteOperationsProps {
    title: string;
}

export const NotesOperations = ({
    title = ''
}: NoteOperationsProps): JSX.Element => {

    const notes: NoteOperationsss[] = [
        {
            id: '1',
            content: 'Some Note',
            date: '12 de agosto del 2021',
            tags: [{ id: '1', value: 'example' }, { id: '2', value: 'task' }]
        },
        {
            id: '2',
            content: 'Another Note',
            date: '13 de agosto del 2021',
            tags: [{ id: '2', value: 'task' }]
        },
    ]

    const buildNotes = notes.map(cur => <NoteItem
        content={cur.content}
        date={cur.date}
        tags={cur.tags}
        onClick={() => console.log('ok')}
        key={cur.id}
    />)

    return (
        // <main className="notes">
        //     <div className="notes--header">
        //         <Title content={title} />
        //     </div>
        //     <div className="notes--items">
        //         {buildNotes}
        //     </div>
        // </main>
        <Main>
            <>
                <div className="notes--header">
                    <Title content={title} />
                </div>
                <div className="notes--items">
                    {buildNotes}
                </div>
            </>
        </Main>
    );
};
