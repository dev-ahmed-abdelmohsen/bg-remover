"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

export function CountdownTimer() {
  const [targetDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 30); // Set target 30 days from now
    return date;
  });

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return newTimeLeft;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeParts = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardContent className="p-6">
        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Next update in:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {timeParts.map((part) => (
            <div key={part.label} className="p-4 rounded-lg bg-background shadow-inner">
              <div className="text-4xl font-bold font-headline text-accent">{String(part.value).padStart(2, '0')}</div>
              <div className="text-xs text-muted-foreground uppercase">{part.label}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
