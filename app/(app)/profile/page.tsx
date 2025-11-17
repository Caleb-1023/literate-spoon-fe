"use client";

import { useEffect, useState } from "react";
import ProfileDisplay from "@/components/profile/ProfileDisplay";
import { BioData } from "@/lib/types";

export default function ProfilePage() {
  const [data, setData] = useState<BioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to fetch data from localStorage (or replace with API call)
    const fetchProfileData = () => {
      try {
        const storedData = localStorage.getItem("biodata");
        if (storedData) {
          const parsed = JSON.parse(storedData) as BioData;
          setData(parsed);
        }
      } catch (error) {
        console.error("Error loading profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading profile data...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No profile data found.</p>
        <p className="text-sm text-muted-foreground">
          Please complete the BioData form to see your profile information.
        </p>
      </div>
    );
  }

  return <ProfileDisplay data={data} />;
}
