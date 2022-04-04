import React from 'react';

import './Page.scss';

interface FormProps {
    header?: JSX.Element,
    footer?: JSX.Element,
    main: JSX.Element,
    leftMenu?: JSX.Element,
    rightMenu?: JSX.Element
}

export const Page = ({ header, footer, main }: FormProps): JSX.Element => {
    return (
        <>
            <div className="header--wrapper">{header}</div>
            <div className="main-wrapper">
                <div className="wrapper">{main}</div>
            </div>
            <div className="footer--wrapper">{footer}</div>
        </>
    );
};
