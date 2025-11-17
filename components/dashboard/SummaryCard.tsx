"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SummaryCardProps {
  title: string;
  value: string | ReactNode;
  icon?: ReactNode;
  description?: string;
  link?: string;
  linkText?: string;
  className?: string;
}

export default function SummaryCard({
  title,
  value,
  icon,
  description,
  link,
  linkText = "Edit",
  className,
}: SummaryCardProps) {
  const content = (
    <div className={cn("bg-card border border-border rounded-lg p-6 shadow-sm", className)}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {icon && <div className="text-primary">{icon}</div>}
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {title}
          </h3>
        </div>
        {link && (
          <Link
            href={link}
            className="text-xs text-primary hover:text-primary/80 font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            {linkText} →
          </Link>
        )}
      </div>
      <div className="space-y-1">
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );

  return content;
}

