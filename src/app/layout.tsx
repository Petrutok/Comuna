import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  Users, 
  Recycle, 
  CreditCard, 
  Calendar, 
  FileText, 
  Construction, 
  ClipboardList,
  ArrowRight 
} from 'lucide-react';

export default function HomePage() {
  const services = [
    {
      title: 'Raportează o Problemă',
      description: 'Semnalează probleme din comună: gropi, iluminat defect, alte defecțiuni',
      icon: AlertTriangle,
      href: '/report-issue',
      color: 'from-red-500 to-rose-600',
      iconBg: 'bg-red-500/10',
      iconColor: 'text-red-600',
      action: 'Raportează'
    },
    {
      title: 'Consilieri Locali',
      description: 'Găsește informații de contact pentru consilierii locali',
      icon: Users,
      href: '/representatives',
      color: 'from-blue-500 to-indigo-600',
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-600',
      action: 'Vezi Lista'
    },
    {
      title: 'Colectare Selectivă',
      description: 'Calendar colectare deșeuri și informații despre reciclare',
      icon: Recycle,
      href: '/colectare-selectiva',
      color: 'from-green-500 to-emerald-600',
      iconBg: 'bg-green-500/10',
      iconColor: 'text-green-600',
      action: 'Vezi Calendar'
    },
    {
      title: 'Plată Impozite',
      description: 'Plătește online taxele și impozitele locale',
      icon: CreditCard,
      href: '/taxes',
      color: 'from-purple-500 to-violet-600',
      iconBg: 'bg-purple-500/10',
      iconColor: 'text-purple-600',
      action: 'Plătește Online'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header cu gradient modern */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="container mx-auto px-4 py-8 relative">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-3">
            Comuna
          </h1>
          <p className="text-center text-xl text-blue-200">
            PRIMĂRIA DIGITALĂ
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Grid 2x2 pe mobil, 2x2 pe tablet, 4x1 pe desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.href}
                href={service.href}
                className="group transform transition-all duration-300 hover:scale-105"
              >
                <div className="relative h-full bg-white/10 backdrop-blur-lg rounded-2xl p-5 md:p-8 border border-white/20 hover:border-white/40 hover:bg-white/20">
                  {/* Gradient overlay pe hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                  
                  {/* Content */}
                  <div className="relative flex flex-col items-center text-center h-full">
                    {/* Icon cu background */}
                    <div className={`${service.iconBg} p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-8 h-8 ${service.iconColor}`} />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-white font-semibold text-base md:text-lg mb-2">
                      {service.title}
                    </h3>
                    
                    {/* Description - doar pe desktop */}
                    <p className="text-white/70 text-sm mb-4 hidden lg:block">
                      {service.description}
                    </p>
                    
                    {/* Action button */}
                    <div className="mt-auto w-full">
                      <div className="bg-white/20 backdrop-blur rounded-xl px-4 py-2 text-white font-medium text-sm group-hover:bg-white/30 transition-all duration-300 flex items-center justify-center">
                        {service.action}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Secțiune secundară cu alte servicii */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { title: 'Evenimente', icon: Calendar, href: '/events' },
            { title: 'Documente', icon: FileText, href: '/documents' },
            { title: 'Lucrări', icon: Construction, href: '/ongoing-works' },
            { title: 'Procese Verbale', icon: ClipboardList, href: '/meeting-summaries' }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex flex-col items-center gap-2"
              >
                <Icon className="w-6 h-6 text-white/70" />
                <span className="text-white/80 text-sm font-medium">{item.title}</span>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-white/60 text-sm">
            Pentru urgențe, sunați la{' '}
            <a href="tel:112" className="text-red-400 font-bold hover:text-red-300">
              112
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}