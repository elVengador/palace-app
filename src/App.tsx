import * as React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import HomePage from './app/presentation/pages/home-page/HomePage';
import SignIn from './app/presentation/pages/Sign-In/SignIn.page';
import SignUp from './app/presentation/pages/Sign-Up/SignUp.page';

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
                <Route path="notes" element={<div>Notes</div>} />
                <Route path="user" element={<div>User</div>} />
                <Route path="*" element={<div>Not found</div>} />
            </Routes>
        </BrowserRouter>
    );
}
