import { cn } from '@/lib/utils';
import * as React from 'react';
import { Card } from '@/components/ui/card';

interface SmoothCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glass?: boolean;
}

export function SmoothCard({ 
  className, 
  hover = false, 
  glass = false, 
  children, 
  ...props 
}: SmoothCardProps) {
  return (
    <Card
      className={cn(
        'smooth-transition',
        hover && 'card-hover',
        glass && 'glass-card',
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
}