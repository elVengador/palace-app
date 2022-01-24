import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './NoteItem.scss';
import { Title } from '../../atoms/Title/Title';
import { Tag } from '../../../../domain/entities';

// export interface Tag {
//     id: string,
//     value: string,
// }

interface NoteItemProps {
    content: string;
    tags: Tag[];
    date: string;
    size?: 'sm' | 'md' | 'lg';
    // color?: 'primary' | 'secondary'
    onClick: () => void;
}

export const NoteItem = ({
    content = '',
    tags = [],
    size = 'md',
    // color = 'primary',
    ...props
}: NoteItemProps): JSX.Element => {

    const tagAttribures = { style: { 'marginRight': '10px' } }

    const buildTags = () => tags.map(cur => <Title
        content={cur.value}
        icon="hashtag"
        key={cur._id}
        size="xs"
        attributes={tagAttribures} />)

    const onClickNote = () => {
        props.onClick()
    }

    return (
        <>
            {
                size === 'sm' &&
                <div className={'note'}>
                    <p>{content}</p>
                </div>
                // <span className={`title title-${size} title-${color}`} {...props}>
                //     {icon && <FontAwesomeIcon icon={icon} className="mr-sm" />}
                //     {content}
                // </span>
            }
            {
                size === 'md' &&
                <div className={'note'}>
                    <p className={'note--body'} onClick={onClickNote}>{content}</p>
                    <div className="note--footer">
                        <div className="note--tags">{buildTags()}</div>
                        <div><Title content={props.date} size="xs" /></div>
                    </div>
                </div>
            }
            {
                size === 'lg' &&
                <div>
                    <p>{content}</p>
                </div>
            }
        </>
    );
};
