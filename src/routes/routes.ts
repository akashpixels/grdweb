import React from "react";

export const AppSubRoutes = React.lazy(() => import("../routes/AppSubRoutes"));
export const AuthLayoutFallback = React.lazy(() => import("layouts/AuthLayout/AuthLayout"));
export const Logout = React.lazy(() => import("pages/Logout/Logout"));
export const DreamerPlan = React.lazy(() => import("pages/Plan/DreamerPlan"));
export const AchieverPlan = React.lazy(() => import("pages/Plan/AchieverPlan"));
export const VisionaryPlan = React.lazy(() => import("pages/Plan/VisionaryPlan"));
export const Blog = React.lazy(() => import("pages/Blog/Blog"));
export const Contact = React.lazy(() => import("pages/Contact/Contact"));
export const Home = React.lazy(() => import("pages/Home/Home"));
export const OurStory = React.lazy(() => import("pages/Ourstory/OurStory"));
export const BlogPost = React.lazy(() => import("pages/Blog/BlogPost"));
export const SignIn = React.lazy(() => import("pages/Signin/Signin"));
export const SignUp = React.lazy(() => import("pages/Signup/Signup"));
export const ForgotPassword = React.lazy(() => import("pages/Forgot/ForgotPassword"));
export const SlideNavBar = React.lazy(
  () => import("components/Main/CVBuilder/SlideNavBar/SlideNavBar")
);

export const NotFound = React.lazy(() => import("pages/404/NotFound"));
export const PrivacyPolicy = React.lazy(() => import("pages/PrivacyPolicy/PrivacyPolicy"));
export const FAQ = React.lazy(() => import("pages/FAQ/FAQ"));

export const TermCondition = React.lazy(() => import("pages/Terms&Condition/Term&Condition"));

export const OurServices = React.lazy(() => import("components/Main/OurServices/OurServices"));

export const Profile = React.lazy(() => import("pages/Profile/Profile"));

// Home Components

export const ChapterSelection = React.lazy(
  () => import("components/Main/ChapterSelection/ChapterSelection")
);
export const CourseSection = React.lazy(
  () => import("components/Main/CourseSection/CourseSection")
);
export const Fellowship = React.lazy(() => import("components/Main/Fellowship/Fellowship"));
export const GetInTouch = React.lazy(() => import("components/Main/GetInTouch/GetInTouch"));
export const GlossaryQueries = React.lazy(
  () => import("components/Main/GlossaryQueries/GlossaryQueries")
);
export const GradStories = React.lazy(() => import("components/Main/GradStories/GradStories"));
export const HomeBanner = React.lazy(() => import("components/Main/HomeBanner/HomeBanner"));
export const JourneyHistory = React.lazy(
  () => import("components/Main/JourneyHistory/JourneyHistory")
);
export const LegacySection = React.lazy(
  () => import("components/Main/LegacySection/LegacySection")
);
export const SubscriptionUpdates = React.lazy(
  () => import("components/Main/SubscriptionUpdates/SubscriptionUpdates")
);

// CV Builder
export const CVBuilder = React.lazy(() => import("pages/CV-Builder/CVBuilder"));
export const YourDetails = React.lazy(() => import("pages/CV-Builder/YourDetails/YourDetails"));
export const Education = React.lazy(() => import("pages/CV-Builder/Education/Education"));
export const SelectTemplate = React.lazy(
  () => import("pages/CV-Builder/SelectTemplate/CVTemplateSelection")
);
export const ShortBio = React.lazy(() => import("pages/CV-Builder/ShortBio/ShortBio"));
export const Skills = React.lazy(() => import("pages/CV-Builder/Skills/Skills"));
export const Experience = React.lazy(() => import("pages/CV-Builder/Experience/Experience"));
export const YourResume = React.lazy(() => import("pages/CV-Builder/YourResume/YourResume"));
export const CVList = React.lazy(() => import("pages/CV-Builder/SavedCVList/SavedCVList"));
export const GraduateProgram = React.lazy(
  () => import("pages/Jobs-Internships/Gradute-Program/GraduteProgram")
);

// CV Component
export const CVTemplateCard = React.lazy(
  () => import("components/Main/CVBuilder/CVTemplateCard/CVTemplateCard")
);
export const SummaryTextBox = React.lazy(
  () => import("components/Common/SummaryTextBox/SummaryTextBox")
);

export const ResumeTemplate = React.lazy(
  () => import("components/Common/Templates/ElegantTemplate")
);

export const AddExperience = React.lazy(
  () => import("components/Main/CVBuilder/AddExperience/AddExperience")
);

export const AddEducation = React.lazy(
  () => import("components/Main/CVBuilder/AddEducation/AddEducation")
);

export const CoverLetter = React.lazy(() => import("pages/CV-Builder/CoverLetter/CoverLetter"));

/** Counselling */
export const Counselling = React.lazy(() => import("pages/Counselling/Counselling"));
export const Networking = React.lazy(() => import("pages/Networking/Networking"));

export const BookingSection = React.lazy(
  () => import("components/Main/Counselling/BookingSection/BookingSection")
);
export const AppointmentSection = React.lazy(
  () => import("components/Main/Counselling/AppointmentSection/AppointmentSection")
);

// Job and Internships Component
export const JobsInternships = React.lazy(() => import("pages/Jobs-Internships/JobsInternships"));
export const AllJob = React.lazy(() => import("pages/Jobs-Internships/AllJob/AllJob"));
export const SavedJob = React.lazy(() => import("pages/Jobs-Internships/SavedJob/SavedJob"));
export const AppliedJob = React.lazy(() => import("pages/Jobs-Internships/AppliedJob/AppliedJob"));

/** Events */
export const UpcomingEvents = React.lazy(
  () => import("components/Main/Networking/Events/UpcomingEvents")
);
export const SavedEvents = React.lazy(
  () => import("components/Main/Networking/Events/SavedEvents")
);

export const MyBooking = React.lazy(() => import("components/Main/Networking/Events/MyBookings"));

export const ProfileOverview = React.lazy(() => import("pages/Profile/ProfileOverview"));
export const PersonalInformation = React.lazy(() => import("pages/Profile/PersonalInformation"));
export const CVResume = React.lazy(() => import("pages/Profile/CVResume"));
export const ProfileSkills = React.lazy(() => import("pages/Profile/Skills"));
export const AccountSettings = React.lazy(() => import("pages/Profile/AccountSettings"));

export const CreateCoverLetter = React.lazy(() => import("pages/Cover-letter/CoverLetter"));
