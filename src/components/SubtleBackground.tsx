import React, { useEffect, useState } from 'react'

interface Star {
  name: string
  x: number
  y: number
  size: 'tiny' | 'small' | 'medium' | 'large' | 'brightest'
  brightness: number
  animationDelay: number
  culturalSignificance: string
}

const matarikiStars: Star[] = [
  {
    name: 'Matariki',
    x: 50,
    y: 50,
    size: 'brightest',
    brightness: 1,
    animationDelay: 0,
    culturalSignificance: 'Mother star - reflection, hope, gathering',
  },
  {
    name: 'Pohutukawa',
    x: 42,
    y: 44,
    size: 'medium',
    brightness: 0.85,
    animationDelay: 2.4,
    culturalSignificance: 'Connection to those who have passed',
  },
  {
    name: 'Puanga',
    x: 62,
    y: 58,
    size: 'large',
    brightness: 0.9,
    animationDelay: 1.6,
    culturalSignificance: 'Food from the sky - birds, elevated foods',
  },
  {
    name: 'Tupuānuku',
    x: 56,
    y: 64,
    size: 'medium',
    brightness: 0.75,
    animationDelay: 4.2,
    culturalSignificance: 'Food from the earth - root vegetables',
  },
  {
    name: 'Tupuārangi',
    x: 68,
    y: 48,
    size: 'medium',
    brightness: 0.8,
    animationDelay: 3.4,
    culturalSignificance: 'Food from above - fruits, berries',
  },
  {
    name: 'Waitī',
    x: 38,
    y: 58,
    size: 'small',
    brightness: 0.65,
    animationDelay: 5.6,
    culturalSignificance: 'Fresh water',
  },
  {
    name: 'Waitā',
    x: 32,
    y: 46,
    size: 'small',
    brightness: 0.7,
    animationDelay: 3.0,
    culturalSignificance: 'Salt water',
  },
  {
    name: 'Waipuna-ā-rangi',
    x: 58,
    y: 36,
    size: 'tiny',
    brightness: 0.6,
    animationDelay: 6.4,
    culturalSignificance: 'Rain',
  },
  {
    name: 'Ururangi',
    x: 44,
    y: 38,
    size: 'small',
    brightness: 0.55,
    animationDelay: 5.0,
    culturalSignificance: 'Winds',
  },
]

const MatarikiWithGrainBackground: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500)
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev)
    }, 15000)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  const getSizeVariables = (
    size: 'tiny' | 'small' | 'medium' | 'large' | 'brightest'
  ) => {
    switch (size) {
      case 'tiny':
        return { width: '2vh', height: '2vh' }
      case 'small':
        return { width: '3.5vh', height: '3.5vh' }
      case 'medium':
        return { width: '5vh', height: '5vh' }
      case 'large':
        return { width: '7vh', height: '7vh' }
      case 'brightest':
        return { width: '9vh', height: '9vh' }
    }
  }

  const getStarStyle = (star: Star): React.CSSProperties => {
    const sizeVars = getSizeVariables(star.size)
    return {
      '--star-width': sizeVars.width,
      '--star-height': sizeVars.height,
      '--blur-radius': `calc(${sizeVars.width} / 2)`, // Increased blur radius
      width: sizeVars.width,
      height: sizeVars.height,
      position: 'absolute',
      left: `${star.x}%`,
      top: `${star.y}%`,
      transform: 'translate(-50%, -50%)',
      opacity: isVisible ? star.brightness * 0.95 : star.brightness * 0.4,
      animation: `starlight-${star.name} 4.8s ease-in-out infinite`,
      animationDelay: `${star.animationDelay}s`,
      transition: 'opacity 8s ease-in-out',
      filter: `drop-shadow(0 0 ${sizeVars.width} rgba(255, 255, 255, ${star.brightness * 0.5})) drop-shadow(0 0 calc(${sizeVars.width} * 2) rgba(255, 250, 240, ${star.brightness * 0.3}))`, // Enhanced glow
    } as React.CSSProperties
  }

  return (
    <>
      <style>{`
        .frame {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90vw;
          height: 85vh;
          max-width: 1600px;
          border: 1px solid white;
          padding: 2rem;
          box-sizing: border-box;
          background: transparent;
        }

        ${matarikiStars
          .map(
            (star) => `
          @keyframes starlight-${star.name} {
            0% {
              opacity: ${(isVisible ? star.brightness * 0.95 : star.brightness * 0.4) * 0.3};
              transform: translate(-50%, -50%) scale(0.4) rotateZ(0deg);
              filter: blur(var(--blur-radius)) brightness(0.8);
            }
            50% {
              opacity: ${isVisible ? star.brightness * 0.95 : star.brightness * 0.4};
              transform: translate(-50%, -50%) scale(1.2) rotateZ(45deg);
              filter: blur(0) brightness(1.3);
            }
            100% {
              opacity: ${(isVisible ? star.brightness * 0.95 : star.brightness * 0.4) * 0.3};
              transform: translate(-50%, -50%) scale(0.4) rotateZ(90deg);
              filter: blur(var(--blur-radius)) brightness(0.8);
            }
          }
        `
          )
          .join('')}

        .star-shape::before,
        .star-shape::after {
          position: absolute;
          content: '';
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(ellipse, 
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 250, 240, 0.95) 20%,
            transparent 100%
          );
          z-index: 2;
          filter: blur(2px);
          box-shadow: 
            0 0 calc(var(--star-width) * 0.8) rgba(255, 250, 240, 0.8),
            0 0 calc(var(--star-width) * 1.5) rgba(255, 240, 220, 0.6),
            0 0 calc(var(--star-width) * 2.5) rgba(255, 230, 200, 0.4),
            0 0 calc(var(--star-width) * 4) rgba(255, 220, 180, 0.2);
        }

        .star-shape::before {
          width: 100%;
          height: 15%;
          border-radius: 50%;
        }

        .star-shape::after {
          height: 100%;
          width: 15%;
          border-radius: 50%;
        }

        /* Noise overlay that only appears on star glow */
        .star-shape {
          mix-blend-mode: screen;
        }

        .star-shape::before {
          background-image: 
            radial-gradient(ellipse, 
              rgba(255, 255, 255, 1) 0%,
              rgba(255, 250, 240, 0.95) 20%,
              transparent 100%
            ),
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 1px,
              rgba(255, 255, 255, 0.03) 1px,
              rgba(255, 255, 255, 0.03) 2px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 1px,
              rgba(255, 255, 255, 0.02) 1px,
              rgba(255, 255, 255, 0.02) 2px
            );
          background-size: 100% 100%, 3px 3px, 4px 4px;
          animation: noise-shimmer 2s linear infinite;
        }

        .star-shape::after {
          background-image: 
            radial-gradient(ellipse, 
              rgba(255, 255, 255, 1) 0%,
              rgba(255, 250, 240, 0.95) 20%,
              transparent 100%
            ),
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 1px,
              rgba(255, 255, 255, 0.03) 1px,
              rgba(255, 255, 255, 0.03) 2px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 1px,
              rgba(255, 255, 255, 0.02) 1px,
              rgba(255, 255, 255, 0.02) 2px
            );
          background-size: 100% 100%, 3px 3px, 4px 4px;
          animation: noise-shimmer 2.5s linear infinite reverse;
        }

        @keyframes noise-shimmer {
          0% { background-position: 0% 0%, 0px 0px, 0px 0px; }
          25% { background-position: 0% 0%, 1px 1px, -1px 1px; }
          50% { background-position: 0% 0%, 2px 0px, -2px 0px; }
          75% { background-position: 0% 0%, 1px -1px, -1px -1px; }
          100% { background-position: 0% 0%, 0px 0px, 0px 0px; }
        }
      `}</style>

      {/* Matariki Stars with integrated grain texture */}
      <div className="frame">
        <div className="relative w-full h-full pointer-events-none">
          {matarikiStars.map((star) => (
            <div
              key={star.name}
              style={getStarStyle(star)}
              className="star-shape"
              title={`${star.name} - ${star.culturalSignificance}`}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default MatarikiWithGrainBackground
