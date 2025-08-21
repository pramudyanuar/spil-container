import { Button } from "@/components/ui/button"
import { ArrowRight, Package, Truck, BarChart3, Zap, Settings } from "lucide-react"

interface LandingPageProps {
  onGetStarted: () => void
  onInteractiveMode?: () => void
}

export function LandingPage({ onGetStarted, onInteractiveMode }: LandingPageProps) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#3A9542] via-green-600 to-emerald-600 bg-clip-text text-transparent">
          Optimasi Stuffing Container
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          Optimalkan pemuatan container dengan algoritma cerdas dan maksimalkan utilitas ruang untuk pengiriman yang efisien
        </p>
      </div>

      {/* Mode Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full px-4">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-900/30 rounded-full flex items-center justify-center">
              <Settings className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Mode Proses Batch</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Alur kerja tradisional: Konfigurasi semua produk terlebih dahulu, kemudian pilih container dan dapatkan hasil optimasi. 
            Terbaik untuk operasi massal dan skenario kompleks.
          </p>
          <Button 
            size="lg" 
            onClick={onGetStarted}
            className="w-full"
            variant="outline"
          >
            Gunakan Mode Batch
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border-2 border-[#3A9542] dark:border-green-700 p-6 hover:shadow-lg transition-shadow relative">
          <div className="absolute -top-3 -right-3">
            <span className="bg-[#3A9542] text-white text-xs font-bold px-3 py-1 rounded-full">
              BARU
            </span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#3A9542] rounded-full flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Mode Interaktif</h3>
          </div>
          <p className="text-gray-700 dark:text-gray-200 mb-6">
            Alur kerja real-time: Pilih container terlebih dahulu, tambahkan produk satu per satu dengan visualisasi 3D langsung. 
            Cek sisa ruang dan cocokkan produk baru secara instan.
          </p>
          <Button 
            size="lg" 
            onClick={onInteractiveMode}
            className="w-full bg-[#3A9542] hover:bg-[#2d7532] text-white"
          >
            Coba Mode Interaktif
            <Zap className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full px-4">
        <div className="text-center space-y-4 p-6 rounded-lg border hover:shadow-md transition-shadow bg-gray-50 dark:bg-gray-800">
          <div className="mx-auto w-16 h-16 bg-[#3A9542]/10 rounded-full flex items-center justify-center">
            <Package className="h-8 w-8 text-[#3A9542]" />
          </div>
          <h3 className="text-xl font-semibold">Manajemen Produk</h3>
          <p className="text-muted-foreground">
            Pilih dan konfigurasi produk Anda dengan spesifikasi detail untuk kemasan yang optimal
          </p>
        </div>

        <div className="text-center space-y-4 p-6 rounded-lg border hover:shadow-md transition-shadow bg-gray-50 dark:bg-gray-800">
          <div className="mx-auto w-16 h-16 bg-[#3A9542]/10 rounded-full flex items-center justify-center">
            <Truck className="h-8 w-8 text-[#3A9542]" />
          </div>
          <h3 className="text-xl font-semibold">Pemilihan Container Cerdas</h3>
          <p className="text-muted-foreground">
            Pilih dari berbagai ukuran container dan jenis truk berdasarkan kebutuhan kargo Anda
          </p>
        </div>

        <div className="text-center space-y-4 p-6 rounded-lg border hover:shadow-md transition-shadow bg-gray-50 dark:bg-gray-800">
          <div className="mx-auto w-16 h-16 bg-[#3A9542]/10 rounded-full flex items-center justify-center">
            <BarChart3 className="h-8 w-8 text-[#3A9542]" />
          </div>
          <h3 className="text-xl font-semibold">Visualisasi 3D & Analitik</h3>
          <p className="text-muted-foreground">
            Preview 3D real-time dengan analitik detail, metrik utilitas ruang dan wawasan optimasi biaya
          </p>
        </div>
      </div>
    </div>
  )
}
