/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import MultiStepForm from "@/components/MultiStepForm";

// import { signUp } from "@/lib/auth";
// import { useState } from "react";
// import { signUp } from "@/lib/auth";

export default function SignupForm() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // async function handleSignup(e: React.FormEvent) {
  //   e.preventDefault();

  //   try {
  //     const user = await signUp(email, password);
  //     console.log("User created:", user);
  //     alert("Signup successful!");
  //   } catch (error: any) {
  //     console.error(error);
  //     alert(error.message);
  //   }
  // }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      {/* <form onSubmit={handleSignup} className="w-1/3 flex flex-col gap-4 max-w-sm">
        <input
          className="border p-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 rounded"111112q
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Sign Up
        </button>
      </form> */}
      <div className="basis-1/2 h-full flex items-center justify-center bg-green-800">
        <h1 className="text-4xl text-white font-bold uppercase">Literate Spoon</h1>
      </div>
      <div className="basis-1/2 h-full flex items-center bg-white">
        <MultiStepForm />
      </div>
    </div>
  );
}
