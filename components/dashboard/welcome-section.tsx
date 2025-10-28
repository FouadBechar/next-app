import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface WelcomeSectionProps {
  userName: string;
  userEmail: string;
}

export function WelcomeSection({ userName, userEmail }: WelcomeSectionProps) {
  // Use first part of email if no name is provided
  const displayName = userName || userEmail.split('@')[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-none">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Welcome back, {displayName}!
              </h2>
              <p className="text-muted-foreground mt-1">
                Here&apos;s what&apos;s happening with your account today.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">View Profile</Button>
              <Button>Complete Setup</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
