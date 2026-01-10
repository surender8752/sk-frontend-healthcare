import React, { useEffect, useRef } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'

const Header = () => {
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const buttonRef = useRef(null)
  const imageRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([titleRef.current, subtitleRef.current, buttonRef.current, statsRef.current], {
        opacity: 0,
        y: 60
      })
      gsap.set(imageRef.current, { opacity: 0, x: 100, rotateY: 15 })

      // Timeline animation
      const tl = gsap.timeline({ delay: 0.3 })

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      })
        .to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.5")
        .to(buttonRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "back.out(1.7)"
        }, "-=0.4")
        .to(statsRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.3")
        .to(imageRef.current, {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1.2,
          ease: "power3.out"
        }, "-=0.8")

      // Floating animation for image
      gsap.to(imageRef.current, {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })

      // Button hover effect
      const button = buttonRef.current
      button.addEventListener('mouseenter', () => {
        gsap.to(button, { scale: 1.05, duration: 0.3, ease: "power2.out" })
      })
      button.addEventListener('mouseleave', () => {
        gsap.to(button, { scale: 1, duration: 0.3, ease: "power2.out" })
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className='relative min-h-[75vh] sm:min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden'>
      {/* Animated Background */}
      <div className='absolute inset-0 bg-gradient-to-br from-primary via-blue-600 to-indigo-800'>
        {/* Animated gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-tr from-transparent via-blue-400/20 to-purple-500/30 animate-pulse-slow'></div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className='absolute w-2 h-2 bg-white/20 rounded-full animate-float'
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}

        {/* Large gradient orbs */}
        <div className='absolute top-10 left-10 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-br from-blue-400/30 to-transparent rounded-full blur-3xl animate-float'></div>
        <div className='absolute bottom-20 right-10 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full blur-3xl animate-float-delayed'></div>
        <div className='absolute top-1/2 left-1/3 w-24 h-24 sm:w-48 sm:h-48 bg-gradient-to-r from-pink-400/20 to-transparent rounded-full blur-2xl animate-float-slow'></div>
      </div>

      <div className='relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20'>
        <div className='flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12'>

          {/* Left Content */}
          <div className='flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-4 sm:gap-6'>

            <h1 ref={titleRef} className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-bold leading-tight tracking-tight'>
              Book Appointment
              <br />
              <span className='bg-gradient-to-r from-blue-200 via-cyan-200 to-white bg-clip-text text-transparent drop-shadow-lg'>
                with Trusted Doctors
              </span>
            </h1>

            <div ref={subtitleRef} className='flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-white/90'>
              <img className='w-20 sm:w-28 drop-shadow-xl hover:scale-110 transition-transform duration-500 cursor-pointer' src={assets.group_profiles} alt="Trusted Profiles" />
              <p className='text-sm sm:text-base font-light max-w-xs sm:max-w-sm leading-relaxed'>
                Browse our extensive list of trusted doctors and schedule your appointment with ease.
              </p>
            </div>

            <button
              ref={buttonRef}
              onClick={() => navigate("/doctors")}
              className='group flex items-center gap-3 bg-white px-6 sm:px-10 py-3 sm:py-4 rounded-full text-primary font-bold text-sm sm:text-base shadow-2xl shadow-black/30 hover:shadow-white/40 transition-all duration-300 cursor-pointer'
            >
              <span>Book Appointment</span>
              <span className='group-hover:translate-x-2 transition-transform duration-300'>
                <img className='w-4 sm:w-5' src={assets.arrow_icon} alt="" />
              </span>
            </button>

            {/* Stats with 3D effect */}
            <div ref={statsRef} className='flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-10 mt-6 sm:mt-8'>
              {[
                { value: '100+', label: 'Expert Doctors' },
                { value: '50K+', label: 'Happy Patients' },
                { value: '24/7', label: 'Support' }
              ].map((stat, i) => (
                <div
                  key={i}
                  className='text-center p-3 sm:p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer'
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <p className='text-2xl sm:text-3xl font-bold text-white drop-shadow-lg'>{stat.value}</p>
                  <p className='text-xs sm:text-sm text-blue-200'>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Doctor Image with 3D effect */}
          <div className='flex-1 relative' style={{ perspective: '1000px' }}>
            <div ref={imageRef} className='relative' style={{ transformStyle: 'preserve-3d' }}>
              {/* Glow effect */}
              <div className='absolute inset-0 bg-gradient-to-t from-primary/60 via-blue-500/30 to-transparent rounded-3xl blur-3xl scale-110'></div>

              {/* Main Image */}
              <img
                className='relative z-10 w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px] xl:max-w-[500px] mx-auto rounded-3xl shadow-2xl shadow-black/40 object-cover border-4 border-white/20'
                src={assets.header_img}
                alt="Doctor"
              />

              {/* Floating badge */}
              <div className='absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl shadow-green-500/30 animate-bounce-slow'>
                <span className='text-white text-2xl sm:text-3xl font-bold'>✓</span>
              </div>

              {/* Rating badge */}
              <div className='absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-xl flex items-center gap-2'>
                <span className='text-yellow-500 text-xl'>★</span>
                <span className='font-bold text-gray-800'>4.9</span>
                <span className='text-gray-500 text-sm'>Rating</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Wave SVG */}
      <div className='absolute bottom-0 left-0 right-0'>
        <svg viewBox="0 0 1440 120" className='w-full h-16 sm:h-24 fill-white'>
          <path d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"></path>
        </svg>
      </div>
    </div>
  )
}

export default Header
