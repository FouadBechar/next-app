"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/utils/auth-helpers";
import { loginSchema } from "@/lib/utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { executeRecaptchaSafe } from "@/lib/utils/recaptcha";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    setError(null);
    let recaptchaWarning: string | null = null;

    try {
      // If reCAPTCHA is configured, verify token server-side before sign-in
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      if (siteKey) {
        try {
          const res = await executeRecaptchaSafe(siteKey, "login");
          if (!res.ok) {
            // Non-blocking: warn the user but continue the login attempt
            recaptchaWarning = res.error || "reCAPTCHA unavailable";
          } else {
            const token = res.token;
            // Verify token server-side, but be defensive about the response shape
            let verifyJson: any = null;
            try {
              const verifyRes = await fetch("/api/recaptcha", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token }),
              });

              // If server didn't return JSON (e.g., 405 or empty body), handle gracefully
              const contentType = verifyRes.headers.get("content-type") || "";
              if (!verifyRes.ok) {
                // try to parse JSON for an error message if possible
                if (contentType.includes("application/json")) {
                  verifyJson = await verifyRes.json();
                }
                throw new Error(verifyJson?.message || `reCAPTCHA verify failed (${verifyRes.status})`);
              }

              if (contentType.includes("application/json")) {
                verifyJson = await verifyRes.json();
              } else {
                throw new Error("reCAPTCHA verify returned non-JSON response");
              }

              if (!verifyJson?.success) {
                throw new Error(verifyJson?.message || "reCAPTCHA verification failed");
              }
            } catch (verifyErr) {
              // treat verification failure as non-blocking but warn
              recaptchaWarning = (verifyErr as Error).message || String(verifyErr);
            }
          }
        } catch (recErr) {
          // Execution-level errors already converted to safe result, but keep fallback
          recaptchaWarning = (recErr as Error).message || String(recErr);
        }
      }

      await login(data.email, data.password);
      if (recaptchaWarning) {
        // surface a non-blocking warning to the user — reuse error state for simplicity
        setError(recaptchaWarning);
      }
      router.push("/dashboard");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Invalid email or password"
      );
    } finally {
      setIsLoading(false);
    }
  }

// reCAPTCHA loader/executor is provided by `lib/utils/recaptcha.ts`

// reCAPTCHA loader/executor is provided by `lib/utils/recaptcha.ts`

  return (
    <div className="space-y-6">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-right">
            <Link
              href="/auth/reset-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/auth/signup" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}