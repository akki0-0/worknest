"use client";
import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@/components/forms/TextFiled/TextField";
import global from "../../../components/forms/Global.module.css";
import Image from "next/image";

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
    watch,
  } = useForm<RegisterForm>();

  const password = watch("password");

  const onSubmit = (data: RegisterForm) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={`flex flex-row h-screen w-full`}>
        <div className="flex-1 flex-col gap-9 bg-[#EAF9F9] flex items-center justify-center">
          <Image
            src={"/media/semi/register/register.png"}
            width={475}
            height={475}
            alt="register"
            style={{ borderRadius: "16px" }}
          />
          <Image
            src={"/media/semi/register/organise.png"}
            width={475}
            height={475}
            alt="register"
            style={{ borderRadius: "16px" }}
          />
          <Image
            src={"/media/semi/register/collaborate.png"}
            width={475}
            height={475}
            alt="register"
            style={{ borderRadius: "16px" }}
          />
        </div>
        <div className="flex-1 bg-[#EAF9F9] flex items-center justify-center">
          <div className={global.formColumnBox}>
            <TextField
              label="Email"
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address.",
                },
              })}
              placeholder="Enter Email"
              error={errors.email?.message}
            />
            <TextField
              label="Password"
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters.",
                },
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
                  message:
                    "Password must contain one uppercase letter, one lowercase letter, one number, and one special character.",
                },
              })}
              placeholder="Enter Password"
              error={errors.password?.message}
            />
            <TextField
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              placeholder="Enter Confirm Password"
              error={errors.confirmPassword?.message}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={global.submitCTA}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
