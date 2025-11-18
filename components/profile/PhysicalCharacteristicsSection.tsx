"use client";

import { BioData } from "@/lib/types";

interface PhysicalCharacteristicsSectionProps {
  data: BioData;
}

export default function PhysicalCharacteristicsSection({
  data,
}: PhysicalCharacteristicsSectionProps) {
  const calculateBMI = (weight: number | undefined, height: number | undefined) => {
    if (!weight || !height || height === 0) return null;
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
  };

  const bmi = calculateBMI(data.weight, data.height);
  const bmiCategory = bmi
    ? parseFloat(bmi) < 18.5
      ? "Underweight"
      : parseFloat(bmi) < 25
      ? "Normal"
      : parseFloat(bmi) < 30
      ? "Overweight"
      : "Obese"
    : null;

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-6">
          <svg
            className="w-5 h-5 text-green-800 dark:text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        <h2 className="text-xl font-semibold text-foreground">Physical Characteristics</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <InfoCard
          label="Weight"
          value={data.weight && data.weight > 0 ? `${data.weight} kg` : "Not provided"}
        />
        <InfoCard
          label="Height"
          value={data.height && data.height > 0 ? `${data.height} cm` : "Not provided"}
        />
        <InfoCard
          label="Age"
          value={data.age && data.age > 0 ? `${data.age} years` : "Not provided"}
        />
        {bmi && (
          <InfoCard
            label="BMI"
            value={`${bmi} (${bmiCategory})`}
            className="col-span-2"
          />
        )}
      </div>

      <div className="space-y-4 mt-4">
        <TextCard
          label="Dietary Restrictions"
          value={data.dietaryRestrictions || "Not specified"}
        />
        <TextCard
          label="Budget Constraints"
          value={data.budgetConstraints || "Not specified"}
        />
      </div>
    </div>
  );
}

interface InfoCardProps {
  label: string;
  value: string;
  className?: string;
}

function InfoCard({ label, value, className }: InfoCardProps) {
  return (
    <div className={`p-4 bg-muted/50 rounded-lg border border-border ${className || ""}`}>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

interface TextCardProps {
  label: string;
  value: string;
}

function TextCard({ label, value }: TextCardProps) {
  return (
    <div className="p-4 bg-muted/50 rounded-lg border border-border">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
        {label}
      </p>
      <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{value}</p>
    </div>
  );
}

