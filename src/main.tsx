import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient.ts";
import { CaseProvider } from "./context/caseContextProvider.tsx";
import ClinicProvider from "./context/clinicalContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CaseProvider>
        <ClinicProvider>
          <App />
        </ClinicProvider>
      </CaseProvider>
    </QueryClientProvider>
  </StrictMode>
);
