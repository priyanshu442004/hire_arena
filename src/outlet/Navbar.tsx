// 



import { NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import logo from "../assets/logo2.png";
import { useNavigate } from "react-router-dom";
import { Menu, X, Star } from "lucide-react";

const HOST = import.meta.env.VITE_BACKEND;

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleMenu = () => setMobileOpen(!mobileOpen);
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [profileUrl,setProfileUrl] = useState(localStorage.getItem("profile_url") || "");
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);



  const isLoggedIn = !!localStorage.getItem("token");

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "font-semibold text-blue-600 border-b-2 border-blue-600 pb-1"
      : "font-semibold text-gray-600 hover:text-gray-900";


useEffect(() => {
  const storedUrl = localStorage.getItem("profile_url");
  if (storedUrl) setProfileUrl(storedUrl);
}, []);


      useEffect(() => {
  async function loadUser() {
    const storedUsername = localStorage.getItem("username");
    const storedUserId = localStorage.getItem("usr");

    if (storedUsername) {
      setUsername(storedUsername);
      return;
    }

    if (storedUserId) {
      try {
        const res = await fetch(`${HOST}/user/${storedUserId}`);
        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();

        
        if (data?.first_name) {
  setUsername(data.first_name);
  setProfileUrl(data.profile_image_url);  

  localStorage.setItem("username", data.first_name);
  localStorage.setItem("profile_url", data.profile_image_url);
}

      } catch (err) {
        console.error("Error loading user:", err);
      }
    }
  }

  loadUser();

  
  const handleStorage = () => loadUser();

  window.addEventListener("storage", handleStorage);
  return () => window.removeEventListener("storage", handleStorage);
}, []);



  
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.clear();
    setDropdownOpen(false);
    navigate("/login", { replace: true });
    setMobileOpen(false);
  };

    useEffect(() => {
   
    if (userData) return;

    const getData = async () => {
      const userId = localStorage.getItem("usr");
      if (!userId) return; 
      setLoading(true);

      try {
        const res = await fetch(`${HOST}/user/${userId}`);
        const data = await res.json();

        setUserData(data);
        console.log(userData)

        if (data.profile_image_url) {
          localStorage.setItem("profile_url", data.profile_image_url);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
        
      }
    };

    getData();
  }, [userData]);

  if(loading){
     return (
    <div className="flex justify-center items-center h-40">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-4 border-cyan-500/40"></div>
        <div className="absolute inset-0 h-12 w-12 rounded-full border-t-4 border-cyan-400 animate-spin"></div>
      </div>
    </div>
  );
  }

  return (
  <>
  <nav className="border-b-2 border-gray-400 fixed top-0 left-0 w-full bg-[#E6F0FA] z-[999999]">
      <div className="max-w-8xl mx-auto px-10 py-4 flex items-center w-full justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-2">
          <NavLink to="/" onClick={() => setMobileOpen(false)}>
            <img src={logo} alt="InnovativePitch" className="h-8 w-auto" />
          </NavLink>
          <span className="font-bold text-gray-800 text-base">
            <NavLink to="/">HireArena</NavLink>
          </span>
        </div>

        {/* DESKTOP CENTER (unchanged) */}
        <div className="hidden lg:flex flex-1 justify-center">
          <div className="flex items-center gap-10 text-md">
            {isLoggedIn && username && (
              <p className="text-gray-800 font-semibold text-lg">
                Hi {username}, Ready for next Interview?
              </p>
            )}
          </div>
        </div>

        {/* RIGHT - DESKTOP (unchanged) */}
        <div className="hidden lg:flex items-center gap-6 text-sm text-gray-800">
          {!isLoggedIn && (
            <>
              <NavLink to="/features" className={getLinkClass}>
                Features
              </NavLink>
              <NavLink to="/testimonial" className={getLinkClass}>
                Testimonials
              </NavLink>
              <NavLink to="/solution" className={getLinkClass}>
                Solutions
              </NavLink>
              <NavLink to="/pricing" className={getLinkClass}>
                Pricing
              </NavLink>

              {/* 👇 Login as Blue Pill Button — bypassing getLinkClass */}
              <NavLink
                to="/login"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-white bg-[#105472] px-4 py-2 rounded-full shadow-sm"
                    : "font-semibold text-white bg-[#105472] px-4 py-2 rounded-full hover:bg-[#107492] transition"
                }
              >
                LogIn
              </NavLink>
            </>
          )}

          {isLoggedIn && (
            <div className="relative" ref={dropdownRef}>
              <button
  onClick={() => setDropdownOpen(!dropdownOpen)}
  className="flex items-center gap-3 px-2 py-1 rounded-md hover:bg-gray-100 transition"
>
  {/* Profile Picture Circle */}
  <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-gray-700 font-semibold">
  {userData && userData.profile_image_url ? (
    <img
      onError={() => console.log("IMAGE FAILED TO LOAD:", profileUrl)}
      src={userData.profile_image_url}
      alt="Profile"
      className="w-full h-full object-cover"
    />
  ) : (
    <span>
      {userData?.first_name
        ? userData.first_name.charAt(0).toUpperCase()
        : "U"}
    </span>
  )}
</div>



                {/* Username */}
                <span className="font-medium text-gray-800">
                  {username || "User"}
                </span>

                {/* Arrow */}
                <svg
                  className={`w-4 h-4 text-gray-700 transform transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white shadow-xl rounded-xl border border-gray-100 py-2 animate-fadeIn">
                  {/* Dashboard */}
                  <NavLink
                    to="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition rounded-md"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2l-7-7-7 7m14 2v10a1 1 0 01-1 1h-3m-6 0h6"
                      />
                    </svg>
                    Dashboard
                  </NavLink>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 w-full text-left text-red-600 hover:bg-red-50 transition rounded-md"
                  >
                    <svg
                      className="w-5 h-5 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5m0 0H5a2 2 0 00-2 2v10a2 2 0 002 2h8"
                      />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        {/* MOBILE GREETING */}
        {isLoggedIn && username && (
          <div className="lg:hidden flex-1 text-center">
            <p className="text-gray-800 font-semibold text-base">
              Hi {username}!
            </p>
          </div>
        )}

        {/* MOBILE MENU BUTTON */}
        <button className="lg:hidden text-gray-800" onClick={toggleMenu}>
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-4 animate-fadeDown">
          {/* Always show these links */}
          <NavLink
            to="/features"
            className="block font-medium text-gray-700"
            onClick={toggleMenu}
          >
            Features
          </NavLink>

          <NavLink
            to="/testimonial"
            className="block font-medium text-gray-700"
            onClick={toggleMenu}
          >
            Testimonials
          </NavLink>

          <NavLink
            to="/solution"
            className="block font-medium text-gray-700"
            onClick={toggleMenu}
          >
            Solutions
          </NavLink>

          <NavLink
            to="/pricing"
            className="block font-medium text-gray-700"
            onClick={toggleMenu}
          >
            Pricing
          </NavLink>

          {/* IF LOGGED IN → show dashboard + logout */}
          {isLoggedIn && (
            <>
              <NavLink
                to="/dashboard"
                className="block font-medium text-gray-700"
                onClick={toggleMenu}
              >
                Dashboard
              </NavLink>

              <button
                onClick={handleLogout}
                className="block text-left w-full font-medium text-red-600"
              >
                Logout
              </button>
            </>
          )}

          {/* IF NOT LOGGED IN → show login */}
          {!isLoggedIn && (
            <div className="pt-3 border-t border-gray-300">
              <NavLink
                to="/login"
                className="flex items-center gap-2 font-semibold text-blue-600"
                onClick={toggleMenu}
              >
                <Star size={18} />
                Login
              </NavLink>
            </div>
          )}
        </div>
      )}
    </nav>
  </>
    
  );
};

export default Navbar;
