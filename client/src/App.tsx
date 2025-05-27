import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Layout from "@/components/layout";
import Dashboard from "@/pages/dashboard";
import ProfileBuilder from "@/pages/profile-builder";
import ProposalGenerator from "@/pages/proposal-generator";
import JobListings from "@/pages/job-listings";
import Settings from "@/pages/settings";
import Home from "@/pages/home";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard">
        <Layout>
          <Dashboard />
        </Layout>
      </Route>
      <Route path="/profile">
        <Layout>
          <ProfileBuilder />
        </Layout>
      </Route>
      <Route path="/proposals">
        <Layout>
          <ProposalGenerator />
        </Layout>
      </Route>
      <Route path="/jobs">
        <Layout>
          <JobListings />
        </Layout>
      </Route>
      <Route path="/settings">
        <Layout>
          <Settings />
        </Layout>
      </Route>
      <Route>
        <Layout>
          <NotFound />
        </Layout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
