import React from 'react';

import './PageForm.scss';

interface FormProps {
    title: string;
    onClick?: () => void;
    children: JSX.Element
}

export const FormSignUp = ({
    title = '',
    ...props
}: FormProps): JSX.Element => {
    return (
        <div>
            <div className="wrapper">
                <div className="wrapper--header">
                    Lorem ipsum dolor,
                </div>
                <div className="container">
                    <div className="container--left-menu">
                        Lorem ipsum dolor sit amet consectetur
                    </div>
                    <div className="container--main">
                        sit amet consectetur adipisicing elit. Sequi quasi culpa assumenda odit laborum iusto consequuntur rem, esse reiciendis enim repellat ipsum, vel corporis, accusantium quo hic. Soluta, iste eligendi!
                    </div>
                    <div className="container--right-menu">
                        Lorem ipsum dolor sit amet consectetur
                    </div>
                </div>
                <div className="wrapper--footer">
                    sit amet consectetur adipisicing elit.
                </div>
            </div>

            {/* <Title content={title}></Title>
            {props.children}
            <Button content='ok' icon="check" /> */}
        </div>
    );
};
