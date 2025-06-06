import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Lock, 
  Bell, 
  CreditCard, 
  Globe, 
  Shield, 
  HelpCircle, 
  LogOut, 
  Sun, 
  Moon,
  Check,
  X,
  Monitor,
  Eye,
  PlusIcon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Settings() {
  const [theme, setThemeState] = useState<"dark" | "light" | "system">("light");
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  // Get the current theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("ui-theme") as "dark" | "light" | "system" || "light";
    setThemeState(savedTheme);
  }, []);
  
  // Function to set the theme
  const setTheme = (newTheme: "dark" | "light" | "system") => {
    // Update the DOM
    const root = document.documentElement;
    
    if (newTheme === "system") {
      // Check system preference
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.remove("dark", "light");
      root.classList.add(systemPrefersDark ? "dark" : "light");
    } else {
      root.classList.remove("dark", "light");
      root.classList.add(newTheme);
    }
    
    // Save to localStorage
    localStorage.setItem("ui-theme", newTheme);
    
    // Update state
    setThemeState(newTheme);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Account Settings</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your account settings and preferences
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="account" className="w-full">
        <div className="flex">
          <div className="hidden md:flex flex-col space-y-1 w-1/4 p-1 mr-6">
            <Button 
              variant="ghost" 
              className="justify-start"
              onClick={() => {
                const el = document.querySelector('[data-value="account"]');
                if (el) {
                  (el as HTMLElement).click();
                }
              }}
            >
              <User className="mr-2 h-4 w-4" />
              Personal Information
            </Button>
            <Button 
              variant="ghost" 
              className="justify-start"
              onClick={() => {
                const el = document.querySelector('[data-value="security"]');
                if (el) {
                  (el as HTMLElement).click();
                }
              }}
            >
              <Lock className="mr-2 h-4 w-4" />
              Password & Security
            </Button>
            <Button 
              variant="ghost" 
              className="justify-start"
              onClick={() => {
                const el = document.querySelector('[data-value="notifications"]');
                if (el) {
                  (el as HTMLElement).click();
                }
              }}
            >
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Button>
            <Button 
              variant="ghost" 
              className="justify-start"
              onClick={() => {
                const el = document.querySelector('[data-value="billing"]');
                if (el) {
                  (el as HTMLElement).click();
                }
              }}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Billing & Payments
            </Button>
            <Button 
              variant="ghost" 
              className="justify-start"
              onClick={() => {
                const el = document.querySelector('[data-value="appearance"]');
                if (el) {
                  (el as HTMLElement).click();
                }
              }}
            >
              <Sun className="mr-2 h-4 w-4" />
              Appearance
            </Button>
            <Button 
              variant="ghost" 
              className="justify-start"
              onClick={() => {
                const el = document.querySelector('[data-value="privacy"]');
                if (el) {
                  (el as HTMLElement).click();
                }
              }}
            >
              <Shield className="mr-2 h-4 w-4" />
              Privacy
            </Button>
            <Separator className="my-2" />
            <Button 
              variant="ghost" 
              className="justify-start text-gray-600 dark:text-gray-400"
              onClick={() => {
                const el = document.querySelector('[data-value="help"]');
                if (el) {
                  (el as HTMLElement).click();
                }
              }}
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              Help & Support
            </Button>
            <Button 
              variant="ghost" 
              className="justify-start text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          </div>

          <div className="flex-1">
            <TabsList className="mb-4 md:hidden grid grid-cols-2 h-auto">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="help">Help</TabsTrigger>
            </TabsList>

            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal information and account details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="Anas" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Ehtisham" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="anas.ehtisham@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+92 304 5561202" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" defaultValue="123 Main Street, Islamabad, Pakistan" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="asia_karachi">
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asia_karachi">Asia/Karachi (GMT+5)</SelectItem>
                          <SelectItem value="america_new_york">America/New York (GMT-5)</SelectItem>
                          <SelectItem value="europe_london">Europe/London (GMT+0)</SelectItem>
                          <SelectItem value="asia_tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="ur">Urdu</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Password & Security</CardTitle>
                  <CardDescription>
                    Update your password and security settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input 
                        id="currentPassword" 
                        type={passwordVisible ? "text" : "password"} 
                        defaultValue="••••••••••••" 
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-0 top-0 h-full"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                      >
                        {passwordVisible ? (
                          <X className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <div className="font-medium">Two-Factor Authentication</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Add an extra layer of security to your account
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Authenticator App</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Use an authenticator app to generate one-time codes
                        </div>
                      </div>
                      <Button variant="outline">Setup</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Text Message</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Receive a code via text message
                        </div>
                      </div>
                      <Button variant="outline">Setup</Button>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <div className="font-medium">Login Sessions</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Manage your active sessions
                    </div>
                    <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Current Session</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Windows • Chrome • Islamabad, Pakistan
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          Active
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Update Password</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Control how and when you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Email Notifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">New Job Recommendations</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Receive job recommendations based on your skills
                          </div>
                        </div>
                        <Switch defaultChecked id="job-recommendations" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Proposal Status Updates</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Get notified when clients view or respond to your proposals
                          </div>
                        </div>
                        <Switch defaultChecked id="proposal-updates" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Messages</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Receive email notifications for new messages
                          </div>
                        </div>
                        <Switch defaultChecked id="message-notifications" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Payment Notifications</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Get notified about payments and earnings
                          </div>
                        </div>
                        <Switch defaultChecked id="payment-notifications" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Marketing & Promotions</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Receive updates about new features and promotions
                          </div>
                        </div>
                        <Switch id="marketing-notifications" />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                </CardContent>
                <CardFooter>
                  <Button>Save Notification Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="billing">
              <Card>
                <CardHeader>
                  <CardTitle>Billing & Payments</CardTitle>
                  <CardDescription>
                    Manage your payment methods and billing information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Payment Methods</h3>
                    <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-8 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
                            <div className="text-sm font-medium">Visa</div>
                          </div>
                          <div>
                            <div className="font-medium">Visa ending in 1234</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Expires 04/2027
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm" className="text-destructive">Remove</Button>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="flex items-center">
                      <PlusIcon className="mr-2 h-4 w-4" />
                      Add Payment Method
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Billing Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="billingName">Name</Label>
                        <Input id="billingName" defaultValue="Anas Ehtisham" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billingCompany">Company (Optional)</Label>
                        <Input id="billingCompany" defaultValue="" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="billingAddressLine1">Address Line 1</Label>
                      <Input id="billingAddressLine1" defaultValue="123 Main Street" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="billingAddressLine2">Address Line 2 (Optional)</Label>
                      <Input id="billingAddressLine2" defaultValue="" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="billingCity">City</Label>
                        <Input id="billingCity" defaultValue="Islamabad" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billingState">State/Province</Label>
                        <Input id="billingState" defaultValue="ICT" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billingZip">ZIP/Postal Code</Label>
                        <Input id="billingZip" defaultValue="44000" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="billingCountry">Country</Label>
                      <Select defaultValue="pk">
                        <SelectTrigger id="billingCountry">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pk">Pakistan</SelectItem>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Billing Information</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Customize the look and feel of your interface
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Theme</h3>
                    <RadioGroup 
                      defaultValue={theme} 
                      onValueChange={(value) => setTheme(value as "dark" | "light" | "system")}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="light" id="theme-light" />
                        <Label htmlFor="theme-light" className="flex items-center">
                          <Sun className="mr-2 h-4 w-4" />
                          Light
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dark" id="theme-dark" />
                        <Label htmlFor="theme-dark" className="flex items-center">
                          <Moon className="mr-2 h-4 w-4" />
                          Dark
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="system" id="theme-system" />
                        <Label htmlFor="theme-system" className="flex items-center">
                          <Monitor className="mr-2 h-4 w-4" />
                          System
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Layout Density</h3>
                    <RadioGroup defaultValue="comfortable">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="compact" id="density-compact" />
                        <Label htmlFor="density-compact">Compact</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="comfortable" id="density-comfortable" />
                        <Label htmlFor="density-comfortable">Comfortable</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="spacious" id="density-spacious" />
                        <Label htmlFor="density-spacious">Spacious</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Accessibility</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Reduce Animations</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Minimize motion for those with vestibular disorders
                          </div>
                        </div>
                        <Switch id="reduce-animations" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">High Contrast</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Increase contrast for better readability
                          </div>
                        </div>
                        <Switch id="high-contrast" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Appearance Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>
                    Control who can see your information and how your data is used
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Profile Visibility</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Public Profile</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Allow your profile to be visible to potential clients
                          </div>
                        </div>
                        <Switch defaultChecked id="public-profile" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Show Earnings</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Display your earnings history on your public profile
                          </div>
                        </div>
                        <Switch id="show-earnings" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Show Contact Info</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Make your contact information visible to clients
                          </div>
                        </div>
                        <Switch defaultChecked id="show-contact" />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Data Usage</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Personalized Recommendations</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Allow us to use your activity to recommend relevant jobs
                          </div>
                        </div>
                        <Switch defaultChecked id="personalized-recommendations" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Usage Analytics</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Share anonymous usage data to help improve our services
                          </div>
                        </div>
                        <Switch defaultChecked id="analytics" />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Account Data</h3>
                    <div className="space-y-2">
                      <Button variant="outline">Download Your Data</Button>
                      <Button variant="outline" className="text-destructive">Delete Account</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Privacy Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="help">
              <Card>
                <CardHeader>
                  <CardTitle>Help & Support</CardTitle>
                  <CardDescription>
                    Get assistance and find answers to your questions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Frequently Asked Questions</h3>
                    <div className="space-y-2">
                      <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
                        <h4 className="font-medium">How do I get paid?</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                          You can receive payments through PayPal, bank transfers, or other supported payment methods. Go to the Billing & Payments section to set up your preferred payment method.
                        </p>
                      </div>
                      <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
                        <h4 className="font-medium">How do I create a winning proposal?</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                          Use our Proposal Generator tool to create professional proposals. Highlight your relevant skills, include examples of previous work, and clearly explain how you can solve the client's specific problems.
                        </p>
                      </div>
                      <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
                        <h4 className="font-medium">What fees does the platform charge?</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                          The platform charges a 10% service fee on your earnings. This fee covers payment processing, platform maintenance, and client acquisition services.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Contact Support</h3>
                    <div className="space-y-2">
                      <div className="space-y-2">
                        <Label htmlFor="support-subject">Subject</Label>
                        <Input id="support-subject" placeholder="Enter the subject of your inquiry" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="support-message">Message</Label>
                        <Textarea id="support-message" placeholder="Describe your issue in detail" rows={5} />
                      </div>
                      <div className="space-y-2">
                        <Button>Submit Support Request</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}

