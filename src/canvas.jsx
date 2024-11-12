import { useEffect, useRef, useState } from "react";
import canvasImages from "./canvasimages";
import { useGSAP } from "@gsap/react"; //abhi gsap install karke use kar sakte hai

import gsap from "gsap";

function Canvas({ details }) { //startIndex is the index of the image to be shown, 
    const {startIndex,numImages,duration,size,top,left,zIndex}=details; //destructuring the details object
    const [index, setIndex] = useState({value:startIndex}); //konsi image show karni h
    const canvasRef= useRef(null);

useGSAP(()=>{ //useGSAP is used to animate the canvas
    gsap.to(index,{
        value:startIndex+numImages-1, //149 is the total number of images
        duration:duration, //3 seconds
        repeat:-1, //infinite loop
        ease:"linear", //linear is used to animate the canvas smoothly
        onUpdate:(self)=>{
            setIndex({value:Math.round(index.value)}); //math.round se integer value hee aayegi
        },
    });
gsap.from(canvasRef.current,{
    opacity:0, //opacity is used to make the canvas transparent
     //scale is used to make the canvas smaller
    duration:1, //duration is used to set the duration of the animation
    ease:"power2.inOut", //ease is used to set the ease of the animation
});

});

    useEffect(()=>{ //useEffect is used to load the images in the canvas
        const scale = window.devicePixelRatio; //devicePixelRatio is used to get the scale of the device 
        const canvas = canvasRef.current; //useRef is used to get the current value of the canvas element
        const ctx = canvas.getContext('2d'); //ctx is used to draw on the canvas, yaha reference paas hora h
        const img = new Image();
        img.src = canvasImages[index.value];
        img.onload = () => { //onload is used to load the image
            canvas.width = canvas.offsetWidth * scale; //canvas ki hieght and width image ke width and height ke equal set kar diya
            canvas.height = canvas.offsetHeight * scale;
            canvas.style.width = canvas.offsetWidth+ "px";
            canvas.style.height = canvas.offsetHeight+"px";

            ctx.scale(scale,scale);
            ctx.drawImage(img, 0, 0,canvas.offsetWidth,canvas.offsetHeight);//drawImage is used to draw the image on the canvas
        };
        //load images in canvas
        //upar waale ki images neeche waale canvas par dikhni chahiye, kisi or canvas ki images kahi or canvas par dikhni chahiye
    },[index]); //useEffect baar baar chale, jab bhi index ki value change ho.
  return(
   <canvas
   data-scroll //data-scroll is a attribute that is used to create smooth scrolling effects
   data-scroll-speed={Math.random().toFixed(1)} //data-scroll-speed is a attribute that is used to create smooth scrolling effects
   ref={canvasRef} //canvas bnaya hai uski height and width set kar diya
   className="absolute"
   style={{width: `${size*1.8}px`, height:`${size*1.8}px` , top:`${top}%`, left:`${left}%`, zIndex:`${zIndex}`}}
    id="canvas"></canvas> //useRef se reference paas karke canvas ko access kar sakte hai
  );
}

export default Canvas;

//canvas component created
//load images in canvas
