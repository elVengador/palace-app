import React from 'react';

import './Notes.scss';
import { Title } from '../../atoms/Title/Title';
import { NoteItem } from '../../molecules/NoteItem/NoteItem';
import { Main } from '../../molecules/Main/Main';
import { Tag } from '../../../../domain/entities';

interface Note {
    id: string,
    content: string,
    date: string,
    tags: Tag[]
}

interface HeaderProps {
    title: string;
}

export const Notes = ({
    title = ''
}: HeaderProps): JSX.Element => {

    const notes: Note[] = [
        // {
        //     id: '1',
        //     content: 'Some Note',
        //     date: '12 de agosto del 2021',
        //     tags: [{ _id: '1', value: 'example' }, { id: '2', value: 'task' }]
        // },
        // {
        //     id: '2',
        //     content: 'Another Note',
        //     date: '13 de agosto del 2021',
        //     tags: [{ _id: '2', value: 'task' }]
        // },
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
