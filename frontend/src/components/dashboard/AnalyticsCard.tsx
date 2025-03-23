
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', amount: 8400 },
  { name: 'Feb', amount: 6800 },
  { name: 'Mar', amount: 9200 },
  { name: 'Apr', amount: 7500 },
  { name: 'May', amount: 8900 },
  { name: 'Jun', amount: 11200 },
  { name: 'Jul', amount: 10500 },
];

const AnalyticsCard = () => {
  return (
    <Card className="animate-scale-in">
      <CardHeader className="pb-2">
        <CardTitle>Spending Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
              <XAxis 
                dataKey="name" 
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => `₦${value}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  borderColor: 'hsl(var(--border))',
                  color: 'hsl(var(--card-foreground))',
                  borderRadius: 'var(--radius)'
                }}
                formatter={(value) => [`₦${value}`, 'Amount']}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#colorAmount)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="rounded-md bg-muted p-3">
            <p className="text-xs font-medium">Total Spending</p>
            <p className="text-lg font-bold">₦62,500</p>
          </div>
          <div className="rounded-md bg-muted p-3">
            <p className="text-xs font-medium">Average Monthly</p>
            <p className="text-lg font-bold">₦8,928</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;
