import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

const RootLayout = () => {
  const { pathname } = useLocation();

  const hideFooter =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/dashboard");
  const hideNavbar = pathname.startsWith("/dashboard/videocall");

  return (
    <>
      <ScrollToTop />
      {/* <Navbar></Navbar> */}
      {!hideNavbar && <Navbar />}
      <main>
        <Outlet></Outlet>
      </main>
      {!hideFooter && <Footer />}
    </>
  );
};

export default RootLayout;
