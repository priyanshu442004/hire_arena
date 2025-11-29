import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";


const HOST = import.meta.env.VITE_BACKEND;

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  // const [uploadingStartup, setUploadingStartup] = useState(false);
const [startups, setStartups] = useState<any[]>([]);
const [loadingStartups, setLoadingStartups] = useState(true);
// const [showAll, setShowAll] = useState(false);
if(!startups ||!loadingStartups){}
  const userId = localStorage.getItem("usr");

//   const [startupName, setStartupName] = useState("");
// const [industry, setIndustry] = useState("");
// const [website, setWebsite] = useState("");
// const [tagline, setTagline] = useState("");
// const [about, setAbout] = useState("");


const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [updatingPass, setUpdatingPass] = useState(false);

const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [phoneNumber, setPhoneNumber] = useState("");
const [saving, setSaving] = useState(false);



const handleProfileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("profile", file);
  formData.append("user_id", localStorage.getItem("usr") || "");

  try {
    const res = await axios.post(`${HOST}/user/upload-profile`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    console.log("Uploaded:", res.data);
    toast.success("Profile updated successfully!");
    if (res.data.profile_image_url) {
  localStorage.setItem("profile_url", res.data.profile_image_url);
}

    window.location.reload()

  } catch (err) {
    console.error(err);
    toast.error("Upload failed");
  }
};


const saveProfile = async () => {
  const user_id = localStorage.getItem("usr");
  if (!user_id) return toast.error("User not logged in");

  try {
    setSaving(true);

    const res = await fetch(`${HOST}/user/update-profile`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Failed to update profile");
      return;
    }

    toast.success("Profile updated successfully!");

  } catch (err) {
    console.error(err);
    toast.error("Something went wrong");
  } finally {
    setSaving(false);
  }
};


useEffect(() => {
  if (userData) {
    setFirstName(userData.first_name || "");
    setLastName(userData.last_name || "");
    setPhoneNumber(userData.phone_number || "");
  }
}, [userData]);



const updatePassword = async () => {
  const user_id = localStorage.getItem("usr");
  if (!user_id) return toast.error("User not logged in");

  if (!currentPassword || !newPassword || !confirmPassword) {
    return toast.error("Please fill all fields");
  }

  if (newPassword !== confirmPassword) {
    return toast.error("New passwords do not match");
  }

  if (newPassword.length < 8) {
    return toast.error("Password must be at least 8 characters");
  }

  try {
    setUpdatingPass(true);

    const res = await fetch(`${HOST}/user/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id,
        current_password: currentPassword,
        new_password: newPassword,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Failed to update password");
      return;
    }

    toast.success("Password updated successfully!");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong");
  } finally {
    setUpdatingPass(false);
  }
};




//   const createStartup = async () => { 
//   try {
//     setUploadingStartup(true)
//     const user_id = localStorage.getItem("usr");
//     if (!user_id) {
//       alert("User not logged in");
//       return;
//     }

//     const payload = {
//       user_id,
//       org_name: startupName,
//       industry_type: industry,
//       website_url: website
//     };

//     const res = await fetch(`${HOST}/startup/create`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload)
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       toast.error(data.error || "Failed to create startup");
//       setUploadingStartup(false);
//       return;
//     }

//      toast.success("Startup created successfully!");

//     setEditingStartup(null); 

//    window.location.reload;

//   } catch (error) {
//     console.error("Error creating startup:", error);
//     toast.error("Something went wrong");
//   }finally {
//     setLoading(false);  
//     setUploadingStartup(false)
//   }
// };


  

  // Dummy startup list


  const [editingStartup, setEditingStartup] = useState(null as any);
  if(editingStartup){}
  useEffect(() => {
      if (!userId) {
        console.error("No user_id found in localStorage");
        setLoading(false);
        return;
      }
  
      const fetchUser = async () => {
        try {
          const res = await fetch(`${HOST}/user/${userId}`);
          const data = await res.json();
  
  
          setUserData(data);
          if (data.profile_image_url) {
  localStorage.setItem("profile_url", data.profile_image_url);
}

        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUser();
    }, [userId]);

    useEffect(() => {
  const fetchStartups = async () => {
    try {
      setLoadingStartups(true);

      const res = await fetch(`${HOST}/startup/user/${userId}`);
      const data = await res.json();

      if (res.ok) {
        setStartups(data.startups || []);
      } else {
        console.error("Error fetching startups:", data.error);
      }

    } catch (err) {
      console.error("Startup fetch error:", err);
    } finally {
      setLoadingStartups(false);
    }
  };

  if (userId) fetchStartups();
}, [userId]);
// const visibleStartups = showAll ? startups : startups.slice(0, 2);
if(!setEditingStartup){}

  
    if (loading) {
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
    <div className="space-y-10">

      {/* Header */}
      {/* Page Intro */}
<div className="flex items-center space-x-3 mb-4">
  <div className="w-6 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
  <h2 className="text-[13px] font-semibold tracking-wider uppercase text-black">
    Settings
  </h2>
</div>

<h1 className="text-black text-3xl font-bold tracking-tight mb-8">Account & App Settings</h1>


{/* ==================== Profile Section ==================== */}
<div className="bg-white/10 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-8 shadow-[0_0_50px_-15px_rgba(0,0,0,0.4)] hover:shadow-[0_0_60px_-10px_rgba(0,255,255,0.1)] transition-all">
  
  {/* Section Header */}
  <div className="flex items-center justify-between mb-6">
    <h3 className="text-xl font-semibold text-black">Profile Information</h3>
    <span className="text-xs text-black italic">Update your personal details</span>
  </div>

  {/* Avatar Upload */}
  <div className="flex items-center space-x-6 mb-8">

  {/* Hidden File Input */}
  <input
    type="file"
    id="profileUpload"
    accept="image/*"
    className="hidden"
    onChange={handleProfileUpload}
  />

  {/* Profile Circle */}
  <div
    className="relative group"
    onClick={() => document.getElementById("profileUpload")?.click()}
  >
    <div className="w-24 h-24 bg-slate-800 rounded-full overflow-hidden shadow-lg border border-slate-700 group-hover:scale-105 group-hover:shadow-cyan-500/20 transition-all cursor-pointer flex items-center justify-center">
  {userData?.profile_image_url ? (
    <img
      src={userData.profile_image_url}
      alt="Profile"
      className="w-full h-full object-cover"
    />
  ) : (
    <span className="text-4xl">👤</span>
  )}
</div>


    <div className="opacity-0 group-hover:opacity-100 transition absolute top-0 left-0 w-full h-full bg-black/50 rounded-full flex items-center justify-center text-xs text-white hover:cursor-pointer">
      Change
    </div>
  </div>

  {/* Button triggers same upload */}
  <button
    className="bg-slate-700 hover:bg-slate-600 text-white py-2.5 px-5 rounded-lg text-sm shadow-md transition"
    onClick={() => document.getElementById("profileUpload")?.click()}
  >
    Upload New Photo
  </button>
</div>


  {/* Form Fields */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

  <div className="flex flex-col">
    <label className="text-sm text-black mb-1">First Name</label>
    <input
      className="w-full p-3 rounded-lg bg-slate-900/60 border border-slate-700 text-white placeholder-white
                 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-600 transition"
      placeholder="John"
      value={firstName}
  onChange={(e) => setFirstName(e.target.value)}
    />
  </div>

  <div className="flex flex-col">
    <label className="text-sm text-black mb-1">Last Name</label>
    <input
      className="w-full p-3 rounded-lg bg-slate-900/60 border border-slate-700 text-white placeholder-white
                 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-600 transition"
      placeholder="Doe"
       value={lastName}
  onChange={(e) => setLastName(e.target.value)}
    />
  </div>

  {/* Phone Number */}
  <div className="flex flex-col">
    <label className="text-sm text-black mb-1">Phone Number</label>
    <input
      type="tel"
      className="w-full p-3 rounded-lg bg-slate-900/60 border border-slate-700 text-white placeholder-white
                 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-600 transition"
      placeholder="+1 555 123 4567"
      value={phoneNumber}
  onChange={(e) => setPhoneNumber(e.target.value)}
    />
  </div>

  {/* Email - Read Only */}
  <div className="flex flex-col">
    <label className="text-sm text-black mb-1">Email Address</label>
    <input
      readOnly
      value={userData?.email || ""}
      onChange={() => {}}
      className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700/70 text-gray-400 cursor-not-allowed
                 shadow-inner italic"
    />
    <span className="text-[11px] text-red-800 mt-1">Email cannot be changed</span>
  </div>

</div>


  {/* Save Button */}
  <div className="mt-7">
    <button
  onClick={saveProfile}
  disabled={saving}
  className={`bg-cyan-600 hover:bg-cyan-700 text-white py-3 px-8 rounded-xl font-semibold 
              shadow-md hover:shadow-cyan-500/30 transition-all flex items-center justify-center
              ${saving ? "opacity-60 cursor-not-allowed" : ""}`}
>
  {saving ? (
    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  ) : (
    "Save Profile"
  )}
</button>

  </div>
</div>





     {/* ==================== Reset Password Section ==================== */}
<div className="bg-white/10 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-8 shadow-[0_0_40px_-15px_rgba(0,0,0,0.4)] hover:shadow-[0_0_60px_-10px_rgba(16,185,129,0.15)] transition-all">

  {/* Section Title */}
  <div className="flex items-center justify-between mb-6">
    <h3 className="text-xl font-semibold text-black flex items-center space-x-2">
      <svg
        className="w-5 h-5 text-emerald-400"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 2a4 4 0 00-4 4v2H5a1 1 0 00-1 1v8a1 1 0 001 1h10a1 1 0 001-1v-8a1 1 0 00-1-1h-1V6a4 4 0 00-4-4zm2 6V6a2 2 0 10-4 0v2h4z" />
      </svg>
      <span>Reset Password</span>
    </h3>

    <span className="text-xs text-black italic">
      Make sure your new password is strong
    </span>
  </div>

  {/* Form Inputs */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    {/* Current Password */}
    <div className="flex flex-col">
      <label className="text-sm text-black mb-1">Current Password</label>
      <input
        type="password"
        className="w-full p-3 rounded-lg bg-slate-900/60 border border-slate-700 text-white
        focus:border-emerald-500 focus:ring-2 focus:ring-emerald-600 transition placeholder-white"
        placeholder="••••••••"
        value={currentPassword}
  onChange={(e) => setCurrentPassword(e.target.value)}
      />
    </div>

    {/* New Password */}
    <div className="flex flex-col">
      <label className="text-sm text-black mb-1">New Password</label>
      <input
        type="password"
        className="w-full p-3 rounded-lg bg-slate-900/60 border border-slate-700 text-white
        focus:border-emerald-500 focus:ring-2 focus:ring-emerald-600 transition placeholder-white"
        placeholder="••••••••"
        value={newPassword}
  onChange={(e) => setNewPassword(e.target.value)}
      />
    </div>

    {/* Confirm Password */}
    <div className="flex flex-col">
      <label className="text-sm text-black mb-1">Confirm New Password</label>
      <input
        type="password"
        className="w-full p-3 rounded-lg bg-slate-900/60 border border-slate-700 text-white
        focus:border-emerald-500 focus:ring-2 focus:ring-emerald-600 transition placeholder-white"
        placeholder="••••••••"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
      />
    </div>
  </div>

  {/* Weak/Strong Password Hint */}
  <div className="mt-4 text-sm text-black flex items-center space-x-2">
    <svg className="w-4 h-4 text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 5h2v6H9V5zm0 8h2v2H9v-2z" />
    </svg>
    <span>
      Use at least <span className="text-emerald-600">8 characters</span>, including numbers & symbols.
    </span>
  </div>

  {/* Save Button */}
  <button
  onClick={updatePassword}
  disabled={updatingPass}
  className={`mt-7 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-8 rounded-xl font-semibold 
              shadow-md hover:shadow-emerald-500/30 transition-all flex items-center justify-center
              ${updatingPass ? "opacity-60 cursor-not-allowed" : ""}`}
>
  {updatingPass ? (
    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  ) : (
    "Update Password"
  )}
</button>

</div>





      







      {/* ==================== Preferences ==================== */}
     {/* ==================== Preferences Section ==================== */}
<div className="bg-white/10 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-8 shadow-[0_0_40px_-15px_rgba(0,0,0,0.4)] hover:shadow-[0_0_60px_-10px_rgba(16,185,129,0.15)] transition-all">

  {/* Header */}
  <div className="flex items-center justify-between mb-6">
    <h3 className="text-xl font-semibold text-black flex items-center space-x-2">
      <svg
        className="w-5 h-5 text-cyan-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M12 6V4m0 16v-2m8-6h2M4 12H2m14.95 4.95l1.4 1.4m-12.7 0l1.4-1.4m12.7-9.9l-1.4 1.4m-12.7 0l-1.4-1.4" />
      </svg>
      <span>Preferences</span>
    </h3>

    <span className="text-xs text-black italic">Customize your experience</span>
  </div>

  <div className="space-y-8">

    {/* Theme Selection */}
    <div>
      <label className="text-sm text-black block mb-2">Theme</label>

      <div className="relative">
        <select
          className="w-full p-3 rounded-xl bg-slate-900/60 border border-slate-700 text-white appearance-none
                     focus:border-cyan-500 focus:ring-2 focus:ring-cyan-600 transition"
        >
          <option>Dark</option>
          <option>Light</option>
          <option>System</option>
        </select>

        {/* Dropdown Icon */}
        <svg
          className="w-5 h-5 text-white absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </div>

    {/* Notification Toggles */}
    <div>
      <label className="text-sm text-black block mb-3">Notifications</label>

      <div className="space-y-4">

        {/* Toggle Component */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-black">Pitch reminder emails</span>
          
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-slate-700 peer-focus:ring-2 peer-focus:ring-cyan-500 rounded-full peer peer-checked:bg-cyan-600 transition"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-black">New feedback notifications</span>

          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-slate-700 peer-focus:ring-2 peer-focus:ring-cyan-500 rounded-full peer peer-checked:bg-cyan-600 transition"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-black">Product updates</span>

          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-slate-700 peer-focus:ring-2 peer-focus:ring-cyan-500 rounded-full peer peer-checked:bg-cyan-600 transition"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition"></div>
          </label>
        </div>

      </div>
    </div>

  </div>

  <button
    className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-black py-3 px-8 rounded-xl font-semibold 
               shadow-md hover:shadow-emerald-500/30 transition-all"
  >
    Save Preferences
  </button>
</div>





      {/* ==================== Danger Zone ==================== */}
     {/* ==================== Danger Zone ==================== */}
<div className="bg-red-950/40 backdrop-blur-xl border border-red-800/40 rounded-2xl p-8 
                shadow-[0_0_50px_-20px_rgba(255,0,0,0.4)] transition-all">

  {/* Header */}
  <div className="flex items-center space-x-3 mb-4">
    <svg
      className="w-6 h-6 text-red-800 animate-pulse"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M12 9v4m0 4h.01M12 2l9 18H3L12 2z" />
    </svg>

    <h3 className="text-xl font-semibold text-red-800 tracking-wide">
      Danger Zone
    </h3>
  </div>

  <p className="text-sm text-black mb-8">
    These actions are permanent and cannot be undone.
  </p>

  {/* Divider */}
  <div className="border-t border-red-700/40 my-6"></div>

  {/* Action Buttons */}
  <div className="flex flex-col md:flex-row gap-6">

    {/* Delete Account */}
    <div className="flex-1 bg-red-900/30 border border-red-800 rounded-xl p-5">
      <h4 className="text-black font-medium mb-2">Delete Account</h4>
      <p className="text-xs text-gray-900 mb-4">
        Permanently remove your account and all data. This cannot be undone.
      </p>

      <button
        className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 
                   text-white py-3 px-6 rounded-xl font-semibold shadow-md hover:shadow-red-500/30 
                   transition-all"
      >
        Delete My Account
      </button>
    </div>

    {/* Logout All Devices */}
    <div className="flex-1 bg-slate-900/40 border border-slate-700 rounded-xl p-5">
      <h4 className="text-black font-medium mb-2">Logout All Devices</h4>
      <p className="text-xs text-gray-900 mb-4">
        Force-sign out from all browsers and active sessions.
      </p>

      <button
        className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 px-6 rounded-xl font-semibold 
                   shadow-md transition-all"
      >
        Logout All Devices
      </button>
    </div>

  </div>
</div>


    </div>
  );
};

export default Settings;
