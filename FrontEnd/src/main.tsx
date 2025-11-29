import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "sonner";   // <-- ADD THIS
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <>
      <Toaster richColors position="top-right" />   {/* <-- ADD THIS */}
      <App />
    </>
  </GoogleOAuthProvider>
);
