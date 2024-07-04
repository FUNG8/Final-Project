import React, { useEffect, useState } from 'react'
import  "./patientBanner.scss"
import logo from '../../image/logo.jpeg'

export default function PatientBanner(){
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

    const imageSize = windowWidth < 600 ? 100 : 150; // Example: smaller image for small screens
    return(
        <div className='bannerBack-layer'>
            <img src={logo} alt="logo"
            style={{
            width: `${imageSize}px`,
            height: `${imageSize}px`,
        }}/>
        </div>
    )
}
