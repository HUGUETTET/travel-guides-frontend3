"use client"

import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls, Sphere, Html, useTexture } from "@react-three/drei"
import { useRef, useState, Suspense } from "react"
import type * as THREE from "three"
import { getCountryCoordinatesWithManual, getCountryCode } from "@/lib/country-coordinates"
import { useRouter } from "next/navigation"

interface Destination {
  _id: string
  name: string
  slug: { current: string }
  country: string
  region: string
  description?: string
  mainImage?: any
}

interface CountryMarker {
  name: string
  position: [number, number, number]
  slug: string
  country: string
}

function CountryPin({
  marker,
  onHover,
}: {
  marker: CountryMarker
  onHover?: (hovering: boolean) => void
}) {
  const router = useRouter()
  const [hovered, setHovered] = useState(false)

  const handleClick = async () => {
    try {
      await router.push(`/destinos/${marker.slug}`)
    } catch (err) {
      console.error("Navigation error:", err)
    }
  }

  return (
    <group position={marker.position}>
      <mesh
        onClick={handleClick}
        onPointerOver={() => {
          document.body.style.cursor = "pointer"
          onHover?.(true)
          setHovered(true)
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default"
          onHover?.(false)
          setHovered(false)
        }}
      >
      {/* 0.05 in args changes the size of the sphere*/}
      <sphereGeometry args={[0.05, 10, 10]} /> 
      <meshStandardMaterial
        color={hovered ? "#f59e0b" : "#ef4444"} // orange, red
        emissive={hovered ? "#f59e0b" : "#ef4444"}
        emissiveIntensity={hovered ? 1 : 0.6}
        metalness={0.3}
        roughness={0.4}
        />

      </mesh>
      {/* in mesh: scale={hovered ? 1 : .6} */}
      <mesh position={[0, 0, 0]}>
        <ringGeometry args={[0.09, 0.12, 16]} />
        <meshBasicMaterial color={hovered ? "#fbbf24" : "#ef4444"} transparent opacity={hovered ? 0.6 : 0.3} side={2} />
      </mesh>

      {/* {hovered && ( */}
        {/* <Html fullscreen zIndexRange={[100, 0]}>
          <div 
            // className="fixed left-0 top-1/2 transform -translate-y-1/2 z-[100] bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-r-lg text-sm font-semibold shadow-lg pointer-events-none select-none"
            style={{}}
            >
            da clic, explora <span className="capitalize">{marker.name}</span>
          </div>
        </Html> */}
      {/* )} */}
  </group>
  )
}

function Globe({
  markers,
  isPickerMode,
  onCoordinateClick,
  onHoverChange,
}: {
  markers: CountryMarker[]
  isPickerMode?: boolean
  onCoordinateClick?: (coords: [number, number, number]) => void
  onHoverChange?: (marker: CountryMarker | null) => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const earthTexture = useTexture("/assets/3d/texture_earth.jpg")
  const { raycaster, camera, pointer } = useThree()

  const handleGlobeClick = (e: any) => {
    if (!isPickerMode || !onCoordinateClick) return
    e.stopPropagation()

    if (meshRef.current) {
      raycaster.setFromCamera(pointer, camera)
      const intersects = raycaster.intersectObject(meshRef.current)

      if (intersects.length > 0) {
        const point = intersects[0].point
        const coords: [number, number, number] = [
          Math.round(point.x * 100) / 100,
          Math.round(point.y * 100) / 100,
          Math.round(point.z * 100) / 100,
        ]
        onCoordinateClick(coords)
      }
    }
  }

  return (
    <>
      <Sphere
        ref={meshRef}
        args={[2, 64, 64]}
        onClick={handleGlobeClick}
        onPointerOver={() => {
          if (isPickerMode) {
            document.body.style.cursor = "crosshair"
          }
        }}
        onPointerOut={() => {
          if (isPickerMode) {
            document.body.style.cursor = "default"
          }
        }}
      >
        {earthTexture ? (
          <meshStandardMaterial map={earthTexture} roughness={0.7} metalness={0.1} />
        ) : (
          <meshStandardMaterial color="#2563eb" roughness={0.7} metalness={0.1} />
        )}
      </Sphere>

      {!isPickerMode &&
        markers.map((marker) => (
          <CountryPin
            key={marker.slug}
            marker={marker}
            onHover={(hovering) => {
              onHoverChange?.(hovering ? marker : null)
            }}
          />
        ))}
    </>
  )
}

function GlobeLoader() {
  return (
    <mesh>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial color="#1e40af" wireframe />
    </mesh>
  )
}

export function InteractiveGlobe({ destinations = [] }: { destinations?: Destination[] }) {
  // const [isPickerMode, setIsPickerMode] = useState(false)
  const [clickedCoordinate, setClickedCoordinate] = useState<[number, number, number] | null>(null)
  const [hoveredMarker, setHoveredMarker] = useState<CountryMarker | null>(null)

  const markers: CountryMarker[] = destinations.map((dest) => {
    const position = getCountryCoordinatesWithManual(dest.country)
    return {
      name: dest.name,
      country: dest.country,
      position,
      slug: dest.slug.current,
    }
  })

  const handleCoordinateClick = (coords: [number, number, number]) => {
    setClickedCoordinate(coords)
  }

  const emojiFlag = (code?: string) =>
  code
    ? String.fromCodePoint(...[...code.toUpperCase()].map(c => 127397 + c.charCodeAt(0)))
    : ""

  return (
    <div className="w-full relative" style={{ height: "90vh", display: "flex", justifyContent: "center" }}>
      {/* ✅ TEXTO FLOTANTE SOBRE TODO */}
      {hoveredMarker && (
        <div
          className="fixed left-0 top-1/2 transform -translate-y-1/2 z-[100] bg-background/60 backdrop-blur gap-2 whitespace-nowrap rounded-md"
          style={{ left: "10%", padding: "10px" }} >
          <h3 className="text-lg text-foreground" >
            da clic, explora{" "}
            <span
              // style={{color: "#f59e0b"}}
              className="capitalize font-semibold" >
              {hoveredMarker.name} {emojiFlag(getCountryCode(hoveredMarker.country))} 
            </span>
          </h3>
        </div>
      )}

      <div style={{ height: "100%", width: "70%" }}>
        <Canvas camera={{ position: [0, 0, 6], fov: 47 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 3, 5]} intensity={1.5} />
          <pointLight position={[-5, -3, -5]} intensity={0.3} />

          <Suspense fallback={<GlobeLoader />}>
            <Globe
              markers={markers}
              isPickerMode={false}
              onCoordinateClick={handleCoordinateClick}
              onHoverChange={setHoveredMarker}
            />
          </Suspense>

          <OrbitControls
            enableZoom={true}
            enablePan={false}
            enableRotate={true}
            minDistance={4}
            maxDistance={10}
            autoRotate={false}
            rotateSpeed={0.5}
            enableDamping={true}
            dampingFactor={0.05}
          />
        </Canvas>
      </div>
    </div>
  )
}
