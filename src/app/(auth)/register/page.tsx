"use client";
import React from "react";
import { useForm } from "react-hook-form";

interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
}
export default function Register({}: {}) {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm<RegisterForm>();

  return <div>Register</div>;
}
