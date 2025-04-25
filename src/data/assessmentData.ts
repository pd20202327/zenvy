
import { AssessmentQuestion, AssessmentSection, AssessmentSectionKey } from '@/types/assessment';

export const assessmentQuestions: AssessmentQuestion[] = [
  // Mood and Emotional Health (5 Questions)
  { id: 1, text: "Do you frequently feel sad, numb, or emotionally flat for days at a time?", section: "mood" },
  { id: 2, text: "Have you lost interest in activities or people you once enjoyed?", section: "mood" },
  { id: 3, text: "Do you often feel like a burden to others, even without reason?", section: "mood" },
  { id: 4, text: "Do you experience mood swings that feel out of your control?", section: "mood" },
  { id: 5, text: "Have you found yourself crying unexpectedly or excessively?", section: "mood" },
  
  // Thought Patterns and Cognition (5 Questions)
  { id: 6, text: "Do you often have persistent negative thoughts about yourself or your future?", section: "thoughts" },
  { id: 7, text: "Do you struggle to concentrate or make even simple decisions?", section: "thoughts" },
  { id: 8, text: "Do your thoughts sometimes feel overwhelming or racing, especially at night?", section: "thoughts" },
  { id: 9, text: "Do you frequently think that nothing will ever get better?", section: "thoughts" },
  { id: 10, text: "Do you replay past mistakes or conversations obsessively?", section: "thoughts" },
  
  // Anxiety and Stress Response (5 Questions)
  { id: 11, text: "Do you feel constant or unexplained worry, even when things are okay?", section: "anxiety" },
  { id: 12, text: "Do you avoid situations because they make you anxious or panicky?", section: "anxiety" },
  { id: 13, text: "Does your chest tighten, your heart race, or breathing become shallow during stress?", section: "anxiety" },
  { id: 14, text: "Do you often feel on edge or like something bad is about to happen?", section: "anxiety" },
  { id: 15, text: "Do small tasks or responsibilities overwhelm you easily?", section: "anxiety" },
  
  // Sleep and Energy (5 Questions)
  { id: 16, text: "Do you struggle to fall or stay asleep almost every night?", section: "sleep" },
  { id: 17, text: "Do you sleep too much but still feel tired or exhausted?", section: "sleep" },
  { id: 18, text: "Do you dread waking up to face the day?", section: "sleep" },
  { id: 19, text: "Do you rely on caffeine, energy drinks, or naps to stay functional?", section: "sleep" },
  { id: 20, text: "Have you had multiple days where you felt too fatigued to get out of bed?", section: "sleep" },
  
  // Self-Image and Self-Worth (5 Questions)
  { id: 21, text: "Do you often feel worthless or unlovable?", section: "selfImage" },
  { id: 22, text: "Do you compare yourself to others and always feel inferior?", section: "selfImage" },
  { id: 23, text: "Do you find it difficult to accept compliments or feel you don't deserve them?", section: "selfImage" },
  { id: 24, text: "Do you hate looking at yourself in the mirror?", section: "selfImage" },
  { id: 25, text: "Do you feel like you have no purpose or value in life?", section: "selfImage" },
  
  // Relationships and Social Withdrawal (5 Questions)
  { id: 26, text: "Do you push people away or isolate yourself even when you're lonely?", section: "relationships" },
  { id: 27, text: "Have you stopped reaching out to friends or family?", section: "relationships" },
  { id: 28, text: "Do you feel like no one truly understands you?", section: "relationships" },
  { id: 29, text: "Are you afraid of being vulnerable because of past betrayals?", section: "relationships" },
  { id: 30, text: "Do social events exhaust or terrify you instead of making you happy?", section: "relationships" },
  
  // Harmful Thoughts or Behaviors (5 Questions)
  { id: 31, text: "Do you ever think about hurting yourself or ending your life?", section: "harmful" },
  { id: 32, text: "Have you engaged in self-harm or reckless behavior recently?", section: "harmful" },
  { id: 33, text: "Do you ever fantasize about disappearing or no longer existing?", section: "harmful" },
  { id: 34, text: "Have you had suicidal thoughts but felt too ashamed to tell anyone?", section: "harmful" },
  { id: 35, text: "Do you sometimes wish for an accident or event to take you away from your current life?", section: "harmful" },
  
  // Sense of Reality and Control (5 Questions)
  { id: 36, text: "Do you ever feel detached from your body or surroundings (like you're observing yourself)?", section: "reality" },
  { id: 37, text: "Do you hear or see things others don't?", section: "reality" },
  { id: 38, text: "Do you feel like your mind is out of control or being influenced?", section: "reality" },
  { id: 39, text: "Do you question what's real and what's not, even when it's obvious to others?", section: "reality" },
  { id: 40, text: "Have you had memory lapses you can't explain?", section: "reality" }
];

export const assessmentSections: Record<AssessmentSectionKey, AssessmentSection> = {
  mood: {
    key: "mood",
    title: "Mood and Emotional Health",
    description: "Assessing emotional stability, mood changes, and overall emotional well-being.",
    iconClass: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    questions: assessmentQuestions.filter(q => q.section === "mood"),
    maxScore: 20,
    severityLevels: {
      stable: { min: 0, max: 5, label: "Stable Mood", description: "You seem to have good emotional balance and resilience. Keep nurturing your emotional health." },
      mild: { min: 6, max: 10, label: "Mild Emotional Distress", description: "Occasional low moods are normal, but try practicing emotional self-awareness and mindfulness." },
      moderate: { min: 11, max: 15, label: "Moderate Depression Indicators", description: "Persistent low mood is a concern. Consider talking to someone you trust or a counselor." },
      severe: { min: 16, max: 20, label: "Severe Depression Risk", description: "You may be experiencing clinical depression. Please seek help from a mental health professional immediately." }
    }
  },
  thoughts: {
    key: "thoughts",
    title: "Thought Patterns and Cognition",
    description: "Evaluating cognitive processes, thought patterns, and mental clarity.",
    iconClass: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    questions: assessmentQuestions.filter(q => q.section === "thoughts"),
    maxScore: 20,
    severityLevels: {
      clear: { min: 0, max: 5, label: "Clear and Balanced Thinking", description: "Your cognitive processes seem healthy. Keep engaging in mentally stimulating and positive activities." },
      mild: { min: 6, max: 10, label: "Occasional Negative Thinking", description: "Some negativity or overthinking is okay, but monitor it so it doesn't become habitual." },
      moderate: { min: 11, max: 15, label: "Cognitive Distortion Signs", description: "Negative thought patterns may be affecting your daily life. Consider cognitive-behavioral tools or therapy." },
      severe: { min: 16, max: 20, label: "Severe Cognitive Overload", description: "Your thoughts may be significantly impacting your mental clarity. Professional help is recommended." }
    }
  },
  anxiety: {
    key: "anxiety",
    title: "Anxiety and Stress Response",
    description: "Measuring anxiety levels, stress responses, and coping mechanisms.",
    iconClass: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
    questions: assessmentQuestions.filter(q => q.section === "anxiety"),
    maxScore: 20,
    severityLevels: {
      low: { min: 0, max: 5, label: "Low Anxiety Levels", description: "You appear calm and in control of your stress. Continue using healthy coping strategies." },
      mild: { min: 6, max: 10, label: "Mild Anxiety", description: "Stress might be creeping in. Try relaxation methods like breathing exercises or journaling." },
      moderate: { min: 11, max: 15, label: "Moderate Anxiety Symptoms", description: "Anxiety seems to be affecting your life. Identify triggers and consider professional guidance." },
      severe: { min: 16, max: 20, label: "High Anxiety or Panic Risk", description: "You may be dealing with chronic anxiety. Therapy or medical intervention can help." }
    }
  },
  sleep: {
    key: "sleep",
    title: "Sleep and Energy",
    description: "Assessing sleep patterns, energy levels, and daily functioning.",
    iconClass: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300",
    questions: assessmentQuestions.filter(q => q.section === "sleep"),
    maxScore: 20,
    severityLevels: {
      healthy: { min: 0, max: 5, label: "Healthy Sleep Habits", description: "Your rest and energy levels are within a healthy range. Maintain consistent sleep hygiene." },
      mild: { min: 6, max: 10, label: "Mild Disruption", description: "You might be slightly sleep-deprived. Try regulating your sleep cycle and limiting screen time at night." },
      moderate: { min: 11, max: 15, label: "Moderate Fatigue & Sleep Issues", description: "Your energy levels could be affecting your focus and mood. A medical check-up or therapy may help." },
      severe: { min: 16, max: 20, label: "Severe Sleep Disturbance", description: "Chronic fatigue or insomnia needs immediate attention. Reach out to a doctor or therapist." }
    }
  },
  selfImage: {
    key: "selfImage",
    title: "Self-Image and Self-Worth",
    description: "Exploring self-perception, confidence, and personal value.",
    iconClass: "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300",
    questions: assessmentQuestions.filter(q => q.section === "selfImage"),
    maxScore: 20,
    severityLevels: {
      positive: { min: 0, max: 5, label: "Positive Self-Perception", description: "You seem to value yourself well. Keep building confidence and self-love." },
      mild: { min: 6, max: 10, label: "Occasional Doubt", description: "Everyone questions their worth sometimes—just don't let it define you." },
      moderate: { min: 11, max: 15, label: "Low Self-Esteem Patterns", description: "You may be struggling with self-worth. Start building affirmations and seek emotional support." },
      severe: { min: 16, max: 20, label: "Critical Self-Image", description: "Persistent negative self-perception is serious. Therapy can guide you toward self-acceptance." }
    }
  },
  relationships: {
    key: "relationships",
    title: "Relationships and Social Withdrawal",
    description: "Examining social connections, isolation, and relationship patterns.",
    iconClass: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    questions: assessmentQuestions.filter(q => q.section === "relationships"),
    maxScore: 20,
    severityLevels: {
      healthy: { min: 0, max: 5, label: "Healthy Social Connections", description: "You seem socially engaged and emotionally open. Great!" },
      mild: { min: 6, max: 10, label: "Some Social Strain", description: "It's okay to take space, but don't isolate for too long." },
      moderate: { min: 11, max: 15, label: "Emotional Detachment", description: "Emotional withdrawal might be a defense mechanism. Reconnection and trust-building are needed." },
      severe: { min: 16, max: 20, label: "Severe Social Isolation", description: "You may be feeling very alone. Please consider reaching out or joining a support group." }
    }
  },
  harmful: {
    key: "harmful",
    title: "Harmful Thoughts or Behaviors",
    description: "Assessing risk levels and safety concerns.",
    iconClass: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    questions: assessmentQuestions.filter(q => q.section === "harmful"),
    maxScore: 20,
    severityLevels: {
      safe: { min: 0, max: 5, label: "No Immediate Risk", description: "You show resilience in dark moments. Keep leaning into hope and support systems." },
      mild: { min: 6, max: 10, label: "Mild Intrusive Thoughts", description: "These thoughts can be scary but are not uncommon. Please don't ignore them—talk to someone." },
      moderate: { min: 11, max: 15, label: "Moderate Risk Behavior Indicators", description: "Your emotional pain might be intense. Confidential help from professionals is a safe option." },
      severe: { min: 16, max: 20, label: "Severe Crisis Risk", description: "You are in urgent need of support. Please contact a crisis line or mental health professional immediately." }
    }
  },
  reality: {
    key: "reality",
    title: "Sense of Reality and Control",
    description: "Evaluating perception, reality testing, and mental control.",
    iconClass: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
    questions: assessmentQuestions.filter(q => q.section === "reality"),
    maxScore: 20,
    severityLevels: {
      grounded: { min: 0, max: 5, label: "Grounded and Self-Aware", description: "Your perception of reality seems stable. Great self-awareness!" },
      mild: { min: 6, max: 10, label: "Mild Detachment or Confusion", description: "Brief disconnection is okay, but frequent episodes should be monitored." },
      moderate: { min: 11, max: 15, label: "Dissociation or Distortion Signs", description: "Your connection to reality may be unstable. This could be trauma-related—professional help can guide you." },
      severe: { min: 16, max: 20, label: "Severe Disconnection from Reality", description: "These symptoms are serious and might indicate a psychotic or dissociative condition. Please seek urgent psychiatric evaluation." }
    }
  }
};

export const answerOptions = [
  { value: 0, label: "Strongly Disagree" },
  { value: 1, label: "Disagree" },
  { value: 2, label: "Neutral / Sometimes" },
  { value: 3, label: "Agree" },
  { value: 4, label: "Strongly Agree" }
];
