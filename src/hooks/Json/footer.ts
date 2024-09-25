export interface FooterData {
  name: string;
  link: string;
  target?: string;
}

export interface FooterSections {
  [key: string]: FooterData[];
}

export const footerData: FooterSections = {
  company: [{ name: "About us", link: "/our-story" }],
  resources: [{ name: "Blog", link: "/blog" }],
  social: [
    { name: "Twitter", link: "https://x.com/TheGradStory", target: "_blank" },
    { name: "Linkedin", link: "https://www.linkedin.com/company/thegradstory/", target: "_blank" },
    { name: "Facebook", link: "https://www.facebook.com/thegradstoryofficial", target: "_blank" },
    {
      name: "Instagram",
      link: "https://www.instagram.com/thegradstoryofficial/",
      target: "_blank",
    },
  ],
  legal: [
    { name: "Privacy Policy", link: "/privacy-policy" },
    { name: "Terms and Conditions", link: "/terms-and-conditions" },
  ],
};
