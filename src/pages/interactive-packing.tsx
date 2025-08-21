import { useState } from 'react'
import { PackingProvider } from '@/context/PackingContext'
import { ContainerSelector } from '@/components/packing/ContainerSelector'
import { ProductAdder } from '@/components/packing/ProductAdder'
import { PackingVisualization } from '@/components/packing/PackingVisualization'
import { ProductFitChecker } from '@/components/packing/ProductFitChecker'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const INTERACTIVE_STEPS = [
  { 
    id: 1, 
    title: "Pilih Container",
    description: "Pilih ukuran dan tipe container yang sesuai dengan kebutuhan Anda"
  },
  { 
    id: 2, 
    title: "Tambah Produk", 
    description: "Tambahkan produk satu per satu ke dalam container dengan visualisasi real-time"
  },
  { 
    id: 3, 
    title: "Visualisasi 3D", 
    description: "Lihat hasil packing dalam visualisasi 3D dan analisis ruang yang tersedia"
  },
  { 
    id: 4, 
    title: "Cek Kecocokan", 
    description: "Periksa apakah produk baru dapat masuk ke container yang sudah terisi"
  }
]

export function InteractivePackingPage() {
  const [currentStep, setCurrentStep] = useState(1)

  const handleNextStep = () => {
    if (currentStep < INTERACTIVE_STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <ContainerSelector />
      case 2:
        return <ProductAdder />
      case 3:
        return <PackingVisualization />
      case 4:
        return <ProductFitChecker />
      default:
        return <ContainerSelector />
    }
  }

  const currentStepData = INTERACTIVE_STEPS.find(step => step.id === currentStep)

  return (
    <PackingProvider>
      <div className="min-h-screen bg-black dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-100 dark:text-gray-100 mb-2">
              Packing Kontainer Interaktif
            </h1>
            <p className="text-gray-300 dark:text-gray-400">
              Alur kerja interaktif untuk optimasi container packing secara real-time
            </p>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            {INTERACTIVE_STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-200 
                    ${currentStep >= step.id 
                      ? "border-[#3A9542] bg-[#3A9542] text-white" 
                      : "border-gray-500 bg-gray-800 text-gray-400"
                    }`}
                  >
                    {step.id}
                  </div>
                  <span className={`mt-2 text-sm font-medium text-center max-w-24 ${
                    currentStep >= step.id ? "text-[#3A9542]" : "text-gray-400"
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index !== INTERACTIVE_STEPS.length - 1 && (
                  <div
                    className={`h-0.5 w-16 mx-4 transition-all duration-200 ${
                      currentStep > step.id ? "bg-[#3A9542]" : "bg-gray-600"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Current Step Info */}
          {currentStepData && (
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-white mb-2">
                Langkah {currentStep}: {currentStepData.title}
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                {currentStepData.description}
              </p>
            </div>
          )}

          {/* Step Content */}
          <div className="min-h-[60vh]">
            {renderStepContent()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 max-w-4xl mx-auto">
            <Button
              variant="outline"
              onClick={handlePrevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </Button>
            
            <div className="text-sm text-gray-400">
              Langkah {currentStep} dari {INTERACTIVE_STEPS.length}
            </div>

            <Button
              onClick={handleNextStep}
              disabled={currentStep === INTERACTIVE_STEPS.length}
              className="flex items-center gap-2 bg-[#3A9542] hover:bg-[#2d7233]"
            >
              {currentStep === INTERACTIVE_STEPS.length ? 'Selesai' : 'Selanjutnya'}
              {currentStep !== INTERACTIVE_STEPS.length && <ArrowRight className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
    </PackingProvider>
  )
}
