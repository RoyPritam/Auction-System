import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
//import "../../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel';


const Gallery = (props) => {
    return (
        <>
            <Carousel className="h-25 m-2">
                {props.caption.map(
                    (ele)=><div>
                        <img src={ele.src} />
                        <p className="legend">{ele.caption}</p>
                    </div>)}
            </Carousel>
 
        </>
    )
}

export default Gallery
