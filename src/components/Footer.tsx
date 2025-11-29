
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "../assets/logo2.png"; // adjust path
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-[#0b1020] px-6 md:px-12 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Logo + Description */}
        <div>
          <img src={logo} alt="HireArena" className="h-12 mb-4" />
          <p className="text-gray-500 text-xs leading-relaxed">
          At HireArena, we believe every candidate deserves smarter guidance before facing real interviews. Our platform transforms traditional preparation into an intelligent, AI-driven experience that listens, evaluates, and coaches in real time. We are not replacing human interviewers — we are enhancing how talent is discovered, trained, and ready for success.
          </p>
        </div>

        {/* Quick Links */}
       <div>
  <h3 className="text-white font-semibold mb-4 tracking-wide text-sm uppercase">
    Quick Links
  </h3>

  <ul className="space-y-2 text-gray-400 text-sm">
    <li>
      <NavLink to="/features" className="hover:text-white transition">
        Features
      </NavLink>
    </li>

    <li>
      <NavLink to="/pricing" className="hover:text-white transition">
        Pricing
      </NavLink>
    </li>

    <li>
      <NavLink to="/privacy-policy" className="hover:text-white transition">
        Privacy Policy
      </NavLink>
    </li>
    <li>
      <NavLink to="/testimonial" className="hover:text-white transition">
        Testimonials
      </NavLink>
    </li>
    <li>
      <NavLink to="/solution" className="hover:text-white transition">
        Solutions
      </NavLink>
    </li>
    
  </ul>
</div>

        {/* Address */}
        <div>
  <h3 className="text-white font-semibold mb-4 tracking-wide text-sm uppercase">
    Address
  </h3>

  <div className="text-gray-400 text-sm space-y-3 leading-relaxed">
    {/* India Office */}
    <p className="font-medium text-gray-300">Primary Office (India)</p>
    <p>AI BACKOFFICE</p>
    <p>Noida, Uttar Pradesh 201301, IN</p>
    

    <p>
      <span className="font-medium text-gray-300">Phone:</span> +919217125488
    </p>
    {/* <p>
      <span className="font-medium text-gray-300">Country:</span> India
    </p> */}

    {/* Separator */}
    <div className="border-b border-gray-600 w-40 my-3"></div>

    {/* US Office */}
    <p className="font-medium text-gray-300">US Office</p>
    <p>Stafford, Texas 77477, US</p>
  </div>
</div>


        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4 tracking-wide text-sm uppercase">Contact</h3>
          <div className="text-gray-400 text-sm space-y-3">
            <p className="flex items-center gap-2"><Phone size={16} /> +919217125488</p>
            <p className="flex items-center gap-2"><Mail size={16} /> support@HireArena.com</p>
            <p className="flex items-center gap-2"><MapPin size={16} />Noida, Uttar Pradesh</p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} HireArena. All rights reserved.
      </div>
    </footer>
  );
}
