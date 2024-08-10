import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient();

/*
The QueryClientProvider in TanStack React Query is a component that serves as the context provider for your React application's query management. Its primary role is to supply a QueryClient instance to your entire React component tree, enabling centralized data fetching, caching, synchronization, and state management through React Query hooks like useQuery and useMutation.
*/

export const QueryProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
