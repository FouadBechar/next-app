"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import CloseIcon from '@/components/icons/close';

interface AuthFormProps {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthForm({
  title,
  description,
  children,
  footer,
}: AuthFormProps) {
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center min-h-screen p-4"
    >
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="absolute top-4 left-4">
        <button
          type="button"
          onClick={() => { try { window.location.replace('/'); } catch (e) { window.location.href = '/'; } }}
          aria-label="Close"
          title="Close"
          className="h-10 w-10 flex items-center justify-center rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 shadow-sm hover:shadow-md transition-shadow duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
        >
          {/* reusable close icon */}
          <CloseIcon className="h-5 w-5" />
        </button>
      </div>
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">{title}</CardTitle>
          <CardDescription className="text-center">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
        {footer && (
          <CardFooter className="flex flex-col space-y-4">{footer}</CardFooter>
        )}
      </Card>
    </motion.div>
  );
}
