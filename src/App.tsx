import { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Home } from './pages/Home';
import { ClientDashboard } from './pages/ClientDashboard';
import { WorkerDashboard } from './pages/WorkerDashboard';
import { Toaster } from './components/ui/sonner';
import { User } from './data/services';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<'home' | 'dashboard'>('home');

  const handleLogin = (role: 'client' | 'worker') => {
    setUser({
      id: '1',
      name: role === 'client' ? 'Jane Doe' : 'John Smith',
      email: role === 'client' ? 'jane@example.com' : 'john@proclean.com',
      role,
      avatar: 'https://i.pravatar.cc/150?u=' + role,
      verified: true,
      rating: 4.8,
      earnings: role === 'worker' ? 1240 : undefined
    });
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setView('home');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar 
        user={user} 
        onLogout={handleLogout} 
        onLogin={handleLogin}
        onDashboard={() => setView('dashboard')}
        onHome={() => setView('home')}
      />
      
      <main>
        {view === 'home' || !user ? (
          <Home onBookNow={() => !user ? handleLogin('client') : setView('dashboard')} />
        ) : user.role === 'client' ? (
          <ClientDashboard user={user} />
        ) : (
          <WorkerDashboard user={user} />
        )}
      </main>

      <Toaster position="top-center" />
    </div>
  );
}

export default App;