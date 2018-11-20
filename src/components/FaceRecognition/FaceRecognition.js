import React from 'react';
import './FaceRecognition.css';

export const FaceRecognition = ({imageUrl, box}) =>
    <div className='center pa2'>
        <div className='absolute mt2'>
            <img id='inputImage' alt='given by the user'
                src={imageUrl} width='500px' height='auto'/>
            <div className='bounding-box'
                style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
        </div>
    </div>;
