import React from 'react'

import './HeaderPage.scss'

interface HeaderPageProps {
    leftOptions: JSX.Element,
    rightOptions: JSX.Element
}

export const HeaderPage = ({ leftOptions, rightOptions }: HeaderPageProps): JSX.Element => {
    return (
        <div className="header-page">
            <div className="left-options">{leftOptions}</div>
            <div className="right-options">{rightOptions}</div>
        </div>
    )
}
