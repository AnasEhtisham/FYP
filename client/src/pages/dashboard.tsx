import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { 
  FilePlus,
  TrendingUp,
  Eye,
  Check,
  DollarSign,
  Calendar,
  MapPin,
  Clock,
  FileText,
  Edit,
  MessageSquare,
  Building
} from "lucide-react";

// Mock data for demonstration
const stats = [
  { id: 1, title: "Proposals Sent", value: 12, change: 33, icon: <FileText className="text-2xl" />, color: "primary" },
  { id: 2, title: "Profile Views", value: 154, change: 8, icon: <Eye className="text-2xl" />, color: "blue" },
  { id: 3, title: "Jobs Won", value: 5, change: 50, icon: <Check className="text-2xl" />, color: "green" },
  { id: 4, title: "Earnings", value: "$867", change: 25, icon: <DollarSign className="text-2xl" />, color: "yellow" },
];

const activities = [
  {
    id: 1,
    title: "Proposal Submitted",
    description: "You submitted a proposal for 'React Developer for E-commerce Platform'",
    time: "2 hours ago",
    icon: <FileText />,
    color: "primary",
  },
  {
    id: 2,
    title: "Profile Updated",
    description: "You updated your skills and portfolio",
    time: "Yesterday",
    icon: <Edit />,
    color: "blue",
  },
  {
    id: 3,
    title: "Message Received",
    description: "You received a message from Client A regarding your proposal",
    time: "2 days ago",
    icon: <MessageSquare />,
    color: "green",
  },
];

const nextSteps = [
  { id: 1, title: "Create your account", status: "completed" },
  { id: 2, title: "Set up your profile", status: "completed" },
  { id: 3, title: "Complete your portfolio", status: "in-progress", progress: 60 },
  { id: 4, title: "Get your first client", status: "pending" },
];

const recommendedJobs = [
  {
    id: 1,
    title: "React Developer for E-commerce Platform",
    payRate: "$30-40/hr",
    duration: "3-6 months",
    location: "Remote",
    description: "Looking for an experienced React developer to help build our e-commerce platform. Strong knowledge of React, Redux, and responsive design required.",
    skills: ["React", "Redux", "E-commerce"],
    postedTime: "2 hours ago",
    match: 95,
  },
  {
    id: 2,
    title: "Full Stack Developer with Python Experience",
    payRate: "$25-35/hr",
    duration: "1-3 months",
    location: "Remote",
    description: "We need a full-stack developer who can work with React on the frontend and Python on the backend for our data analytics dashboard.",
    skills: ["React", "Python", "API"],
    postedTime: "1 day ago",
    match: 85,
  },
];

export default function Dashboard() {
  return (
    <div>
      {/* Welcome Banner */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Welcome back, Anas!</h2>
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                Your freelance journey is 65% complete. Let's continue building your success!
              </p>
            </div>
            <Button className="whitespace-nowrap">
              <FilePlus className="mr-2 h-4 w-4" /> Create New Proposal
            </Button>
          </div>

          {/* Progress bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Profile Completion</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">65%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: "65%" }}></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat) => (
          <Card key={stat.id}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-full bg-${stat.color}/10 text-${stat.color} mr-4`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-500 font-medium flex items-center">
                  <TrendingUp className="mr-1 h-4 w-4" /> {stat.change}%
                </span>
                <span className="text-gray-500 dark:text-gray-400 ml-2">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Recent Jobs */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">Recommended Jobs</h3>
                <Button variant="link" className="text-primary hover:text-primary-dark p-0">
                  View all
                </Button>
              </div>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-gray-800">
              {recommendedJobs.map((job) => (
                <div key={job.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-white">{job.title}</h4>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center">
                          <DollarSign className="mr-1 h-4 w-4" /> {job.payRate}
                        </span>
                        <span className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" /> {job.duration}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="mr-1 h-4 w-4" /> {job.location}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                        {job.description}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="bg-primary/10 text-primary border-primary/10">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="ml-4 flex flex-col items-end">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Posted {job.postedTime}</span>
                      <Badge className={`mt-1 ${
                        job.match >= 90
                          ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
                          : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400"
                      }`}>
                        {job.match}% Match
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-white">
                      Save
                    </Button>
                    <Button>Apply Now</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Activity Card */}
          <Card className="overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">Recent Activity</h3>
            </div>
            <div className="p-6">
              <div className="relative">
                {/* Activity Timeline */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800"></div>

                <div className="space-y-6">
                  {activities.map((activity) => (
                    <div key={activity.id} className="relative pl-8">
                      <div className={`absolute left-0 top-1 h-8 w-8 rounded-full bg-${activity.color}/10 border-4 border-white dark:border-gray-900 text-${activity.color} flex items-center justify-center`}>
                        {activity.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-800 dark:text-white">{activity.title}</h4>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{activity.description}</p>
                        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Next Steps Card */}
          <Card className="overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">Next Steps</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {nextSteps.map((step) => (
                  <div key={step.id} className="flex items-start">
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                      step.status === "completed"
                        ? "bg-primary text-white"
                        : step.status === "in-progress"
                        ? "border-2 border-primary"
                        : "border-2 border-gray-300 dark:border-gray-600"
                    }`}>
                      {step.status === "completed" ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <span className={`text-xs font-medium ${
                          step.status === "in-progress" ? "text-primary" : "text-gray-500 dark:text-gray-400"
                        }`}>
                          {step.id}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{step.title}</p>
                      {step.status === "completed" && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Completed</p>
                      )}
                      {step.status === "in-progress" && (
                        <div className="flex items-center mt-1">
                          <div className="w-24 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div className="bg-primary h-full rounded-full" style={{ width: `${step.progress}%` }}></div>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{step.progress}%</span>
                        </div>
                      )}
                      {step.status === "pending" && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Pending</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Button className="mt-6 w-full">Continue Setup</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
