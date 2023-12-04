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
import { SignOut } from '../../../../core/presentation/atomic/molecules/SignOut/SignOut';

export default function TagsPage(): JSX.Element {


    const alertContext = useContext(AlertContext)
    const navigate = useNavigate();

    const { loading, data } = useQuery<{ getTagsByUser: Tag[] }>(QUERY_GET_TAGS_BY_USER, {
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


    const header = <Header rightElementOptions={<SignOut />} />
    const footer = <MenuFooter menuItems={MENU} />
    const main = <Tags tags={data?.getTagsByUser} loading={loading} />

    return (
        <Page main={main} header={header} footer={footer} />
    )
}

