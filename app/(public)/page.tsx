import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Activity, FileText, Target, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900">
            Physio App
          </h1>
          <p className="mb-8 text-xl text-gray-600">
            L'application SaaS pour kinésithérapeutes
          </p>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-500">
            Créez des bilans standardisés, fixez des objectifs de rééducation
            et générez des PDF professionnels en quelques clics.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/auth/sign-up">
              <Button size="lg">Commencer gratuitement</Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline">
                Voir les tarifs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Tout ce dont vous avez besoin
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <Users className="mb-2 h-10 w-10 text-blue-600" />
              <CardTitle>Gestion patients</CardTitle>
              <CardDescription>
                Dossiers complets avec historique de bilans
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <FileText className="mb-2 h-10 w-10 text-green-600" />
              <CardTitle>Bilans standardisés</CardTitle>
              <CardDescription>
                Templates par zone anatomique et contexte
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Target className="mb-2 h-10 w-10 text-orange-600" />
              <CardTitle>Objectifs SMART</CardTitle>
              <CardDescription>
                Suivi précis de la progression patient
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Activity className="mb-2 h-10 w-10 text-purple-600" />
              <CardTitle>Score A2P</CardTitle>
              <CardDescription>
                Calcul automatique du score global
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-blue-600 text-white">
          <CardHeader className="text-center">
            <CardTitle className="mb-4 text-3xl text-white">
              Prêt à moderniser votre pratique ?
            </CardTitle>
            <CardDescription className="text-blue-100">
              Rejoignez des centaines de kinésithérapeutes qui utilisent Physio
              App
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Link href="/auth/sign-up">
              <Button size="lg" variant="secondary">
                Créer mon compte
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2024 Physio App. Tous droits réservés.</p>
          <p className="mt-2 text-sm">
            Développé avec ❤️ pour les kinésithérapeutes
          </p>
        </div>
      </footer>
    </div>
  );
}
