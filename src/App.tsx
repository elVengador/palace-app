import * as React from 'react';
import { ApolloProvider } from '@apollo/client';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import { client } from './core/infraestructure/apollo';
import HomePage from './app/presentation/pages/home-page/HomePage';
import NotePage from './app/presentation/pages/NotePage/NotePage';
import NotesPage from './app/presentation/pages/NotesPage/NotesPage';
import SignIn from './app/presentation/pages/SignInPage/SignInPage';
import SignUp from './app/presentation/pages/SignUpPage/SignUpPage';
import TagsPage from './app/presentation/pages/TagsPage/TagsPage';
import { Alerts, RefControlAlerts } from './core/presentation/atomic/organisms/Alerts/Alerts';
import { Portal } from './core/presentation/atomic/templates/Portal/Portal';

export const AlertContext = React.createContext<{ addSA: (message: string) => void } | null>(null);

export default function App(): JSX.Element {

    const refAlerts = React.useRef<RefControlAlerts>(null)

    const addSA = (message: string) => refAlerts.current?.addSuccessAlert(message)

    return (
        <AlertContext.Provider value={{ addSA }}>

            <ApolloProvider client={client}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="auth">
                            <Route index element={<SignIn />} />
                            <Route path="sign-up" element={<SignUp />} />
                            <Route path="*" element={<div>Not found in AUTH</div>} />
                        </Route>
                        <Route path="notes"  >
                            <Route index element={<NotesPage />} />
                            <Route path="add" element={<NotePage />} />
                            <Route path=":id" element={<NotePage />} />
                        </Route>
                        <Route path="tags" element={<TagsPage />} />
                        <Route path="user" element={<div>User</div>} />
                        <Route path="*" element={<div>Not found</div>} />
                    </Routes>
                    <Portal>
                        <Alerts refControlAlerts={refAlerts} />
                    </Portal>
                </BrowserRouter>
            </ApolloProvider>
        </AlertContext.Provider>
    );
}
