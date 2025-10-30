import UnsupportedContinue from '@/components/unsupported/unsupported-continue'

export const metadata = {
  title: 'Navigateur non supporté',
  description: "Votre navigateur est trop ancien pour afficher ce site correctement. Mettez-le à jour pour de meilleures performances et sécurité.",
}

export default function UnsupportedPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold">Navigateur non supporté</h1>
        <p className="mt-4 text-lg">
          Votre navigateur est trop ancien pour afficher ce site correctement.
          Veuillez le mettre à jour pour des raisons de sécurité et de compatibilité.
        </p>

        <div className="mt-6">
          <p className="font-medium">Télécharger un navigateur moderne :</p>
          <div className="mt-3 flex flex-wrap justify-center gap-3">
            <a className="text-blue-600 underline" href="https://www.google.com/chrome/" target="_blank" rel="noopener noreferrer">Chrome</a>
            <a className="text-blue-600 underline" href="https://www.mozilla.org/firefox/new/" target="_blank" rel="noopener noreferrer">Firefox</a>
            <a className="text-blue-600 underline" href="https://www.microsoft.com/edge" target="_blank" rel="noopener noreferrer">Edge</a>
            <a className="text-blue-600 underline" href="https://support.apple.com/downloads/safari" target="_blank" rel="noopener noreferrer">Safari</a>
          </div>
        </div>

        <UnsupportedContinue />

        <p className="mt-4 text-sm text-gray-600">Si vous continuez, certaines fonctionnalités peuvent ne pas fonctionner correctement.</p>
      </div>
    </main>
  )
}