'use client';

import { useState } from 'react';

interface SyllabusSection {
  title: string;
  topics: string[];
}

const syllabusData: SyllabusSection[] = [
  {
    title: "Beginner",
    topics: [
      "Variables in Python",
      "String Manipulation",
      "Input and Print Functions",
      "Variable Naming Rules",
      "Mathematical Operations in Python",
      "DataTypes",
      "Converting types",
      "Conditionals IF/ELIF/ELSE",
      "Logical Operators",
      "Randomisation",
      "Error Handling",
      "Functions",
      "For Loops",
      "Code blocks and Indentation",
      "While Loops",
      "Flowchart Programming",
      "Positional and Keyword Arguments",
      "Python Dictionaries and Lists",
      "Nested Collections",
      "Returning Functions",
      "Return vs. Print",
      "Doc Strings vs. Comments",
      "Scope and Local/Global Variables",
      "Debugging Technique"
    ]
  },
  {
    title: "Intermediate",
    topics: [
      "Local Development Environment Setup",
      "PyCharm Tips and Tricks",
      "Python Object Oriented Programming",
      "Creating Classes in Python",
      "Using External Python Modules/Import",
      "Getting / Setting Attributes",
      "Python Methods",
      "Class Initialisers",
      "Module Aliasing",
      "Optional, Required and Default Parameters",
      "Event Listenters",
      "Python Instances and State",
      "Python Turtle",
      "Game Development with Python and OOP",
      "Python Inheritance",
      "Python Slice Function",
      "File I/O Reading and Writing to Local Files",
      "File Directories",
      "Reading and Writing to CSV",
      "Introduction to the Pandas Framework",
      "List Comprehensions",
      "Dictionary Comprehensions",
      "Packing and Unpacking Functions in Python",
      "Creating Desktop GUI Apps with Tkinter",
      "Strongly Dynamic Typing",
      "Error Handling and Exceptions",
      "Try / Except/ Raise",
      "Working with JSONs",
      "Local Persistence",
      "Sending Email with Python and SMTP",
      "Working with date and time",
      "Hosting Python Code Online with PythonAnywhere"
    ]
  },
  {
    title: "Intermediate Plus",
    topics: [
      "APIs",
      "Making HTTP Requests with the Requests module",
      "Sending Parameters with the Request",
      "APIs with Authentication",
      "Sending SMS with Python",
      "Web Scraping with Beautiful Soup",
      "Browser Automation with Selenium Web Driver",
      "Automating Tinder",
      "Automating Twitter",
      "Automating LinkedIn",
      "Automating Instagram",
      "Web Development with Flask",
      "Command Line",
      "Python Decorators",
      "Templating with Jinja",
      "WTForm"
    ]
  },
  {
    title: "Advanced Python",
    topics: [
      "Array Slicing and Subsetting",
      "Matrix Multiplication",
      "Bitwise and Operators in Pandas",
      "Creating Bubble Charts with Seaborn",
      "Running Regressions with Scikit-Learn",
      "Non-Parametric Regression",
      "Students T-Tests and Histograms with Scikit-Learn",
      "Multi-Variable Regression",
      "Log Transformations",
      "Residuals Analysis"
    ]
  },
  {
    title: "Professional Portfolio Projects",
    topics: [
      "Text to Morse Code Converter",
      "Portfolio Website",
      "Tic Tac Toe Game",
      "Image Watermarking App",
      "Typing Speed Test",
      "Breakout Game",
      "Cafe and Wifi Website",
      "Todo List Website",
      "Disappearing Text Writing App",
      "Image Color Palette Generator",
      "Custom Web Scraper",
      "Automating the Google Dinosaur Game",
      "Space Invaders Game",
      "Custom API Driven Website",
      "An Online Shop",
      "Custom Browser Automation",
      "Analyse and Visualise the Space Race",
      "Analyse Deaths Involving the Police in the US",
      "Predict Earnings using Multivariable Regression"
    ]
  }
];

export default function Syllabus() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Course Syllabus</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isOpen ? 'Hide Syllabus' : 'View Syllabus'}
        </button>
      </div>

      {isOpen && (
        <div className="space-y-8 animate-fade-in">
          {syllabusData.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-2xl font-semibold text-blue-600">{section.title}</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.topics.map((topic) => (
                  <li key={topic} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 