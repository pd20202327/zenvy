
import { AssessmentQuestion, AssessmentSection, AssessmentSectionKey } from '@/types/assessment';

export const assessmentQuestions: AssessmentQuestion[] = [
  // Mood & Depression (8 Questions)
  { id: 1, text: "I feel down, hopeless, or empty.", section: "mood" },
  { id: 2, text: "I no longer enjoy activities I used to find pleasurable.", section: "mood" },
  { id: 3, text: "I feel tired or low on energy, even after rest.", section: "mood" },
  { id: 4, text: "I find it hard to concentrate or make decisions.", section: "mood" },
  { id: 5, text: "I feel like a failure or that I've let others down.", section: "mood" },
  { id: 6, text: "I have trouble sleeping or sleep too much.", section: "mood" },
  { id: 7, text: "I've experienced changes in my appetite or weight.", section: "mood" },
  { id: 8, text: "I feel life isn't worth living or have had thoughts of self-harm.", section: "mood" },
  
  // Anxiety & Stress (7 Questions)
  { id: 9, text: "I feel nervous, anxious, or on edge.", section: "anxiety" },
  { id: 10, text: "I worry too much about different things.", section: "anxiety" },
  { id: 11, text: "I find it hard to relax or feel calm.", section: "anxiety" },
  { id: 12, text: "I get easily irritated or frustrated.", section: "anxiety" },
  { id: 13, text: "I experience physical symptoms like racing heart, sweating, or shaking.", section: "anxiety" },
  { id: 14, text: "I avoid places, people, or situations that make me anxious.", section: "anxiety" },
  { id: 15, text: "I overthink or replay past events constantly.", section: "anxiety" },
  
  // Self-Esteem & Confidence (5 Questions)
  { id: 16, text: "I often feel that I'm not good enough.", section: "selfEsteem" },
  { id: 17, text: "I compare myself negatively to others.", section: "selfEsteem" },
  { id: 18, text: "I feel ashamed of who I am.", section: "selfEsteem" },
  { id: 19, text: "I avoid trying new things because I fear failure or embarrassment.", section: "selfEsteem" },
  { id: 20, text: "I struggle to accept compliments or positive feedback.", section: "selfEsteem" },
  
  // Loneliness & Relationships (5 Questions)
  { id: 21, text: "I feel disconnected or isolated from others.", section: "relationships" },
  { id: 22, text: "I feel like no one truly understands me.", section: "relationships" },
  { id: 23, text: "I have difficulty trusting people.", section: "relationships" },
  { id: 24, text: "I feel needy or clingy in relationships, or push people away.", section: "relationships" },
  { id: 25, text: "I often feel rejected or abandoned.", section: "relationships" },
  
  // Anger & Control (5 Questions)
  { id: 26, text: "I get angry quickly or easily.", section: "anger" },
  { id: 27, text: "I have difficulty controlling my temper.", section: "anger" },
  { id: 28, text: "I regret things I've said or done in anger.", section: "anger" },
  { id: 29, text: "I feel people often provoke me or don't respect me.", section: "anger" },
  { id: 30, text: "I hold onto grudges or can't forgive easily.", section: "anger" },
  
  // Trauma & Past Experiences (5 Questions)
  { id: 31, text: "I have flashbacks or intrusive memories of a painful event.", section: "trauma" },
  { id: 32, text: "I avoid thinking or talking about something traumatic that happened.", section: "trauma" },
  { id: 33, text: "I feel numb or disconnected from the world.", section: "trauma" },
  { id: 34, text: "I get startled or frightened easily.", section: "trauma" },
  { id: 35, text: "I feel unsafe, even when nothing is wrong.", section: "trauma" },
  
  // Functioning & Motivation (5 Questions)
  { id: 36, text: "I struggle to get out of bed or start my day.", section: "functioning" },
  { id: 37, text: "I procrastinate or avoid important tasks.", section: "functioning" },
  { id: 38, text: "I feel overwhelmed by simple responsibilities.", section: "functioning" },
  { id: 39, text: "I find it hard to stay motivated or focused.", section: "functioning" },
  { id: 40, text: "I feel like I'm not making progress in life.", section: "functioning" }
];

export const assessmentSections: Record<AssessmentSectionKey, AssessmentSection> = {
  mood: {
    key: "mood",
    title: "Mood & Depression",
    description: "Assessing symptoms of low mood, energy, interest, and thoughts of self-worth.",
    iconClass: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    questions: assessmentQuestions.filter(q => q.section === "mood"),
    maxScore: 32, // 8 questions * 4 max score
    severityLevels: {
      minimal: { min: 0, max: 5, label: "Minimal", description: "Your responses suggest minimal symptoms of depression." },
      mild: { min: 6, max: 10, label: "Mild", description: "Your responses indicate mild symptoms of depression." },
      moderate: { min: 11, max: 20, label: "Moderate", description: "Your responses suggest moderate symptoms of depression." },
      moderatelySevere: { min: 21, max: 26, label: "Moderately Severe", description: "Your responses indicate moderately severe symptoms of depression." },
      severe: { min: 27, max: 32, label: "Severe", description: "Your responses suggest severe symptoms of depression." }
    }
  },
  anxiety: {
    key: "anxiety",
    title: "Anxiety & Stress",
    description: "Measures generalized anxiety, worry, physical symptoms, and avoidance.",
    iconClass: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    questions: assessmentQuestions.filter(q => q.section === "anxiety"),
    maxScore: 28, // 7 questions * 4 max score
    severityLevels: {
      minimal: { min: 0, max: 4, label: "Minimal", description: "Your responses suggest minimal symptoms of anxiety." },
      mild: { min: 5, max: 9, label: "Mild", description: "Your responses indicate mild symptoms of anxiety." },
      moderate: { min: 10, max: 15, label: "Moderate", description: "Your responses suggest moderate symptoms of anxiety." },
      moderatelySevere: { min: 16, max: 21, label: "Moderately Severe", description: "Your responses indicate moderately severe symptoms of anxiety." },
      severe: { min: 22, max: 28, label: "Severe", description: "Your responses suggest severe symptoms of anxiety." }
    }
  },
  selfEsteem: {
    key: "selfEsteem",
    title: "Self-Esteem & Confidence",
    description: "Explores self-image, confidence, and fear of judgment.",
    iconClass: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    questions: assessmentQuestions.filter(q => q.section === "selfEsteem"),
    maxScore: 20, // 5 questions * 4 max score
    severityLevels: {
      healthy: { min: 0, max: 4, label: "Healthy", description: "Your responses suggest healthy self-esteem." },
      mild: { min: 5, max: 9, label: "Mild Self-Doubt", description: "Your responses indicate mild self-doubt." },
      low: { min: 10, max: 14, label: "Low Self-Esteem", description: "Your responses suggest low self-esteem." },
      severe: { min: 15, max: 20, label: "Severe Negative Self-View", description: "Your responses indicate a severe negative self-view." }
    }
  },
  relationships: {
    key: "relationships",
    title: "Loneliness & Relationships",
    description: "Focuses on emotional connection, trust, and relationship struggles.",
    iconClass: "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300",
    questions: assessmentQuestions.filter(q => q.section === "relationships"),
    maxScore: 20, // 5 questions * 4 max score
    severityLevels: {
      connected: { min: 0, max: 4, label: "Connected", description: "Your responses suggest you feel socially connected." },
      occasionally: { min: 5, max: 9, label: "Occasionally Lonely", description: "Your responses indicate occasional feelings of loneliness." },
      moderately: { min: 10, max: 14, label: "Moderately Lonely", description: "Your responses suggest moderate feelings of loneliness." },
      deeply: { min: 15, max: 20, label: "Deep Isolation", description: "Your responses indicate deep feelings of isolation." }
    }
  },
  anger: {
    key: "anger",
    title: "Anger & Control",
    description: "Examines impulsive anger, resentment, and emotional regulation.",
    iconClass: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    questions: assessmentQuestions.filter(q => q.section === "anger"),
    maxScore: 20, // 5 questions * 4 max score
    severityLevels: {
      calm: { min: 0, max: 4, label: "Calm/Healthy", description: "Your responses suggest healthy emotional regulation." },
      irritable: { min: 5, max: 9, label: "Irritable", description: "Your responses indicate occasional irritability." },
      trouble: { min: 10, max: 14, label: "Trouble Managing Anger", description: "Your responses suggest trouble managing anger." },
      severe: { min: 15, max: 20, label: "Severe Emotional Reactivity", description: "Your responses indicate severe emotional reactivity." }
    }
  },
  trauma: {
    key: "trauma",
    title: "Trauma & Past Experiences",
    description: "Evaluates impact of past trauma or emotionally painful experiences.",
    iconClass: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
    questions: assessmentQuestions.filter(q => q.section === "trauma"),
    maxScore: 20, // 5 questions * 4 max score
    severityLevels: {
      noImpact: { min: 0, max: 4, label: "No Impact", description: "Your responses suggest minimal trauma symptoms." },
      minor: { min: 5, max: 9, label: "Minor Symptoms", description: "Your responses indicate minor trauma symptoms." },
      indicators: { min: 10, max: 14, label: "Trauma Indicators", description: "Your responses suggest trauma indicators." },
      likely: { min: 15, max: 20, label: "Likely PTSD Symptoms", description: "Your responses indicate likely PTSD symptoms." }
    }
  },
  functioning: {
    key: "functioning",
    title: "Functioning & Motivation",
    description: "Captures daily functioning, procrastination, and goal orientation.",
    iconClass: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300",
    questions: assessmentQuestions.filter(q => q.section === "functioning"),
    maxScore: 20, // 5 questions * 4 max score
    severityLevels: {
      high: { min: 0, max: 4, label: "High Functioning", description: "Your responses suggest high daily functioning." },
      occasional: { min: 5, max: 9, label: "Occasional Blocks", description: "Your responses indicate occasional functioning blocks." },
      persistent: { min: 10, max: 14, label: "Persistent Difficulties", description: "Your responses suggest persistent functioning difficulties." },
      impaired: { min: 15, max: 20, label: "Daily Function Impaired", description: "Your responses indicate impaired daily functioning." }
    }
  }
};

export const answerOptions = [
  { value: 0, label: "Not at all" },
  { value: 1, label: "Several days" },
  { value: 2, label: "More than half the days" },
  { value: 3, label: "Nearly every day" },
  { value: 4, label: "Constantly / Always" }
];
