import React from 'react';

export const Navigation = ({onRouteChange, isSignedIn}) =>
    isSignedIn
    ? <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p onClick={()=> onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign out</p>
      </nav>
    : <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p onClick={()=> onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Signin</p>
        <p onClick={()=> onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
      </nav>;
