import React, { useEffect, useRef, Suspense } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import Scene3D from '../components/Scene3D'

gsap.registerPlugin(ScrollTrigger)

const Home = () => {
  const containerRef = useRef(null)
  const heroRef = useRef(null)
  const specialityRef = useRef(null)
  const doctorsRef = useRef(null)
  const bannerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero parallax
      gsap.to(heroRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      })

      // Speciality section - slide in from left with rotation
      gsap.fromTo(specialityRef.current,
        {
          x: -100,
          opacity: 0,
          rotateY: -15
        },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: specialityRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 1
          }
        }
      )

      // Doctors section - scale and fade
      gsap.fromTo(doctorsRef.current,
        {
          scale: 0.8,
          opacity: 0,
          y: 100
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: doctorsRef.current,
            start: "top 85%",
            end: "top 40%",
            scrub: 1
          }
        }
      )

      // Banner - zoom effect
      gsap.fromTo(bannerRef.current,
        {
          scale: 0.9,
          opacity: 0.5
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: bannerRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 1
          }
        }
      )

      // Smooth scroll sections - only animate if elements exist
      const sections = [specialityRef.current, doctorsRef.current, bannerRef.current]
      sections.forEach((section) => {
        if (!section) return
        const cards = section.querySelectorAll('.animate-card')
        if (cards && cards.length > 0) {
          gsap.fromTo(cards,
            { y: 50, opacity: 0, rotateX: 10 },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              stagger: 0.1,
              duration: 0.8,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: section,
                start: "top 70%",
              }
            }
          )
        }
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* 3D Background Scene */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      </div>

      {/* Hero Section with Parallax */}
      <div ref={heroRef} className="relative z-10">
        <Header />
      </div>

      {/* Speciality Menu with 3D Transform */}
      <div
        ref={specialityRef}
        className="relative z-20 bg-white/95 backdrop-blur-sm rounded-t-[3rem] -mt-12 pt-12 shadow-2xl"
        style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
      >
        <SpecialityMenu />
      </div>

      {/* Top Doctors with Scale Effect */}
      <div
        ref={doctorsRef}
        className="relative z-30 bg-gradient-to-b from-white via-blue-50/50 to-white py-8"
        style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
      >
        <TopDoctors />
      </div>

      {/* Banner with Zoom */}
      <div
        ref={bannerRef}
        className="relative z-40 bg-white"
        style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
      >
        <Banner />
      </div>
    </div>
  )
}

export default Home
