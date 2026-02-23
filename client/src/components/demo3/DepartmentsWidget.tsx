import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

const DEPARTMENTS = [
  {
    num: '01',
    name: 'Nukleo.Agency',
    tagline: 'Marketing & Communication',
    href: '/services/agency',
    color: '#f97316',
    img: '/demo/dept-agency.jpg',
  },
  {
    num: '02',
    name: 'Nukleo.Studio',
    tagline: 'Design & Creation',
    href: '/services/studio',
    color: '#7c3aed',
    img: '/demo/dept-studio.jpg',
  },
  {
    num: '03',
    name: 'Nukleo.Tech',
    tagline: 'Development & AI',
    href: '/services/tech',
    color: '#2563eb',
    img: '/demo/dept-tech.jpg',
  },
  {
    num: '04',
    name: 'Nukleo.Consulting',
    tagline: 'Strategy & Transformation',
    href: '/services/consulting',
    color: '#059669',
    img: '/demo/dept-consulting.jpg',
  },
];

/**
 * Widget 4 départements - grille compacte
 */
export function DepartmentsWidget() {
  const getLocalizedPath = useLocalizedPath();

  return (
    <div className="h-full min-h-[400px] rounded-2xl bg-[#0A0A0A] p-6 lg:p-8 flex flex-col justify-between">
      <p className="text-[10px] font-medium tracking-[0.35em] uppercase text-white/50 mb-6">
        Nos départements
      </p>
      <div className="grid grid-cols-2 gap-3 flex-1">
        {DEPARTMENTS.map((dept) => (
          <Link
            key={dept.num}
            href={getLocalizedPath(dept.href)}
            className="group relative rounded-xl overflow-hidden min-h-[100px] flex flex-col justify-end p-4 transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: dept.color }}
          >
            <img
              src={dept.img}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <span className="relative text-[10px] font-mono text-white/70">{dept.num}</span>
            <span className="relative font-heading font-black text-white text-lg leading-tight">
              {dept.name.split('.')[1]}
            </span>
            <p className="relative text-[10px] text-white/70 mt-0.5">{dept.tagline}</p>
            <ArrowRight className="absolute bottom-4 right-4 w-4 h-4 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </Link>
        ))}
      </div>
      <Link
        href={getLocalizedPath('/services')}
        className="mt-6 text-sm font-semibold text-white/70 hover:text-white transition-colors inline-flex items-center gap-2"
      >
        Voir tous les services
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
