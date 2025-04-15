
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

const AssessmentHeader: React.FC = () => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold mb-2">Mental Health Self-Assessment</h1>
      <p className="text-muted-foreground">
        This assessment will help you better understand your mental health needs.
        Your responses are kept private and are never stored online.
      </p>
    </div>
  );
};

const PrivacyNotice: React.FC = () => {
  return (
    <Alert>
      <Info className="h-4 w-4" />
      <AlertTitle>Privacy Notice</AlertTitle>
      <AlertDescription>
        Your responses are only stored locally in your browser and not sent to any server.
        You can download your results or retake the assessment anytime.
      </AlertDescription>
    </Alert>
  );
};

export { AssessmentHeader, PrivacyNotice };
