/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const base = process.env.NEXT_PUBLIC_DUMMY_LINK || "http://localhost:5001";
      const res = await axios.post(`${base}/api/auth/login`, { email: data.email, password: data.password }, { headers: { "Content-Type": "application/json" } });
      console.log("Login response (axios):", res);
      const json: any = res.data;
      const token = json.accessToken;

      if (token) {
        try {
          console.log("Persisting accessToken to localStorage");
          localStorage.setItem("accessToken", token);
        } catch (err) {
          console.warn("Failed to persist accessToken:", err);
        }
      }

      router.push("/dashboard");
    } catch (err: any) {
      console.error("Login error (axios):", err);
      const msg = err?.response?.data?.error || err?.message;
      setError(msg || "Failed to sign in. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Welcome Back
        </h2>
        <p className="text-muted-foreground">
          Sign in to your account to continue
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              className="w-4 h-4 border-input rounded focus:ring-2 focus:ring-ring"
            />
            <label
              htmlFor="remember"
              className="ml-2 text-sm text-muted-foreground"
            >
              Remember me
            </label>
          </div>
          <Link
            href="/forgot-password"
            className="text-sm text-green-800 hover:text-green-900 dark:text-green-600 dark:hover:text-green-500 font-medium"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 bg-green-800 text-white rounded-lg font-medium hover:bg-green-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>

        <div className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-green-800 hover:text-green-900 dark:text-green-600 dark:hover:text-green-500 font-medium"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
