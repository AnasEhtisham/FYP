import { 
  users, 
  type User, 
  type InsertUser, 
  skills, 
  type Skill, 
  type InsertSkill,
  userSkills,
  type UserSkill,
  experiences,
  type Experience,
  type InsertExperience,
  education,
  type Education,
  type InsertEducation,
  portfolioItems,
  type PortfolioItem,
  type InsertPortfolioItem,
  services,
  type Service,
  type InsertService,
  jobs,
  type Job,
  type InsertJob,
  proposals,
  type Proposal,
  type InsertProposal
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<User>): Promise<User>;
  
  // Skills operations
  getAllSkills(page: number, limit: number): Promise<{ skills: Skill[]; total: number }>;
  getSkill(id: number): Promise<Skill | undefined>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  
  // User Skills operations
  getUserSkills(userId: number): Promise<Skill[]>;
  addUserSkill(userId: number, skillId: number): Promise<void>;
  removeUserSkill(userId: number, skillId: number): Promise<void>;
  
  // Experience operations
  getUserExperiences(userId: number): Promise<Experience[]>;
  createExperience(experience: InsertExperience): Promise<Experience>;
  updateExperience(id: number, experienceData: Partial<Experience>): Promise<Experience>;
  deleteExperience(id: number): Promise<void>;
  
  // Education operations
  getUserEducation(userId: number): Promise<Education[]>;
  createEducation(education: InsertEducation): Promise<Education>;
  updateEducation(id: number, educationData: Partial<Education>): Promise<Education>;
  deleteEducation(id: number): Promise<void>;
  
  // Portfolio operations
  getUserPortfolio(userId: number): Promise<PortfolioItem[]>;
  createPortfolioItem(portfolioItem: InsertPortfolioItem): Promise<PortfolioItem>;
  updatePortfolioItem(id: number, portfolioItemData: Partial<PortfolioItem>): Promise<PortfolioItem>;
  deletePortfolioItem(id: number): Promise<void>;
  
  // Services operations
  getUserServices(userId: number): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, serviceData: Partial<Service>): Promise<Service>;
  deleteService(id: number): Promise<void>;
  
  // Jobs operations
  getAllJobs(): Promise<Job[]>;
  getJob(id: number): Promise<Job | undefined>;
  createJob(job: InsertJob): Promise<Job>;
  
  // Proposals operations
  getUserProposals(userId: number): Promise<Proposal[]>;
  createProposal(proposal: InsertProposal): Promise<Proposal>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private skills: Map<number, Skill>;
  private userSkills: Map<number, UserSkill>;
  private experiences: Map<number, Experience>;
  private educationItems: Map<number, Education>;
  private portfolioItems: Map<number, PortfolioItem>;
  private services: Map<number, Service>;
  private jobs: Map<number, Job>;
  private proposals: Map<number, Proposal>;
  
  private userIdCounter: number;
  private skillIdCounter: number;
  private userSkillIdCounter: number;
  private experienceIdCounter: number;
  private educationIdCounter: number;
  private portfolioIdCounter: number;
  private serviceIdCounter: number;
  private jobIdCounter: number;
  private proposalIdCounter: number;

  constructor() {
    this.users = new Map();
    this.skills = new Map();
    this.userSkills = new Map();
    this.experiences = new Map();
    this.educationItems = new Map();
    this.portfolioItems = new Map();
    this.services = new Map();
    this.jobs = new Map();
    this.proposals = new Map();
    
    this.userIdCounter = 1;
    this.skillIdCounter = 1;
    this.userSkillIdCounter = 1;
    this.experienceIdCounter = 1;
    this.educationIdCounter = 1;
    this.portfolioIdCounter = 1;
    this.serviceIdCounter = 1;
    this.jobIdCounter = 1;
    this.proposalIdCounter = 1;
    
    // Seed some initial data
    this.seedInitialData();
  }
  
  private seedInitialData() {
    // Add sample user
    const sampleUser: InsertUser = {
      username: "anasehtisham",
      password: "password123",
      email: "anas.ehtisham@example.com",
      firstName: "Anas",
      lastName: "Ehtisham",
      professionalTitle: "Web Developer",
      bio: "I am a web developer with experience in building responsive websites and web applications using modern JavaScript frameworks like React. I focus on creating clean, efficient code and intuitive user experiences.",
      country: "Pakistan",
      city: "Islamabad",
      avatarUrl: null,
    };
    this.createUser(sampleUser);
    
    // Add sample skills
    const skillNames = ["React", "JavaScript", "HTML/CSS", "Node.js", "Redux", "TypeScript", "Responsive Design", "API Integration"];
    skillNames.forEach(name => {
      this.createSkill({ name });
    });
    
    // Add skills to user
    [1, 2, 3, 7].forEach(skillId => {
      this.addUserSkill(1, skillId);
    });
    
    // Add sample experiences
    const sampleExperiences: InsertExperience[] = [
      {
        userId: 1,
        title: "Web Developer",
        company: "TechSolutions Inc.",
        startDate: new Date("2023-01-01"),
        endDate: null,
        currentlyWorking: true,
        description: "Developed and maintained responsive web applications using React, Redux, and modern JavaScript. Collaborated with UI/UX designers to implement pixel-perfect interfaces and optimize performance."
      },
      {
        userId: 1,
        title: "Junior Developer",
        company: "WebCraft Agency",
        startDate: new Date("2022-06-01"),
        endDate: new Date("2022-12-31"),
        currentlyWorking: false,
        description: "Assisted senior developers in building client websites. Implemented responsive layouts using HTML, CSS, and JavaScript. Learned React fundamentals and basic state management."
      }
    ];
    sampleExperiences.forEach(exp => {
      this.createExperience(exp);
    });
    
    // Add sample education
    const sampleEducation: InsertEducation = {
      userId: 1,
      degree: "Bachelor of Science in Computer Science",
      institution: "Riphah International University",
      startYear: 2019,
      endYear: 2023,
      currentlyStudying: false
    };
    this.createEducation(sampleEducation);
    
    // Add sample portfolio items
    const samplePortfolioItems: InsertPortfolioItem[] = [
      {
        userId: 1,
        title: "E-commerce Platform",
        description: "A fully responsive e-commerce site built with React, Redux, and Stripe integration.",
        imageUrl: "https://images.unsplash.com/photo-1541873676-a18131494184",
        projectUrl: "https://example.com/project1",
        skills: ["React", "Redux", "Stripe"]
      },
      {
        userId: 1,
        title: "Task Management App",
        description: "A drag-and-drop task management application with user authentication and real-time updates.",
        imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692",
        projectUrl: "https://example.com/project2",
        skills: ["React", "Firebase", "DnD"]
      }
    ];
    samplePortfolioItems.forEach(item => {
      this.createPortfolioItem(item);
    });
    
    // Add sample services
    const sampleServices: InsertService[] = [
      {
        userId: 1,
        title: "Web Application Development",
        description: "Full-stack web application development using React and Node.js",
        hourlyRate: 40
      },
      {
        userId: 1,
        title: "Frontend Development",
        description: "Building responsive user interfaces with React, HTML5, and CSS3",
        hourlyRate: 35
      },
      {
        userId: 1,
        title: "API Development",
        description: "Creating RESTful APIs using Node.js, Express, and MongoDB",
        hourlyRate: 38
      }
    ];
    sampleServices.forEach(service => {
      this.createService(service);
    });
    
    // Add sample jobs
    const sampleJobs: InsertJob[] = [
      {
        title: "React Developer for E-commerce Platform",
        description: "Looking for an experienced React developer to help build our e-commerce platform. Strong knowledge of React, Redux, and responsive design required. The ideal candidate will have experience with payment gateway integration and building shopping cart functionality.",
        payRate: "$30-40/hr",
        duration: "3-6 months",
        location: "Remote",
        skills: ["React", "Redux", "E-commerce", "JavaScript", "REST API"],
        postedDate: new Date(),
        companyName: "E-Shop Inc."
      },
      {
        title: "Full Stack Developer with Python Experience",
        description: "We need a full-stack developer who can work with React on the frontend and Python on the backend for our data analytics dashboard. The project involves creating data visualizations, implementing user authentication, and building a RESTful API.",
        payRate: "$25-35/hr",
        duration: "1-3 months",
        location: "Remote",
        skills: ["React", "Python", "Django", "RESTful API", "Data Visualization"],
        postedDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        companyName: "DataViz Analytics"
      },
      {
        title: "Frontend Developer for SaaS Application",
        description: "Looking for a frontend developer to help build our SaaS dashboard. Experience with React, Tailwind CSS, and responsive design is required. Knowledge of chart libraries and data visualization is a plus.",
        payRate: "$20-30/hr",
        duration: "2-4 months",
        location: "Remote",
        skills: ["React", "Tailwind CSS", "JavaScript", "UI/UX", "SaaS"],
        postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        companyName: "SaaS Solutions Ltd."
      }
    ];
    sampleJobs.forEach(job => {
      this.createJob(job);
    });
    
    // Add sample proposals
    const sampleProposals: InsertProposal[] = [
      {
        userId: 1,
        jobId: 1,
        content: "I am excited to apply for this position. With my experience in React and e-commerce platforms, I would be a great fit...",
        generatedDate: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
      },
      {
        userId: 1,
        jobId: 2,
        content: "I would like to express my interest in this full-stack developer position. My skills in React and my experience with backend development make me well-suited...",
        generatedDate: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
      }
    ];
    sampleProposals.forEach(proposal => {
      this.createProposal(proposal);
    });
  }
  
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date();
    const user: User = { 
      ...insertUser,
      id,
      professionalTitle: insertUser.professionalTitle ?? null,
      bio: insertUser.bio ?? null,
      country: insertUser.country ?? null,
      city: insertUser.city ?? null,
      avatarUrl: insertUser.avatarUrl ?? null,
      createdAt: now,
      updatedAt: now
    };
    this.users.set(id, user);
    return user;
  }
  
  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    const user = await this.getUser(id);
    if (!user) {
      throw new Error("User not found");
    }
    
    const updatedUser: User = {
      ...user,
      ...userData,
      id, // Ensure id doesn't change
      updatedAt: new Date()
    };
    
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  // Skills operations
  async getAllSkills(page: number, limit: number): Promise<{ skills: Skill[]; total: number }> {
    const allSkills = Array.from(this.skills.values());
    const start = (page - 1) * limit;
    const end = start + limit;
    
    return {
      skills: allSkills.slice(start, end),
      total: allSkills.length
    };
  }
  
  async getSkill(id: number): Promise<Skill | undefined> {
    return this.skills.get(id);
  }
  
  async createSkill(skill: InsertSkill): Promise<Skill> {
    const id = this.skillIdCounter++;
    const newSkill: Skill = { ...skill, id };
    this.skills.set(id, newSkill);
    return newSkill;
  }
  
  // User Skills operations
  async getUserSkills(userId: number): Promise<Skill[]> {
    const userSkillEntries = Array.from(this.userSkills.values()).filter(
      (userSkill) => userSkill.userId === userId
    );
    
    const skills: Skill[] = [];
    for (const userSkill of userSkillEntries) {
      const skill = await this.getSkill(userSkill.skillId);
      if (skill) {
        skills.push(skill);
      }
    }
    
    return skills;
  }
  
  async addUserSkill(userId: number, skillId: number): Promise<void> {
    const user = await this.getUser(userId);
    const skill = await this.getSkill(skillId);
    
    if (!user || !skill) {
      throw new Error("User or skill not found");
    }
    
    // Check if the user already has this skill
    const existingUserSkill = Array.from(this.userSkills.values()).find(
      (userSkill) => userSkill.userId === userId && userSkill.skillId === skillId
    );
    
    if (existingUserSkill) {
      return; // User already has this skill
    }
    
    const id = this.userSkillIdCounter++;
    const userSkill: UserSkill = { id, userId, skillId };
    this.userSkills.set(id, userSkill);
  }
  
  async removeUserSkill(userId: number, skillId: number): Promise<void> {
    const userSkillEntry = Array.from(this.userSkills.entries()).find(
      ([_, userSkill]) => userSkill.userId === userId && userSkill.skillId === skillId
    );
    
    if (userSkillEntry) {
      this.userSkills.delete(userSkillEntry[0]);
    }
  }
  
  // Experience operations
  async getUserExperiences(userId: number): Promise<Experience[]> {
    return Array.from(this.experiences.values())
      .filter((experience) => experience.userId === userId)
      .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  }
  
  async createExperience(experience: InsertExperience): Promise<Experience> {
    const id = this.experienceIdCounter++;
    const newExperience: Experience = { 
      ...experience, 
      id,
      description: experience.description ?? null,
      endDate: experience.endDate ?? null,
      currentlyWorking: experience.currentlyWorking ?? null
    };
    this.experiences.set(id, newExperience);
    return newExperience;
  }
  
  async updateExperience(id: number, experienceData: Partial<Experience>): Promise<Experience> {
    const experience = this.experiences.get(id);
    if (!experience) {
      throw new Error("Experience not found");
    }
    
    const updatedExperience: Experience = { ...experience, ...experienceData, id };
    this.experiences.set(id, updatedExperience);
    return updatedExperience;
  }
  
  async deleteExperience(id: number): Promise<void> {
    this.experiences.delete(id);
  }
  
  // Education operations
  async getUserEducation(userId: number): Promise<Education[]> {
    return Array.from(this.educationItems.values())
      .filter((education) => education.userId === userId)
      .sort((a, b) => (b.endYear || 9999) - (a.endYear || 9999));
  }
  
  async createEducation(education: InsertEducation): Promise<Education> {
    const id = this.educationIdCounter++;
    const newEducation: Education = { 
      ...education, 
      id,
      endYear: education.endYear ?? null,
      currentlyStudying: education.currentlyStudying ?? null
    };
    this.educationItems.set(id, newEducation);
    return newEducation;
  }
  
  async updateEducation(id: number, educationData: Partial<Education>): Promise<Education> {
    const education = this.educationItems.get(id);
    if (!education) {
      throw new Error("Education not found");
    }
    
    const updatedEducation: Education = { ...education, ...educationData, id };
    this.educationItems.set(id, updatedEducation);
    return updatedEducation;
  }
  
  async deleteEducation(id: number): Promise<void> {
    this.educationItems.delete(id);
  }
  
  // Portfolio operations
  async getUserPortfolio(userId: number): Promise<PortfolioItem[]> {
    return Array.from(this.portfolioItems.values())
      .filter((item) => item.userId === userId);
  }
  
  async createPortfolioItem(portfolioItem: InsertPortfolioItem): Promise<PortfolioItem> {
    const id = this.portfolioIdCounter++;
    const newPortfolioItem: PortfolioItem = { 
      ...portfolioItem, 
      id,
      skills: portfolioItem.skills ?? null,
      description: portfolioItem.description ?? null,
      imageUrl: portfolioItem.imageUrl ?? null,
      projectUrl: portfolioItem.projectUrl ?? null
    };
    this.portfolioItems.set(id, newPortfolioItem);
    return newPortfolioItem;
  }
  
  async updatePortfolioItem(id: number, portfolioItemData: Partial<PortfolioItem>): Promise<PortfolioItem> {
    const portfolioItem = this.portfolioItems.get(id);
    if (!portfolioItem) {
      throw new Error("Portfolio item not found");
    }
    
    const updatedPortfolioItem: PortfolioItem = { ...portfolioItem, ...portfolioItemData, id };
    this.portfolioItems.set(id, updatedPortfolioItem);
    return updatedPortfolioItem;
  }
  
  async deletePortfolioItem(id: number): Promise<void> {
    this.portfolioItems.delete(id);
  }
  
  // Services operations
  async getUserServices(userId: number): Promise<Service[]> {
    return Array.from(this.services.values())
      .filter((service) => service.userId === userId);
  }
  
  async createService(service: InsertService): Promise<Service> {
    const id = this.serviceIdCounter++;
    const newService: Service = { 
      ...service, 
      id,
      description: service.description ?? null
    };
    this.services.set(id, newService);
    return newService;
  }
  
  async updateService(id: number, serviceData: Partial<Service>): Promise<Service> {
    const service = this.services.get(id);
    if (!service) {
      throw new Error("Service not found");
    }
    
    const updatedService: Service = { ...service, ...serviceData, id };
    this.services.set(id, updatedService);
    return updatedService;
  }
  
  async deleteService(id: number): Promise<void> {
    this.services.delete(id);
  }
  
  // Jobs operations
  async getAllJobs(): Promise<Job[]> {
    return Array.from(this.jobs.values())
      .sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
  }
  
  async getJob(id: number): Promise<Job | undefined> {
    return this.jobs.get(id);
  }
  
  async createJob(job: InsertJob): Promise<Job> {
    const id = this.jobIdCounter++;
    const newJob: Job = { 
      ...job, 
      id,
      skills: job.skills ?? null,
      duration: job.duration ?? null,
      location: job.location ?? null,
      postedDate: job.postedDate ?? new Date(),
      companyName: job.companyName ?? null
    };
    this.jobs.set(id, newJob);
    return newJob;
  }
  
  // Proposals operations
  async getUserProposals(userId: number): Promise<Proposal[]> {
    return Array.from(this.proposals.values())
      .filter((proposal) => proposal.userId === userId)
      .sort((a, b) => new Date(b.generatedDate).getTime() - new Date(a.generatedDate).getTime());
  }
  
  async createProposal(proposal: InsertProposal): Promise<Proposal> {
    const id = this.proposalIdCounter++;
    const newProposal: Proposal = { 
      ...proposal, 
      id,
      generatedDate: proposal.generatedDate ?? new Date()
    };
    this.proposals.set(id, newProposal);
    return newProposal;
  }

  // Add delete operations
  async deleteSkill(id: number): Promise<void> {
    this.skills.delete(id);
  }

  async deleteUserSkill(userId: number, skillId: number): Promise<void> {
    const userSkillEntry = Array.from(this.userSkills.entries()).find(
      ([_, userSkill]) => userSkill.userId === userId && userSkill.skillId === skillId
    );
    
    if (userSkillEntry) {
      this.userSkills.delete(userSkillEntry[0]);
    }
  }

  async deleteJob(id: number): Promise<void> {
    this.jobs.delete(id);
  }

  async deleteProposal(id: number): Promise<void> {
    this.proposals.delete(id);
  }
}

export const storage = new MemStorage();
