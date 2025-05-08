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
  FAQ: 'section-top-middle', // Ensures FAQ is in the top middle
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
    setSelected('') // This will redirect to the root/landing page
  }

  return (
    <div className="outer-wrapper">
      <div className="frame">
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
