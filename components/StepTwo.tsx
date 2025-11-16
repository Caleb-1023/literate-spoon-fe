"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { BioData } from "@/lib/types";

interface StepTwoProps {
  register: UseFormRegister<BioData>;
  errors: FieldErrors<BioData>;
}

export default function StepTwo({ register, errors }: StepTwoProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Physical Characteristics
        </h2>
        <p className="text-muted-foreground text-sm">
          Please provide your physical characteristics and constraints.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Weight */}
          <div>
            <label
              htmlFor="weight"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Weight (kg) <span className="text-destructive">*</span>
            </label>
            <input
              id="weight"
              type="number"
              step="0.1"
              {...register("weight", { valueAsNumber: true })}
              className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              placeholder="Enter your weight in kilograms"
            />
            {errors.weight && (
              <p className="mt-1 text-sm text-destructive">
                {errors.weight.message}
              </p>
            )}
          </div>

          {/* Height */}
          <div>
            <label
              htmlFor="height"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Height (cm) <span className="text-destructive">*</span>
            </label>
            <input
              id="height"
              type="number"
              step="0.1"
              {...register("height", { valueAsNumber: true })}
              className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              placeholder="Enter your height in centimeters"
            />
            {errors.height && (
              <p className="mt-1 text-sm text-destructive">
                {errors.height.message}
              </p>
            )}
          </div>
        </div>

        {/* Age */}
        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Age <span className="text-destructive">*</span>
          </label>
          <input
            id="age"
            type="number"
            {...register("age", { valueAsNumber: true })}
            className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            placeholder="Enter your age"
          />
          {errors.age && (
            <p className="mt-1 text-sm text-destructive">
              {errors.age.message}
            </p>
          )}
        </div>

        {/* Dietary Restrictions */}
        <div>
          <label
            htmlFor="dietaryRestrictions"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Dietary Restrictions <span className="text-destructive">*</span>
          </label>
          <input
            id="dietaryRestrictions"
            {...register("dietaryRestrictions")}
            className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
            placeholder="List any dietary restrictions, allergies, or food intolerances"
          />
          {errors.dietaryRestrictions && (
            <p className="mt-1 text-sm text-destructive">
              {errors.dietaryRestrictions.message}
            </p>
          )}
        </div>

        {/* Budget Constraints */}
        <div>
          <label
            htmlFor="budgetConstraints"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Budget Constraints <span className="text-destructive">*</span>
          </label>
          <input
            id="budgetConstraints"
            {...register("budgetConstraints")}
            className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
            placeholder="How much are you willing to spend on food and meals weekly?"
          />
          {errors.budgetConstraints && (
            <p className="mt-1 text-sm text-destructive">
              {errors.budgetConstraints.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
