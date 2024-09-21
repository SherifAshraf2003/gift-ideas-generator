"use client"; 
import Image from "next/image";
import { ChevronRight } from "lucide-react"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState } from "react";
import Chatbot from './Components/Chatbot'

const Home = () => {

  const [hide, setHide] = useState(false)
  
    

    const handleClick =  async () => {
      
      await gsap.to("#title",{
        y: -600,
        duration: 1,
        stagger: 0.4,
        ease: "power4.out"
      })

      setHide(true)
    }




  return (
    <section className="flex items-center justify-center flex-col h-[100vh] bg-gradient-to-r from-gradientFrom to-gradientTo ">
      <p id="title" className= {`text-white text-[40px] font-bold title ${hide ? "hidden" : " "}`} >Gift Ideas Generator</p>
      <p id="title" className={`text-[16px] text-textColor my-4 font-bold ${hide ? "hidden" : " "}`} >tired of brainstorming gift ideas ?</p>
      <p id="title" className={`text-[16px] font-bold text-textColor ${hide ? "hidden" : " "}`} >Let us help you</p>
      <button id="title" onClick={handleClick} className={`flex bg-white p-4 m-6 rounded-lg ${hide ? "hidden" : " "  }`}>
        Get Started
        <ChevronRight/>
      </button>

      {hide && <Chatbot/>}
    </section>
  );
}

export default Home


