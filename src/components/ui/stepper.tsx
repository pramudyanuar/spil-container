import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductsPage } from "@/pages/products";
import { ContainersTrucksPage } from "@/pages/containers-trucks";
import { StuffingResultPage } from "@/pages/stuffing-result";

function Stepper() {
  const [step, setStep] = useState(1);

  const steps = [
    { id: 1, label: "Products" },
    { id: 2, label: "Containers & Trucks" },
    { id: 3, label: "Stuffing Result" },
  ];

  const renderStepContent = () => {
    switch (step) {
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

  return (
    <div className="flex flex-col space-y-8">
      {/* Step indicators */}
      <div className="flex items-center justify-center space-x-4 md:space-x-8">
        {steps.map((s, index) => (
          <div key={s.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-200 
                ${step >= s.id 
                  ? "border-primary bg-primary text-primary-foreground" 
                  : "border-muted-foreground bg-background text-muted-foreground"
                }`}
              >
                {s.id}
              </div>
              <span className={`mt-2 text-xs font-medium text-center max-w-20 md:max-w-none ${
                step >= s.id ? "text-primary" : "text-muted-foreground"
              }`}>
                {s.label}
              </span>
            </div>
            {index !== steps.length - 1 && (
              <div
                className={`h-0.5 w-8 md:w-16 mx-4 transition-all duration-200 ${
                  step > s.id ? "bg-primary" : "bg-muted"
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
      <div className="flex justify-between items-center max-w-4xl mx-auto w-full">
        <Button
          variant="outline"
          onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
          disabled={step === 1}
        >
          Back
        </Button>
        <Button
          onClick={() => setStep((prev) => Math.min(prev + 1, steps.length))}
          disabled={step === steps.length}
        >
          {step === steps.length ? "Complete" : "Next"}
        </Button>
      </div>
    </div>
  );
}

export default Stepper;
