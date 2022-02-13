import React from 'react';
import { Converter } from 'showdown'

import './NoteItem.scss';
import { Title } from '../../../../../core/presentation/atomic/atoms/Title/Title';
import { Tag } from '../../../../domain/entities';

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

    const onClickNote = () => { props.onClick() }

    const htmlToMarkDown = (content: string) => {
        const converter = new Converter()
        return converter.makeHtml(content)
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
                    <div className={'note--body'} onClick={onClickNote} dangerouslySetInnerHTML={{ __html: htmlToMarkDown(content) }}></div>
                    <div className="note--footer">
                        {buildTags()}
                        <Title content={props.date} size="xs" attributes={{ style: { marginLeft: 'auto' } }} />
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
