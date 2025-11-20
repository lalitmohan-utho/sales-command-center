import { Search, Bell, Plus, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export const DashboardHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="flex h-16 items-center gap-4 px-6">
        {/* Logo & Title */}
        <div className="flex items-center gap-3 min-w-[240px]">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
            <span className="text-primary-foreground font-bold text-lg">U</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Utho CRM</h1>
            <p className="text-xs text-muted-foreground">Sales Dashboard</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search leads, contacts, accounts, deals..."
              className="pl-10 bg-background"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Add Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-popover">
              <DropdownMenuItem>New Lead</DropdownMenuItem>
              <DropdownMenuItem>New Contact</DropdownMenuItem>
              <DropdownMenuItem>New Deal</DropdownMenuItem>
              <DropdownMenuItem>New Task</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <Button variant="outline" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-destructive text-destructive-foreground">
              3
            </Badge>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    LK
                  </AvatarFallback>
                </Avatar>
                <div className="text-left hidden lg:block">
                  <p className="text-sm font-medium">Lalit Kumar</p>
                  <p className="text-xs text-muted-foreground">Sales Manager</p>
                </div>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-popover">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
