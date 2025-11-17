"use client";

import { BioData } from "@/lib/types";
import Link from "next/link";
import { AlertCircle, ArrowRight } from "lucide-react";

interface DietaryRestrictionsCardProps {
  bioData: BioData | null;
}

export default function DietaryRestrictionsCard({ bioData }: DietaryRestrictionsCardProps) {
  const restrictions = bioData?.dietaryRestrictions || "Not specified";
  const budget = bioData?.budgetConstraints || "Not specified";

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Dietary Restrictions & Budget
          </h3>
        </div>
        <Link
          href="/profile"
          className="text-xs text-primary hover:text-primary/80 font-medium flex items-center space-x-1"
        >
          <span>Edit</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Dietary Restrictions
          </p>
          <p className="text-sm text-foreground leading-relaxed">
            {restrictions}
          </p>
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Budget Constraints
          </p>
          <p className="text-sm text-foreground leading-relaxed">
            {budget}
          </p>
        </div>
      </div>
    </div>
  );
}

