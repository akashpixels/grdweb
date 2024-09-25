import orangeHat from "assets/orange-hat.png";
import purplehat from "assets/purpal-hat.png";
import yellowhat from "assets/yellow-hat.png";

import cvbuilder from "assets/cveditior.svg";
import suit from "assets/Suit.svg";
import handshake from "assets/HandShake.svg";

export const cardData = [
  {
    title: "The Dreamer",
    description: "Envisioning the UK educational journey.",
    buttonText: "Start Dreaming",
    img: yellowhat,
    borderColor: "border-custom-secondary",
  },
  {
    title: "The Achiever",
    description: "Bridging academics with real-world application.",
    buttonText: "Embrace Action",
    img: purplehat,
    borderColor: "border-[#41C0BC]",
  },
  {
    title: "The Visionary",
    description: "Transforming achievements into career innovation.",
    buttonText: "Lead the Future",
    img: orangeHat,
    borderColor: "border-[#E43814]",
  },
];

export const ourServices = [
  {
    title: "Build Your CV",
    description: "Create an AI-powered CV that stands out from the crowd",
    buttonText: "Get Started",
    img: cvbuilder,
    borderColor: "border-custom-secondary",
    navigate: "/dashboard/cv-builder",
  },
  {
    title: "Find Sponsored Jobs",
    // eslint-disable-next-line max-len
    description:
      // eslint-disable-next-line max-len
      "Find full-time jobs with sponsorship opportunities, part-time jobs and internships matching your ambitions and skill set.",
    buttonText: "Start the Search",
    img: suit,
    borderColor: "border-custom-secondary",
    navigate: "/dashboard/jobs-internships",
  },
  {
    title: "Build Valuable Connections",
    description:
      // eslint-disable-next-line max-len
      "Expand your professional network and open doors to new opportunities. Check the networking events we have selected for you.",
    buttonText: "Start Networking",
    img: handshake,
    borderColor: "border-custom-secondary",
    navigate: "/dashboard/networking",
  },
];
