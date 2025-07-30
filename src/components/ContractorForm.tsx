import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ArrowRight, 
  User, 
  MapPin, 
  Phone, 
  Mail,
  Volume2,
  Video,
  Lightbulb,
  Users,
  HardHat,
  FileText,
  CheckCircle,
  Upload,
  Briefcase,
  ChevronDown,
  ChevronRight
} from "lucide-react";

interface SpecializationData {
  positions: string[];
  equipment: string[];
  years: string;
  experience: string[];
  strengths: string;
}

interface FormData {
  // Personal Info
  firstName: string;
  lastName: string;
  streetAddress: string;
  streetAddress2: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  
  // Selected specializations
  selectedSpecializations: string[];
  
  // Specialization data
  specializations: {
    audio: SpecializationData;
    video: SpecializationData;
    lighting: SpecializationData;
    management: SpecializationData;
    assist: SpecializationData;
  };
  
  // Additional Info
  previousCompanies: string;
  additionalSkills: string;
  comments: string;
  workedWithPrestige: string;
  referredBy: string;
  linkedinProfile: string;
  picture: File | null;
}

interface ContractorFormProps {
  onBack: () => void;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  streetAddress: "",
  streetAddress2: "",
  city: "",
  state: "",
  zipCode: "",
  phone: "",
  email: "",
  selectedSpecializations: [],
  specializations: {
    audio: {
      positions: [],
      equipment: [],
      years: "",
      experience: [],
      strengths: ""
    },
    video: {
      positions: [],
      equipment: [],
      years: "",
      experience: [],
      strengths: ""
    },
    lighting: {
      positions: [],
      equipment: [],
      years: "",
      experience: [],
      strengths: ""
    },
    management: {
      positions: [],
      equipment: [],
      years: "",
      experience: [],
      strengths: ""
    },
    assist: {
      positions: [],
      equipment: [],
      years: "",
      experience: [],
      strengths: ""
    }
  },
  previousCompanies: "",
  additionalSkills: "",
  comments: "",
  workedWithPrestige: "",
  referredBy: "",
  linkedinProfile: "",
  picture: null
};

const steps = [
  { id: 1, title: "Personal Info", icon: User, description: "Basic contact information" },
  { id: 2, title: "Eligible Positions", icon: Briefcase, description: "Your areas of expertise" },
  { id: 3, title: "Additional Info", icon: FileText, description: "Experience & references" },
  { id: 4, title: "Review & Submit", icon: CheckCircle, description: "Review and submit application" }
];

const specializationConfigs = {
  audio: {
    title: "Audio",
    icon: Volume2,
    color: "text-blue-400",
    positions: [
      "A1 - Lead Audio Engineer",
      "A2 - Audio Assist", 
      "RF Coordinator"
    ],
    equipment: [
      "Midas Consoles",
      "Yamaha Consoles", 
      "Other Digital Consoles",
      "Analog Consoles",
      "Wireless Microphones",
      "RF Explorer",
      "Wireless Workbench",
      "Wired Clear-Com",
      "Line Array Systems",
      "Live Audio Recording",
      "Smaart"
    ]
  },
  video: {
    title: "Video",
    icon: Video,
    color: "text-purple-400",
    positions: [
      "V1 - Lead Video Engineer",
      "V2 - Video Assist",
      "Graphics OP",
      "Playback OP", 
      "Camera Shading",
      "Web Streaming",
      "Record OP",
      "Media Servers",
      "Projection (Blends & Converge)",
      "Projection (Basic)",
      "LED Engineer",
      "LED Assist",
      "Speaker Ready",
      "IT/Computer Networking",
      "Camera OP"
    ],
    equipment: [
      "E2 S3 Spyder",
      "Ascender PDS902",
      "Panasonic 410 Roland",
      "BlackMagic AnalogWay",
      "Millumin Resolume",
      "D3 MITT",
      "PlaybackPro Aja KiPro",
      "Camera Operator - Long Lens",
      "Camera Operator - Jib",
      "Camera CCU",
      "20K+ Projectors",
      "NovaStar Processors",
      "Teleprompter Controllers",
      "Tricaster/Wirecast"
    ]
  },
  lighting: {
    title: "Lighting",
    icon: Lightbulb,
    color: "text-yellow-400",
    positions: [
      "LD - Lighting Designer",
      "L2 - Lighting Assist",
      "ME - Master Electrician",
      "Spotlight Operator"
    ],
    equipment: [
      "GrandMA",
      "Hog",
      "ETC",
      "AvoLites",
      "Leprechaun",
      "Stage/CL Distro's",
      "Dimmer Beach"
    ]
  },
  management: {
    title: "Management",
    icon: Users,
    color: "text-green-400",
    positions: [
      "Event Producer",
      "Production Manager",
      "Technical Director",
      "Show Caller",
      "Crew Lead"
    ],
    equipment: [
      "Create Cue-to-Cue's",
      "Vectorworks",
      "Project Management Software",
      "Budget Management",
      "Team Leadership"
    ]
  },
  assist: {
    title: "General Assist",
    icon: HardHat,
    color: "text-orange-400",
    positions: [
      "Lead Carpenter",
      "Carpenter",
      "Stagehand",
      "Rigger",
      "Breakout Float",
      "Breakout OP",
      "Breakout Tech",
      "General AV",
      "Scenic",
      "Truck Loader"
    ],
    equipment: [
      "Hand Tools",
      "Power Tools",
      "Rigging Equipment",
      "Staging Systems",
      "Truss Systems",
      "Cable Management",
      "Load-in/Load-out"
    ]
  }
};

const experienceTypes = [
  "Corporate General Sessions",
  "Corporate Breakout Rooms",
  "Festivals",
  "Concerts"
];

export default function ContractorForm({ onBack }: ContractorFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateSpecializationData = (specialization: keyof FormData['specializations'], field: keyof SpecializationData, value: any) => {
    setFormData(prev => ({
      ...prev,
      specializations: {
        ...prev.specializations,
        [specialization]: {
          ...prev.specializations[specialization],
          [field]: value
        }
      }
    }));
  };

  const updateSpecializationArray = (specialization: keyof FormData['specializations'], field: keyof SpecializationData, value: string, checked: boolean) => {
    setFormData(prev => {
      const array = prev.specializations[specialization][field] as string[];
      const newArray = checked 
        ? [...array, value]
        : array.filter(item => item !== value);
      
      return {
        ...prev,
        specializations: {
          ...prev.specializations,
          [specialization]: {
            ...prev.specializations[specialization],
            [field]: newArray
          }
        }
      };
    });
  };

  const toggleSpecialization = (specialization: string, checked: boolean) => {
    setFormData(prev => {
      const newSelected = checked 
        ? [...prev.selectedSpecializations, specialization]
        : prev.selectedSpecializations.filter(s => s !== specialization);
      
      return {
        ...prev,
        selectedSpecializations: newSelected
      };
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    setIsComplete(true);
  };

  const progress = (currentStep / steps.length) * 100;

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-grid opacity-20" />
        
        {/* Floating celebration elements */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-green-500/20 rounded-full blur-xl float-animation" />
        <div className="absolute top-32 right-32 w-24 h-24 bg-primary/20 rounded-full blur-2xl float-animation" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/3 w-20 h-20 bg-green-400/15 rounded-full blur-xl float-animation" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-primary/15 rounded-full blur-2xl float-animation" style={{ animationDelay: '3s' }} />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            type: "spring", 
            stiffness: 100,
            damping: 15
          }}
          className="relative z-10 text-center max-w-md mx-auto p-8"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: 0.3, 
              type: "spring", 
              stiffness: 200,
              damping: 10
            }}
            className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/30"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
              Application Submitted!
            </h1>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              Thank you for your interest in joining Prestige Labor Solutions. 
              We'll review your application and get back to you soon.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="space-y-4"
          >
            <div className="p-6 glass rounded-lg border border-border/50">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">What's Next?</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our team will review your qualifications and contact you within 2-3 business days. 
                Keep an eye on your email for updates!
              </p>
            </div>
            
            <Button 
              onClick={onBack} 
              variant="outline" 
              className="btn-secondary w-full"
              size="lg"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Home
            </Button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl float-animation" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-primary/5 rounded-full blur-2xl float-animation" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-primary/8 rounded-full blur-xl float-animation" style={{ animationDelay: '4s' }} />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Enhanced Header with PLS Branding */}
        <header className="p-6 border-b border-border/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Button variant="ghost" onClick={onBack} className="flex items-center gap-2 btn-secondary">
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            
            <motion.div 
              className="flex flex-col items-center gap-2 slide-in-right"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="pls-logo">
                <img src="/pls-logo.svg" alt="PLS Logo" className="w-full h-full" />
              </div>
              <div className="text-center">
                <h1 className="text-lg font-bold prestige-title">Prestige Labor Solutions</h1>
                <p className="text-xs text-muted-foreground">Professional AV Contractor Network</p>
              </div>
            </motion.div>
            
            <div className="text-sm text-muted-foreground slide-in-right" style={{ animationDelay: '0.2s' }}>
              Step {currentStep} of {steps.length}
            </div>
          </div>
        </header>

        {/* Progress Bar */}
        <div className="px-6 py-4 border-b border-border/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <Progress value={progress} className="h-3 progress-glow progress-enhanced" />
            <div className="flex justify-between mt-4">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex flex-col items-center gap-2 step-indicator ${
                    step.id <= currentStep ? 'text-primary active' : 'text-muted-foreground'
                  } ${
                    step.id < currentStep ? 'completed' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                    step.id <= currentStep 
                      ? 'border-primary bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/30' 
                      : 'border-border bg-background hover:border-primary/50'
                  }`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium hidden sm:block transition-colors duration-300">{step.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <main className="flex-1 p-6 pb-20">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 30, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, scale: 0.95 }}
                transition={{ 
                  duration: 0.5, 
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }}
              >
                {currentStep === 1 && (
                  <PersonalInfoStep formData={formData} updateFormData={updateFormData} />
                )}
                {currentStep === 2 && (
                  <PositionsStep 
                    formData={formData} 
                    toggleSpecialization={toggleSpecialization}
                    updateSpecializationData={updateSpecializationData}
                    updateSpecializationArray={updateSpecializationArray}
                  />
                )}
                {currentStep === 3 && (
                  <AdditionalInfoStep formData={formData} updateFormData={updateFormData} />
                )}
                {currentStep === 4 && (
                  <ReviewStep formData={formData} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* Navigation */}
        <footer className="sticky bottom-0 p-4 border-t border-border/50 bg-background/95 backdrop-blur-sm">
          <div className="w-full max-w-sm mx-auto">
            <div className="flex justify-between items-center gap-4">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-6 py-3 btn-secondary"
                size="sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
              
              {currentStep === steps.length ? (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 glow-primary px-6 py-3 btn-primary"
                  size="sm"
                >
                  {isSubmitting ? (
                    <>
                      <div className="loading-pulse">Submitting...</div>
                    </>
                  ) : (
                    <>
                      Submit
                      <CheckCircle className="w-4 h-4" />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  className="flex items-center gap-2 px-6 py-3 btn-primary"
                  size="sm"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

// Step Components
function PersonalInfoStep({ formData, updateFormData }: { 
  formData: FormData; 
  updateFormData: (field: keyof FormData, value: any) => void 
}) {
  return (
    <Card className="glass-strong card-hover">
      <CardHeader className="slide-up">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <User className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl">Personal Information</h2>
            <p className="text-sm text-muted-foreground font-normal">Let's start with your basic contact details</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <motion.div 
            className="space-y-2 stagger-animation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Label htmlFor="firstName" className="form-label">First Name *</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => updateFormData('firstName', e.target.value)}
              placeholder="Enter your first name"
              className="form-input"
              required
            />
          </motion.div>
          <motion.div 
            className="space-y-2 stagger-animation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Label htmlFor="lastName" className="form-label">Last Name *</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => updateFormData('lastName', e.target.value)}
              placeholder="Enter your last name"
              className="form-input"
              required
            />
          </motion.div>
        </div>

        <motion.div 
          className="space-y-2 stagger-animation"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Label htmlFor="streetAddress" className="form-label">Street Address *</Label>
          <Input
            id="streetAddress"
            value={formData.streetAddress}
            onChange={(e) => updateFormData('streetAddress', e.target.value)}
            placeholder="Enter your street address"
            className="form-input"
            required
          />
        </motion.div>

        <motion.div 
          className="space-y-2 stagger-animation"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Label htmlFor="streetAddress2" className="form-label">Street Address Line 2</Label>
          <Input
            id="streetAddress2"
            value={formData.streetAddress2}
            onChange={(e) => updateFormData('streetAddress2', e.target.value)}
            placeholder="Apartment, suite, etc. (optional)"
            className="form-input"
          />
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-4 stagger-animation"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="space-y-2">
            <Label htmlFor="city" className="form-label">City *</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => updateFormData('city', e.target.value)}
              placeholder="Enter your city"
              className="form-input"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state" className="form-label">State/Province *</Label>
            <Input
              id="state"
              value={formData.state}
              onChange={(e) => updateFormData('state', e.target.value)}
              placeholder="Enter your state"
              className="form-input"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode" className="form-label">Postal/Zip Code *</Label>
            <Input
              id="zipCode"
              value={formData.zipCode}
              onChange={(e) => updateFormData('zipCode', e.target.value)}
              placeholder="Enter your zip code"
              className="form-input"
              required
            />
          </div>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-4 stagger-animation"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="space-y-2">
            <Label htmlFor="phone" className="form-label flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              Phone Number *
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => updateFormData('phone', e.target.value)}
              placeholder="(555) 123-4567"
              className="form-input"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="form-label flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData('email', e.target.value)}
              placeholder="you@example.com"
              className="form-input"
              required
            />
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}

function PositionsStep({ 
  formData, 
  toggleSpecialization,
  updateSpecializationData,
  updateSpecializationArray
}: { 
  formData: FormData;
  toggleSpecialization: (specialization: string, checked: boolean) => void;
  updateSpecializationData: (specialization: keyof FormData['specializations'], field: keyof SpecializationData, value: any) => void;
  updateSpecializationArray: (specialization: keyof FormData['specializations'], field: keyof SpecializationData, value: string, checked: boolean) => void;
}) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleExpanded = (specialization: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(specialization)) {
      newExpanded.delete(specialization);
    } else {
      newExpanded.add(specialization);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <Card className="glass-strong card-hover">
      <CardHeader className="slide-up">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Briefcase className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl">Eligible Positions & Experience</h2>
            <p className="text-sm text-muted-foreground font-normal">
              Select your areas of expertise and provide details for each specialization you're interested in.
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(specializationConfigs).map(([key, config], index) => {
          const specializationKey = key as keyof FormData['specializations'];
          const isSelected = formData.selectedSpecializations.includes(key);
          const isExpanded = expandedSections.has(key);
          const Icon = config.icon;

          return (
            <motion.div 
              key={key} 
              className={`specialization-card ${isExpanded ? 'data-[expanded=true]' : ''}`} 
              data-expanded={isExpanded}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div 
                className="specialization-header"
                onClick={() => {
                  if (isSelected) {
                    toggleExpanded(key);
                  }
                }}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Checkbox
                      id={key}
                      checked={isSelected}
                      onCheckedChange={(checked) => {
                        toggleSpecialization(key, checked as boolean);
                        if (checked && !isExpanded) {
                          toggleExpanded(key);
                        }
                      }}
                      className="form-checkbox"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </motion.div>
                  <div className={`p-2 rounded-lg transition-all duration-300 ${
                    isSelected ? 'bg-primary/20 shadow-lg shadow-primary/10' : 'bg-card/50'
                  }`}>
                    <Icon className={`w-5 h-5 ${config.color} transition-all duration-300 ${
                      isSelected ? 'scale-110' : ''
                    }`} />
                  </div>
                  <div>
                    <Label htmlFor={key} className="form-label cursor-pointer text-base">
                      {config.title}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {config.positions.length} positions available
                    </p>
                  </div>
                </div>
                
                {isSelected && (
                  <motion.div 
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {formData.specializations[specializationKey].positions.length > 0 && (
                      <Badge variant="secondary" className="text-xs bg-primary/20 text-primary border-primary/30">
                        {formData.specializations[specializationKey].positions.length} selected
                      </Badge>
                    )}
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </motion.div>
                  </motion.div>
                )}
              </div>

              <AnimatePresence>
                {isSelected && isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="mt-6 space-y-6"
                  >
                    <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
                    
                    {/* Positions */}
                    <motion.div 
                      className="space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Label className="text-base font-semibold form-label flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-primary" />
                        Available Positions:
                      </Label>
                      <div className="grid md:grid-cols-2 gap-3">
                        {config.positions.map((position, posIndex) => (
                          <motion.div 
                            key={position} 
                            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-card/30 transition-colors duration-200"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + posIndex * 0.05 }}
                          >
                            <Checkbox
                              id={`${key}-${position}`}
                              checked={formData.specializations[specializationKey].positions.includes(position)}
                              onCheckedChange={(checked) => updateSpecializationArray(specializationKey, 'positions', position, checked as boolean)}
                              className="form-checkbox"
                            />
                            <Label htmlFor={`${key}-${position}`} className="text-sm font-normal form-label cursor-pointer">
                              {position}
                            </Label>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Equipment */}
                    <motion.div 
                      className="space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Label className="text-base font-semibold form-label flex items-center gap-2">
                        <HardHat className="w-4 h-4 text-primary" />
                        Equipment/Skills You Operate:
                      </Label>
                      <div className="grid md:grid-cols-2 gap-3">
                        {config.equipment.map((equipment, equipIndex) => (
                          <motion.div 
                            key={equipment} 
                            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-card/30 transition-colors duration-200"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + equipIndex * 0.03 }}
                          >
                            <Checkbox
                              id={`${key}-equipment-${equipment}`}
                              checked={formData.specializations[specializationKey].equipment.includes(equipment)}
                              onCheckedChange={(checked) => updateSpecializationArray(specializationKey, 'equipment', equipment, checked as boolean)}
                              className="form-checkbox"
                            />
                            <Label htmlFor={`${key}-equipment-${equipment}`} className="text-sm font-normal form-label cursor-pointer">
                              {equipment}
                            </Label>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Experience Details */}
                    <motion.div 
                      className="grid md:grid-cols-2 gap-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="space-y-2">
                        <Label htmlFor={`${key}-years`} className="form-label">Years of Experience</Label>
                        <Input
                          id={`${key}-years`}
                          value={formData.specializations[specializationKey].years}
                          onChange={(e) => updateSpecializationData(specializationKey, 'years', e.target.value)}
                          placeholder="e.g., 5"
                          className="form-input"
                        />
                      </div>
                      <div className="space-y-4">
                        <Label className="text-base font-semibold form-label">Show Experience:</Label>
                        <div className="space-y-3">
                          {experienceTypes.map((type, typeIndex) => (
                            <motion.div 
                              key={type} 
                              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-card/30 transition-colors duration-200"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.7 + typeIndex * 0.1 }}
                            >
                              <Checkbox
                                id={`${key}-exp-${type}`}
                                checked={formData.specializations[specializationKey].experience.includes(type)}
                                onCheckedChange={(checked) => updateSpecializationArray(specializationKey, 'experience', type, checked as boolean)}
                                className="form-checkbox"
                              />
                              <Label htmlFor={`${key}-exp-${type}`} className="text-sm font-normal form-label cursor-pointer">
                                {type}
                              </Label>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    {/* Strengths */}
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <Label htmlFor={`${key}-strengths`} className="form-label">
                        Specify Your {config.title} Strengths
                      </Label>
                      <Textarea
                        id={`${key}-strengths`}
                        value={formData.specializations[specializationKey].strengths}
                        onChange={(e) => updateSpecializationData(specializationKey, 'strengths', e.target.value)}
                        placeholder={`Describe your ${config.title.toLowerCase()} expertise, specializations, and key strengths...`}
                        rows={4}
                        className="form-textarea"
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        {formData.selectedSpecializations.length === 0 && (
          <motion.div 
            className="text-center py-12 text-muted-foreground"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="p-4 bg-card/20 rounded-full w-fit mx-auto mb-4">
              <Briefcase className="w-12 h-12 opacity-50" />
            </div>
            <p className="text-lg font-medium mb-2">Select Your Specializations</p>
            <p className="text-sm">Choose at least one area of expertise to continue</p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

function AdditionalInfoStep({ formData, updateFormData }: { 
  formData: FormData; 
  updateFormData: (field: keyof FormData, value: any) => void;
}) {
  return (
    <Card className="glass-strong card-hover">
      <CardHeader className="slide-up">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl">Additional Information</h2>
            <p className="text-sm text-muted-foreground font-normal">
              Tell us more about your background and experience
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Label htmlFor="previousCompanies" className="form-label">What companies have you worked with in the past?</Label>
          <Textarea
            id="previousCompanies"
            value={formData.previousCompanies}
            onChange={(e) => updateFormData('previousCompanies', e.target.value)}
            placeholder="List companies, production houses, or venues you've worked with..."
            rows={3}
            className="form-textarea"
          />
        </motion.div>

        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Label htmlFor="additionalSkills" className="form-label">Are there any additional skills that you have aside from those stated above?</Label>
          <Textarea
            id="additionalSkills"
            value={formData.additionalSkills}
            onChange={(e) => updateFormData('additionalSkills', e.target.value)}
            placeholder="Any other relevant skills, certifications, or expertise..."
            rows={3}
            className="form-textarea"
          />
        </motion.div>

        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Label htmlFor="comments" className="form-label">Additional Comments</Label>
          <Textarea
            id="comments"
            value={formData.comments}
            onChange={(e) => updateFormData('comments', e.target.value)}
            placeholder="Anything else you'd like us to know about your experience or background..."
            rows={3}
            className="form-textarea"
          />
        </motion.div>

        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Label className="text-base font-semibold form-label">Have you worked with Prestige Labor in the past?</Label>
          <RadioGroup 
            value={formData.workedWithPrestige} 
            onValueChange={(value) => updateFormData('workedWithPrestige', value)}
            className="flex gap-8"
          >
            <motion.div 
              className="flex items-center space-x-2 p-3 rounded-lg hover:bg-card/30 transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RadioGroupItem value="yes" id="yes" className="form-radio" />
              <Label htmlFor="yes" className="form-label cursor-pointer">Yes</Label>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-2 p-3 rounded-lg hover:bg-card/30 transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RadioGroupItem value="no" id="no" className="form-radio" />
              <Label htmlFor="no" className="form-label cursor-pointer">No</Label>
            </motion.div>
          </RadioGroup>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="space-y-2">
            <Label htmlFor="referredBy" className="form-label">Referred by:</Label>
            <Input
              id="referredBy"
              value={formData.referredBy}
              onChange={(e) => updateFormData('referredBy', e.target.value)}
              placeholder="Who referred you to Prestige Labor Solutions?"
              className="form-input"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedinProfile" className="form-label">LinkedIn Profile:</Label>
            <Input
              id="linkedinProfile"
              value={formData.linkedinProfile}
              onChange={(e) => updateFormData('linkedinProfile', e.target.value)}
              placeholder="https://linkedin.com/in/yourprofile"
              className="form-input"
            />
          </div>
        </motion.div>

        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Label htmlFor="picture" className="form-label">Upload Picture:</Label>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center upload-area">
            <motion.div
              className="flex flex-col items-center gap-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="p-4 bg-primary/10 rounded-full">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-sm text-foreground font-medium mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG up to 10MB
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => updateFormData('picture', e.target.files?.[0] || null)}
                className="hidden"
                id="file-upload"
              />
              <Label htmlFor="file-upload">
                <Button variant="outline" className="mt-2 btn-secondary" type="button">
                  Choose File
                </Button>
              </Label>
              {formData.picture && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 text-sm text-primary bg-primary/10 px-3 py-2 rounded-lg"
                >
                  <CheckCircle className="w-4 h-4" />
                  Selected: {formData.picture.name}
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}

function ReviewStep({ formData }: { formData: FormData }) {
  const selectedSpecs = formData.selectedSpecializations;
  
  return (
    <div className="space-y-6">
      <Card className="glass-strong card-hover">
        <CardHeader className="slide-up">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <CheckCircle className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl">Review Your Application</h2>
              <p className="text-sm text-muted-foreground font-normal">
                Please review your information before submitting your application.
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Personal Info Summary */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <div className="p-1 bg-primary/10 rounded">
                <User className="w-5 h-5 text-primary" />
              </div>
              Personal Information
            </h3>
            <div className="glass p-6 rounded-lg space-y-3 border border-border/50">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{formData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{formData.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{formData.city}, {formData.state} {formData.zipCode}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium">
                  {formData.streetAddress}{formData.streetAddress2 && `, ${formData.streetAddress2}`}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Positions Summary */}
          {selectedSpecs.length > 0 && (
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <div className="p-1 bg-primary/10 rounded">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                Selected Specializations
                <Badge variant="secondary" className="ml-2 bg-primary/20 text-primary border-primary/30">
                  {selectedSpecs.length} {selectedSpecs.length === 1 ? 'area' : 'areas'}
                </Badge>
              </h3>
              <div className="space-y-4">
                {selectedSpecs.map((spec, index) => {
                  const specKey = spec as keyof FormData['specializations'];
                  const specData = formData.specializations[specKey];
                  const config = specializationConfigs[specKey];
                  const Icon = config.icon;
                  
                  return (
                    <motion.div 
                      key={spec} 
                      className="glass p-6 rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-300"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className={`w-5 h-5 ${config.color}`} />
                        </div>
                        <h4 className="font-semibold text-lg">{config.title}</h4>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6 text-sm">
                        <div>
                          <p className="font-medium text-muted-foreground mb-1">Positions:</p>
                          <p className="text-foreground">
                            {specData.positions.length > 0 ? specData.positions.join(', ') : 'None selected'}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-muted-foreground mb-1">Years Experience:</p>
                          <p className="text-foreground">{specData.years || 'Not specified'}</p>
                        </div>
                        <div>
                          <p className="font-medium text-muted-foreground mb-1">Equipment:</p>
                          <p className="text-foreground">
                            {specData.equipment.length > 0 ? `${specData.equipment.length} items selected` : 'None selected'}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-muted-foreground mb-1">Experience Types:</p>
                          <p className="text-foreground">
                            {specData.experience.length > 0 ? specData.experience.join(', ') : 'None selected'}
                          </p>
                        </div>
                        {specData.strengths && (
                          <div className="md:col-span-2">
                            <p className="font-medium text-muted-foreground mb-1">Strengths:</p>
                            <p className="text-foreground">{specData.strengths}</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Additional Info Summary */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <div className="p-1 bg-primary/10 rounded">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              Additional Information
            </h3>
            <div className="glass p-6 rounded-lg space-y-4 border border-border/50">
              {formData.previousCompanies && (
                <div>
                  <p className="font-medium text-muted-foreground mb-1">Previous Companies:</p>
                  <p className="text-foreground">{formData.previousCompanies}</p>
                </div>
              )}
              {formData.additionalSkills && (
                <div>
                  <p className="font-medium text-muted-foreground mb-1">Additional Skills:</p>
                  <p className="text-foreground">{formData.additionalSkills}</p>
                </div>
              )}
              {formData.comments && (
                <div>
                  <p className="font-medium text-muted-foreground mb-1">Comments:</p>
                  <p className="text-foreground">{formData.comments}</p>
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-muted-foreground mb-1">Worked with Prestige before:</p>
                  <p className="text-foreground">{formData.workedWithPrestige || 'Not specified'}</p>
                </div>
                {formData.referredBy && (
                  <div>
                    <p className="font-medium text-muted-foreground mb-1">Referred by:</p>
                    <p className="text-foreground">{formData.referredBy}</p>
                  </div>
                )}
              </div>
              {formData.linkedinProfile && (
                <div>
                  <p className="font-medium text-muted-foreground mb-1">LinkedIn:</p>
                  <p className="text-foreground">{formData.linkedinProfile}</p>
                </div>
              )}
              {formData.picture && (
                <div>
                  <p className="font-medium text-muted-foreground mb-1">Picture:</p>
                  <div className="flex items-center gap-2 text-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    {formData.picture.name}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}