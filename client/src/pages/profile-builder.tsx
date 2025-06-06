import { useState } from "react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Lightbulb, PlusCircle, X, Edit, Trash2, Upload, Plus } from "lucide-react";

export default function ProfileBuilder() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, name: "Basic Info" },
    { id: 2, name: "Skills & Experience" },
    { id: 3, name: "Portfolio" },
    { id: 4, name: "Services & Rates" },
  ];

  const skills = ["React", "JavaScript", "HTML/CSS", "Responsive Design"];
  const suggestedSkills = ["Redux", "TypeScript", "Node.js", "API Integration"];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Profile Builder</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Complete your profile to increase your chances of landing jobs. Our AI-powered
            suggestions will help you stand out from the crowd.
          </p>

          {/* Progress Indicator */}
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

      {/* Profile Builder Steps */}
      <Card className="mb-6">
        {/* Step Navigation */}
        <CardHeader className="border-b border-gray-200 dark:border-gray-800 p-4">
          <div className="flex flex-wrap gap-2">
            {steps.map((step) => (
              <Button
                key={step.id}
                variant={currentStep === step.id ? "default" : "ghost"}
                onClick={() => setCurrentStep(step.id)}
                className="px-4 py-2 rounded-lg"
              >
                {step.name}
              </Button>
            ))}
          </div>
        </CardHeader>

        {/* Step Content */}
        <CardContent className="p-6">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Basic Information</h3>

              <div className="space-y-4">
                {/* Profile Photo */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Avatar className="w-24 h-24 text-white text-2xl font-bold bg-primary">
                    <AvatarFallback>ME</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex gap-2">
                      <Button>
                        <Upload className="mr-2 h-4 w-4" /> Upload Photo
                      </Button>
                      <Button variant="outline">Remove</Button>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Recommended: Square JPG or PNG, at least 200×200 pixels
                    </p>
                  </div>
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="mb-1">First Name</Label>
                    <Input id="firstName" defaultValue="Anas" />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="mb-1">Last Name</Label>
                    <Input id="lastName" defaultValue="Ehtisham" />
                  </div>
                </div>

                {/* Professional Title */}
                <div>
                  <Label htmlFor="title" className="mb-1">Professional Title</Label>
                  <Input id="title" defaultValue="Web Developer" />
                  <div className="mt-1 flex items-center text-xs text-primary">
                    <Lightbulb className="mr-1 h-4 w-4" />
                    <span>
                      AI Tip: Be specific with your title to attract relevant clients (e.g.,
                      "React Frontend Developer" instead of "Web Developer")
                    </span>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <Label htmlFor="bio" className="mb-1">Professional Overview</Label>
                  <Textarea
                    id="bio"
                    rows={4}
                    defaultValue="I am a web developer with experience in building responsive websites and web applications using modern JavaScript frameworks like React. I focus on creating clean, efficient code and intuitive user experiences."
                  />
                  <div className="mt-1 flex items-center text-xs text-primary">
                    <Lightbulb className="mr-1 h-4 w-4" />
                    <span>
                      AI Tip: Include your years of experience, key technologies, and what makes you
                      unique
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="country" className="mb-1">Country</Label>
                    <Select defaultValue="pakistan">
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pakistan">Pakistan</SelectItem>
                        <SelectItem value="usa">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="canada">Canada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="city" className="mb-1">City</Label>
                    <Input id="city" defaultValue="Islamabad" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Skills & Experience */}
          {currentStep === 2 && (
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Skills & Experience</h3>

              <div className="space-y-6">
                {/* Skills Section */}
                <div>
                  <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Skills
                  </Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-primary/10 text-primary flex items-center gap-1 px-3 py-1"
                      >
                        {skill}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0 text-primary hover:text-primary-dark hover:bg-transparent"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Input placeholder="Add a skill" className="flex-1" />
                    <Button>Add</Button>
                  </div>

                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      AI Suggested Skills
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedSkills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="border-primary text-primary hover:bg-primary hover:text-white cursor-pointer"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Experience Section */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Work Experience
                    </Label>
                    <Button variant="link" className="text-primary p-0 h-auto">
                      <PlusCircle className="mr-1 h-4 w-4" /> Add Experience
                    </Button>
                  </div>

                  <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-800 dark:text-white">
                            Web Developer
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            TechSolutions Inc.
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                            Jan 2023 - Present • 1 year 2 months
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                        Developed and maintained responsive web applications using React, Redux, and
                        modern JavaScript. Collaborated with UI/UX designers to implement
                        pixel-perfect interfaces and optimize performance.
                      </p>
                    </div>

                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-800 dark:text-white">
                            Junior Developer
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            WebCraft Agency
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                            Jun 2022 - Dec 2022 • 7 months
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                        Assisted senior developers in building client websites. Implemented
                        responsive layouts using HTML, CSS, and JavaScript. Learned React
                        fundamentals and basic state management.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Education Section */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Education
                    </Label>
                    <Button variant="link" className="text-primary p-0 h-auto">
                      <PlusCircle className="mr-1 h-4 w-4" /> Add Education
                    </Button>
                  </div>

                  <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">
                          Bachelor of Science in Computer Science
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          Riphah International University
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                          2019 - 2023
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Portfolio */}
          {currentStep === 3 && (
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Portfolio</h3>

              <div className="space-y-6">
                <p className="text-gray-600 dark:text-gray-300">
                  Showcase your best work to attract clients. Add projects, case studies, or samples
                  that demonstrate your skills.
                </p>

                {/* Add Portfolio Project Button */}
                <div className="flex justify-end">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Portfolio Item
                  </Button>
                </div>

                {/* Portfolio Items */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Portfolio Item 1 */}
                  <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                    <div className="h-48 bg-gray-200 dark:bg-gray-800 relative">
                      <img
                        src="https://images.unsplash.com/photo-1541873676-a18131494184?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                        alt="E-commerce Project"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 flex space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="p-1 bg-white dark:bg-gray-900 rounded text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="p-1 bg-white dark:bg-gray-900 rounded text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-gray-800 dark:text-white">
                        E-commerce Platform
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        A fully responsive e-commerce site built with React, Redux, and Stripe
                        integration.
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/10">
                          React
                        </Badge>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/10">
                          Redux
                        </Badge>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/10">
                          Stripe
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Portfolio Item 2 */}
                  <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                    <div className="h-48 bg-gray-200 dark:bg-gray-800 relative">
                      <img
                        src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                        alt="Task Management App"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 flex space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="p-1 bg-white dark:bg-gray-900 rounded text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="p-1 bg-white dark:bg-gray-900 rounded text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-gray-800 dark:text-white">
                        Task Management App
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        A drag-and-drop task management application with user authentication and
                        real-time updates.
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/10">
                          React
                        </Badge>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/10">
                          Firebase
                        </Badge>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/10">
                          DnD
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Enhancement Box */}
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-start">
                    <Lightbulb className="text-primary h-5 w-5 mr-3 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-white">
                        AI-Powered Enhancement
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Let our AI analyze your portfolio to suggest improvements that can attract
                        more clients.
                      </p>
                      <Button variant="default" className="mt-2">
                        Enhance Portfolio
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Services & Rates */}
          {currentStep === 4 && (
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                Services & Rates
              </h3>

              <div className="space-y-6">
                {/* Services Section */}
                <div>
                  <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Services You Offer
                  </Label>

                  <div className="space-y-3">
                    {/* Service Item 1 */}
                    <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-800 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">
                          Web Application Development
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">
                          Full-stack web application development using React and Node.js
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-800 dark:text-white">
                          $40/hr
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Service Item 2 */}
                    <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-800 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">
                          Frontend Development
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">
                          Building responsive user interfaces with React, HTML5, and CSS3
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-800 dark:text-white">
                          $35/hr
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Service Item 3 */}
                    <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-800 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">
                          API Development
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">
                          Creating RESTful APIs using Node.js, Express, and MongoDB
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-800 dark:text-white">
                          $38/hr
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="mt-3">
                    <Plus className="mr-2 h-4 w-4" /> Add Service
                  </Button>
                </div>

                {/* Rate Preferences */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Rate Preferences
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hourlyRate" className="mb-1">Default Hourly Rate (USD)</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 dark:text-gray-400">$</span>
                        </div>
                        <Input id="hourlyRate" type="number" defaultValue="35" min="1" className="pl-8" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="availability" className="mb-1">Weekly Availability</Label>
                      <Select defaultValue="20-30">
                        <SelectTrigger id="availability">
                          <SelectValue placeholder="Select availability" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="<10">Less than 10 hours</SelectItem>
                          <SelectItem value="10-20">10-20 hours</SelectItem>
                          <SelectItem value="20-30">20-30 hours</SelectItem>
                          <SelectItem value="30-40">30-40 hours</SelectItem>
                          <SelectItem value=">40">More than 40 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* AI Rate Analysis */}
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-primary h-5 w-5 mr-3 mt-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="20" x2="18" y2="10" />
                      <line x1="12" y1="20" x2="12" y2="4" />
                      <line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-white">
                        AI Market Rate Analysis
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Based on your skills and experience, similar professionals charge $35-45/hour.
                        Your current rate is competitive but could be increased as you gain more
                        positive reviews.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>

        {/* Bottom Navigation */}
        <CardFooter className="p-6 border-t border-gray-200 dark:border-gray-800 flex justify-between">
          <Button
            variant="outline"
            className={cn({ "invisible": currentStep === 1 })}
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1 h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            Previous
          </Button>

          <Button
            onClick={() => currentStep < 4 ? setCurrentStep(currentStep + 1) : null}
          >
            {currentStep < 4 ? (
              <>
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1 h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
