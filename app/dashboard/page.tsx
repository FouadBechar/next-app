'use client';

import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { WelcomeSection } from '@/components/dashboard/welcome-section';
import { StatsCard } from '@/components/dashboard/stats-card';
import { ActivityList } from '@/components/dashboard/activity-list';
import { PlaceholderChart } from '@/components/dashboard/placeholder-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user);
      }

      setIsLoading(false);
    }

    getUser();
  }, []);

  // Mock data for the dashboard
  const mockActivities = [
    {
      id: '1',
      title: 'Account Created',
      description: 'Your account was successfully created',
      timestamp: '2 hours ago',
    },
    {
      id: '2',
      title: 'Email Verified',
      description: 'Your email address has been verified',
      timestamp: '1 hour ago',
    },
    {
      id: '3',
      title: 'Password Updated',
      description: 'Your password was updated successfully',
      timestamp: '30 minutes ago',
    },
  ];

  if (isLoading) {
    return null; // Loading state is handled by the layout
  }

  return (
    <DashboardLayout>
      {/* Welcome Section */}
      <WelcomeSection
        userName=""
        userEmail={user?.email || 'user@example.com'}
      />

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <StatsCard
          title="Login Count"
          value="5"
          description="Total logins this month"
          icon={<UserIcon className="h-5 w-5" />}
          delay={0.1}
        />
        <StatsCard
          title="Last Login"
          value="Today"
          description="Last accessed the platform"
          icon={<ClockIcon className="h-5 w-5" />}
          delay={0.2}
        />
        <StatsCard
          title="Security Score"
          value="85%"
          description="Your account security rating"
          icon={<ShieldIcon className="h-5 w-5" />}
          change={{ value: '10%', positive: true }}
          delay={0.3}
        />
        <StatsCard
          title="Account Status"
          value="Active"
          description="Your account is in good standing"
          icon={<CheckCircleIcon className="h-5 w-5" />}
          delay={0.4}
        />
      </div>

      {/* Charts and Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Account Activity</CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <PlaceholderChart variant="area" height={250} showToggle={true} />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <ActivityList activities={mockActivities} />
        </div>
      </div>

      {/* Additional Section */}
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Security Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <LockIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">
                      Enable Two-Factor Authentication
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Enable
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <KeyIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Update Recovery Email</p>
                    <p className="text-sm text-muted-foreground">
                      Ensure you can recover your account if needed
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Update
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

// Icons
function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function LockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function KeyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  );
}
