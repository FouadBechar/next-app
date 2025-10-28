import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ChartCardProps {
  title: string;
  tabs?: string[];
  defaultTab?: string;
  chart: React.ReactNode;
  description?: string;
  actions?: React.ReactNode;
}

export function ChartCard({
  title,
  tabs,
  defaultTab,
  chart,
  description,
  actions,
}: ChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>{title}</CardTitle>
          {actions && <div>{actions}</div>}
        </CardHeader>
        <CardContent>
          {tabs ? (
            <Tabs defaultValue={defaultTab || tabs[0]}>
              <TabsList className="mb-4">
                {tabs.map((tab) => (
                  <TabsTrigger key={tab} value={tab}>
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
              {tabs.map((tab) => (
                <TabsContent key={tab} value={tab}>
                  <div className="h-[300px]">{chart}</div>
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <div className="h-[300px]">{chart}</div>
          )}
          {description && (
            <p className="text-sm text-muted-foreground mt-4">{description}</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
