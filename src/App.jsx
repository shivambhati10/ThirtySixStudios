import "./index.css";
import Canvas from "./canvas";
import data from "./data";
import LocomotiveScroll from 'locomotive-scroll';
import { useEffect, useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';


function App() {
  const [showCanvas, setShowCanvas] = useState(true); //useState ek state variable create kre h jo showCanvas ke name se h
  const headingref = useRef(null); //useRef is a hook that is used to get the reference of the heading
  const growingSpan=useRef(null);
  useEffect(()=>{ //useEffect is a hook that is used to run the code when the component is mounted
    const locomotivescroll = new LocomotiveScroll(); //locomotive scroll is a library that is used to create smooth scrolling effects
   
  },[]);
useEffect(()=>{
  const handleClick=(e)=>{
    setShowCanvas((prevShowCanvas)=>{ //setShowCanvas is a function that is used to update the state variable showCanvas
      if (!prevShowCanvas){
        gsap.set(growingSpan.current,{
          top:e.clientY,
          left:e.clientX,
        });
        gsap.to("body",{
          color:"#000",
          backgroundColor:"#fd2c2a",
          duration:1.2,
          ease:"power2.inOut",
        });
        gsap.to(growingSpan.current,{
          scale:1000,
          duration:2,
          ease:"power2.inOut",
          onComplete:()=>{
          gsap.set(growingSpan.current, {
            scale: 0,
            clearProps:"all",
          });
       
          },
        });
      }
      else{
        gsap.to("body",{
          color:"#fff",
          backgroundColor:"#000",
          duration:1.2,
          ease:"power2.inOut",
        });
      }
      
      return !prevShowCanvas;
      
    });
  
    
  };
  const headingElement = headingref.current;
    headingElement.addEventListener("click",handleClick);
     //cleanup function is used to remove the event listener when the component is unmounted
   return ()=>
    headingElement.removeEventListener("click",handleClick);
   },[]);

  return ( <>
  <span ref={growingSpan} 
  className="growing rounded-full block fixed top-[-20px] left-[-20px] w-5 h-5"></span>
  <div className="w-full relative min-h-screen  font-['Helvetica_Now_Display'] ">
        {showCanvas && 
        data[0].map((canvasdets,index)=>
          <Canvas details={canvasdets}/>
        )}
        {/* {data[0].map((canvasdets,index)=>( //data[0] is the first screen, data[0].map is used to iterate over the array and return a new array of components
        <Canvas details={canvasdets}/>//details is the data of the canvas
        ))}   */}
        <div className="w-full relative z-[1] h-screen text-white ">
          <nav className="w-full p-8 flex justify-between z-50">
            <div className="text-white text-2xl font-regular">thirtysixstudios</div>
            <div className="flex gap-10">
              {["Home", "About", "Work", "Contact"].map((link) => (
                <a key={link}
                 href={`#${link.toLowerCase()}`} 
                 className="text-md hover:text-gray-300">
                  {link}
                </a>
              ))}
            </div>
          </nav>
          <div className="textcontainer w-full px-[20%]">
          <div className="text w-[50%]">
            <h3 className="text-4xl leading-[1.2]" >
            At Thirtysixstudio, we build immersive digital experiences for brands with a purpose.
            </h3>
            <p className="text-lg w-[80%] mt-10 font-normal" >
            We’re a boutique production studio focused on design, motion, and creative technology, constantly reimagining what digital craft can do for present-time ads and campaigns.
            </p>
            <p className="text-md mt-10">scroll down</p>
          </div>
            
          </div>
          
          <div className="w-full absolute bottom-0 left-0">
          <h1 
          ref={headingref} //ref is a hook that is used to get the reference of the heading
          className=" text-[17rem] font-normal tracking-tight leading-none pl-5">thirtysixstudios</h1>
        

          </div>
        
        </div>
      
  </div>
  {/* ye dusri screen h neeche waali mtlb neeche scroll krenge to same hee dikhega */}
  <div className="w-full relative h-screen mt-32 px-10 ">
  {showCanvas && 
        data[1].map((canvasdets,index)=>
          <Canvas details={canvasdets}/>
        )}
       
        <h1 className="text-8xl">about the brand</h1>
    <p className="text-4xl leading-[1.8] w-[80%] mt-10 font-light">we are a  team of designers and strategists who are passionate about creating immersive digital experiences that are both beautiful and functional, we are a team of designers and strategists who are passionate about creating immersive digital experiences that are both beautiful and functional, we are a team of designers and strategists who are passionate about creating immersive digital experiences that are both beautiful and functional</p>
 <img  className="w-[80%] mt-10"
 src="https://directus.funkhaus.io/assets/b3b5697d-95a0-4af5-ba59-b1d423411b1c?withoutEnlargement=true&fit=outside&width=1400&height=1400"
  alt=""
  />
 

        </div>
  
  
  </>
  );
}

export default App;
 //app component created 