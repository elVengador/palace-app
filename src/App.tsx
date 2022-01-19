import * as React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import HomePage from './app/presentation/pages/home-page/HomePage';
import NotePage from './app/presentation/pages/NotePage/NotePage';
import NotesPage from './app/presentation/pages/NotesPage/NotesPage';
import SignIn from './app/presentation/pages/SignInPage/SignInPage';
import SignUp from './app/presentation/pages/SignUpPage/SignUpPage';
import TagsPage from './app/presentation/pages/TagPage/TagPage';

export default function App(): JSX.Element {
    return (
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
                    <Route path=":id" element={<NotePage />} />
                </Route>
                <Route path="tags" element={<TagsPage />} />
                <Route path="user" element={<div>User</div>} />
                <Route path="*" element={<div>Not found</div>} />
            </Routes>
        </BrowserRouter>
    );
}
