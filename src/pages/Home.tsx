import React, { useState, useEffect, useRef } from 'react'
import Projects from '../sections/Projects'
import Info from '../sections/Info'
import Contact from '../sections/Contact'
import FAQ from '../sections/FAQ'
import Gallery from '../sections/Gallery'

// Define position classes for each section
const sectionPositions: { [key: string]: string } = {
  Projects: 'section-right',
  Info: 'section-middle',
  Contact: 'section-bottom-right',
  FAQ: 'section-top-middle',
  Gallery: 'section-bottom-left',
}

// Define components for each section
const sectionComponents: { [key: string]: React.FC } = {
  Projects,
  Info,
  Contact,
  FAQ,
  Gallery,
}

const Home: React.FC = () => {
  const [selected, setSelected] = useState('')
  const [prevSelected, setPrevSelected] = useState('')
  const titleRef = useRef<HTMLHeadingElement>(null)
  const listItemsRef = useRef<(HTMLLIElement | null)[]>([])
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Update previous selection state
  useEffect(() => {
    if (prevSelected !== selected) {
      setPrevSelected(selected)
    }
  }, [selected])

  // Function to go back to home/landing page
  const goToHome = () => {
    setPrevSelected(selected)
    setSelected('')
  }

  return (
    <div className="outer-wrapper">
      <div className="frame relative">
        <div className="home-container">
          {/* LEFT NAV */}
          <div className="left-nav">
            <h1 className="title" ref={titleRef}>
              Ali Harrison
            </h1>
            <small className="subtitle">Designer & Developer</small>
            <ul className="nav-list">
              <li className="nav-item home-button" onClick={goToHome}>
                Home
              </li>
              {Object.keys(sectionComponents).map((name, index) => (
                <li
                  key={name}
                  ref={(el) => {
                    listItemsRef.current[index] = el
                  }}
                  onClick={() => setSelected(name)}
                  className={`nav-item ${selected === name ? 'active' : ''}`}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>

          {/* HOME TEXT BOX — SHOWN ONLY ON LANDING SCREEN */}
          {selected === '' && (
            <div className="bottom-spiel absolute right-8 bottom-8 text-sm leading-relaxed text-white italic text-right max-w-md pointer-events-none">
              <p className="space-y-1">
                <span className="block">Born in Aotearoa.</span>
                <span className="block">Based in Christchurch,</span>
                <span className="block">I believe</span>
                <span className="block">creativity and code</span>
                <span className="block">can shape unique experiences.</span>
                <span className="block">With a passion</span>
                <span className="block">for design, tech, and streetwear,</span>
                <span className="block">I'm exploring</span>
                <span className="block">the boundaries</span>
                <span className="block">of digital storytelling,</span>
                <span className="block">innovation,</span>
                <span className="block">and identity.</span>
                <span className="block">Always learning,</span>
                <span className="block">always evolving.</span>
              </p>
            </div>
          )}

          {/* ALL SECTIONS */}
          {selected &&
            Object.entries(sectionComponents).map(([name, Component]) => (
              <div
                key={name}
                ref={(el) => {
                  sectionRefs.current[name] = el
                }}
                className={`${
                  name === 'Projects'
                    ? 'content-area'
                    : `section-container ${sectionPositions[name]}`
                } ${selected === name ? 'visible' : 'hidden'}`}
              >
                <Component />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Home
