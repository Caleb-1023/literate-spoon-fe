"use client";

import { BioData } from "@/lib/types";
import PersonalInfoSection from "./PersonalInfoSection";
import PhysicalCharacteristicsSection from "./PhysicalCharacteristicsSection";
import InterpretedDataSection from "./InterpretedDataSection";

interface ProfileDisplayProps {
  data: BioData;
}

export default function ProfileDisplay({ data }: ProfileDisplayProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Profile Information</h1>
        <p className="text-muted-foreground">View and manage your BioData information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <PersonalInfoSection data={data} />

        {/* Physical Characteristics */}
        <PhysicalCharacteristicsSection data={data} />
      </div>

      {/* Interpreted Data - Full Width */}
      <InterpretedDataSection data={data} />
    </div>
  );
}

