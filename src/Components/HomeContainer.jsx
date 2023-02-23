import React from 'react'
import MainSectionImg from "../assets/imgx.png";
import MainSectionDollImg from "../assets/doll.jpg"
const HomeContainer = () => {
  return (
    <section id="home h-auto">
    <div className="my-0.5 bg-cover">
      <img src={MainSectionImg} alt="" />
    </div>
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 px-4 md:px-16 bg-primary">
      <div className="p-4  flex flex-col items-start  justify-center flex-1">
        <div className="flex flex-col ">
          <p className="text-[2.5rem] md:text-[4rem] font-italian font-bold tracking-wide">
            Best Cakes In
          </p>
          <span className="text-red-600 md:text-[4.5rem] font-bold font-italian text-[3rem]">Jaipur</span>
          <p className="leading-7 my-2 text-center md:text-left">
            Cakes by Nandini is not only a cake, each piece is an art. The
            cakes are the canvas upon which I paint with frosting. Every cake
            is made by heart & speak for itself. Each customer is valued as
            they value the dedication and the hard work that goes behind it
            and more importantly the Love for the craft.
          </p>
          <button
            type="button"
            className="border-solid w-auto md:w-[10rem] px-4 py-2 font-semibold  hover:drop-shadow-lg  transition-all ease-in-out duration-100  rounded-md border-2 border-black"
          >
            Order Now!
          </button>
        </div>
      </div>
      <div className="p-4 flex-1 flex items-center justify-center">
        
            <img className='h-[570px] md:h-600 border-solid border-black border-4 rounded-2xl' src={MainSectionDollImg} alt="" />
        
      </div>
    </div>
  </section>
  )
}

export default HomeContainer