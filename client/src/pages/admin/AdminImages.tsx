import { Link } from "wouter";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageIcon, LayoutGrid, ArrowRight } from "lucide-react";
import "@/styles/admin.css";

const IMAGE_SECTIONS = [
  {
    title: "Photos page principale",
    description: "Logos, hero, photos leaders — aperçu et upload R2",
    href: "/admin/site-photos",
    icon: ImageIcon,
  },
  {
    title: "Logos carousel",
    description: "Gérer les logos du carrousel d'accueil",
    href: "/admin/carousel-logos",
    icon: LayoutGrid,
  },
];

export default function AdminImages() {
  return (
    <AdminLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <ImageIcon className="w-8 h-8 text-[#523DCB]" />
            Images
          </h1>
          <p className="text-gray-300">
            Gérez toutes les images du site : photos de la page principale, logos du carrousel.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {IMAGE_SECTIONS.map((section) => {
            const Icon = section.icon;
            return (
              <Link key={section.href} href={section.href}>
                <Card className="border border-gray-700 bg-gray-800/50 hover:bg-gray-700/50 transition-colors cursor-pointer group">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white"
                          style={{ background: "linear-gradient(to right, #6B1817, #523DCB)" }}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-white text-base" style={{ fontFamily: "'Neue Haas Unica Pro', sans-serif" }}>
                            {section.title}
                          </CardTitle>
                          <CardDescription className="text-gray-400 text-sm mt-0.5">
                            {section.description}
                          </CardDescription>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
