/* eslint-disable max-len */
import template2 from "assets/Template 22.svg";
import template4 from "assets/Template 24.svg";
import template3 from "assets/attractive.jpg";
import template1 from "assets/naturecool.jpg";

export const templates = [
  {
    id: "Elegant",
    title: "CV template 1",
    imageUrl: template2,
  },
  {
    id: "Creative",
    title: "CV template 2",
    imageUrl: template4,
  },
  {
    id: "Attractive",
    title: "CV template 3",
    imageUrl: template3,
  },
  {
    id: "NatureCool",
    title: "CV template 4",
    imageUrl: template1,
  },
];

/** Resume Template Json */

export const elegantTemplateData = {
  font: "Poppins",
  profileImage:
    "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg",
  firstName: "Rosemarie",
  lastName: "Rogi",
  jobTitle: "Web-Designer",
  email: "rosmariesotogmail.com",
  mobilePhone: "876-439-0549",
  description:
    "Graphic designer with 8+ years of experience in branding and print design. Skilled at Adobe Creative Suite (Photoshop, Illustrator, InDesign) as well as web designing and coding (HTML, CSS, JavaScript).",
  experiences: [
    {
      stillWorkHere: false,
      experienceSummary:
        "Designed user interfaces and collaborated with developers to create engaging user experiences.",
      position: "UI Designer at Market Studios",
      company: "Google India Pvt Ltd",
      startDate: "06-12-12",
      endDate: "06-12-12",
    },
    {
      stillWorkHere: false,
      experienceSummary:
        "Designed user interfaces and collaborated with developers to create engaging user experiences.",
      position: "Graphic Designer at Freelance",
      company: "Google India Pvt Ltd",
      startDate: "06-12-12",
      endDate: "06-12-12",
    },
  ],
  education: [
    {
      stillStudyingHere: false,
      educationSummary:
        "Designed user interfaces and collaborated with developers to create engaging user experiences.",
      courseName: "Bachelor of Fine Arts in Graphic Design",
      university: "Los Angeles University",
      startDate: "06-12-12",
      endDate: "06-12-12",
    },
    {
      stillStudyingHere: false,
      educationSummary:
        "Designed user interfaces and collaborated with developers to create engaging user experiences.",
      courseName: "Bachelor of Fine Arts in Graphic Design",
      university: "Los Angeles University",
      startDate: "06-12-12",
      endDate: "06-12-12",
    },
  ],
  skills: {
    industrySkills: [{ skill: "HTML/CSS" }, { skill: "Sketch App" }, { skill: "Adobe Photoshop" }],
  },
};
