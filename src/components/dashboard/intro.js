import React from 'react';
import "../../index.css";
import Video from "../../assets/sri_lanka.mp4";
import Banner from "../../assets/banner.png";

const Intro = () => {
  return (
    <section id="intro" className="relative w-full h-dvh ">
      <video
        className="absolute top-0 left-0 w-full h-full object-fill bg-opacity-95"
        alt="video"
        src={Video}
        autoPlay
        loop
        muted
      />


      <div className="relative z-10 flex items-center justify-center w-full h-full bg-opacity-90 text-center px-6">
        <img src={Banner} alt="img" />
      </div>
    </section>
  )
}

export default Intro;
