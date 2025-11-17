"use client";

import { BioData } from "@/lib/types";
import { cn } from "@/lib/utils";

interface PersonalInfoSectionProps {
  data: BioData;
}

export default function PersonalInfoSection({ data }: PersonalInfoSectionProps) {
  const formatGender = (gender: string | undefined) => {
    if (!gender) return "Not specified";
    return gender
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-6">
        <svg
          className="w-5 h-5 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <h2 className="text-xl font-semibold text-foreground">Personal Information</h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <InfoCard label="First Name" value={data.firstName || "Not provided"} />
        <InfoCard label="Gender" value={formatGender(data.gender)} />
        <InfoCard label="Zip Code" value={data.zipCode || "Not provided"} />
      </div>
    </div>
  );
}

interface InfoCardProps {
  label: string;
  value: string;
}

function InfoCard({ label, value }: InfoCardProps) {
  return (
    <div className="p-4 bg-muted/50 rounded-lg border border-border">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

