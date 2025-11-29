import { FileText, Download } from "lucide-react";
import { useState } from "react";
import NewPitchModal from "../../components/NewPitchModal";
interface PitchData {
  organizationName: string;
  industryType: string;
  websiteUrl: string;
}

const MyPitches = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

      const handleNewPitchSubmit = ( data:PitchData) => {
      console.log("Submitting new pitch:", data);
    };

  const file = {
    name: "Project-Proposal.docx",
    size: "1.2 MB",
    uploadedOn: "2025-02-10",
    url: "#",
  };

  return (
    <div className="p-6 bg-[#f9f9f9] min-h-screen relative">

      {/* 👉 New Pitch Button (Top Right Corner) */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="absolute top-6 right-6 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center space-x-2"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
        </svg>
        <span>New Resume</span>
      </button>

      {/* 👉 File Card */}
      <div className="bg-[#e6f0fa] p-5 rounded-2xl shadow-lg w-80 border border-[#2694b0] mt-16 ">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-[#0891b2] rounded-xl">
            <FileText size={30} className="text-white" />
          </div>

          <div>
            <h3 className="text-[#3f4959] font-bold">{file.name}</h3>
            <p className="text-slate-400 text-l">{file.size}</p>
            <p className="text-slate-500 text-l mt-1">
              Uploaded: {file.uploadedOn}
            </p>
          </div>
        </div>

        <button className="mt-5 w-full flex items-center justify-center space-x-2 bg-[#0891b2] hover:bg-slate-700 text-white py-2 rounded-lg">
          <Download size={18} />
          <span>Download</span>
        </button>
      </div>

      {/* OPTIONAL: Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-slate-800 p-6 rounded-xl w-96 text-white">
            <h2 className="text-lg font-semibold mb-4">Create New Pitch</h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-red-600 py-2 px-4 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
<NewPitchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleNewPitchSubmit}
      />
    </div>
  );
};

export default MyPitches;


