"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Code,
  Brain,
  Server,
  Menu,
  X,
  Send,
  Calendar,
  ArrowRight,
  Sun,
  Moon,
  Download,
  Award,
  Trophy,
  Coffee,
  Users,
} from "lucide-react"
import { skills, experiences, projects, modalData } from "@/lib/data"


export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  subject: "",
  message: "",
});


  // Section observer for navigation
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all sections - match exactly with navigation
    const sections = ["home", "about", "skills", "projects", "experience", "contact"]
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  // Loading screen effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  const codeSnippet = `// Contact Form Structure
const contactForm = {
  name: "${formData.name || "Your Name"}",
  email: "${formData.email || "your.email@example.com"}",
  message: \`${formData.message || "Your message here..."}\`
}

// Send message function
const sendMessage = async () => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contactForm)
  })
  
  return response.json()
}`


  const handleFormSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),  // formData must include name, email, subject, message
    });

    if (response.ok) {
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      alert("Failed to send. Try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong!");
  }
};


  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

const downloadCV = () => {
  const link = document.createElement("a");
  link.href = "/resume.pdf"; // ✅ Don't include /public
  link.download = "resume.pdf"; // ✅ Just the filename
  document.body.appendChild(link); // Ensures full browser support
  link.click();
  document.body.removeChild(link);
};
  const themeClasses = isDarkMode
    ? "bg-gradient-to-br from-black via-gray-900 to-black text-white"
    : "bg-gradient-to-br from-blue-50 via-indigo-50 via-purple-50 to-pink-50 text-gray-900"

  const cardClasses = isDarkMode
    ? "bg-white/5 backdrop-blur-sm border-green-500/20"
    : "bg-white/60 backdrop-blur-sm border-green-600/30 shadow-lg shadow-green-500/10"

  const textClasses = isDarkMode ? "text-white" : "text-gray-900"
  const mutedTextClasses = isDarkMode ? "text-gray-300" : "text-gray-600"

  // Navigation sections with proper formatting - match HTML section order
  const navSections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About me" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ]

  // Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-green-400 animate-pulse bg-gradient-to-br from-green-400/20 to-green-600/20"></div>
            <h1 className="text-6xl font-bold text-white mb-4 animate-fade-in">
              Pranesh <span className="text-green-400">Kumar</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 animate-fade-in-delay">Backend Developer & Gen AI Aspirant</p>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${themeClasses} transition-all duration-500 relative overflow-x-hidden`}>

      {/* Social Media Sidebar */}
      <div className="fixed left-3 top-1/2 transform -translate-y-1/2 z-50 hidden lg:flex flex-col space-y-3">
        <a
          href="https://github.com/PraneshPK2005"
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 ${cardClasses} rounded-full hover:bg-green-500/20 transition-all duration-300 group`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Github className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform" />
        </a>
        <a
          href="https://www.linkedin.com/in/pranesh-pk-362760250/"
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 ${cardClasses} rounded-full hover:bg-green-500/20 transition-all duration-300 group`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Linkedin className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform" />
        </a>
        <a
          href="https://twitter.com/username"
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 ${cardClasses} rounded-full hover:bg-green-500/20 transition-all duration-300 group`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Twitter className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform" />
        </a>
        <a
          href="praneshvaradharaj@gmail.com"
          className={`p-2 ${cardClasses} rounded-full hover:bg-green-500/20 transition-all duration-300 group`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Mail className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform" />
        </a>
      </div>

      {/* Interactive Navigation - Alpay Celik Style */}
      <nav
        className={`fixed top-0 w-full ${isDarkMode ? "bg-black/60" : "bg-white/60"} backdrop-blur-xl z-40 border-b ${isDarkMode ? "border-white/10" : "border-gray-200/50"} transition-all duration-300`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-center items-center">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`relative px-4 py-2 text-base font-medium transition-all duration-300 rounded-lg group ${
                    activeSection === section.id
                      ? "text-orange-500 bg-orange-500/10 scale-105"
                      : isDarkMode
                        ? "text-gray-300 hover:text-white hover:bg-white/5 hover:scale-105"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 hover:scale-105"
                  }`}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  {activeSection === section.id ? (
                    <span className="flex items-center animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
                      <span className="text-orange-500 mr-1 animate-pulse">{"<"}</span>
                      {section.label}
                      <span className="text-orange-500 ml-1 animate-pulse">{" />"}</span>
                    </span>
                  ) : (
                    <span className="group-hover:animate-pulse">{section.label}</span>
                  )}

                  {/* Interactive hover effect */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Active indicator dot */}
                  {activeSection === section.id && false && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full animate-ping"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <div className="absolute right-6 flex items-center space-x-3">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 group ${isDarkMode ? "bg-white/10 hover:bg-white/20" : "bg-gray-100 hover:bg-gray-200"}`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 text-yellow-400 group-hover:rotate-180 transition-transform duration-500" />
                ) : (
                  <Moon className="w-4 h-4 text-gray-600 group-hover:rotate-12 transition-transform duration-300" />
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden absolute right-6 ${textClasses} hover:scale-110 transition-transform duration-300`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 rotate-90 transition-transform duration-300" />
              ) : (
                <Menu className="w-6 h-6 hover:rotate-180 transition-transform duration-300" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/10 animate-in slide-in-from-top-2 duration-300">
              <div className="flex flex-col space-y-3 pt-4">
                {navSections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`text-left py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105 animate-in slide-in-from-left-2 ${
                      activeSection === section.id
                        ? "text-orange-500 bg-orange-500/10"
                        : isDarkMode
                          ? "text-gray-300 hover:text-white hover:bg-white/5"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    {activeSection === section.id ? (
                      <span>
                        <span className="text-orange-500">{"<"}</span>
                        {section.label}
                        <span className="text-orange-500">{" />"}</span>
                      </span>
                    ) : (
                      section.label
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-8">
            <img
              src="/placeholder.svg?height=200&width=200"
              alt="Profile"
              className="w-48 h-48 rounded-full mx-auto mb-8 border-4 border-green-400 shadow-2xl shadow-green-400/20"
            />
            <h1 className={`text-5xl md:text-7xl font-bold ${textClasses} mb-6`}>
              Pranesh <span className="text-green-400">Kumar</span>
            </h1>
            <p className={`text-xl md:text-2xl ${mutedTextClasses} mb-8`}>Backend Developer & Gen AI Aspirant</p>
            <p className={`text-2xl ${mutedTextClasses} max-w-2xl mx-auto mb-12 leading-relaxed`}>
              Passionate computer science student specializing in backend development and generative AI. Building
              scalable systems and intelligent applications that solve real-world problems.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                onClick={() => scrollToSection("projects")}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-lg shadow-lg shadow-green-600/25"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                View My Work
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                variant="outline"
                className="border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black px-8 py-4 text-lg rounded-lg"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                Get In Touch
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section
        id="about"
        className={`py-20 px-4 ${isDarkMode ? "bg-black/40" : "bg-gradient-to-br from-purple-50/50 to-blue-50/50"}`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl md:text-5xl font-bold ${textClasses} text-center mb-16`}>
            About <span className="text-green-400">Me</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className={`text-2xl font-bold ${textClasses} mb-6`}>Who I Am</h3>
              <p className={`${mutedTextClasses} text-xl leading-relaxed mb-6`}>
                I'm a passionate computer science student with a deep love for backend development and artificial
                intelligence. My journey in tech started with curiosity about how systems work behind the scenes, and it
                has evolved into a mission to build scalable, intelligent applications that make a real difference.
              </p>
              <p className={`${mutedTextClasses} text-xl leading-relaxed mb-8`}>
                When I'm not coding, you'll find me exploring new coffee blends, participating in hackathons, or
                contributing to various tech communities. I believe in continuous learning and sharing knowledge with
                others.
              </p>

              <Button
                onClick={downloadCV}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg shadow-green-600/25 flex items-center gap-2"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <Download className="w-4 h-4" />
                Download CV
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Certificates - Top Left */}
              <Card
                className={`${cardClasses} hover:border-green-400/40 transition-all duration-300 cursor-pointer group hover:scale-105`}
                onClick={() => setActiveModal("certificates")}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <CardContent className="p-6 text-center">
                  <Award className="w-12 h-12 mx-auto mb-4 text-green-400 group-hover:scale-110 transition-transform" />
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    5+
                  </div>
                  <h4 className={`${textClasses} font-semibold`}>Certificates</h4>
                </CardContent>
              </Card>

              {/* Hackathons - Top Right */}
              <Card
                className={`${cardClasses} hover:border-green-400/40 transition-all duration-300 cursor-pointer group hover:scale-105`}
                onClick={() => setActiveModal("hackathons")}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <CardContent className="p-6 text-center">
                  <Trophy className="w-12 h-12 mx-auto mb-4 text-green-400 group-hover:scale-110 transition-transform" />
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    5+
                  </div>
                  <h4 className={`${textClasses} font-semibold`}>Hackathons</h4>
                </CardContent>
              </Card>

              {/* Clubs - Bottom Left */}
              <Card
                className={`${cardClasses} hover:border-green-400/40 transition-all duration-300 cursor-pointer group hover:scale-105`}
                onClick={() => setActiveModal("clubs")}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 mx-auto mb-4 text-green-400 group-hover:scale-110 transition-transform" />
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    2
                  </div>
                  <h4 className={`${textClasses} font-semibold`}>Clubs</h4>
                </CardContent>
              </Card>

              {/* Coffee - Bottom Right */}
              <Card
                className={`${cardClasses} hover:border-green-400/40 transition-all duration-300 cursor-pointer group hover:scale-105`}
                onClick={() => setActiveModal("coffee")}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <CardContent className="p-6 text-center">
                  <Coffee className="w-12 h-12 mx-auto mb-4 text-green-400 group-hover:scale-110 transition-transform" />
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    ∞
                  </div>
                  <h4 className={`${textClasses} font-semibold`}>Caffeine</h4>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl md:text-5xl font-bold ${textClasses} text-center mb-16`}>
            Skills & <span className="text-green-400">Technologies</span>
          </h2>

          {/* Backend Development */}
          <div className="mb-16">
            <h3 className={`text-2xl font-bold ${textClasses} mb-8 flex items-center justify-center`}>
              <Server className="w-8 h-8 mr-3 text-green-400" />
              Backend Development
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {skills.backend.map((skill) => (
                <div
                  key={skill.name}
                  className={`group relative ${cardClasses} rounded-2xl p-5 hover:border-green-400/40 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-400/10`}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <div className="text-center">
                    <div
                      className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${skill.color} p-2.5 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <img
                        src={skill.logo || "/placeholder.svg"}
                        alt={skill.name}
                        className="w-full h-full object-contain filter brightness-0 invert"
                      />
                    </div>
                    <p className={`${textClasses} font-semibold text-sm group-hover:text-green-400 transition-colors`}>
                      {skill.name}
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 to-green-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>

          {/* AI & Machine Learning */}
          <div className="mb-16">
            <h3 className={`text-2xl font-bold ${textClasses} mb-8 flex items-center justify-center`}>
              <Brain className="w-8 h-8 mr-3 text-green-400" />
              AI & Machine Learning
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {skills.ai.map((skill) => (
                <div
                  key={skill.name}
                  className={`group relative ${cardClasses} rounded-2xl p-5 hover:border-green-400/40 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-400/10`}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <div className="text-center">
                    <div
                      className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${skill.color} p-2.5 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <img
                        src={skill.logo || "/placeholder.svg"}
                        alt={skill.name}
                        className="w-full h-full object-contain filter brightness-0 invert"
                      />
                    </div>
                    <p className={`${textClasses} font-semibold text-sm group-hover:text-green-400 transition-colors`}>
                      {skill.name}
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 to-green-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Technologies */}
          <div>
            <h3 className={`text-2xl font-bold ${textClasses} mb-8 flex items-center justify-center`}>
              <Code className="w-8 h-8 mr-3 text-green-400" />
              Tools & Technologies
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {skills.tools.map((skill) => (
                <div
                  key={skill.name}
                  className={`group relative ${cardClasses} rounded-2xl p-5 hover:border-green-400/40 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-400/10`}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <div className="text-center">
                    <div
                      className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${skill.color} p-2.5 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <img
                        src={skill.logo || "/placeholder.svg"}
                        alt={skill.name}
                        className="w-full h-full object-contain filter brightness-0 invert"
                      />
                    </div>
                    <p className={`${textClasses} font-semibold text-sm group-hover:text-green-400 transition-colors`}>
                      {skill.name}
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 to-green-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className={`py-20 px-4 ${isDarkMode ? "bg-black/40" : "bg-gradient-to-br from-indigo-50/50 to-purple-50/50"}`}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl md:text-5xl font-bold ${textClasses} text-center mb-16`}>
            Featured <span className="text-green-400">Projects</span>
          </h2>

          {/* Projects Grid - All Projects */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
            {projects.map((project, index) => (
              <Card
                key={index}
                className={`${cardClasses} hover:border-green-400/40 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-400/10 group overflow-hidden ${index === 0 || index === 3 ? "md:col-span-2 xl:col-span-2" : ""}`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="relative">
                  <div className="absolute top-4 right-4 z-10">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      {index === 0 && (
                        <>
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-green-400 font-semibold text-xs uppercase tracking-wider">
                            Featured
                          </span>
                        </>
                      )}
                    </div>
                    <CardTitle
                      className={`${textClasses} ${index === 0 || index === 3 ? "text-2xl" : "text-xl"} group-hover:text-green-400 transition-colors`}
                    >
                      {project.title}
                    </CardTitle>
                    <CardDescription
                      className={`${mutedTextClasses} leading-relaxed ${index === 0 || index === 3 ? "text-lg" : "text-base"}`}
                    >
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.technologies.slice(0, index === 0 || index === 3 ? 6 : 4).map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="border-green-400/60 text-green-300 bg-green-400/10 text-xs px-2 py-0.5"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > (index === 0 || index === 3 ? 6 : 4) && (
                        <Badge
                          variant="outline"
                          className="border-green-400/60 text-green-300 bg-green-400/10 text-xs px-2 py-0.5"
                        >
                          +{project.technologies.length - (index === 0 || index === 3 ? 6 : 4)}
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center text-green-400 hover:text-green-300 transition-colors font-medium ${index === 0 || index === 3 ? "text-base" : "text-sm"} group/link`}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                      >
                        <Github
                          className={`${index === 0 || index === 3 ? "w-5 h-5" : "w-4 h-4"} mr-1.5 group-hover/link:scale-110 transition-transform`}
                        />
                        View Code
                      </a>
                      {project.demo && (index === 0 || index === 3) && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center text-green-400 hover:text-green-300 transition-colors font-medium ${index === 0 || index === 3 ? "text-base" : "text-sm"} group/link`}
                          onMouseEnter={() => setIsHovering(true)}
                          onMouseLeave={() => setIsHovering(false)}
                        >
                          <ExternalLink
                            className={`${index === 0 || index === 3 ? "w-5 h-5" : "w-4 h-4"} mr-1.5 group-hover/link:scale-110 transition-transform`}
                          />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          {/* View More Projects Button */}
          <div className="text-center">
            <Button
              onClick={() => window.open("https://github.com/username", "_blank")}
              variant="outline"
              className="border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black px-8 py-3 text-lg rounded-lg group"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              View More Projects
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Experience Section - Timeline Format */}
      <section id="experience" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-4xl md:text-5xl font-bold ${textClasses} text-center mb-16`}>
            Professional <span className="text-green-400">Experience</span>
          </h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-400 via-green-500 to-green-600"></div>

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div key={index} className="relative flex items-start">
                  {/* Timeline Dot */}
                  <div className="absolute left-6 w-4 h-4 bg-green-400 rounded-full border-4 border-black shadow-lg shadow-green-400/50 z-10">
                    <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
                  </div>

                  {/* Content Card */}
                  <div className="ml-20 w-full">
                    <Card
                      className={`${cardClasses} hover:border-green-400/40 transition-all duration-300 hover:shadow-xl hover:shadow-green-400/10 hover:scale-105`}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className={`${textClasses} text-xl mb-2 flex items-center`}>
                              <Calendar className="w-5 h-5 mr-2 text-green-400" />
                              {exp.title}
                            </CardTitle>
                            <CardDescription className="text-green-400 text-lg flex items-center gap-2">
                              {exp.website ? (
                                <a
                                  href={exp.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-green-300 transition-colors flex items-center gap-1 font-semibold"
                                  onMouseEnter={() => setIsHovering(true)}
                                  onMouseLeave={() => setIsHovering(false)}
                                >
                                  {exp.company}
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              ) : (
                                <span className="font-semibold">{exp.company}</span>
                              )}
                            </CardDescription>
                          </div>
                          <Badge
                            variant="outline"
                            className="border-green-400/60 text-green-300 bg-green-400/10 whitespace-nowrap"
                          >
                            {exp.duration}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className={`${mutedTextClasses} text-lg leading-relaxed`}>{exp.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

{/* Contact Section */}
      <section
        id="contact"
        className={`py-20 px-4 ${isDarkMode ? "bg-black/40" : "bg-gradient-to-br from-pink-50/50 to-blue-50/50"}`}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl md:text-5xl font-bold ${textClasses} text-center mb-12`}>
            Let's <span className="text-green-400">Connect</span>
          </h2>
          <p className={`text-xl ${mutedTextClasses} text-center mb-16 max-w-2xl mx-auto`}>
            I'm always open to discussing new opportunities and interesting projects. Feel free to reach out!
          </p>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Code Snippet */}
            <Card className={`${isDarkMode ? "bg-black/60" : "bg-gray-900/90"} backdrop-blur-sm border-green-500/20`}>
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center">
                  <Code className="w-5 h-5 mr-2 text-green-400" />
                  Contact Form Structure
                </CardTitle>
                <CardDescription className="text-gray-300">Real-time preview of your form data</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="text-sm text-green-400 font-mono leading-relaxed overflow-x-auto">
                  <code>{codeSnippet}</code>
                </pre>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card className={`${cardClasses}`}>
              <CardHeader>
                <CardTitle className={`${textClasses} text-2xl`}>Send Message</CardTitle>
                <CardDescription className={mutedTextClasses}>
                  Fill out the form below and I'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <Input
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className={`${isDarkMode ? "bg-white/10 border-green-500/30 text-white" : "bg-black/10 border-green-600/30 text-gray-900"} placeholder:text-gray-400 focus:border-green-400`}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className={`${isDarkMode ? "bg-white/10 border-green-500/30 text-white" : "bg-black/10 border-green-600/30 text-gray-900"} placeholder:text-gray-400 focus:border-green-400`}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      className={`${isDarkMode ? "bg-white/10 border-green-500/30 text-white" : "bg-black/10 border-green-600/30 text-gray-900"} placeholder:text-gray-400 focus:border-green-400`}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    />  
                  </div>
                  <div>
                    <Textarea
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      className={`${isDarkMode ? "bg-white/10 border-green-500/30 text-white" : "bg-black/10 border-green-600/30 text-gray-900"} placeholder:text-gray-400 focus:border-green-400 resize-none`}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg shadow-lg shadow-green-600/25"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div
              className={`flex items-center space-x-4 p-6 ${cardClasses} rounded-xl hover:border-green-400/40 transition-all duration-300 hover:scale-105`}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="p-3 bg-green-600/20 rounded-lg">
                <Mail className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className={`${textClasses} font-semibold text-lg mb-1`}>Email</h3>
                <a
                  href="mailto:praneshvaradharaj@gmail.com"
                  className={`${mutedTextClasses} hover:text-green-400 transition-colors`}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  praneshvaradharaj@gmail.com
                </a>
              </div>
            </div>

            <div
              className={`flex items-center space-x-4 p-6 ${cardClasses} rounded-xl hover:border-green-400/40 transition-all duration-300 hover:scale-105`}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="p-3 bg-green-600/20 rounded-lg">
                <Phone className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className={`${textClasses} font-semibold text-lg mb-1`}>Phone</h3>
                <a
                  href="tel:+1234567890"
                  className={`${mutedTextClasses} hover:text-green-400 transition-colors`}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  +91 80726 57356
                </a>
              </div>
            </div>

            <div
              className={`flex items-center space-x-4 p-6 ${cardClasses} rounded-xl hover:border-green-400/40 transition-all duration-300 hover:scale-105`}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="p-3 bg-green-600/20 rounded-lg">
                <MapPin className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className={`${textClasses} font-semibold text-lg mb-1`}>Location</h3>
                <p className={mutedTextClasses}>Chennai, Tamil Nadu</p>
              </div>
            </div>
          </div>

          {/* Follow Me Section */}
          <div className="text-center">
            <h3 className={`${textClasses} font-semibold text-xl mb-6`}>Follow Me</h3>
            <div className="flex justify-center space-x-6">
              <a
                href="https://github.com/PraneshPK2005"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 ${cardClasses} rounded-xl hover:bg-green-600/20 transition-all duration-300 group hover:border-green-400/40 hover:scale-110`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <Github className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.linkedin.com/in/pranesh-pk-362760250/"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 ${cardClasses} rounded-xl hover:bg-green-600/20 transition-all duration-300 group hover:border-green-400/40 hover:scale-110`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <Linkedin className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://twitter.com/username"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 ${cardClasses} rounded-xl hover:bg-green-600/20 transition-all duration-300 group hover:border-green-400/40 hover:scale-110`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <Twitter className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 px-4 border-t ${isDarkMode ? "border-green-500/20" : "border-green-600/30"}`}>
        <div className="max-w-6xl mx-auto text-center">
          <p className={mutedTextClasses}>
            © 2024 Pranesh Kumar. Built with <span className="text-green-400">Next.js</span> and{" "}
            <span className="text-green-400">Tailwind CSS</span>.
          </p>
          <p className={mutedTextClasses}>
            Made with <span className="text-2xl">😵‍💫</span> and lots of{" "}
            <span className="text-2xl">☕☕☕☕</span>
          </p>
        </div>
      </footer>

      {/* Enhanced Modal for About Me sections */}
      <Dialog open={!!activeModal} onOpenChange={() => setActiveModal(null)}>
        <DialogContent
          className={`max-w-5xl max-h-[85vh] overflow-hidden ${isDarkMode ? "bg-gray-900 border-green-500/20" : "bg-white border-green-600/30"} animate-in fade-in-0 zoom-in-95 duration-300 p-0 modal-content`}
        >
          {/* Custom Close Button */}
          <DialogClose className="absolute right-4 top-4 z-50 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-6 w-6 text-green-400 hover:text-green-300 transition-colors" />
            <span className="sr-only">Close</span>
          </DialogClose>

          <div className="flex h-full">
            {/* Green Vertical Sidebar */}
            <div className="w-1 bg-gradient-to-b from-green-400 via-green-500 to-green-600 flex-shrink-0"></div>

            {/* Modal Content with Green Scrollbar */}
            <div className="flex-1 overflow-y-auto modal-scrollbar">
              <DialogHeader className="p-6 pb-4">
                <DialogTitle className={`${textClasses} text-3xl capitalize flex items-center gap-3`}>
                  {activeModal === "certificates" && <Award className="w-8 h-8 text-green-400" />}
                  {activeModal === "hackathons" && <Trophy className="w-8 h-8 text-green-400" />}
                  {activeModal === "caffeine" && <Coffee className="w-8 h-8 text-green-400" />}
                  {activeModal === "clubs" && <Users className="w-8 h-8 text-green-400" />}
                  {activeModal}
                </DialogTitle>
                <DialogDescription className={`${mutedTextClasses} text-lg`}>
                  {activeModal === "certificates" && "My professional certifications and achievements"}
                  {activeModal === "hackathons" && "Competition wins and hackathon participation"}
                  {activeModal === "caffeine" && "My favorite coding fuel and caffeine preferences"}
                  {activeModal === "clubs" && "Community involvement and leadership roles"}
                </DialogDescription>
              </DialogHeader>

              <div className="px-6 pb-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 modal-cards-container max-h-[60vh] overflow-y-auto">
                  {activeModal &&
                    modalData[activeModal as keyof typeof modalData]?.map((item, index) => (
                      <Card
                        key={index}
                        className={`${cardClasses} hover:border-green-400/40 transition-all duration-300 hover:scale-105 animate-in fade-in-0 slide-in-from-bottom-4`}
                        style={{ animationDelay: `${index * 100}ms` }}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                      >
                        <CardContent className="p-4">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            className="w-full h-32 object-cover rounded-lg mb-4"
                          />
                          <h4 className={`${textClasses} font-semibold mb-2 text-lg`}>{item.title}</h4>
                          {"issuer" in item && <p className="text-green-400 text-sm mb-1 font-medium">{item.issuer}</p>}
                          {"position" in item && (
                            <p className="text-green-400 text-sm mb-1 font-medium">{item.position}</p>
                          )}
                          {"type" in item && <p className="text-green-400 text-sm mb-1 font-medium">{item.type}</p>}
                          {"role" in item && <p className="text-green-400 text-sm mb-1 font-medium">{item.role}</p>}
                          {"notes" in item && <p className="text-green-400 text-sm mb-1 font-medium">{item.notes}</p>}
                          {"date" in item && <p className={`${mutedTextClasses} text-sm mb-2`}>{item.date}</p>}
                          {"duration" in item && <p className={`${mutedTextClasses} text-sm mb-2`}>{item.duration}</p>}
                          <p className={`${mutedTextClasses} text-sm leading-relaxed`}>{item.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}