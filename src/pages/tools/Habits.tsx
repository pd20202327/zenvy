
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft, Calendar, CheckSquare, Pencil, Plus, Trash2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface Habit {
  id: string;
  name: string;
  category: 'health' | 'mental' | 'personal' | 'other';
  icon: string;
  createdAt: string;
  completed: {
    [date: string]: boolean;
  };
}

// Helper function to get dates for the current week
const getCurrentWeekDates = () => {
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1);
  
  const monday = new Date(today.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  
  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(date.getDate() + i);
    weekDates.push(date);
  }
  
  return weekDates;
};

const formatDateKey = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

const formatDisplayDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

const defaultHabits: Habit[] = [
  {
    id: '1',
    name: 'Mindfulness',
    category: 'mental',
    icon: '🧘',
    createdAt: new Date().toISOString(),
    completed: {}
  },
  {
    id: '2',
    name: 'Drink water',
    category: 'health',
    icon: '💧',
    createdAt: new Date().toISOString(),
    completed: {}
  },
  {
    id: '3',
    name: 'Journal',
    category: 'mental',
    icon: '📝',
    createdAt: new Date().toISOString(),
    completed: {}
  }
];

const categoryIcons = {
  health: '❤️',
  mental: '🧠',
  personal: '👤',
  other: '✨'
};

const Habits: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const savedHabits = localStorage.getItem('habitTracker');
    return savedHabits ? JSON.parse(savedHabits) : defaultHabits;
  });
  
  const [weekDates, setWeekDates] = useState<Date[]>(getCurrentWeekDates());
  const [newHabit, setNewHabit] = useState({
    name: '',
    category: 'mental' as 'health' | 'mental' | 'personal' | 'other',
    icon: '✨'
  });
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  
  // Load habits from localStorage
  useEffect(() => {
    const savedHabits = localStorage.getItem('habitTracker');
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }
  }, []);
  
  // Save habits to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('habitTracker', JSON.stringify(habits));
  }, [habits]);
  
  const toggleHabitCompletion = (habitId: string, date: Date) => {
    const dateKey = formatDateKey(date);
    setHabits(prevHabits => {
      return prevHabits.map(habit => {
        if (habit.id === habitId) {
          const wasCompleted = habit.completed[dateKey];
          
          return {
            ...habit,
            completed: {
              ...habit.completed,
              [dateKey]: !wasCompleted
            }
          };
        }
        return habit;
      });
    });
  };
  
  const addHabit = () => {
    if (!newHabit.name.trim()) {
      toast({
        title: "Cannot add habit",
        description: "Please enter a habit name.",
        variant: "destructive"
      });
      return;
    }
    
    const habit: Habit = {
      id: Date.now().toString(),
      name: newHabit.name,
      category: newHabit.category,
      icon: newHabit.icon,
      createdAt: new Date().toISOString(),
      completed: {}
    };
    
    setHabits([...habits, habit]);
    setNewHabit({
      name: '',
      category: 'mental',
      icon: '✨'
    });
    setShowAddDialog(false);
    
    toast({
      title: "Habit added",
      description: `"${habit.name}" has been added to your tracker.`
    });
  };
  
  const updateHabit = () => {
    if (!editingHabit || !editingHabit.name.trim()) return;
    
    setHabits(prevHabits => {
      return prevHabits.map(habit => {
        if (habit.id === editingHabit.id) {
          return {
            ...editingHabit
          };
        }
        return habit;
      });
    });
    
    setEditingHabit(null);
    
    toast({
      title: "Habit updated",
      description: `"${editingHabit.name}" has been updated.`
    });
  };
  
  const deleteHabit = (habitId: string) => {
    if (window.confirm("Are you sure you want to delete this habit?")) {
      const habitName = habits.find(h => h.id === habitId)?.name;
      setHabits(habits.filter(habit => habit.id !== habitId));
      
      toast({
        title: "Habit deleted",
        description: habitName ? `"${habitName}" has been deleted.` : "Habit has been deleted."
      });
    }
  };
  
  // Filter habits by category
  const filteredHabits = selectedCategory 
    ? habits.filter(habit => habit.category === selectedCategory)
    : habits;
  
  // Calculate stats
  const habitStats = habits.map(habit => {
    let completedCount = 0;
    const totalDays = 7; // For the current week view
    
    weekDates.forEach(date => {
      const dateKey = formatDateKey(date);
      if (habit.completed[dateKey]) {
        completedCount++;
      }
    });
    
    return {
      habitId: habit.id,
      completedCount,
      percentage: (completedCount / totalDays) * 100
    };
  });
  
  // Get today's date for highlighting
  const today = formatDateKey(new Date());
  
  // Get the most consistent habit
  const mostConsistentHabit = habitStats.length > 0 
    ? habits.find(h => h.id === habitStats.sort((a, b) => b.percentage - a.percentage)[0].habitId)
    : null;
  
  const handleEditHabit = (habit: Habit) => {
    setEditingHabit({...habit});
  };
  
  const toggleEmojiPicker = () => {
    // Simple emoji picker would go here, but we'll just use a set list for simplicity
    const emojis = ['✨', '🧘', '💧', '📝', '🏃', '🍎', '😴', '🧠', '🌿', '🙏'];
    const currentIndex = emojis.indexOf(newHabit.icon);
    const nextIndex = (currentIndex + 1) % emojis.length;
    setNewHabit({...newHabit, icon: emojis[nextIndex]});
  };
  
  const toggleEditEmojiPicker = () => {
    if (!editingHabit) return;
    const emojis = ['✨', '🧘', '💧', '📝', '🏃', '🍎', '😴', '🧠', '🌿', '🙏'];
    const currentIndex = emojis.indexOf(editingHabit.icon);
    const nextIndex = (currentIndex + 1) % emojis.length;
    setEditingHabit({...editingHabit, icon: emojis[nextIndex]});
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link to="/tools">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Tools
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Habit Tracker</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                Current Week
              </CardTitle>
              <CardDescription>
                {formatDisplayDate(weekDates[0])} - {formatDisplayDate(weekDates[6])}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="default" className="w-full">
                      <Plus className="h-4 w-4 mr-2" /> Add New Habit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Habit</DialogTitle>
                      <DialogDescription>
                        Create a new habit to track in your wellness journey.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                      <div className="flex items-center gap-4">
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="w-12 h-12 text-2xl p-0"
                          onClick={toggleEmojiPicker}
                        >
                          {newHabit.icon}
                        </Button>
                        <div className="grid gap-2 flex-1">
                          <Label htmlFor="habit-name">Habit Name</Label>
                          <Input 
                            id="habit-name"
                            value={newHabit.name}
                            onChange={(e) => setNewHabit({...newHabit, name: e.target.value})}
                            placeholder="e.g., Meditation, Journaling..."
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="habit-category" className="mb-2 block">Category</Label>
                        <Tabs 
                          defaultValue="mental" 
                          value={newHabit.category}
                          onValueChange={(value) => setNewHabit({
                            ...newHabit, 
                            category: value as 'health' | 'mental' | 'personal' | 'other'
                          })}
                          className="w-full"
                        >
                          <TabsList className="grid grid-cols-4 w-full">
                            <TabsTrigger value="mental">🧠 Mental</TabsTrigger>
                            <TabsTrigger value="health">❤️ Health</TabsTrigger>
                            <TabsTrigger value="personal">👤 Personal</TabsTrigger>
                            <TabsTrigger value="other">✨ Other</TabsTrigger>
                          </TabsList>
                        </Tabs>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button variant="ghost" onClick={() => setShowAddDialog(false)}>Cancel</Button>
                      <Button onClick={addHabit}>Add Habit</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                {/* Category filters */}
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Filter by Category</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={!selectedCategory ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(null)}
                    >
                      All
                    </Button>
                    {Object.entries(categoryIcons).map(([category, icon]) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {icon} {category.charAt(0).toUpperCase() + category.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Habits</p>
                <p className="text-3xl font-bold">{habits.length}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Most Consistent</p>
                {mostConsistentHabit ? (
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{mostConsistentHabit.icon}</span>
                    <span className="font-medium">{mostConsistentHabit.name}</span>
                  </div>
                ) : (
                  <p className="text-sm italic">No data yet</p>
                )}
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Today's Progress</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">
                    {habits.filter(h => h.completed[today]).length}
                  </span>
                  <span className="text-muted-foreground">/ {habits.length} habits</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckSquare className="h-5 w-5 mr-2 text-primary" />
                Your Habit Tracker
              </CardTitle>
              <CardDescription>
                Track your daily habits to build consistency
              </CardDescription>
            </CardHeader>
            <CardContent>
              {habits.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">You haven't added any habits yet.</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" /> Add Your First Habit
                      </Button>
                    </DialogTrigger>
                    {/* Reuse the dialog content from above */}
                  </Dialog>
                </div>
              ) : filteredHabits.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No habits in this category.</p>
                  <Button variant="link" onClick={() => setSelectedCategory(null)}>
                    Show all habits
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left font-medium p-2 w-1/3">Habit</th>
                        {weekDates.map((date) => (
                          <th 
                            key={formatDateKey(date)} 
                            className={`text-center p-2 ${
                              formatDateKey(date) === today ? 'bg-primary/10 rounded-md' : ''
                            }`}
                          >
                            <div>{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                            <div className="text-xs text-muted-foreground">
                              {date.getDate()}
                            </div>
                          </th>
                        ))}
                        <th className="w-[60px]"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredHabits.map((habit) => (
                        <tr key={habit.id} className="border-t border-border">
                          <td className="py-4 px-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{habit.icon}</span>
                              <div>
                                <div className="font-medium">{habit.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  {categoryIcons[habit.category]} {habit.category.charAt(0).toUpperCase() + habit.category.slice(1)}
                                </div>
                              </div>
                            </div>
                          </td>
                          
                          {weekDates.map((date) => {
                            const dateKey = formatDateKey(date);
                            const isCompleted = habit.completed[dateKey];
                            
                            return (
                              <td 
                                key={dateKey} 
                                className={`text-center p-2 ${
                                  dateKey === today ? 'bg-primary/10 rounded-md' : ''
                                }`}
                              >
                                <div className="flex justify-center">
                                  <Checkbox
                                    checked={isCompleted}
                                    onCheckedChange={() => toggleHabitCompletion(habit.id, date)}
                                    className={isCompleted ? 'bg-primary border-primary' : ''}
                                  />
                                </div>
                              </td>
                            );
                          })}
                          
                          <td className="text-right p-2">
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="icon" onClick={() => handleEditHabit(habit)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => deleteHabit(habit.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Edit Habit Dialog */}
      <Dialog open={!!editingHabit} onOpenChange={(open) => !open && setEditingHabit(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Habit</DialogTitle>
            <DialogDescription>
              Make changes to your habit.
            </DialogDescription>
          </DialogHeader>
          
          {editingHabit && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-12 h-12 text-2xl p-0"
                  onClick={toggleEditEmojiPicker}
                >
                  {editingHabit.icon}
                </Button>
                <div className="grid gap-2 flex-1">
                  <Label htmlFor="edit-habit-name">Habit Name</Label>
                  <Input 
                    id="edit-habit-name"
                    value={editingHabit.name}
                    onChange={(e) => setEditingHabit({...editingHabit, name: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="edit-habit-category" className="mb-2 block">Category</Label>
                <Tabs 
                  value={editingHabit.category}
                  onValueChange={(value) => setEditingHabit({
                    ...editingHabit, 
                    category: value as 'health' | 'mental' | 'personal' | 'other'
                  })}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-4 w-full">
                    <TabsTrigger value="mental">🧠 Mental</TabsTrigger>
                    <TabsTrigger value="health">❤️ Health</TabsTrigger>
                    <TabsTrigger value="personal">👤 Personal</TabsTrigger>
                    <TabsTrigger value="other">✨ Other</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditingHabit(null)}>Cancel</Button>
            <Button onClick={updateHabit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Habits;
