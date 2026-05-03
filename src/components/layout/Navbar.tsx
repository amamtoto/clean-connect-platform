import React from 'react';
import { Sparkles, LogOut, User as UserIcon, LayoutDashboard, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { User } from '@/data/services';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  onLogin: (role: 'client' | 'worker') => void;
  onDashboard: () => void;
  onHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onLogin, onDashboard, onHome }) => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 cursor-pointer" onClick={onHome}>
          <div className="rounded-lg bg-emerald-600 p-2 text-white">
            <Sparkles size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">Cleanly</span>
        </div>

        <div className="flex items-center gap-4">
          {!user ? (
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => onLogin('worker')}>
                Join as Worker
              </Button>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={() => onLogin('client')}>
                Sign In
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onHome} className="hidden md:flex">
                <Home size={18} className="mr-2" /> Home
              </Button>
              <Button variant="ghost" size="sm" onClick={onDashboard} className="hidden md:flex">
                <LayoutDashboard size={18} className="mr-2" /> Dashboard
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-9 w-9 cursor-pointer border-2 border-emerald-100">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={onDashboard} className="md:hidden">
                    <LayoutDashboard size={16} className="mr-2" /> Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <UserIcon size={16} className="mr-2" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onLogout} className="text-red-600">
                    <LogOut size={16} className="mr-2" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};