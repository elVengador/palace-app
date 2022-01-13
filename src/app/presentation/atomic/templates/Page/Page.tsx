import React from 'react';

import './Page.scss';

interface FormProps {
    header?: JSX.Element,
    footer?: JSX.Element,
    main: JSX.Element,
    leftMenu?: JSX.Element,
    rightMenu?: JSX.Element
}

export const Page = ({ ...props }: FormProps): JSX.Element => {
    return (
        <div className="page--wrapper">
            <div className="header--wrapper">
                {props.header}
            </div>

            <div className="wrapper">
                {props.leftMenu &&
                    <div className="wrapper--left-menu">
                        {props.leftMenu}
                    </div>
                }
                <div className="wrapper--main">
                    {props.main}
                </div>
                {props.rightMenu &&
                    <div className="wrapper--right-menu">
                        {props.rightMenu}
                    </div>
                }
            </div>

            <div className="footer--wrapper">
                {props.footer}
            </div>
        </div>
    );
};
