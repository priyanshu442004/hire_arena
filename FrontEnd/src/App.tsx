import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Signup from "./pages/SignupPage";
import { createBrowserRouter, RouterProvider,useLocation } from "react-router-dom";
import Pricing from "./pages/PricingPage";
import Login from "./pages/LoginPage";
import Features from "./pages/FeaturesPage";
import Testimonial from "./pages/TestimonialPage";
import RootLayout from "./outlet/RootLayout";
import Solution from "./pages/SolutionPage";
import DashboardLayout from "./layout/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import MyPitches from "./pages/dashboard/MyPitches";
import RecordedSessions from "./pages/dashboard/RecordedSessions";
import Judges from "./pages/dashboard/Judges";
import Score from "./pages/dashboard/Score";
import Settings from "./pages/dashboard/Settings";
import LinkedInSuccess from "./pages/LinkedInSuccess";
import PrivacyPolicyPage from "./pages/PrivacyPolicy";
import ProtectedRoute from "./components/ProtectedRoute";
import VideoCallInterface from "./components/VideoCallInterface";
import Analytics from "./pages/dashboard/Analytics";


function DashboardWrapper() {
  const location = useLocation();
  const hideDashboard = location.pathname.startsWith("/dashboard/videocall");

  return hideDashboard ? <VideoCallInterface /> : <DashboardLayout />;
}

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,

      children: [
        { index: true, element: <Home /> },
        { path: "testimonial", element: <Testimonial /> },
        { path: "features", element: <Features /> },
        { path: "signup", element: <Signup /> },
        { path: "login", element: <Login /> },
        { path: "pricing", element: <Pricing /> },
        { path: "solution", element: <Solution /> },
        { path: "privacy-policy", element: <PrivacyPolicyPage /> },
        { path: "/auth/linkedin-success", element: <LinkedInSuccess /> },

        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "dashboard",
              element: <DashboardWrapper />,  
              children: [
                { index: true, element: <DashboardHome /> },
                { path: "pitches", element: <MyPitches /> },
                { path: "recorded", element: <RecordedSessions /> },
                { path: "judges", element: <Judges /> },
                { path: "score", element: <Score /> },
                { path: "settings", element: <Settings /> },
                { path: "analytics", element: <Analytics /> },
                { path: "videocall", element: <VideoCallInterface /> },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
