import React from 'react';

import './NotePreview.scss';
// import { Tag } from '../../../../domain/entities';
import { useMarkdown } from '../../../../../core/presentation/utils/hooks/useMarkdown';
// import { formatDate } from '../../../../../core/application/utils/dates';
import { Style } from '../../../../../core/presentation/utils/interfaces.utils';

interface NoteItemProps {
    content: string;
    // tags: Tag[];
    // date: string;
    attributes?: { style?: Style }
}

export const NotePreview = ({
    content = '',
    // tags = [],
    // ...props
}: NoteItemProps): JSX.Element => {
    const { markdownToHtml } = useMarkdown()

    // const buildTags = () => tags.map(cur => <small
    //     key={cur._id}
    //     style={{ 'marginRight': '10px' }}
    // >
    //     #{cur.value}
    // </small>)

    return (
        <div className={'note-preview'}>
            <div
                className={`note-preview--body`}
                dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }}
            ></div>
        </div>
    );
};
