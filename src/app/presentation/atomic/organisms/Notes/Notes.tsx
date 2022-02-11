import React from 'react';

import './Notes.scss';
import { Title } from '../../../../../core/presentation/atomic/atoms/Title/Title';
import { NoteItem } from '../../molecules/NoteItem/NoteItem';
import { Main } from '../../../../../core/presentation/atomic/molecules/Main/Main';
import { GetNotesByTagOutput } from '../../../../domain/entities';


interface HeaderProps {
    title: string;
}

export const Notes = ({
    title = ''
}: HeaderProps): JSX.Element => {

    const notes: GetNotesByTagOutput[] = [
        {
            _id: '1',
            value: 'some notes',
            state: 'ENABLE',
            creationDate: '12/12/12',
            creationUser: '12/12/12',
            updateDate: '12/12/12',
            tags: [
                {
                    _id: '1',
                    creationDate: '12/12/12',
                    updateDate: '12/12/12',
                    state: 'ENABLE',
                    value: 'tag-1',
                    userId: '1'
                }
            ]
        },
        {
            _id: '2',
            value: 'some notes1',
            state: 'ENABLE',
            creationDate: '12/12/12',
            creationUser: '12/12/12',
            updateDate: '12/12/12',
            tags: []
        },
        {
            _id: '3',
            value: 'some notes 2',
            state: 'ENABLE',
            creationDate: '12/12/12',
            creationUser: '12/12/12',
            updateDate: '12/12/12',
            tags: []
        }
    ]

    const buildNotes = notes.map(cur => <NoteItem
        content={cur.value}
        date={cur.creationDate}
        tags={[]}
        onClick={() => console.log('ok')}
        key={cur._id}
    />)

    return (
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
