"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bioDataSchema, BioData, stepOneSchema, stepTwoSchema, stepThreeSchema } from "@/lib/types";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const methods = useForm<BioData>({
    resolver: zodResolver(bioDataSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      gender: undefined,
      zipCode: "",
      weight: undefined,
      height: undefined,
      age: undefined,
      dietaryRestrictions: "",
      budgetConstraints: "",
      dietHealthGoals: "",
    //   foodPreferences: "",
    //   physicalActivityLevel: "",
    //   recipeAndNutrientFeedback: "",
    },
  });

  const { handleSubmit, trigger, formState: { errors } } = methods;

  // Validate current step before proceeding
  const validateStep = async (step: number): Promise<boolean> => {
    let schema;
    switch (step) {
      case 1:
        schema = stepOneSchema;
        break;
      case 2:
        schema = stepTwoSchema;
        break;
      case 3:
        schema = stepThreeSchema;
        break;
      default:
        return false;
    }

    const fields = Object.keys(schema.shape);
    const isValid = await trigger(fields as any);
    return isValid;
  };

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: BioData) => {
    // Final data aggregation - all fields combined
    const finalPayload: BioData = {
      // Step 1: Personal Information
      firstName: data.firstName,
      gender: data.gender,
      zipCode: data.zipCode,
      // Step 2: Physical Characteristics
      weight: data.weight,
      height: data.height,
      age: data.age,
      dietaryRestrictions: data.dietaryRestrictions,
      budgetConstraints: data.budgetConstraints,
      // Step 3: Interpreted Data
      dietHealthGoals: data.dietHealthGoals,
    //   foodPreferences: data.foodPreferences,
    //   physicalActivityLevel: data.physicalActivityLevel,
    //   recipeAndNutrientFeedback: data.recipeAndNutrientFeedback,
    };

    // Save to localStorage for profile display
    try {
      localStorage.setItem("biodata", JSON.stringify(finalPayload));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }

    // Log the combined payload (replace with your API call)
    console.log("Final BioData Payload:", JSON.stringify(finalPayload, null, 2));
    
    // Example: Send to API
    // await fetch('/api/biodata', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(finalPayload),
    // });

    alert("Form submitted successfully! Your profile has been updated.");
  };

  // Progress indicator calculation
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <FormProvider {...methods}>
      <div className="max-w-2xl w-full mx-auto p-6">
        <div className="bg-card">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-3xl font-bold text-foreground">BioData Form</h1>
              <span className="text-sm font-medium text-muted-foreground">
                Step {currentStep} of {totalSteps}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div
                className="bg-primary h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Form Steps */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {currentStep === 1 && <StepOne register={methods.register} errors={errors} />}
            {currentStep === 2 && <StepTwo register={methods.register} errors={errors} />}
            {currentStep === 3 && <StepThree register={methods.register} errors={errors} />}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-6 border-t border-border">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  currentStep === 1
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                Back
              </button>

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2 rounded-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
}

