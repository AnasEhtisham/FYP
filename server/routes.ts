import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertJobSchema, insertProposalSchema, insertSkillSchema, insertExperienceSchema, insertEducationSchema, insertPortfolioItemSchema, insertServiceSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api
  
  // Authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      // Check if email already exists
      const existingEmail = await storage.getUserByEmail(userData.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }
      
      const newUser = await storage.createUser(userData);
      
      // Don't return password in response
      const { password, ...userWithoutPassword } = newUser;
      
      res.status(201).json({ user: userWithoutPassword });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      res.status(500).json({ message: "Failed to register user" });
    }
  });
  
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Don't return password in response
      const { password: userPassword, ...userWithoutPassword } = user;
      
      res.status(200).json({ user: userWithoutPassword });
    } catch (error) {
      res.status(500).json({ message: "Failed to login" });
    }
  });
  
  // User profile routes
  app.get("/api/users/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't return password in response
      const { password, ...userWithoutPassword } = user;
      
      res.status(200).json({ user: userWithoutPassword });
    } catch (error) {
      res.status(500).json({ message: "Failed to get user" });
    }
  });
  
  app.put("/api/users/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const updatedUserData = req.body;
      const updatedUser = await storage.updateUser(userId, updatedUserData);
      
      // Don't return password in response
      const { password, ...userWithoutPassword } = updatedUser;
      
      res.status(200).json({ user: userWithoutPassword });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      res.status(500).json({ message: "Failed to update user" });
    }
  });
  
  // Skills routes
  app.post("/api/skills", async (req, res) => {
    try {
      const skillData = insertSkillSchema.parse(req.body);
      const newSkill = await storage.createSkill(skillData);
      
      res.status(201).json({ skill: newSkill });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      res.status(500).json({ message: "Failed to create skill" });
    }
  });
  
  app.get("/api/skills", async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const { skills, total } = await storage.getAllSkills(page, limit);
      
      res.status(200).json({ skills, total });
    } catch (error) {
      res.status(500).json({ message: "Failed to get skills" });
    }
  });
  
  // User skills routes
  app.post("/api/users/:id/skills", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const { skillId } = req.body;
      
      if (!skillId) {
        return res.status(400).json({ message: "Skill ID is required" });
      }
      
      await storage.addUserSkill(userId, skillId);
      
      res.status(201).json({ message: "Skill added to user" });
    } catch (error) {
      res.status(500).json({ message: "Failed to add skill to user" });
    }
  });
  
  app.get("/api/users/:id/skills", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const skills = await storage.getUserSkills(userId);
      
      res.status(200).json({ skills });
    } catch (error) {
      res.status(500).json({ message: "Failed to get user skills" });
    }
  });
  
  // Experience routes
  app.post("/api/users/:id/experiences", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const experienceData = insertExperienceSchema.parse({
        ...req.body,
        userId
      });
      
      const newExperience = await storage.createExperience(experienceData);
      
      res.status(201).json({ experience: newExperience });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      res.status(500).json({ message: "Failed to create experience" });
    }
  });
  
  app.get("/api/users/:id/experiences", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const experiences = await storage.getUserExperiences(userId);
      
      res.status(200).json({ experiences });
    } catch (error) {
      res.status(500).json({ message: "Failed to get user experiences" });
    }
  });
  
  // Education routes
  app.post("/api/users/:id/education", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const educationData = insertEducationSchema.parse({
        ...req.body,
        userId
      });
      
      const newEducation = await storage.createEducation(educationData);
      
      res.status(201).json({ education: newEducation });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      res.status(500).json({ message: "Failed to create education" });
    }
  });
  
  app.get("/api/users/:id/education", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const educationItems = await storage.getUserEducation(userId);
      
      res.status(200).json({ education: educationItems });
    } catch (error) {
      res.status(500).json({ message: "Failed to get user education" });
    }
  });
  
  // Portfolio routes
  app.post("/api/users/:id/portfolio", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const portfolioData = insertPortfolioItemSchema.parse({
        ...req.body,
        userId
      });
      
      const newPortfolioItem = await storage.createPortfolioItem(portfolioData);
      
      res.status(201).json({ portfolioItem: newPortfolioItem });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      res.status(500).json({ message: "Failed to create portfolio item" });
    }
  });
  
  app.get("/api/users/:id/portfolio", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const portfolioItems = await storage.getUserPortfolio(userId);
      
      res.status(200).json({ portfolio: portfolioItems });
    } catch (error) {
      res.status(500).json({ message: "Failed to get user portfolio" });
    }
  });
  
  // Services routes
  app.post("/api/users/:id/services", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const serviceData = insertServiceSchema.parse({
        ...req.body,
        userId
      });
      
      const newService = await storage.createService(serviceData);
      
      res.status(201).json({ service: newService });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      res.status(500).json({ message: "Failed to create service" });
    }
  });
  
  app.get("/api/users/:id/services", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const services = await storage.getUserServices(userId);
      
      res.status(200).json({ services });
    } catch (error) {
      res.status(500).json({ message: "Failed to get user services" });
    }
  });
  
  // Jobs routes
  app.post("/api/jobs", async (req, res) => {
    try {
      const jobData = insertJobSchema.parse(req.body);
      const newJob = await storage.createJob(jobData);
      
      res.status(201).json({ job: newJob });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      res.status(500).json({ message: "Failed to create job" });
    }
  });
  
  app.get("/api/jobs", async (req, res) => {
    try {
      const jobs = await storage.getAllJobs();
      
      res.status(200).json({ jobs });
    } catch (error) {
      res.status(500).json({ message: "Failed to get jobs" });
    }
  });
  
  app.get("/api/jobs/:id", async (req, res) => {
    try {
      const jobId = parseInt(req.params.id);
      
      if (isNaN(jobId)) {
        return res.status(400).json({ message: "Invalid job ID" });
      }
      
      const job = await storage.getJob(jobId);
      
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      
      res.status(200).json({ job });
    } catch (error) {
      res.status(500).json({ message: "Failed to get job" });
    }
  });
  
  // Proposal routes
  app.post("/api/proposals", async (req, res) => {
    try {
      const proposalData = insertProposalSchema.parse(req.body);
      const newProposal = await storage.createProposal(proposalData);
      
      res.status(201).json({ proposal: newProposal });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      res.status(500).json({ message: "Failed to create proposal" });
    }
  });
  
  app.get("/api/users/:id/proposals", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const proposals = await storage.getUserProposals(userId);
      
      res.status(200).json({ proposals });
    } catch (error) {
      res.status(500).json({ message: "Failed to get user proposals" });
    }
  });
  
  // Generate proposal with AI (mock implementation)
  app.post("/api/generate-proposal", async (req, res) => {
    try {
      const { jobDescription, userId } = req.body;
      
      if (!jobDescription) {
        return res.status(400).json({ message: "Job description is required" });
      }
      
      // In a real implementation, this would call an AI service
      const generatedProposal = `
Dear Hiring Manager,

I am excited to apply for the ${jobDescription.substring(0, 20)}... position. With my experience in web development and focus on creating clean, efficient code and intuitive user experiences, I believe I would be a great fit for this role.

My key skills include:
- React.js and modern JavaScript frameworks
- Responsive design implementation
- RESTful API integration
- Clean, maintainable code practices

I have successfully completed similar projects, delivering high-quality solutions on time and within budget. I am particularly interested in this project because it aligns with my expertise in ${jobDescription.includes('React') ? 'React development' : 'web development'}.

I am available to start immediately and can dedicate 30+ hours per week to your project. I look forward to discussing how I can contribute to your team's success.

Best regards,
Anas Ehtisham
      `;
      
      res.status(200).json({ 
        proposal: generatedProposal.trim(),
        message: "Proposal generated successfully" 
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to generate proposal" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
