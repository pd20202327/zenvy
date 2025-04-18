
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Feedback: React.FC = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleRatingHover = (hoveredRating: number) => {
    setHoveredRating(hoveredRating);
  };

  const handleRatingLeave = () => {
    setHoveredRating(null);
  };

  const resetForm = () => {
    setRating(null);
    setName('');
    setEmail('');
    setFeedback('');
    setIsSubmitting(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!rating) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    if (!name || !email) {
      toast({
        title: "Information missing",
        description: "Please provide your name and email",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // In a real implementation, you would use a backend service
      // Here we're just simulating sending an email
      const formData = {
        rating,
        name,
        email,
        feedback,
        timestamp: new Date().toISOString(),
        recipient: "debugdatta@gmail.com"
      };
      
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Feedback submitted:", formData);
      
      toast({
        title: "Feedback submitted!",
        description: "Thank you for your feedback",
      });
      
      resetForm();
      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="secondary" 
          className="fixed bottom-20 right-4 md:bottom-4 md:right-4 z-40 shadow-lg"
        >
          Give Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-[#1A1F2C] text-white">
        <DialogHeader>
          <DialogTitle className="text-xl text-white mb-4">Share Your Feedback</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-white">
              How would you rate your experience? <span className="text-red-400">*</span>
            </label>
            <div className="flex space-x-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={28}
                  className={`cursor-pointer transition-all ${
                    (hoveredRating !== null ? star <= hoveredRating : star <= (rating || 0))
                      ? 'fill-[#9b87f5] text-[#9b87f5]'
                      : 'text-gray-400'
                  }`}
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => handleRatingHover(star)}
                  onMouseLeave={handleRatingLeave}
                />
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-white">
                Name <span className="text-red-400">*</span>
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="bg-black/40 border-[#3A3F4B] text-white placeholder:text-gray-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-white">
                Email <span className="text-red-400">*</span>
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="bg-black/40 border-[#3A3F4B] text-white placeholder:text-gray-500"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="feedback" className="block text-white">
              Your Feedback (Optional)
            </label>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us about your experience..."
              className="min-h-[120px] bg-black/40 border-[#3A3F4B] text-white placeholder:text-gray-500"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-[#9b87f5] hover:bg-[#8673e0] text-white" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Feedback;
