
import React from 'react';
import { Shield, CreditCard, Lock, Smartphone, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const WalletSecuritySettings = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>Two-Factor Authentication</CardTitle>
          </div>
          <CardDescription>Secure your account with 2FA</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="2fa-sms">SMS Authentication</Label>
              <p className="text-xs text-muted-foreground">
                Receive a code via SMS when you log in
              </p>
            </div>
            <Switch id="2fa-sms" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="2fa-app">Authenticator App</Label>
              <p className="text-xs text-muted-foreground">
                Use an authenticator app to generate verification codes
              </p>
            </div>
            <Switch id="2fa-app" />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="2fa-email">Email Authentication</Label>
              <p className="text-xs text-muted-foreground">
                Receive a code via email when you log in
              </p>
            </div>
            <Switch id="2fa-email" defaultChecked />
          </div>
          
          <Button variant="outline" className="w-full mt-4">Manage 2FA Settings</Button>
        </CardContent>
      </Card>
      
      {/* Transaction Limits */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            <CardTitle>Transaction Limits</CardTitle>
          </div>
          <CardDescription>Set daily and transaction limits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="daily-limit">Daily Withdrawal Limit</Label>
            <div className="flex gap-2">
              <Select defaultValue="NGN">
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NGN">NGN</SelectItem>
                  <SelectItem value="GHC">GHC</SelectItem>
                  <SelectItem value="USDT">USDT</SelectItem>
                </SelectContent>
              </Select>
              <Input id="daily-limit" defaultValue="500,000.00" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tx-limit">Per Transaction Limit</Label>
            <div className="flex gap-2">
              <Select defaultValue="NGN">
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NGN">NGN</SelectItem>
                  <SelectItem value="GHC">GHC</SelectItem>
                  <SelectItem value="USDT">USDT</SelectItem>
                </SelectContent>
              </Select>
              <Input id="tx-limit" defaultValue="100,000.00" />
            </div>
          </div>
          
          <Button className="w-full mt-4">Update Limits</Button>
        </CardContent>
      </Card>
      
      {/* Linked Accounts */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            <CardTitle>Linked Accounts</CardTitle>
          </div>
          <CardDescription>Manage your linked accounts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <CreditCard className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Access Bank</p>
                <p className="text-xs text-muted-foreground">**** **** **** 4532</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">Remove</Button>
          </div>
          
          <div className="flex items-center justify-between py-2 border-b">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                <Smartphone className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="font-medium">MTN Mobile Money</p>
                <p className="text-xs text-muted-foreground">+234 810 *** 5678</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">Remove</Button>
          </div>
          
          <Button variant="outline" className="w-full mt-2">
            Link New Account
          </Button>
        </CardContent>
      </Card>
      
      {/* Activity Alerts */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            <CardTitle>Activity Alerts</CardTitle>
          </div>
          <CardDescription>Configure notification settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="login-alert">Login Alerts</Label>
              <p className="text-xs text-muted-foreground">
                Get notified of new logins to your account
              </p>
            </div>
            <Switch id="login-alert" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="tx-alert">Transaction Alerts</Label>
              <p className="text-xs text-muted-foreground">
                Get notified of all transactions in your account
              </p>
            </div>
            <Switch id="tx-alert" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="price-alert">Price Alerts</Label>
              <p className="text-xs text-muted-foreground">
                Get notified of significant price changes
              </p>
            </div>
            <Switch id="price-alert" />
          </div>
          
          <Button variant="outline" className="w-full mt-4">Manage Notification Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletSecuritySettings;
