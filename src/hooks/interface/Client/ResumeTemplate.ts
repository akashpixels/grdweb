interface Contact {
  address: string;
  email: string;
  phone: string;
}

interface Education {
  institution: string;
  degree: string;
  gpa?: string;
  years: string;
}

interface Employment {
  position: string;
  years: string;
  description: string;
}

interface Skill {
  name: string;
  level: string;
}

interface Skills {
  technical: Skill[];
  other?: Skill[];
  soft?: Skill[];
}

export interface Resume {
  name: string;
  title: string;
  contact: Contact;
  profile: string;
  education: Education[];
  employment: Employment[];
  skills: Skills;
}
