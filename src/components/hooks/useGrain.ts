import { useEffect, useRef, useMemo } from 'react'
import * as THREE from 'three'

interface GrainOptions {
  intensity?: number
  blurAmount?: number
  animate?: boolean
  color1?: string // Background color
  color2?: string // Noise color
}

/**
 * Hook to create a Three.js grainy noise background
 * @param containerId - ID of the container element to append the canvas to
 * @param options - Configuration options for the grain effect
 */
const useGrain = (containerId: string, options: GrainOptions = {}) => {
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const timeRef = useRef<number>(0)
  const frameRef = useRef<number>(0)

  // ✅ Memoize options before any effects to avoid hook order mismatch
  const stableOptions = useMemo(
    () => ({
      intensity: options.intensity ?? 0.2,
      blurAmount: options.blurAmount ?? 0.5,
      animate: options.animate !== false,
      color1: options.color1 ?? '#111111',
      color2: options.color2 ?? '#222222',
    }),
    [
      options.intensity,
      options.blurAmount,
      options.animate,
      options.color1,
      options.color2,
    ]
  )

  useEffect(() => {
    const container = document.getElementById(containerId)
    if (!container) return

    const { intensity, blurAmount, animate, color1, color2 } = stableOptions

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const backgroundColor = new THREE.Color(color1)
    const noiseColor = new THREE.Color(color2)

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        resolution: {
          value: new THREE.Vector2(
            container.clientWidth,
            container.clientHeight
          ),
        },
        intensity: { value: intensity },
        blurAmount: { value: blurAmount },
        backgroundColor: { value: backgroundColor },
        noiseColor: { value: noiseColor },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec2 resolution;
        uniform float intensity;
        uniform float blurAmount;
        uniform vec3 backgroundColor;
        uniform vec3 noiseColor;
        varying vec2 vUv;

        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
        }

        float noise(vec2 st) {
          vec2 i = floor(st);
          vec2 f = fract(st);
          
          float a = random(i);
          float b = random(i + vec2(1.0, 0.0));
          float c = random(i + vec2(0.0, 1.0));
          float d = random(i + vec2(1.0, 1.0));

          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }

        void main() {
          vec2 st = vUv;
          vec2 pos = st * 50.0;

          if (time > 0.0) {
            pos += time * 0.1;
          }

          float n = noise(pos);

          if (blurAmount > 0.0) {
            float blur = blurAmount * 0.01;
            n += noise(pos + vec2(blur, 0.0));
            n += noise(pos + vec2(-blur, 0.0));
            n += noise(pos + vec2(0.0, blur));
            n += noise(pos + vec2(0.0, -blur));
            n /= 5.0;
          }

          vec3 color = mix(backgroundColor, noiseColor, n * intensity);
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    })
    materialRef.current = material

    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const animationLoop = () => {
      if (animate) {
        timeRef.current += 0.01
        if (materialRef.current) {
          materialRef.current.uniforms.time.value = timeRef.current
        }
      }

      if (rendererRef.current && sceneRef.current) {
        rendererRef.current.render(sceneRef.current, camera)
      }

      frameRef.current = requestAnimationFrame(animationLoop)
    }

    animationLoop()

    const handleResize = () => {
      if (rendererRef.current && container) {
        const width = container.clientWidth
        const height = container.clientHeight

        rendererRef.current.setSize(width, height)

        if (materialRef.current) {
          materialRef.current.uniforms.resolution.value.set(width, height)
        }
      }
    }

    window.addEventListener('resize', handleResize)

    // Optional: update uniforms on mount
    updateMaterialUniforms(options)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(frameRef.current)

      if (rendererRef.current) {
        const domElement = rendererRef.current.domElement
        domElement.parentNode?.removeChild(domElement)
        rendererRef.current.dispose()
      }
    }
  }, [containerId, options, stableOptions])

  const updateMaterialUniforms = (newOptions: Partial<GrainOptions>) => {
    if (!materialRef.current) return

    if (newOptions.intensity !== undefined) {
      materialRef.current.uniforms.intensity.value = newOptions.intensity
    }

    if (newOptions.blurAmount !== undefined) {
      materialRef.current.uniforms.blurAmount.value = newOptions.blurAmount
    }

    if (newOptions.color1 !== undefined) {
      materialRef.current.uniforms.backgroundColor.value = new THREE.Color(
        newOptions.color1
      )
    }

    if (newOptions.color2 !== undefined) {
      materialRef.current.uniforms.noiseColor.value = new THREE.Color(
        newOptions.color2
      )
    }
  }

  return {
    updateOptions: updateMaterialUniforms,
  }
}

export default useGrain
