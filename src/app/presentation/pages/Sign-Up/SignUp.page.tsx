import React, { useEffect } from 'react'

import './SignUp.scss';
import { Footer } from '../../atomic/organisms/Footer/Footer';
import { FormSignUp } from '../../atomic/organisms/FormSignUp/FormSignUp';
import { Header } from '../../atomic/organisms/Header/Header';
import { Page } from '../../atomic/templates/Page/Page';
// import { useNote } from '../../../application/controllers/note.controller'

export default function SignUp(): JSX.Element {
    // const { notes } = useNote()
    // const [pokemon, setPokemon] = useState<Pokemon | null>(null)

    useEffect(() => {
        console.log('main useefect');
    }, [])


    const header = <Header title="Mind Notes" />
    const footer = <Footer title="2021 - elVengador" />
    const main = <div className="sign-up--wrapper">
        <FormSignUp />
    </div>

    return (
        <Page main={main} header={header} footer={footer} />
    )
}

