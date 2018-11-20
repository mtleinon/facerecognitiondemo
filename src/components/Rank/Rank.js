import React from 'react';

export const Rank = ({name, entries}) =>
    <div>
        <div className='white f3'>
            {`${name}, your current entries is...`}
        </div>
        <div className='white f2'>
            {entries}
        </div>
    </div>;