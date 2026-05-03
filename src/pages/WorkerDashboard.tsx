import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Star, 
  Clock,
  Navigation,
  Check,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Booking, services } from '@/data/services';
import { toast } from 'sonner';

interface WorkerDashboardProps {
  user: User;
}

export const WorkerDashboard: React.FC<WorkerDashboardProps> = ({ user }) => {
  const [availableJobs, setAvailableJobs] = useState<Booking[]>([
    {
      id: 'j1',
      serviceId: '2',
      clientId: 'c2',
      date: 'Tomorrow',
      time: '09:00 AM',
      status: 'pending',
      totalPrice: 120,
      address: '456 Oak Avenue, Springfield (2.4 miles)'
    },
    {
      id: 'j2',
      serviceId: '1',
      clientId: 'c3',
      date: '2024-10-25',
      time: '01:00 PM',
      status: 'pending',
      totalPrice: 45,
      address: '789 Pine Lane, Springfield (4.1 miles)'
    }
  ]);

  const [myJobs, setMyJobs] = useState<Booking[]>([
    {
      id: 'm1',
      serviceId: '1',
      clientId: 'c4',
      date: 'Today',
      time: '02:00 PM',
      status: 'accepted',
      totalPrice: 45,
      address: '101 Elm Street, Springfield'
    }
  ]);

  const handleAcceptJob = (job: Booking) => {
    setAvailableJobs(availableJobs.filter(j => j.id !== job.id));
    setMyJobs([{ ...job, status: 'accepted' }, ...myJobs]);
    toast.success('Job accepted! Customer has been notified.');
  };

  const getServiceTitle = (id: string) => services.find(s => s.id === id)?.title || 'Service';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-slate-900">Hi, {user.name}</h1>
            {user.verified && (
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                <Check size={14} className="mr-1" /> Verified Pro
              </Badge>
            )}
          </div>
          <p className="text-slate-500">Your earnings today: <span className="font-bold text-emerald-600">$145.00</span></p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-white px-3 py-1">
            <Star size={14} className="mr-1 text-amber-500 fill-amber-500" /> {user.rating} Rating
          </Badge>
          <Badge variant="outline" className="bg-white px-3 py-1">
            <DollarSign size={14} className="mr-1 text-emerald-600" /> ${user.earnings} Life. Earnings
          </Badge>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Available Jobs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
              <Briefcase size={20} className="text-emerald-600" /> Available Near You
            </h2>
            <Badge variant="secondary">{availableJobs.length} New</Badge>
          </div>
          
          <div className="space-y-4">
            {availableJobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row">
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-slate-900">{getServiceTitle(job.serviceId)}</h3>
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center gap-1 text-sm text-slate-500">
                            <Calendar size={14} /> {job.date}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-slate-500">
                            <Clock size={14} /> {job.time}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-slate-500">
                            <MapPin size={14} /> {job.address}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                        <div className="text-2xl font-bold text-emerald-600">${job.totalPrice}</div>
                        <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => handleAcceptJob(job)}>
                          Accept Job
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* My Schedule */}
        <div className="space-y-6">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
            <Clock size={20} className="text-emerald-600" /> My Schedule
          </h2>
          <div className="space-y-4">
            {myJobs.map((job) => (
              <Card key={job.id} className="border-l-4 border-l-emerald-500 border-none shadow-sm">
                <CardContent className="p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">Upcoming</Badge>
                    <span className="text-sm font-bold text-slate-900">{job.time}</span>
                  </div>
                  <h4 className="font-bold text-slate-900">{getServiceTitle(job.serviceId)}</h4>
                  <p className="text-xs text-slate-500">{job.address}</p>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" className="flex-1 bg-slate-900">
                      <Navigation size={14} className="mr-1" /> Navigate
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Complete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-none shadow-sm bg-slate-900 text-white">
            <CardHeader>
              <CardTitle className="text-lg">Daily Goal</CardTitle>
              <CardDescription className="text-slate-400">You're at 80% of your target</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-2 w-full rounded-full bg-slate-800">
                <div className="h-full w-[80%] rounded-full bg-emerald-500"></div>
              </div>
              <p className="mt-4 text-center text-sm">1 more job to reach $180 goal!</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};