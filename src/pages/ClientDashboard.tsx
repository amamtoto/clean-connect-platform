import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Plus, 
  ChevronRight, 
  Star, 
  History,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { services, User, Booking } from '@/data/services';
import { toast } from 'sonner';
import { BookingForm } from '@/components/booking/BookingForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';

interface ClientDashboardProps {
  user: User;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({ user }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 'b1',
      serviceId: '1',
      clientId: user.id,
      workerId: 'w1',
      date: '2024-10-24',
      time: '10:00',
      status: 'accepted',
      totalPrice: 45,
      address: '123 Maple Street, Springfield'
    },
    {
      id: 'b2',
      serviceId: '2',
      clientId: user.id,
      date: '2024-10-28',
      time: '14:00',
      status: 'pending',
      totalPrice: 120,
      address: '123 Maple Street, Springfield'
    }
  ]);

  const handleCreateBooking = (data: any) => {
    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      serviceId: data.serviceId,
      clientId: user.id,
      date: data.date,
      time: data.time,
      status: 'pending',
      totalPrice: services.find(s => s.id === data.serviceId)?.price || 0,
      address: data.address
    };
    setBookings([newBooking, ...bookings]);
    setIsBookingOpen(false);
    toast.success('Booking requested successfully!');
  };

  const getServiceTitle = (id: string) => services.find(s => s.id === id)?.title || 'Service';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Welcome, {user.name}</h1>
          <p className="text-slate-500">Manage your bookings and requests</p>
        </div>
        <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus size={18} className="mr-2" /> New Booking
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Book a Service</DialogTitle>
              <DialogDescription>
                Select a service and schedule your cleaning professional.
              </DialogDescription>
            </DialogHeader>
            <BookingForm onSubmit={handleCreateBooking} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Active Bookings */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
            <Calendar size={20} className="text-emerald-600" /> Active Bookings
          </h2>
          
          <div className="space-y-4">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="flex flex-col p-0 sm:flex-row">
                      <div className="bg-slate-50 p-6 sm:w-48">
                        <div className="mb-2 flex items-center gap-2 text-emerald-600 font-medium">
                          <Calendar size={16} /> {booking.date}
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                          <Clock size={16} /> {booking.time}
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between p-6">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-slate-900">{getServiceTitle(booking.serviceId)}</h3>
                            <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                              <MapPin size={14} /> {booking.address}
                            </div>
                          </div>
                          <Badge variant={booking.status === 'pending' ? 'secondary' : 'default'} className={booking.status === 'accepted' ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' : ''}>
                            {booking.status.toUpperCase()}
                          </Badge>
                        </div>
                        
                        <div className="mt-6 flex items-center justify-between">
                          <div className="text-xl font-bold text-slate-900">${booking.totalPrice}</div>
                          <Button variant="outline" size="sm">
                            Details <ChevronRight size={16} className="ml-1" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 py-20">
                <AlertCircle size={48} className="mb-4 text-slate-300" />
                <p className="text-slate-500">No active bookings found</p>
                <Button variant="link" className="text-emerald-600" onClick={() => setIsBookingOpen(true)}>
                  Book your first service
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <Card className="border-none shadow-sm bg-emerald-600 text-white">
            <CardHeader>
              <CardTitle className="text-lg">Quick Help</CardTitle>
              <CardDescription className="text-emerald-100">Need assistance with your booking?</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full bg-white text-emerald-600 hover:bg-slate-50">
                Contact Support
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
              <History size={18} className="text-emerald-600" /> Recent Pros
            </h2>
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <Card key={i} className="border-none shadow-sm">
                  <CardContent className="flex items-center gap-3 p-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full">
                      <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Pro" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-slate-900">Alex Johnson</h4>
                      <div className="flex items-center gap-1 text-xs text-amber-500">
                        <Star size={12} fill="currentColor" /> 4.9 (124)
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Plus size={16} className="text-emerald-600" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};