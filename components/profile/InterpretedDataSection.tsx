"use client";

import { BioData } from "@/lib/types";

interface InterpretedDataSectionProps {
  data: BioData;
}

export default function InterpretedDataSection({ data }: InterpretedDataSectionProps) {
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h2 className="text-xl font-semibold text-foreground">Diet & Health Goals</h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TextCard
          label="Diet and Health Goals"
          value={data.dietHealthGoals || "Not specified"}
        />
      </div>
    </div>
  );
}

interface TextCardProps {
  label: string;
  value: string;
}

function TextCard({ label, value }: TextCardProps) {
  return (
    <div className="p-6 bg-muted/50 rounded-lg border border-border">
      <p className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
        {label}
      </p>
      <p className="text-base text-foreground leading-relaxed whitespace-pre-wrap">{value}</p>
    </div>
  );
}

