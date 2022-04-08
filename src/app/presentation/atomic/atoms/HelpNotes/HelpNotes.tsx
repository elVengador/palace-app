import React from 'react'

import './HelpNotes.scss'

export const HelpNotes = (): JSX.Element => {
    return (
        <div className='help-notes'>
            <article className='help-notes-wrapper'>
                <h2 className='help-notes--title'>Titles:</h2>
                <div className="help-notes--content">
                    <span># Title</span> <h1>Title</h1>
                    <span>## Title</span> <h2>Title</h2>
                    <span>### Title</span> <h3>Title</h3>
                    <span>#### Title</span> <h4>Title</h4>
                    <span>##### Title</span> <h5>Title</h5>
                    <span>###### Title</span> <h6>Title</h6>
                </div>
            </article>

            <article className='help-notes-wrapper'>
                <h2 className='help-notes--table'>Table:</h2>
                <div className="help-notes--content">
                    <div><pre>
                        {`
|  a  |  b  |
|-----|-----|
|  x  |  x  |
|  x  |  x  |
                            `}
                    </pre>
                    </div>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>a</th>
                                    <th>b</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>x</td>
                                    <td>x</td>
                                </tr>
                                <tr>
                                    <td>x</td>
                                    <td>x</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </article>

            <article className='help-notes-wrapper'>
                <h2 className='help-notes--title'>Others:</h2>
                <div className="help-notes--content">
                    <span>[link text](link)</span> <a href="https://jimynicanor.com">link text</a>
                    <span>![image text](link)</span> <img src="https://projectpokemon.org/home/uploads/monthly_2017_06/satopika1.thumb.png.db5a4a77dcd380fb3ff09f276b64c627.png" alt="image text" />
                    <span>**Bold text**</span> <b>Bold text</b>
                    <div>
                        <div>- item 1</div>
                        <div>- item 2</div>
                        <div>- item 3</div>
                    </div>
                    <ul>
                        <li>item 1</li>
                        <li>item 2</li>
                        <li>item 3</li>
                    </ul>
                    <span>---</span> <div><hr /></div>
                </div>
            </article>

            <article className='help-notes--article'>
                <h2 className='help-notes--title'>Ligatures:</h2>
                <div className="help-notes--content">
                    <span><b>=</b> and <b>{'='}</b> </span> <h1>{'=='}</h1>
                    <span><b>=</b> and <b>{'>'}</b> </span> <h1>{'=>'}</h1>
                    <span><b>=</b> and <b>{'>'}</b> and <b>{'>'}</b> </span> <h1>{'=>>'}</h1>
                    <span><b>{'>'}</b> and <b>{'='}</b> </span> <h1>{'>='}</h1>
                    <span><b>{'|'}</b> and <b>{'>'}</b> </span> <h1>{'|>'}</h1>
                </div>
            </article>

        </div>
    )
}
