import React, { useContext } from 'react'

import './TagsPage.scss';
import { Header } from '../../../../core/presentation/atomic/organisms/Header/Header';
import { Page } from '../../atomic/templates/Page/Page';
import { Tags } from '../../atomic/organisms/Tags/Tags';
import { MenuFooter } from '../../atomic/organisms/MenuFooter/MenuFooter';
import { MENU } from '../config.util';
import { QUERY_GET_TAGS_BY_USER } from '../../../infraestructure/repository/tag/tag.gql';
import { Tag } from '../../../domain/entities';
import { useQuery } from '@apollo/client';
import { AlertContext } from '../../../../App';
import { useNavigate } from 'react-router-dom';

export default function TagsPage(): JSX.Element {


    const alertContext = useContext(AlertContext)
    const navigate = useNavigate();

    const { loading, data } = useQuery<{ getTagsByUser: Tag[] }, string>(QUERY_GET_TAGS_BY_USER, {
        pollInterval: 1000 * 60 * 30,
        onError: (err) => {
            console.log(err);
            if (err.message === 'Unauthorized') {
                console.log('dont hast token');
                alertContext?.addErrorAlert('Ups, your session expired')
                return navigate('/auth')
            }
            alertContext?.addErrorAlert()
        }
    })

    const header = <Header />
    const footer = <MenuFooter menuItems={MENU} />
    const main = <Tags tags={data?.getTagsByUser} loading={loading} />

    return (
        <Page main={main} header={header} footer={footer} />
    )
}

