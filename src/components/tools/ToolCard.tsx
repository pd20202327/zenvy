
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  linkText: string;
  linkPath: string;
}

const ToolCard: React.FC<ToolCardProps> = ({
  title,
  description,
  icon: Icon,
  features,
  linkText,
  linkPath,
}) => {
  return (
    <Card className="tool-card">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">{title}</CardTitle>
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          {description}
        </p>
        <div className="mt-4">
          <p className="font-medium">Features:</p>
          <ul className="list-disc list-inside text-sm space-y-1 mt-1 text-muted-foreground">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={linkPath}>{linkText}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ToolCard;
