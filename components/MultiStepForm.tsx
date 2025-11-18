/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bioDataSchema, BioData, stepOneSchema, stepTwoSchema, stepThreeSchema } from "@/lib/types";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

export default function MultiStepForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const methods = useForm<BioData>({
    resolver: zodResolver(bioDataSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      email: "",
      password: "",
      gender: undefined,
      zipCode: "",
      weight: undefined,
      height: undefined,
      age: undefined,
      dietaryRestrictions: "",
      budgetConstraints: undefined,
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

  const onSubmit = async (data: BioData) => {
    // Aggregate form data and perform registration + profile update
    const finalPayload = {
      // profile fields
      firstName: data.firstName,
      gender: data.gender,
      zipCode: data.zipCode,
      weight_kg: data.weight,
      height_cm: data.height,
      age: data.age,
      // Convert comma-separated dietaryRestrictions string to array of allergies
      allergies: typeof data.dietaryRestrictions === "string" && data.dietaryRestrictions.length > 0
        ? data.dietaryRestrictions.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      food_preferences: null,
      diet_goals: data.dietHealthGoals,
      budgetConstraints: data.budgetConstraints,
    } as const;

    try {
      const base = process.env.NEXT_PUBLIC_DUMMY_LINK || "http://localhost:5001";

      // 1) Register user
      const registerRes = await axios.post(
        `${base}/api/auth/register`,
        {
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          gender: data.gender,
          zipCode: data.zipCode,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Register response (axios):", registerRes);
      const registerJson: any = registerRes.data;
      const token = registerJson.accessToken;

      // 2) Use returned token to update the profile on the backend
      const profileRes = await axios.put(
        `${base}/api/profile`,
        finalPayload,
        {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      console.log("Profile update response (axios):", profileRes);
      const profileJson = profileRes.data;

      // Persist biodata locally for existing UI components
      try {
        localStorage.setItem(
          "biodata",
          JSON.stringify({
            firstName: data.firstName,
            gender: data.gender,
            zipCode: data.zipCode,
            weight: data.weight,
            height: data.height,
            age: data.age,
            dietaryRestrictions: data.dietaryRestrictions,
            budgetConstraints: data.budgetConstraints,
            dietHealthGoals: data.dietHealthGoals,
          })
        );
      } catch (storageErr) {
        console.warn("Failed to persist biodata locally:", storageErr);
      }

      // Store access token locally (note: consider httpOnly cookie for production)
      if (token) {
        try {
          localStorage.setItem("accessToken", token);
        } catch (storageErr) {
          console.warn("Failed to persist accessToken:", storageErr);
        }
      }

      console.log("Registration response:", registerJson);
      console.log("Profile update response:", profileJson);

      // Redirect to dashboard now that the user is registered and profile updated
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      alert(`Error: ${err.message || err}`);
    }
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
                className="bg-green-800 h-2.5 rounded-full transition-all duration-300"
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
                  className="px-6 py-2 rounded-lg font-medium bg-green-800 text-white hover:bg-green-900 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg font-medium bg-green-800 text-white hover:bg-green-900 transition-colors"
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

