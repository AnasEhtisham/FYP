import { useState } from "react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  DollarSign, 
  Clock, 
  Calendar, 
  MapPin, 
  Save, 
  LayoutGrid, 
  List, 
  Building,
  ArrowLeft, 
  ArrowRight 
} from "lucide-react";

// Mock data
const mockJobs = [
  {
    id: 1,
    title: "React Developer for E-commerce Platform",
    payRate: "$30-40/hr",
    duration: "3-6 months",
    location: "Remote",
    postedTime: "2 hours ago",
    description:
      "Looking for an experienced React developer to help build our e-commerce platform. Strong knowledge of React, Redux, and responsive design required. The ideal candidate will have experience with payment gateway integration and building shopping cart functionality.",
    skills: ["React", "Redux", "E-commerce", "JavaScript", "REST API"],
    match: 95,
  },
  {
    id: 2,
    title: "Full Stack Developer with Python Experience",
    payRate: "$25-35/hr",
    duration: "1-3 months",
    location: "Remote",
    postedTime: "1 day ago",
    description:
      "We need a full-stack developer who can work with React on the frontend and Python on the backend for our data analytics dashboard. The project involves creating data visualizations, implementing user authentication, and building a RESTful API.",
    skills: ["React", "Python", "Django", "RESTful API", "Data Visualization"],
    match: 85,
  },
  {
    id: 3,
    title: "Frontend Developer for SaaS Application",
    payRate: "$20-30/hr",
    duration: "2-4 months",
    location: "Remote",
    postedTime: "2 days ago",
    description:
      "Looking for a frontend developer to help build our SaaS dashboard. Experience with React, Tailwind CSS, and responsive design is required. Knowledge of chart libraries and data visualization is a plus.",
    skills: ["React", "Tailwind CSS", "JavaScript", "UI/UX", "SaaS"],
    match: 80,
  },
];

export default function JobListings() {
  const [viewType, setViewType] = useState<"list" | "grid">("list");

  return (
    <div>
      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Browse Jobs</h2>

            <div className="relative w-full md:w-auto md:min-w-[300px]">
              <Input
                type="text"
                placeholder="Search jobs..."
                className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="category" className="mb-1">Category</Label>
              <Select defaultValue="web">
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web">Web Development</SelectItem>
                  <SelectItem value="mobile">Mobile Development</SelectItem>
                  <SelectItem value="ui">UI/UX Design</SelectItem>
                  <SelectItem value="data">Data Science</SelectItem>
                  <SelectItem value="all">All Categories</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="skill" className="mb-1">Skill</Label>
              <Select defaultValue="react">
                <SelectTrigger id="skill">
                  <SelectValue placeholder="Select skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="node">Node.js</SelectItem>
                  <SelectItem value="all">All Skills</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="payRate" className="mb-1">Pay Rate</Label>
              <Select defaultValue="any">
                <SelectTrigger id="payRate">
                  <SelectValue placeholder="Select pay rate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any pay rate</SelectItem>
                  <SelectItem value="10-30">$10-30/hr</SelectItem>
                  <SelectItem value="30-50">$30-50/hr</SelectItem>
                  <SelectItem value="50-100">$50-100/hr</SelectItem>
                  <SelectItem value="100+">$100+/hr</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="sortBy" className="mb-1">Sort By</Label>
              <Select defaultValue="relevant">
                <SelectTrigger id="sortBy">
                  <SelectValue placeholder="Select sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevant">Most Relevant</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="highest">Highest Pay</SelectItem>
                  <SelectItem value="best">Best Match</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Listings */}
      <Card className="overflow-hidden">
        <CardHeader className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
          <span className="font-medium text-gray-700 dark:text-gray-300">120 jobs found</span>
          <div className="flex items-center gap-1">
            <Button
              variant={viewType === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewType("grid")}
              className="p-1.5 rounded"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewType === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewType("list")}
              className="p-1.5 rounded"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {mockJobs.map((job) => (
            <div
              key={job.id}
              className="p-6 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-800 dark:text-white">{job.title}</h3>
                    <Badge
                      variant="outline"
                      className={`${
                        job.match >= 90
                          ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
                          : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400"
                      }`}
                    >
                      {job.match}% Match
                    </Badge>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center">
                      <DollarSign className="mr-1 h-4 w-4" /> {job.payRate}
                    </span>
                    <span className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" /> {job.duration}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" /> Posted {job.postedTime}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" /> {job.location}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{job.description}</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-primary/10 text-primary border-primary/10"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="ml-4 flex-shrink-0">
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-500">
                    <Building className="h-8 w-8" />
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-white">
                  <Save className="mr-2 h-4 w-4" /> Save
                </Button>
                <Button>Apply Now</Button>
                <Button variant="ghost" className="ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Generate Proposal
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <CardFooter className="p-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between w-full">
            <Button variant="outline" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>

            <div className="hidden sm:flex items-center gap-1">
              <Button size="icon" className="w-8 h-8 bg-primary text-white rounded-full">1</Button>
              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">2</Button>
              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">3</Button>
              <span className="text-gray-500 dark:text-gray-400">...</span>
              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">8</Button>
            </div>

            <Button variant="outline" className="flex items-center">
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
