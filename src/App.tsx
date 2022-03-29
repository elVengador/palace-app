import * as React from 'react';
import { ApolloProvider } from '@apollo/client';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import { client } from './core/infraestructure/apollo';
import { Alerts, RefControlAlerts } from './core/presentation/atomic/organisms/Alerts/Alerts';
import { Portal } from './core/presentation/atomic/templates/Portal/Portal';
import HomePage from './app/presentation/pages/home-page/HomePage';
import NotesPage from './app/presentation/pages/NotesPage/NotesPage';
import SignIn from './app/presentation/pages/SignInPage/SignInPage';
import SignUp from './app/presentation/pages/SignUpPage/SignUpPage';
import TagsPage from './app/presentation/pages/TagsPage/TagsPage';
import UserPage from './app/presentation/pages/UserPage/UserPage';

export const AlertContext = React.createContext<{
    addSuccessAlert: (message?: string) => void
    addInfoAlert: (message: string) => void
    addWarningAlert: (message: string) => void
    addErrorAlert: (message?: string) => void
} | null>(null);

export default function App(): JSX.Element {

    const refAlerts = React.useRef<RefControlAlerts>(null)

    const addSuccessAlert = (message = 'Operation Successful') => refAlerts.current?.addSuccessAlert(message)
    const addInfoAlert = (message: string) => refAlerts.current?.addInfoAlert(message)
    const addWarningAlert = (message: string) => refAlerts.current?.addWarningAlert(message)
    const addErrorAlert = (message = 'Cant make this operation') => refAlerts.current?.addErrorAlert(message)

    return (
        <AlertContext.Provider value={{
            addSuccessAlert,
            addInfoAlert,
            addWarningAlert,
            addErrorAlert
        }}>

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
                            {/* <Route path="add" element={<NotePage />} />
                            <Route path=":id" element={<NotePage />} /> */}
                        </Route>
                        <Route path="tags" element={<TagsPage />} />
                        <Route path="user" element={<UserPage />} />
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
