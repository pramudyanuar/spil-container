import { Button } from "@/components/ui/button"
import { ArrowRight, Package, Truck, BarChart3 } from "lucide-react"

interface LandingPageProps {
  onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
          Container Stuffing Optimization
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          Optimize your container loading with intelligent algorithms and maximize space utilization for efficient shipping
        </p>
        <Button 
          size="lg" 
          onClick={onGetStarted}
          className="text-lg px-8 py-6 mt-8"
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full px-4">
        <div className="text-center space-y-4 p-6 rounded-lg border bg-card hover:shadow-md transition-shadow">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Package className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Product Management</h3>
          <p className="text-muted-foreground">
            Select and configure your products with detailed specifications for optimal packaging
          </p>
        </div>

        <div className="text-center space-y-4 p-6 rounded-lg border bg-card hover:shadow-md transition-shadow">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Truck className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Smart Container Selection</h3>
          <p className="text-muted-foreground">
            Choose from various container sizes and truck types based on your cargo requirements
          </p>
        </div>

        <div className="text-center space-y-4 p-6 rounded-lg border bg-card hover:shadow-md transition-shadow">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <BarChart3 className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Optimization Results</h3>
          <p className="text-muted-foreground">
            Get detailed analytics with space utilization metrics and cost optimization insights
          </p>
        </div>
      </div>
    </div>
  )
}
