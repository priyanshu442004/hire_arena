import nsdcS1 from "../assets/nsdcS1.jpg"
import aicteS2 from "../assets/aicteS2.jpg"
import courseraS3 from "../assets/courseraS3.jpg"
import SkillIndiaS4 from "../assets/SkillIndiaS4.jpg"
import edtechS5 from "../assets/edtechS5.jpg"
import infosysS6 from "../assets/InfosysS6.jpg"
import microsoftS7 from "../assets/microsoftS7.jpg"

export default function LogoSlider() {
  const logos = [
    nsdcS1,
    aicteS2,
    courseraS3,
    SkillIndiaS4,
    edtechS5,
    infosysS6,
    microsoftS7,

 ];

  return (
    <div className="w-full py-10 overflow-hidden">
      <h2 className="text-center text-3xl font-semibold mb-6">Our Partners</h2>

      {/* Slider wrapper */}
      <div className="flex gap-10 animate-scroll whitespace-nowrap">
        {logos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`logo-${index}`}
            className="h-16 w-auto object-contain inline-block"
          />
        ))}

        {/* Duplicate for infinite loop effect */}
        {logos.map((logo, index) => (
          <img
           key={`dup-${index}`}
            src={logo}
            alt={`logo-duplicate-${index}`}
            className="h-16 w-auto object-contain inline-block"
          />
        ))}
      </div>
    </div>
  );
}