import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Box, Text } from '@react-three/drei'
import * as THREE from 'three'
import type { Container, ContainerAssignment } from '@/types/container'
import type { Product } from '@/types/product'
import type { PackedProduct } from '@/types/packing'

interface Container3DProps {
  container: Container
  assignment?: ContainerAssignment
  products?: Product[]
  packedProducts?: PackedProduct[]
}

interface ProductBoxProps {
  product: Product | PackedProduct
  position: [number, number, number]
  quantity: number
}

const SCALE_FACTOR = 0.001 // Scale down from mm to a manageable size

// Color mapping for different product types
const PRODUCT_COLORS: Record<string, string> = {
  box: '#4f46e5',      // Indigo
  'big-bag': '#dc2626', // Red
  sack: '#059669',      // Emerald
  barrel: '#d97706',    // Amber
  roll: '#7c3aed',      // Violet
}

function ProductBox({ product, position, quantity }: ProductBoxProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const color = product.color || PRODUCT_COLORS[product.type] || '#6b7280'

  // Convert dimensions from mm to scaled units
  const dimensions: [number, number, number] = [
    product.length * SCALE_FACTOR,
    product.width * SCALE_FACTOR,
    product.height * SCALE_FACTOR,
  ]

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle animation - slight hover effect
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.005
    }
  })

  return (
    <group position={position}>
      <Box
        ref={meshRef}
        args={dimensions}
        position={[0, dimensions[1] / 2, 0]}
      >
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.8}
          roughness={0.3}
          metalness={0.1}
        />
      </Box>
      {quantity > 1 && (
        <Text
          position={[0, dimensions[1] + 0.1, 0]}
          fontSize={0.05}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {quantity}x
        </Text>
      )}
    </group>
  )
}

function ContainerWireframe({ container }: { container: Container }) {
  const { length, width, height } = container.dimensions
  
  // Convert dimensions from mm to scaled units
  const scaledDimensions: [number, number, number] = [
    length * SCALE_FACTOR,
    width * SCALE_FACTOR,
    height * SCALE_FACTOR,
  ]

  return (
    <group>
      {/* Container wireframe */}
      <Box args={scaledDimensions} position={[0, scaledDimensions[1] / 2, 0]}>
        <meshBasicMaterial
          color="#ffffff"
          wireframe
          opacity={0.3}
          transparent
        />
      </Box>
      
      {/* Container floor */}
      <Box args={[scaledDimensions[0], 0.01, scaledDimensions[2]]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#e5e7eb" opacity={0.5} transparent />
      </Box>

      {/* Container label */}
      <Text
        position={[0, scaledDimensions[1] + 0.2, 0]}
        fontSize={0.08}
        color="#374151"
        anchorX="center"
        anchorY="middle"
      >
        {container.name}
      </Text>
    </group>
  )
}

function Scene({ container, assignment, products, packedProducts }: Container3DProps) {
  // Calculate container dimensions in scaled units
  const containerDimensions = useMemo(() => ({
    length: container.dimensions.length * SCALE_FACTOR,
    width: container.dimensions.width * SCALE_FACTOR,
    height: container.dimensions.height * SCALE_FACTOR,
  }), [container.dimensions])

  // Prepare products for rendering
  const productsToRender = useMemo(() => {
    if (packedProducts) {
      // Use packed products with their exact positions
      return packedProducts.map((packedProduct) => ({
        product: packedProduct,
        position: [
          (packedProduct.position.x - container.dimensions.length / 2) * SCALE_FACTOR,
          packedProduct.position.y * SCALE_FACTOR,
          (packedProduct.position.z - container.dimensions.width / 2) * SCALE_FACTOR
        ] as [number, number, number],
        quantity: 1
      }))
    } else if (assignment && products) {
      // Use old logic for backward compatibility
      const packed: Array<{
        product: Product
        position: [number, number, number]
        quantity: number
      }> = []

      let currentX = -containerDimensions.length / 2
      let currentY = 0
      let currentZ = -containerDimensions.width / 2
      let rowHeight = 0
      let layerHeight = 0

      assignment.assignedProducts.forEach((assignedProduct) => {
        const product = products.find(p => p.id === assignedProduct.productId)
        if (!product) return

        const productDimensions = {
          length: product.length * SCALE_FACTOR,
          width: product.width * SCALE_FACTOR,
          height: product.height * SCALE_FACTOR,
        }

        for (let i = 0; i < assignedProduct.quantity; i++) {
          // Check if product fits in current row
          if (currentX + productDimensions.length > containerDimensions.length / 2) {
            // Move to next row
            currentX = -containerDimensions.length / 2
            currentZ += rowHeight
            rowHeight = 0

            // Check if we need to go to next layer
            if (currentZ + productDimensions.width > containerDimensions.width / 2) {
              currentZ = -containerDimensions.width / 2
              currentY += layerHeight
              layerHeight = 0
            }
          }

          packed.push({
            product,
            position: [
              currentX + productDimensions.length / 2,
              currentY,
              currentZ + productDimensions.width / 2
            ],
            quantity: 1
          })

          currentX += productDimensions.length + 0.01 // Small gap between products
          rowHeight = Math.max(rowHeight, productDimensions.width + 0.01)
          layerHeight = Math.max(layerHeight, productDimensions.height + 0.01)
        }
      })

      return packed
    }
    
    return []
  }, [assignment, products, packedProducts, containerDimensions, container.dimensions])

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-10, -10, -5]} intensity={0.3} />

      {/* Container wireframe */}
      <ContainerWireframe container={container} />

      {/* Packed products */}
      {productsToRender.map((item, index) => (
        <ProductBox
          key={index}
          product={item.product}
          position={item.position}
          quantity={item.quantity}
        />
      ))}

      {/* Camera controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        target={[0, containerDimensions.height / 2, 0]}
      />
    </>
  )
}

export function Container3D({ container, assignment, products, packedProducts }: Container3DProps) {
  return (
    <div className="w-full h-96 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg overflow-hidden">
      <Canvas
        camera={{
          position: [2, 2, 2],
          fov: 75,
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene container={container} assignment={assignment} products={products} packedProducts={packedProducts} />
      </Canvas>
    </div>
  )
}
