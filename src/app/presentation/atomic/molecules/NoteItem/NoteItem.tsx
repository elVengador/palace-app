import React from 'react';

import './NoteItem.scss';
import { Title } from '../../../../../core/presentation/atomic/atoms/Title/Title';
import { Tag } from '../../../../domain/entities';
import { useMarkdown } from '../../../../../core/presentation/utils/hooks/useMarkdown';
import { formatDate } from '../../../../../core/application/utils/dates';
import { Style } from '../../../../../core/presentation/utils/interfaces.utils';

interface NoteItemProps {
    content: string;
    tags: Tag[];
    date: string;
    size?: 'sm' | 'md' | 'lg' | 'full';
    attributes?: { style?: Style }
    // color?: 'primary' | 'secondary'
    onClick?: () => void;
}

export const NoteItem = ({
    content = '',
    tags = [],
    size = 'md',
    // color = 'primary',
    ...props
}: NoteItemProps): JSX.Element => {
    const { markdownToHtml } = useMarkdown()

    const tagAttribures = { style: { 'marginRight': '10px' } }


    const buildTags = () => tags.map(cur => <Title
        content={cur.value}
        icon="hashtag"
        key={cur._id}
        size="xs"
        attributes={tagAttribures} />)

    const onClickNote = () => { props.onClick && props.onClick() }

    return (
        <>
            {
                size === 'sm' &&
                <div className={'note note--sm'}>
                    <p>{content}</p>
                </div>
                // <span className={`title title-${size} title-${color}`} {...props}>
                //     {icon && <FontAwesomeIcon icon={icon} className="mr-sm" />}
                //     {content}
                // </span>
            }
            {
                size === 'md' &&
                <div className={'note note--md'}>
                    <div
                        className={'note--body'}
                        onClick={onClickNote}
                        dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }}
                    ></div>
                    <div className="note--footer">
                        {buildTags()}
                        <Title
                            content={formatDate(props.date)}
                            size="xs"
                            attributes={{ style: { marginLeft: 'auto' } }}
                        />
                    </div>
                </div>
            }
            {
                size === 'lg' &&
                <div>
                    <p>{content}</p>
                </div>
            }
            {
                size === 'full' &&
                <div className={'note note--full'} style={{ ...props.attributes?.style }}>
                    <div
                        className={`note--body__full`}
                        onClick={onClickNote}
                        dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }}
                    ></div>
                    <div className="note--footer">
                        {buildTags()}
                        <Title
                            content={formatDate(props.date)}
                            size="xs"
                            attributes={{ style: { marginLeft: 'auto' } }}
                        />
                    </div>
                </div>
            }
        </>
    );
};
