import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { services } from '@/data/services';

interface BookingFormProps {
  onSubmit: (data: any) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, setValue, watch } = useForm();
  
  const selectedServiceId = watch('serviceId');
  const selectedService = services.find(s => s.id === selectedServiceId);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="service">Select Service</Label>
          <Select onValueChange={(val) => setValue('serviceId', val)}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a service" />
            </SelectTrigger>
            <SelectContent>
              {services.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.title} - ${s.price}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input type="date" id="date" {...register('date')} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input type="time" id="time" {...register('time')} required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" placeholder="123 Maple St, Apt 4B" {...register('address')} required />
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Service Subtotal</span>
            <span className="font-bold text-slate-900">${selectedService?.price || 0}</span>
          </div>
          <div className="mt-1 flex justify-between text-sm">
            <span className="text-slate-500">Service Fee</span>
            <span className="font-bold text-slate-900">$5.00</span>
          </div>
          <div className="mt-4 flex justify-between border-t pt-4">
            <span className="font-bold text-slate-900">Total</span>
            <span className="text-lg font-bold text-emerald-600">
              ${(selectedService?.price || 0) + 5}
            </span>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 text-lg">
        Confirm Booking
      </Button>
    </form>
  );
};