// import  Ananya from "../../assets/AnanyaGupta.png";
import Priya from "../../assets/PriyaMehta.png";
import Rajeev from "../../assets/RajeevKhanna.png";
import Vikram from "../../assets/VikramDesai.png";

const judges = [
  // {
  //   name: "ANANYA GUPTA",
  //   subtitle: "Analyst",
  //   desc: "Financial metrics",
  //   number: "1",
  //   color: "bg-gradient-to-b from-cyan-400 to-blue-500",
  //   image: Ananya,
  // },

  {
    name: "RAJEEV KHANNA",
    subtitle: "Technical Head",
    desc: "System architecture & engineering",
    number: "2",
    color: "bg-gradient-to-b from-green-400 to-green-600",
    image: Rajeev,
  },
  {
    name: "VIKRAM DESAI",
    subtitle: "Product Manager",
    desc: "Strategy & product vision",
    number: "4",
    color: "bg-gradient-to-b from-purple-400 to-purple-600",
    image: Vikram,
  },
  {
    name: "PRIYA MEHTA",
    subtitle: "HR Director",
    desc: "Culture fit & leadership",
    number: "3",
    color: "bg-gradient-to-b from-orange-400 to-orange-600",
    image: Priya,
  },
];

const Judges = () => {
  return (
    <div className="px-6">
      <h1 className="text-2xl font-bold mb-6 text-black">AI Judges</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {judges.map((judge, i) => (
          <div
            key={i}
            className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 
            hover:bg-white/20 transition-all duration-300 shadow-xl relative"
          >
            {/* Number */}
            {/* <div className="absolute top-3 right-4 text-slate-300 text-xl opacity-40">
              {judge.number}
            </div> */}

            {/* Avatar */}
            <div className="flex justify-center mb-4">
              <div
                className={`w-24 h-24 rounded-full ${judge.color} p-1 flex items-center justify-center`}
              >
                <img
                  src={judge.image}
                  alt={judge.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>

            {/* Name */}
            <h3 className="text-black text-lg font-semibold text-center">
              {judge.name}
            </h3>

            {/* Subtitle */}
            <p className="text-slate-800 text-center text-sm">
              {judge.subtitle}
            </p>

            {/* Description */}
            <p className="text-slate-900 text-center text-xs mt-2">
              {judge.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Judges;

