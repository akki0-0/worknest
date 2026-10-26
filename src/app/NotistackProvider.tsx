"use client";
import { SnackbarProvider } from "notistack";
import React from "react";

export default function NotistackProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      autoHideDuration={3000}
      maxSnack={3}
    >
      {children}
    </SnackbarProvider>
  );
}
