"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ChevronRight, CheckCircle, Zap } from "lucide-react";
import { Card, Badge, Button, LoadingSpinner } from "@/components/UI";

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: string;
  content: React.ReactNode;
}

export default function OnboardingPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const careerPaths = [
    {
      id: "penetration-tester",
      title: "Penetration Tester",
      description: "Learn to find and exploit vulnerabilities",
      icon: "🎯",
      skills: ["Reconnaissance", "Exploitation", "Privilege Escalation"],
      duration: "12 weeks",
    },
    {
      id: "soc-analyst",
      title: "SOC Analyst",
      description: "Monitor and respond to security threats",
      icon: "🛡️",
      skills: ["Log Analysis", "Threat Detection", "Incident Response"],
      duration: "10 weeks",
    },
    {
      id: "cloud-security",
      title: "Cloud Security Engineer",
      description: "Secure cloud infrastructure and applications",
      icon: "☁️",
      skills: ["AWS Security", "Cloud Architecture", "Compliance"],
      duration: "14 weeks",
    },
    {
      id: "bug-bounty",
      title: "Bug Bounty Hunter",
      description: "Find security issues and earn rewards",
      icon: "🐛",
      skills: ["Web Security", "API Testing", "Report Writing"],
      duration: "8 weeks",
    },
  ];

  const learningGoals = [
    { id: "knowledge", label: "Gain Knowledge", icon: "📚" },
    { id: "skills", label: "Build Practical Skills", icon: "🔧" },
    { id: "career", label: "Advance My Career", icon: "💼" },
    { id: "certification", label: "Earn Certification", icon: "🎓" },
    { id: "challenges", label: "Compete in Challenges", icon: "🏆" },
    { id: "community", label: "Join Community", icon: "👥" },
  ];

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        router.push("/login");
        return;
      }
      setUser(session.user);
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const toggleGoal = (goalId: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goalId)
        ? prev.filter((g) => g !== goalId)
        : [...prev, goalId]
    );
  };

  const handleComplete = async () => {
    // Save onboarding preferences to localStorage (would be backend in production)
    const preferences = {
      completedAt: new Date().toISOString(),
      careerPath: selectedPath,
      goals: selectedGoals,
    };
    localStorage.setItem("onboarding_preferences", JSON.stringify(preferences));

    // Redirect to dashboard
    router.push("/dashboard");
  };

  const steps: OnboardingStep[] = [
    {
      id: 1,
      title: "Welcome to The Cyber Dragon",
      description: "Let's get you started on your cybersecurity journey",
      icon: "🐉",
      content: (
        <div className="text-center">
          <div className="text-6xl mb-6">🐉</div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Welcome, {user?.user_metadata?.name || user?.email}!
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            The Cyber Dragon is your enterprise-grade platform for mastering
            cybersecurity through structured learning paths, interactive labs,
            and real-world challenges.
          </p>
          <div className="space-y-3 text-left max-w-md mx-auto">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-gray-300">500+ Security Labs</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-gray-300">Interactive Challenges</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-gray-300">Structured Learning Paths</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "Choose Your Path",
      description: "Select a career path that aligns with your goals",
      icon: "🎯",
      content: (
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Choose Your Career Path</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {careerPaths.map((path) => (
              <button
                key={path.id}
                onClick={() => setSelectedPath(path.id)}
                className="text-left"
              >
                <Card
                  className={`cursor-pointer transition-all ${
                    selectedPath === path.id
                      ? "bg-blue-600/30 border-blue-500 ring-2 ring-blue-500/50"
                      : "bg-white/5 hover:bg-white/10 border-white/10"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{path.icon}</span>
                    {selectedPath === path.id && (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                  </div>
                  <h3 className="font-semibold text-white mb-2">{path.title}</h3>
                  <p className="text-sm text-gray-400 mb-3">{path.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {path.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">⏱️ {path.duration}</p>
                </Card>
              </button>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: "Define Your Goals",
      description: "Select what you want to achieve",
      icon: "🎓",
      content: (
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">What are your learning goals?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {learningGoals.map((goal) => (
              <button
                key={goal.id}
                onClick={() => toggleGoal(goal.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedGoals.includes(goal.id)
                    ? "bg-blue-600/30 border-blue-500"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{goal.icon}</span>
                  <span className="font-medium text-white">{goal.label}</span>
                  {selectedGoals.includes(goal.id) && (
                    <CheckCircle className="w-5 h-5 text-green-400 ml-auto" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: "You're All Set!",
      description: "Ready to start learning?",
      icon: "🚀",
      content: (
        <div className="text-center">
          <div className="text-6xl mb-6">🚀</div>
          <h2 className="text-3xl font-bold text-white mb-4">You're All Set!</h2>
          <div className="bg-blue-600/20 border border-blue-600/50 rounded-lg p-6 mb-8 max-w-md mx-auto">
            <p className="text-gray-300 mb-4">
              <strong className="text-white">Path:</strong>{" "}
              {careerPaths.find((p) => p.id === selectedPath)?.title || "Not selected"}
            </p>
            <p className="text-gray-300">
              <strong className="text-white">Goals:</strong>{" "}
              {selectedGoals.length} selected
            </p>
          </div>
          <p className="text-gray-400 mb-8">
            Start with your first topic or jump into a challenge. Your learning
            journey awaits!
          </p>
        </div>
      ),
    },
  ];

  if (loading) return <LoadingSpinner />;

  const step = steps[currentStep - 1];
  const isLastStep = currentStep === steps.length;
  const canProceed =
    currentStep === 1 ||
    (currentStep === 2 && selectedPath) ||
    (currentStep === 3 && selectedGoals.length > 0) ||
    isLastStep;

  return (
    <main className="min-h-screen bg-black pt-16 pb-16">
      <div className="max-w-2xl mx-auto px-6">
        {/* PROGRESS INDICATOR */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            {steps.map((s) => (
              <div key={s.id} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-all ${
                    s.id < currentStep
                      ? "bg-green-600 text-white"
                      : s.id === currentStep
                      ? "bg-blue-600 text-white ring-4 ring-blue-600/30"
                      : "bg-white/10 text-gray-500"
                  }`}
                >
                  {s.id < currentStep ? "✓" : s.id}
                </div>
                <p className="text-xs text-gray-500 text-center max-w-[60px]">
                  {s.title.split(" ")[0]}
                </p>
              </div>
            ))}
          </div>

          {/* PROGRESS BAR */}
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP CONTENT */}
        <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 mb-8">
          <div className="text-center mb-8">
            <p className="text-blue-400 font-semibold mb-2">
              Step {currentStep} of {steps.length}
            </p>
            <h2 className="text-3xl font-bold text-white mb-2">{step.title}</h2>
            <p className="text-gray-400">{step.description}</p>
          </div>

          <div className="mb-12">{step.content}</div>

          {/* NAVIGATION BUTTONS */}
          <div className="flex justify-between gap-4">
            <Button
              variant={currentStep > 1 ? "outline" : "outline"}
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className={currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""}
            >
              ← Back
            </Button>

            {isLastStep ? (
              <Button
                variant="primary"
                onClick={handleComplete}
                className="gap-2"
              >
                Complete Onboarding
                <ChevronRight size={18} />
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!canProceed}
                className={!canProceed ? "opacity-50 cursor-not-allowed" : "gap-2"}
              >
                Next
                <ChevronRight size={18} />
              </Button>
            )}
          </div>
        </Card>

        {/* SKIP OPTION */}
        <div className="text-center">
          <button
            onClick={() => router.push("/dashboard")}
            className="text-sm text-gray-500 hover:text-gray-400 transition"
          >
            Skip onboarding
          </button>
        </div>
      </div>
    </main>
  );
}
