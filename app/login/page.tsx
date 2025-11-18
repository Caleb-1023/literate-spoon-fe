"use client";

import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="basis-1/2 h-full flex items-center justify-center bg-green-800">
        <h1 className="text-4xl text-white font-bold uppercase">Literate Spoon</h1>
      </div>
      <div className="basis-1/2 h-full flex items-center bg-white">
        <LoginForm />
      </div>
    </div>
  );
}