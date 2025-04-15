
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, Download, Trash2, ArrowLeft, Save } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  promptType: string;
}

const promptTypes = [
  {
    id: 'general',
    name: 'General Reflection',
    prompts: [
      "What are three things that went well today?",
      "What's on your mind right now?",
      "What are you feeling grateful for today?",
      "What's challenging you right now? How might you overcome it?",
      "Describe your current emotions and their possible sources."
    ]
  },
  {
    id: 'anxiety',
    name: 'Anxiety Reflection',
    prompts: [
      "What specific worries are on your mind today?",
      "When did you notice anxiety today, and what was happening at that moment?",
      "What physical sensations do you notice when you're anxious?",
      "What's one small step you could take to address a current worry?",
      "What helps you feel calmer when you're anxious?"
    ]
  },
  {
    id: 'selfcare',
    name: 'Self-Care Check-in',
    prompts: [
      "How did you take care of yourself today?",
      "What is one thing your body needs right now?",
      "What activity makes you feel most at peace?",
      "What boundaries do you need to set or maintain for your wellbeing?",
      "What would be a small act of kindness you could do for yourself today?"
    ]
  },
  {
    id: 'gratitude',
    name: 'Gratitude Journal',
    prompts: [
      "List three things you're grateful for today and why.",
      "Who is someone you appreciate in your life and what qualities do you value in them?",
      "What's something simple that brought you joy recently?",
      "What's something your body did for you today that you're thankful for?",
      "What's an opportunity you're grateful to have right now?"
    ]
  }
];

const Journal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<JournalEntry>({
    id: '',
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    promptType: 'general'
  });
  const [selectedPromptType, setSelectedPromptType] = useState('general');
  const [currentPrompt, setCurrentPrompt] = useState('');
  const { toast } = useToast();
  
  // Load entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);
  
  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);
  
  // Get a random prompt when prompt type changes
  useEffect(() => {
    const promptType = promptTypes.find(p => p.id === selectedPromptType);
    if (promptType) {
      const randomIndex = Math.floor(Math.random() * promptType.prompts.length);
      setCurrentPrompt(promptType.prompts[randomIndex]);
    }
  }, [selectedPromptType]);
  
  // Create a new entry
  const createNewEntry = () => {
    setCurrentEntry({
      id: '',
      title: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      promptType: selectedPromptType
    });
  };
  
  // Get a new prompt
  const getNewPrompt = () => {
    const promptType = promptTypes.find(p => p.id === selectedPromptType);
    if (promptType) {
      const randomIndex = Math.floor(Math.random() * promptType.prompts.length);
      setCurrentPrompt(promptType.prompts[randomIndex]);
    }
  };
  
  // Select an entry to edit
  const selectEntry = (entryId: string) => {
    const entry = entries.find(e => e.id === entryId);
    if (entry) {
      setCurrentEntry(entry);
    }
  };
  
  // Save the current entry
  const saveEntry = () => {
    if (!currentEntry.title.trim()) {
      toast({
        title: "Entry needs a title",
        description: "Please add a title to your journal entry.",
        variant: "destructive",
      });
      return;
    }
    
    if (!currentEntry.content.trim()) {
      toast({
        title: "Entry is empty",
        description: "Please write something in your journal entry.",
        variant: "destructive",
      });
      return;
    }
    
    const now = new Date();
    
    if (currentEntry.id) {
      // Update existing entry
      setEntries(entries.map(entry => 
        entry.id === currentEntry.id ? { ...currentEntry, date: now.toISOString().split('T')[0] } : entry
      ));
    } else {
      // Create new entry
      const newEntry = {
        ...currentEntry,
        id: now.getTime().toString(),
        date: now.toISOString().split('T')[0]
      };
      setEntries([newEntry, ...entries]);
      setCurrentEntry(newEntry);
    }
    
    toast({
      title: "Entry saved",
      description: "Your journal entry has been saved successfully.",
    });
  };
  
  // Delete an entry
  const deleteEntry = (entryId: string) => {
    setEntries(entries.filter(entry => entry.id !== entryId));
    if (currentEntry.id === entryId) {
      createNewEntry();
    }
    toast({
      title: "Entry deleted",
      description: "Your journal entry has been deleted.",
    });
  };
  
  // Download entry as text file
  const downloadEntry = () => {
    if (!currentEntry.title || !currentEntry.content) return;
    
    const entryText = `
${currentEntry.title}
Date: ${currentEntry.date}
Type: ${promptTypes.find(p => p.id === currentEntry.promptType)?.name || currentEntry.promptType}

${currentEntry.content}
    `.trim();
    
    const blob = new Blob([entryText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `journal-${currentEntry.date}-${currentEntry.title.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Entry downloaded",
      description: "Your journal entry has been downloaded as a text file.",
    });
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link to="/tools">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Tools
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Guided Journaling</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Entries</CardTitle>
              <CardDescription>
                {entries.length} total entries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={createNewEntry} className="w-full mb-4">
                New Entry
              </Button>
              
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                {entries.length === 0 ? (
                  <p className="text-muted-foreground text-sm text-center py-4">
                    No entries yet. Start writing!
                  </p>
                ) : (
                  entries.map(entry => (
                    <div 
                      key={entry.id}
                      onClick={() => selectEntry(entry.id)}
                      className={`p-3 rounded-md cursor-pointer border ${
                        currentEntry.id === entry.id ? 'border-primary bg-primary/10' : 'border-border'
                      } hover:border-primary transition-colors`}
                    >
                      <h3 className="font-medium truncate">{entry.title}</h3>
                      <p className="text-xs text-muted-foreground">{formatDate(entry.date)}</p>
                      <p className="text-xs text-muted-foreground truncate">{entry.content}</p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Journal Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Write freely without judging your thoughts</li>
                <li>• There are no "wrong" entries</li>
                <li>• Try to journal regularly, even briefly</li>
                <li>• Be honest with yourself</li>
                <li>• Look back to see patterns in your thoughts</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <Label htmlFor="entry-title">Entry Title</Label>
                  <Input
                    id="entry-title"
                    value={currentEntry.title}
                    onChange={(e) => setCurrentEntry({...currentEntry, title: e.target.value})}
                    placeholder="Title your entry..."
                    className="max-w-sm"
                  />
                </div>
                <div className="flex space-x-2">
                  {currentEntry.id && (
                    <>
                      <Button variant="outline" size="sm" onClick={downloadEntry}>
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => deleteEntry(currentEntry.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <Tabs defaultValue="write" className="w-full">
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="write">Write</TabsTrigger>
                  <TabsTrigger value="prompt">Get Prompted</TabsTrigger>
                </TabsList>
                
                <TabsContent value="write" className="space-y-4">
                  <Textarea 
                    value={currentEntry.content}
                    onChange={(e) => setCurrentEntry({...currentEntry, content: e.target.value})}
                    placeholder="Start writing your thoughts..."
                    className="min-h-[300px] resize-none"
                  />
                </TabsContent>
                
                <TabsContent value="prompt" className="space-y-4">
                  <div className="flex flex-col space-y-2 mb-4">
                    <Label htmlFor="prompt-type">Choose prompt type</Label>
                    <Select 
                      value={selectedPromptType} 
                      onValueChange={(value) => {
                        setSelectedPromptType(value);
                        setCurrentEntry({...currentEntry, promptType: value});
                      }}
                    >
                      <SelectTrigger id="prompt-type">
                        <SelectValue placeholder="Select a prompt type" />
                      </SelectTrigger>
                      <SelectContent>
                        {promptTypes.map(type => (
                          <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Alert className="bg-accent/20 border-accent">
                    <AlertTitle className="flex items-center">
                      Prompt: 
                      <Button variant="ghost" size="sm" className="ml-auto" onClick={getNewPrompt}>
                        Get New Prompt
                      </Button>
                    </AlertTitle>
                    <AlertDescription className="italic">
                      {currentPrompt}
                    </AlertDescription>
                  </Alert>
                  
                  <Textarea 
                    value={currentEntry.content}
                    onChange={(e) => setCurrentEntry({...currentEntry, content: e.target.value})}
                    placeholder="Respond to the prompt..."
                    className="min-h-[200px] resize-none"
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <p className="text-xs text-muted-foreground">
                Your entries are stored locally in your browser
              </p>
              <Button onClick={saveEntry}>
                <Save className="h-4 w-4 mr-2" /> Save Entry
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Journal;
