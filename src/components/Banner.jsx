import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col md:flex-row bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 overflow-hidden'>
      {/*-------Left Side ------*/}
      <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5 animate-fade-in-up'>
        <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
          <p className='animate-slide-in-left'>Book Appointment</p>
          <p className='mt-4 animate-slide-in-left animation-delay-200'>with 100+ Trusted Doctors</p>
        </div>

        <button
          onClick={() => { navigate('/login'); scrollTo(0, 0) }}
          className='bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 hover:shadow-lg transition-all duration-300 animate-bounce-in animation-delay-400'
        >
          Create account
        </button>
      </div>

      {/*-------Right Side ------*/}
      <div className='md:w-1/2 lg:w-[370px] relative flex items-end justify-center md:justify-end'>
        <img
          className='w-full max-w-[280px] sm:max-w-[320px] md:max-w-md md:absolute md:bottom-0 md:right-0 hover:scale-105 transition-transform duration-500'
          src={assets.banner_img}
          alt="Doctor Appointment"
        />
      </div>
    </div>
  )
}

export default Banner
