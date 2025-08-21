import { Button } from "@/components/ui/button";
import { LandingPage } from "@/pages/landing";
import { ProductsPage } from "@/pages/products";
import { ContainersTrucksPage } from "@/pages/containers-trucks";
import { StuffingResultPage } from "@/pages/stuffing-result";
import { InteractivePackingPage } from "@/pages/interactive-packing";
import { useCurrentStep, useShowLanding, useGroups, useAppActions, useAppMode } from "@/hooks/useAppState";
import { stepConfiguration } from "@/constants/app";

function Stepper() {
  const currentStep = useCurrentStep();
  const showLanding = useShowLanding();
  const groups = useGroups();
  const mode = useAppMode();
  const { setStep, setShowLanding, setMode } = useAppActions();

  const handleGetStarted = () => {
    setMode('batch');
    setShowLanding(false);
  };

  const handleInteractiveMode = () => {
    setMode('interactive');
    setShowLanding(false);
  };

  // If in interactive mode, show the interactive packing page
  if (!showLanding && mode === 'interactive') {
    return <InteractivePackingPage />;
  }

  // Validation function for step 1 (Products)
  const canProceedFromStep1 = () => {
    // Must have at least 1 group
    if (groups.length === 0) return false;
    
    // Each group must have at least 1 product
    return groups.every(group => group.products.length > 0);
  };

  const canProceedFromCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return canProceedFromStep1();
      default:
        return true;
    }
  };

  const getValidationMessage = () => {
    if (currentStep === 1) {
      if (groups.length === 0) {
        return "Harap tambahkan setidaknya satu grup produk untuk melanjutkan.";
      }
      if (!groups.every(group => group.products.length > 0)) {
        return "Setiap grup harus memiliki setidaknya satu produk untuk melanjutkan.";
      }
    }
    return "";
  };

  // const handleBackToLanding = () => {
  //   setShowLanding(true);
  //   setStep(1);
  // };

  const handleNextStep = () => {
    if (canProceedFromCurrentStep()) {
      setStep(Math.min(currentStep + 1, stepConfiguration.length));
    }
  };

  const handlePrevStep = () => {
    setStep(Math.max(currentStep - 1, 1));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <ProductsPage />;
      case 2:
        return <ContainersTrucksPage />;
      case 3:
        return <StuffingResultPage />;
      default:
        return <ProductsPage />;
    }
  };

  if (showLanding) {
    return <LandingPage onGetStarted={handleGetStarted} onInteractiveMode={handleInteractiveMode} />;
  }

  return (
    <div className="flex flex-col space-y-8">
      {/* Step indicators */}
      <div className="flex items-center justify-center space-x-4 md:space-x-8">
        {stepConfiguration.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-200 
                ${currentStep >= step.id 
                  ? "border-[#3A9542] bg-[#3A9542] text-white" 
                  : "border-muted-foreground bg-background text-muted-foreground"
                }`}
              >
                {step.id}
              </div>
              <span className={`mt-2 text-xs font-medium text-center max-w-20 md:max-w-none ${
                currentStep >= step.id ? "text-[#3A9542]" : "text-muted-foreground"
              }`}>
                {step.label}
              </span>
            </div>
            {index !== stepConfiguration.length - 1 && (
              <div
                className={`h-0.5 w-8 md:w-16 mx-4 transition-all duration-200 ${
                  currentStep > step.id ? "bg-[#3A9542]" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="min-h-[60vh]">
        {renderStepContent()}
      </div>

      {/* Navigation buttons */}
      <div className="flex flex-col space-y-4 max-w-4xl mx-auto w-full">
        {/* Validation message */}
        {!canProceedFromCurrentStep() && getValidationMessage() && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
            <p className="text-amber-800 text-sm font-medium">
              {getValidationMessage()}
            </p>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handlePrevStep}
              disabled={currentStep === 1}
            >
              Kembali
            </Button>
          </div>
          <Button
            onClick={handleNextStep}
            disabled={currentStep === stepConfiguration.length || !canProceedFromCurrentStep()}
            className={!canProceedFromCurrentStep() ? "opacity-50 cursor-not-allowed" : ""}
          >
            {currentStep === stepConfiguration.length ? "Selesai" : "Selanjutnya"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Stepper;
