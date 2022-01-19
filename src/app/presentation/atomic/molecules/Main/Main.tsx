import React from 'react';

import './Main.scss';
// import { Title } from '../../atoms/Title/Title';
// import { Button } from '../../atoms/Button/Button';

interface MainProps {
    children: JSX.Element
}

export const Main = ({
    ...props
}: MainProps): JSX.Element => {
    return (
        <div className="main">
            {/* <div className="main--header">
                <div>
                    <Title content={title} />
                </div>
                <div></div>
            </div> */}
            <div className="main--body">
                {props.children}
            </div>
            {/* <div className="main--footer">

            </div> */}
        </div>
    );
};
