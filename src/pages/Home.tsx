import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Star, ShieldCheck, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { services } from '@/data/services';
import { Card, CardContent } from '@/components/ui/card';

interface HomeProps {
  onBookNow: () => void;
}

export const Home: React.FC<HomeProps> = ({ onBookNow }) => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-slate-900 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/bf3b6fd3-1506-4ac1-ba4f-d83b984eaca0/hero-image-69a0d14f-1777792090509.webp" 
            alt="Hero" 
            className="h-full w-full object-cover"
          />
        </div>
        <div className="container relative mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl">
              Professional Cleaning <br />
              <span className="text-emerald-400">On Demand</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-300">
              Book verified local cleaning professionals in seconds. Quality service, upfront pricing, and peace of mind.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="h-12 px-8 text-lg bg-emerald-600 hover:bg-emerald-700" onClick={onBookNow}>
                Book a Service
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-lg text-white border-white/20 hover:bg-white/10">
                How it Works
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-y bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { icon: ShieldCheck, title: 'Verified Pros', desc: 'Background checked' },
              { icon: Star, title: 'Top Rated', desc: '4.8/5 avg. rating' },
              { icon: CheckCircle2, title: 'Happiness Guarantee', desc: '100% Satisfaction' },
              { icon: MapPin, title: 'Local Expertise', desc: 'Pros in your area' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="mb-3 rounded-full bg-emerald-50 p-3 text-emerald-600">
                  <item.icon size={24} />
                </div>
                <h3 className="font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900">Our Services</h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              From regular upkeep to deep intensive cleaning, we have a service for every need.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-sm font-bold text-emerald-600 backdrop-blur">
                      From ${service.price}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="mb-2 text-xl font-bold text-slate-900">{service.title}</h3>
                    <p className="mb-4 text-sm text-slate-600 line-clamp-2">{service.description}</p>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-between p-0 hover:bg-transparent hover:text-emerald-600 text-slate-900 group-hover:translate-x-1 transition-transform"
                      onClick={onBookNow}
                    >
                      Book Now <ArrowRight size={16} />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-600 py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl bg-slate-900 p-8 md:p-16 text-center text-white">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to join our team?</h2>
            <p className="mx-auto mb-10 max-w-xl text-slate-400">
              Are you a cleaning professional looking for more work? Register as a worker and start getting jobs in your area today.
            </p>
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              Register as Worker
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between border-t pt-8 md:flex-row">
            <div className="mb-4 flex items-center gap-2 md:mb-0">
              <div className="rounded-lg bg-emerald-600 p-2 text-white">
                <Sparkles size={16} />
              </div>
              <span className="text-lg font-bold text-slate-900">Cleanly</span>
            </div>
            <p className="text-sm text-slate-500">
              © 2024 Cleanly Services. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};