import { Card,CardContent,CardDescription,CardHeader,CardTitle,} from "@/components/ui/card";
import { BarChart,Bar,LineChart, Line,PieChart,Pie, XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer,Cell,} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Chart data
const earningsData = [
  { month: "Jan", amount: 350 },
  { month: "Feb", amount: 400 },
  { month: "Mar", amount: 550 },
  { month: "Apr", amount: 450 },
  { month: "May", amount: 600 },
  { month: "Jun", amount: 700 },
  { month: "Jul", amount: 850 },
  { month: "Aug", amount: 900 },
  { month: "Sep", amount: 950 },
  { month: "Oct", amount: 1050 },
  { month: "Nov", amount: 1100 },
  { month: "Dec", amount: 867 },
];

const proposalData = [
  { month: "Jan", sent: 8, accepted: 2 },
  { month: "Feb", sent: 10, accepted: 3 },
  { month: "Mar", sent: 12, accepted: 4 },
  { month: "Apr", sent: 9, accepted: 2 },
  { month: "May", sent: 11, accepted: 3 },
  { month: "Jun", sent: 13, accepted: 5 },
  { month: "Jul", sent: 15, accepted: 6 },
  { month: "Aug", sent: 14, accepted: 5 },
  { month: "Sep", sent: 16, accepted: 6 },
  { month: "Oct", sent: 18, accepted: 7 },
  { month: "Nov", sent: 20, accepted: 8 },
  { month: "Dec", sent: 12, accepted: 5 },
];

const jobSourceData = [
  { name: "Direct Search", value: 45 },
  { name: "Client Invitations", value: 25 },
  { name: "Recommended", value: 20 },
  { name: "Other", value: 10 },
];

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)"];

const skillsData = [
  { skill: "React", value: 35 },
  { skill: "JavaScript", value: 30 },
  { skill: "HTML/CSS", value: 18 },
  { skill: "Node.js", value: 10 },
  { skill: "Redux", value: 7 },
];

const activityData = [
  { day: "Mon", proposals: 2, views: 12 },
  { day: "Tue", proposals: 3, views: 15 },
  { day: "Wed", proposals: 1, views: 10 },
  { day: "Thu", proposals: 4, views: 20 },
  { day: "Fri", proposals: 2, views: 18 },
  { day: "Sat", proposals: 1, views: 8 },
  { day: "Sun", proposals: 0, views: 5 },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Analytics Dashboard</h2>
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                Track your freelance performance and identify opportunities for growth
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="last12months">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last30days">Last 30 days</SelectItem>
                  <SelectItem value="last3months">Last 3 months</SelectItem>
                  <SelectItem value="last6months">Last 6 months</SelectItem>
                  <SelectItem value="last12months">Last 12 months</SelectItem>
                  <SelectItem value="alltime">All time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$7,522</div>
            <p className="text-xs text-muted-foreground">+24% from last year</p>
            <div className="h-[60px] mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={earningsData.slice(6)}>
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="var(--chart-1)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Proposals Success Rate</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
              <polyline points="16 7 22 7 22 13" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28.6%</div>
            <p className="text-xs text-muted-foreground">+5.2% from last month</p>
            <div className="h-[60px] mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={proposalData.slice(6)}>
                  <Bar dataKey="accepted" fill="var(--chart-1)" />
                  <Bar dataKey="sent" fill="var(--chart-2)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Hourly Rate</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$35.28</div>
            <p className="text-xs text-muted-foreground">+$2.50 from last month</p>
            <div className="h-[60px] mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={earningsData.slice(6)}>
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="var(--chart-3)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
            <div className="mt-4 h-1 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full rounded-full"
                style={{ width: "80%" }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">80% Capacity</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts and Analysis */}
      <Tabs defaultValue="earnings" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="proposals">Proposals</TabsTrigger>
          <TabsTrigger value="jobSources">Job Sources</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="earnings">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Earnings</CardTitle>
              <CardDescription>Your earnings over the last 12 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={earningsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Earnings']} />
                    <Legend />
                    <Bar dataKey="amount" name="Earnings" fill="var(--chart-1)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="proposals">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Proposal Success Rate</CardTitle>
                <CardDescription>Sent vs Accepted proposals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={proposalData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="sent" name="Proposals Sent" fill="var(--chart-2)" />
                      <Bar dataKey="accepted" name="Proposals Accepted" fill="var(--chart-1)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills in Demand</CardTitle>
                <CardDescription>Top skills from your accepted proposals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={skillsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="skill" type="category" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="% of Jobs" fill="var(--chart-3)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="jobSources">
          <Card>
            <CardHeader>
              <CardTitle>Job Sources</CardTitle>
              <CardDescription>Where your jobs are coming from</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="w-[300px] h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={jobSourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {jobSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Source Analysis</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Most of your jobs come from direct searches, which suggests your profile visibility and keywords are working well.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Recommendations</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc list-inside">
                    <li>Improve your response to client invitations</li>
                    <li>Focus on maintaining high client ratings to increase recommendations</li>
                    <li>Consider expanding your skills to appear in more searches</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity</CardTitle>
              <CardDescription>Your proposal and profile view patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={activityData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="proposals" name="Proposals Sent" stroke="var(--chart-1)" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="views" name="Profile Views" stroke="var(--chart-2)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Insights and Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Insights</CardTitle>
          <CardDescription>Personalized recommendations to boost your freelance success</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex gap-2 items-center">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <h3 className="font-medium">Pricing Optimization</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Your success rate increases by 15% when bidding on projects in the $30-40/hr range. Consider focusing on this price point to maximize earnings.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex gap-2 items-center">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>
                <h3 className="font-medium">Response Time</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                You win 70% more contracts when responding to client messages within 2 hours. Try to improve your response time to increase your conversion rate.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex gap-2 items-center">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                  </svg>
                </div>
                <h3 className="font-medium">Skill Development</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                React projects with API integration are in high demand. Adding TypeScript to your skill set could increase your earning potential by up to 25%.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
