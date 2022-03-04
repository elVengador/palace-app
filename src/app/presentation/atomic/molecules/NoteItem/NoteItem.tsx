import React from 'react';

import './NoteItem.scss';
import { Tag } from '../../../../domain/entities';
import { useMarkdown } from '../../../../../core/presentation/utils/hooks/useMarkdown';
import { formatDate } from '../../../../../core/application/utils/dates';
import { Style } from '../../../../../core/presentation/utils/interfaces.utils';

interface NoteItemProps {
    content: string;
    tags: Tag[];
    dateInISO: string;
    size?: 'sm' | 'md' | 'lg' | 'full';
    attributes?: { style?: Style }
    onClick?: () => void;
}

export const NoteItem = ({
    content = '',
    tags = [],
    size = 'md',
    ...props
}: NoteItemProps): JSX.Element => {
    const { markdownToHtml } = useMarkdown()

    const buildTags = () => tags.map(cur => <small
        key={cur._id}
        style={{ 'marginRight': '10px' }}
    >
        #{cur.value}
    </small>)

    const onClickNote = () => { props.onClick && props.onClick() }

    return (
        <div className={'note'} onClick={onClickNote}>
            <div
                className={`note--body note--body__${size}`}
                dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }}
            ></div>
            <div className="note--footer">
                {buildTags()}
                <small>{formatDate(props.dateInISO)}</small>
            </div>
        </div>
    );
};
