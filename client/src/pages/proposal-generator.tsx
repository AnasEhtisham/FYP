import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Upload, 
  RefreshCw, 
  Copy, 
  ArrowRight, 
  Target, 
  Trophy, 
  MessageSquare 
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ProposalGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [confidence, setConfidence] = useState<number | null>(null);
  const [lowConfidenceWords, setLowConfidenceWords] = useState<string[]>([]);
  const [generatedProposal, setGeneratedProposal] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleCorrectText = async () => {
    setExtractedText(
      extractedText.replace(/(^\w|\.\s+\w)/g, (c) => c.toUpperCase())
    );
    toast({ title: "Corrected!", description: "Text has been corrected (demo)." });
  };

  const handleCopyText = async () => {
    await navigator.clipboard.writeText(extractedText);
    toast({ title: "Copied!", description: "Text copied to clipboard." });
  };

  const handleUseText = () => {
    toast({ title: "Used!", description: "Text inserted into proposal form (demo)." });
  };

  const handleFileUpload = async (file: File) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:8000/api/ocr/extract", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setExtractedText(data.text);
        setConfidence(data.confidence ?? null);
        setLowConfidenceWords(data.lowConfidenceWords ?? []);
        toast({
          title: "Success",
          description: "Text extracted successfully",
        });
      } else {
        throw new Error(data.error || "Failed to extract text from image");
      }
    } catch (error) {
      let message = "Failed to extract text from image";
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleGenerateProposal = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("http://localhost:8000/api/proposal/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle: (document.getElementById("jobTitle") as HTMLInputElement)?.value,
          jobDescription: extractedText,
          includePortfolio: (document.getElementById("include-portfolio") as HTMLInputElement)?.checked,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setGeneratedProposal(data.proposal);
        toast({ title: "Proposal Generated!", description: "Your proposal is ready." });
      } else {
        throw new Error(data.error || "Failed to generate proposal");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate proposal",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">AI Proposal Generator</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Create winning proposals in minutes. Our AI analyzes the job description 
            and your profile to generate tailored proposals that highlight your relevant 
            skills and experience.
          </p>
        </CardContent>
      </Card>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Job Details */}
        <Card className="overflow-hidden">
          <CardHeader className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">Job Details</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Enter the job details or paste the job description
            </p>
          </CardHeader>

          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="jobTitle" className="mb-1">Job Title</Label>
                <Input id="jobTitle" placeholder="Enter job title" />
              </div>

              <div>
                <Label htmlFor="jobDescription" className="mb-1">Job Description</Label>
                <Textarea 
                  id="jobDescription" 
                  placeholder="Paste job description here..." 
                  rows={8}
                  value={extractedText}
                  onChange={(e) => setExtractedText(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch id="include-portfolio" defaultChecked />
                  <Label htmlFor="include-portfolio">Include my portfolio</Label>
                </div>
                <div className="relative">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept="image/*,.pdf"
                    onChange={handleFileInput}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary-dark"
                    onClick={() => document.getElementById("file-upload")?.click()}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <RefreshCw className="mr-1 h-4 w-4 animate-spin" />
                    ) : (
                      <Upload className="mr-1 h-4 w-4" />
                    )}
                    {isLoading ? "Processing..." : "Upload screenshot"}
                  </Button>
                </div>
              </div>

              <Button className="w-full" onClick={handleGenerateProposal} disabled={isGenerating}>
                {isGenerating ? <RefreshCw className="mr-1 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-1 h-4 w-4" />}
                {isGenerating ? "Generating..." : "Generate Proposal"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Extracted Text and Actions */}
        <Card className="overflow-hidden">
          <CardHeader className="p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">Extracted Text</h3>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={handleCorrectText}>Correct Text</Button>
                <Button variant="secondary" onClick={handleCopyText}>Copy</Button>
                <Button variant="secondary" onClick={handleUseText}>Use</Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Confidence: {confidence !== null ? `${(confidence * 100).toFixed(1)}%` : "N/A"}</span>
              <span>
                {lowConfidenceWords.length > 0 && (
                  <span>
                    <span className="text-red-500">{lowConfidenceWords.length}</span> words with low confidence
                  </span>
                )}
              </span>
            </div>
            <div className="border rounded p-2 bg-gray-900 text-white min-h-[120px]">
              {extractedText.split(" ").map((word, idx) =>
                lowConfidenceWords.includes(word) ? (
                  <span key={idx} className="bg-red-700 px-1 rounded">{word} </span>
                ) : (
                  <span key={idx}>{word} </span>
                )
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tips Section */}
      <Card className="overflow-hidden mt-6">
        <CardHeader className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">Tips for Winning Proposals</h3>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Target className="h-5 w-5" />
              </div>
              <h4 className="font-medium text-gray-800 dark:text-white">Personalize Your Approach</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Address the client's specific needs and show how your skills match their requirements.
              </p>
            </div>

            <div className="space-y-2">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Trophy className="h-5 w-5" />
              </div>
              <h4 className="font-medium text-gray-800 dark:text-white">Highlight Relevant Experience</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Showcase your most relevant projects and experiences that demonstrate your expertise.
              </p>
            </div>

            <div className="space-y-2">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <MessageSquare className="h-5 w-5" />
              </div>
              <h4 className="font-medium text-gray-800 dark:text-white">Ask Thoughtful Questions</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Show your interest and understanding by asking specific questions about the project.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {generatedProposal && (
        <Card className="mt-6">
          <CardHeader>
            <h3 className="text-lg font-bold">Generated Proposal</h3>
          </CardHeader>
          <CardContent>
            <Textarea value={generatedProposal} rows={10} readOnly />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
