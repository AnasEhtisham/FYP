import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  professionalTitle: text("professional_title"),
  bio: text("bio"),
  country: text("country"),
  city: text("city"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Skills table
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

// UserSkills - junction table for many-to-many relationship
export const userSkills = pgTable("user_skills", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  skillId: integer("skill_id").notNull().references(() => skills.id),
});

// Experience table
export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  company: text("company").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  currentlyWorking: boolean("currently_working").default(false),
  description: text("description"),
});

// Education table
export const education = pgTable("education", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  degree: text("degree").notNull(),
  institution: text("institution").notNull(),
  startYear: integer("start_year").notNull(),
  endYear: integer("end_year"),
  currentlyStudying: boolean("currently_studying").default(false),
});

// Portfolio table
export const portfolioItems = pgTable("portfolio_items", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  projectUrl: text("project_url"),
  skills: text("skills").array(),
});

// Services table
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  description: text("description"),
  hourlyRate: integer("hourly_rate").notNull(),
});

// Jobs table
export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  payRate: text("pay_rate").notNull(),
  duration: text("duration"),
  location: text("location"),
  skills: text("skills").array(),
  postedDate: timestamp("posted_date").defaultNow().notNull(),
  companyName: text("company_name"),
});

// Proposals table
export const proposals = pgTable("proposals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  jobId: integer("job_id").notNull().references(() => jobs.id),
  content: text("content").notNull(),
  generatedDate: timestamp("generated_date").defaultNow().notNull(),
});

// Create Zod schemas for insertion
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  firstName: true,
  lastName: true,
  professionalTitle: true,
  bio: true,
  country: true,
  city: true,
  avatarUrl: true,
});

export const insertSkillSchema = createInsertSchema(skills);
export const insertUserSkillSchema = createInsertSchema(userSkills);
export const insertExperienceSchema = createInsertSchema(experiences);
export const insertEducationSchema = createInsertSchema(education);
export const insertPortfolioItemSchema = createInsertSchema(portfolioItems);
export const insertServiceSchema = createInsertSchema(services);
export const insertJobSchema = createInsertSchema(jobs);
export const insertProposalSchema = createInsertSchema(proposals);

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Skill = typeof skills.$inferSelect;
export type InsertSkill = z.infer<typeof insertSkillSchema>;

export type UserSkill = typeof userSkills.$inferSelect;
export type InsertUserSkill = z.infer<typeof insertUserSkillSchema>;

export type Experience = typeof experiences.$inferSelect;
export type InsertExperience = z.infer<typeof insertExperienceSchema>;

export type Education = typeof education.$inferSelect;
export type InsertEducation = z.infer<typeof insertEducationSchema>;

export type PortfolioItem = typeof portfolioItems.$inferSelect;
export type InsertPortfolioItem = z.infer<typeof insertPortfolioItemSchema>;

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;

export type Job = typeof jobs.$inferSelect;
export type InsertJob = z.infer<typeof insertJobSchema>;

export type Proposal = typeof proposals.$inferSelect;
export type InsertProposal = z.infer<typeof insertProposalSchema>;
