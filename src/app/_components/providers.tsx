"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, ReactNode } from "react";

type Props = { children: ReactNode };

const Providers: FC<Props> = ({ children }) => {
  const queryQlient = new QueryClient();

  return (
    <QueryClientProvider client={queryQlient}>{children}</QueryClientProvider>
  );
};

export default Providers;
