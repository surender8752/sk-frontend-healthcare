import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  return (
    <div className='relative bg-primary overflow-hidden'>

      <div className='flex flex-col md:flex-row'>
        {/* -----Left Side----- */}
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 px-6 md:px-10 lg:px-20 md:py-[10vw]'>
          <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
            Book Appointment <br /> With Trusted Doctors
          </p>
          <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
            <img className="w-28" src={assets.group_profiles} alt="" />
            <p>Browse our extensive list of trusted doctors, <br className='hidden sm:block' /> schedule your appointment with ease.</p>
          </div>
          <a onClick={() => navigate('/doctors')} href='#speciality' className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
            Book appointment <img className='w-3' src={assets.arrow_icon} alt="" />
          </a>
        </div>

        {/* -----Right Side----- */}
        <div className='md:w-1/2 relative min-h-[250px] md:min-h-[400px]'>
          <img className='w-full h-full object-cover object-center' src={assets.header_img} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Header
