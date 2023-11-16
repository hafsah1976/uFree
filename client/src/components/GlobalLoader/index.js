import {useMemo, useState, useRef, useEffect } from 'react';
import { pageImages } from '../../images';

import './GlobalLoader.css';

export default function GlobalLoader({ loading, loadDelay, Outlet }) {
    const loadingOutput = useMemo(
      () => 
        <div className='loading-container'>
            <p className='loading-message'>Loading...</p>
            <img className='loading-image' src={pageImages.loading} alt="" />
        </div>,
      []
    );
    const idleOutput = useMemo(
      () => <Outlet />,
      []
    );
  
    const [output, setOutput] = useState(loadingOutput);
    const loadingRef = useRef(loading);
    loadingRef.current = loading;
  
    useEffect(() => {
      // if not loading, show page
      if (!loading) {
        setOutput(idleOutput);
        return
      }
  
      // otherwise, show loader in loadDelay milliseconds
      setTimeout(() => {
        if (loadingRef.current) setOutput(loadingOutput);
      }, loadDelay);
    }, [loading, setOutput, idleOutput, loadingOutput, loadDelay])
  
    return (
      <>
        {output}
      </>
    );
  }