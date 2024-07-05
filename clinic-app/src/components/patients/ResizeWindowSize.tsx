// hahahahaha
import * as React from 'react';
import { useState, useEffect } from 'react';

export default function WindowResize() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
    useEffect(() => {
      // Handler to call on window resize
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      // Add event listener for window resize
      window.addEventListener('resize', handleResize);
  
      // Clean up event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
}  