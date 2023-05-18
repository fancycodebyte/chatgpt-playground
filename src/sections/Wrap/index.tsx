"use client";
import React, { FC, PropsWithChildren } from "react";
import RootContextProvider from "@/context/RootContext";

const Wrap: FC<PropsWithChildren> = ({ children }) => {
  return <RootContextProvider>{children}</RootContextProvider>;
};

export default Wrap;
