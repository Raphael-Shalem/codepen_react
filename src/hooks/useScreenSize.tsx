import { useState, useLayoutEffect } from 'react';

const useScreenSize = () => {

    const [screenSize, setScreenSize] = useState([window.innerWidth, window.innerHeight]);  

    useLayoutEffect(() => {
      function updateSize() {
        setScreenSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
  
      
      return () => { 
        window.removeEventListener('resize', updateSize); 
      }
    }, []);

    return {
      width: screenSize[0],
      height: screenSize[1]
    };
}

export default useScreenSize;