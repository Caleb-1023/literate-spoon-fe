"use client";

import { BioData } from "@/lib/types";
import Link from "next/link";
import { Target, ArrowRight } from "lucide-react";

interface HealthGoalsCardProps {
  bioData: BioData | null;
}

export default function HealthGoalsCard({ bioData }: HealthGoalsCardProps) {
  const goals = bioData?.dietHealthGoals || "Not specified";

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Target className="w-5 h-5 text-green-800 dark:text-green-600" />
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Health Goals
          </h3>
        </div>
        <Link
          href="/profile"
          className="text-xs text-green-800 hover:text-green-900 dark:text-green-600 dark:hover:text-green-500 font-medium flex items-center space-x-1"
        >
          <span>Edit</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <p className="text-sm text-foreground leading-relaxed line-clamp-4">
        {goals}
      </p>
    </div>
  );
}

