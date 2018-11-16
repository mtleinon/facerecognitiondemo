import React from 'react';
import './ImageLinkForm.css';

export const ImageLinkForm = (
    {onInputChange, onSubmitButton}) =>
    <div>
        <p className='f3'>
            {'This Magic Brain will detect faces in your pictures.' +
            'Give the URL of the image.'}
        </p>
        <div className='center'>
            <div className='form center f4  pa3 shadow-5'>
                <input className='ma2 f4 pa2 w-70 center type="text"'
                    onChange={onInputChange}/>
                <button className='ma2 w-30 grow f4 link ph3 pv2 dib white bg-lightest-blue'
                    onClick={onSubmitButton}>Find face</button>
            </div>
        </div>
    </div>;