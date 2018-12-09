import React from 'react';
import './FaceRecognition.css';

export const FaceRecognition = ({imageUrl, boxes}) => {
    return (
    <div className='center pa2'>
        <div className='absolute mt2'>
            <img id='inputImage' alt='given by the user'
                 src={imageUrl} width='500px' height='auto'/>
            {
                boxes.map((box, index) =>
                    <div key={index} className='bounding-box'
                         style={{
                             top: box.topRow, right: box.rightCol,
                             bottom: box.bottomRow, left: box.leftCol
                         }}>
                    </div>
                )
            }
        </div>
    </div>);
};