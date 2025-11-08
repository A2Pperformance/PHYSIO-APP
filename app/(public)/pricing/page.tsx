import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Start',
    price: '29',
    period: 'mois',
    description: 'Parfait pour débuter',
    features: [
      'Patients illimités',
      'Bilans standardisés',
      'Objectifs de rééducation',
      'Export PDF professionnel',
      'Score A2P automatique',
      '1 utilisateur',
    ],
  },
  {
    name: 'Pro',
    price: '59',
    period: 'mois',
    description: 'Pour les praticiens exigeants',
    features: [
      'Tout Start +',
      'Comparaisons automatiques',
      'Suggestions d\'objectifs IA',
      'Partage sécurisé',
      'Statistiques avancées',
      '1 utilisateur',
    ],
    highlighted: true,
  },
  {
    name: 'Cabinet',
    price: '129',
    period: 'mois',
    description: 'Pour les cabinets multi-praticiens',
    features: [
      'Tout Pro +',
      'Jusqu\'à 3 utilisateurs',
      'Bibliothèque partagée',
      'Gestion centralisée',
      'Statistiques cabinet',
      'Support prioritaire',
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold">
            Choisissez votre plan
          </h1>
          <p className="text-lg text-gray-600">
            Tarifs simples et transparents. Sans engagement.
          </p>
        </div>

        {/* Plans */}
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={
                plan.highlighted
                  ? 'border-2 border-blue-600 shadow-xl'
                  : ''
              }
            >
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}€</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/auth/sign-up" className="w-full">
                  <Button
                    className="w-full"
                    variant={plan.highlighted ? 'default' : 'outline'}
                  >
                    Commencer
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="mb-8 text-center text-3xl font-bold">
            Questions fréquentes
          </h2>
          <div className="mx-auto max-w-3xl space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Puis-je changer de plan ?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Oui, vous pouvez upgrader ou downgrader votre plan à tout
                  moment. Les changements sont appliqués immédiatement.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Y a-t-il un engagement ?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Non, tous nos plans sont sans engagement. Vous pouvez annuler
                  à tout moment.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Les données sont-elles sécurisées ?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Oui, toutes les données sont chiffrées et hébergées de manière
                  sécurisée. Migration vers hébergement certifié HDS prévue.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Back to home */}
        <div className="mt-12 text-center">
          <Link href="/">
            <Button variant="ghost">← Retour à l'accueil</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
