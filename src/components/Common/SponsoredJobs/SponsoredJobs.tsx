/* eslint-disable max-len */
import React from "react";
import apple from "assets/Apple.png";
import samsung from "assets/samsung2.jpg";
import hsbc from "assets/HSBC.png";
import { getUserIsSubscribe } from "api/services/localServices.service";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface JobCardProps {
  role: string;
  description: string;
  isSponsored: boolean;
  location: string;
  title: string;
}

const jobs = [
  {
    role: hsbc,
    title: "Customer Service Advisor.",
    description:
      "If you've got experience of delivering outstanding customer service; why not join our team at HSBC as a Contact Centre Customer Service Advisor.",
    isSponsored: true,
    location: "Remote",
  },
  {
    role: samsung,
    title: "Intern - Personalized AI (Advanced Research)",
    description:
      "We have a fantastic opportunity available for an Intern to join our Advanced Research Team here at Samsung Research UK.",
    isSponsored: false,
    location: "Full-Time",
  },
  {
    role: apple,
    title: "UK - Specialist",
    description:
      "Do you love how it feels to help others? The Apple Store is dedicated to delivering a customer experience that's unlike any other.",
    isSponsored: false,
    location: "Part-Time",
  },
];

const SponsoredJobs: React.FC = () => {
  return (
    <div className="grid grid-cols-12 md:bg-gray-100 md:p-8 rounded-2xl md:shadow-lg md:border-2 gap-6">
      <div className="flex items-start flex-col justify-center col-span-12 lg:col-span-6">
        <h2 className="text-4xl font-semibold mb-4 text-start">Sponsored Jobs Access</h2>
        <p className="mb-6 text-lg">
          With TheGradStory, gain access to sponsorship opportunities at 50,000+ organisations
          licensed to sponsor workers in the UK.
        </p>
      </div>

      <div className="col-span-12 lg:col-span-6">
        <div className="space-y-4 overflow-y-hidden h-96 hover:overflow-y-scroll custom-scroll md:pr-3">
          {jobs.map((job, index) => (
            <JobCard
              key={index}
              role={job.role}
              title={job.title}
              description={job.description}
              isSponsored={job.isSponsored}
              location={job.location}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SponsoredJobs;

const JobCard = ({ role, description, isSponsored, location, title }: JobCardProps) => {
  const navigate = useNavigate();
  const { isSubscribe, userId } = getUserIsSubscribe();
  const freeTrialStarted = Cookies.get("freeTrialStarted");

  const handleUserRole = () => {
    if ((isSubscribe && userId) || freeTrialStarted) {
      navigate("/dashboard/jobs-internships");
    } else if (userId && !isSubscribe) {
      navigate("/subscription");
    } else {
      navigate("/sign-up");
    }
  };

  return (
    <div
      className="bg-white p-5 rounded-2xl shadow-sm border-2 hover:shadow-lg hover:border-custom-secondary transition transform md:hover:translate-x-2 hover:translate-x"
      onClick={handleUserRole}
    >
      <div className="flex justify-between items-center mb-2 flex-wrap">
        <div className="flex items-center space-x-4 mb-2 md:mb-0">
          <div>
            <img src={role} alt="slack" width={40} />
          </div>
          <span className="font-semibold text-xs">{title}</span>
        </div>
        <div className="flex space-x-2">
          {isSponsored && (
            <span className="text-custom-dark-orange text-xs border px-2 bg-[#ffecd8] rounded-full">
              Sponsored
            </span>
          )}
          <span className="text-gray-700 text-xs border px-2 bg-slate-50 rounded-full">
            {location}
          </span>
        </div>
      </div>

      <span className="text-gray-600 text-xs">{description}</span>
    </div>
  );
};
