import React from 'react'
import './Banner.css';
import banner from "../../../assets/videos/Bisket-Vid-1-1.mp4"

function Banner() {
    return (
        <div className='jb-box'>
            <video muted autoPlay loop >
                <source src={banner} type="video/mp4" />
            </video>
        </div>
    );
}

export default Banner
