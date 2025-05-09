import React, { useRef, useEffect } from 'react'
import useGrain from './hooks/useGrain'

interface GrainBackgroundProps {
  intensity?: number
  blurAmount?: number
  animate?: boolean
  color1?: string
  color2?: string
  className?: string
  style?: React.CSSProperties
}

const GrainBackground: React.FC<GrainBackgroundProps> = ({
  intensity = 0.2,
  blurAmount = 0.5,
  animate = true,
  color1 = '#111111',
  color2 = '#222222',
  className = '',
  style = {},
}) => {
  const containerId = 'grain-background-container'
  const containerRef = useRef<HTMLDivElement>(null)

  const { updateOptions } = useGrain(containerId, {
    intensity,
    blurAmount,
    animate,
    color1,
    color2,
  })

  // Update material when props change
  useEffect(() => {
    updateOptions({
      intensity,
      blurAmount,
      animate,
      color1,
      color2,
    })
  }, [intensity, blurAmount, animate, color1, color2, updateOptions])

  return (
    <div
      id={containerId}
      ref={containerRef}
      className={className}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        ...style,
      }}
    />
  )
}

export default GrainBackground
