import { useState } from 'react';
import { evaluateStrokeTest } from '../utils/calculations';

interface StrokeTestProps {
  onResult: (result: 'Trace' | 'Petit' | 'Modéré' | 'Large') => void;
  initialValue?: 'Trace' | 'Petit' | 'Modéré' | 'Large';
}

const StrokeTest = ({ onResult, initialValue }: StrokeTestProps) => {
  const [selectedResult, setSelectedResult] = useState<'Trace' | 'Petit' | 'Modéré' | 'Large' | null>(
    initialValue || null
  );
  const [showDetails, setShowDetails] = useState(false);

  const handleSelect = (result: 'Trace' | 'Petit' | 'Modéré' | 'Large') => {
    setSelectedResult(result);
    onResult(result);
  };

  const evaluation = selectedResult ? evaluateStrokeTest(selectedResult) : null;

  const severityColors = {
    minimal: 'bg-green-50 border-green-300 text-green-800',
    mild: 'bg-blue-50 border-blue-300 text-blue-800',
    moderate: 'bg-yellow-50 border-yellow-300 text-yellow-800',
    severe: 'bg-red-50 border-red-300 text-red-800',
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="form-label flex items-center justify-between">
          <span>Stroke Test (Évaluation de l'effusion)</span>
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-primary-600 hover:text-primary-700 underline"
          >
            {showDetails ? 'Masquer' : 'Comment faire ?'}
          </button>
        </label>

        {showDetails && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm">
            <h4 className="font-semibold text-blue-900 mb-2">Technique du Stroke Test :</h4>
            <ol className="list-decimal list-inside space-y-2 text-blue-800">
              <li>
                <strong>Position :</strong> Patient en décubitus dorsal, genou en extension
              </li>
              <li>
                <strong>Vidange :</strong> Effectuer 2-3 mouvements ascendants sur la face médiale du genou
                pour chasser le liquide
              </li>
              <li>
                <strong>Test :</strong> Exercer une pression descendante sur la face latérale du genou
              </li>
              <li>
                <strong>Observation :</strong> Observer le retour du liquide sur la face médiale
              </li>
            </ol>
            <div className="mt-3 space-y-1">
              <p><strong>Trace :</strong> Onde apparaît après plusieurs caresses</p>
              <p><strong>Petit :</strong> Onde apparaît immédiatement</p>
              <p><strong>Modéré :</strong> Bombement latéral sans onde médiale</p>
              <p><strong>Large :</strong> Pas de mouvement de liquide possible</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(['Trace', 'Petit', 'Modéré', 'Large'] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleSelect(option)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedResult === option
                  ? 'border-primary-600 bg-primary-50 shadow-md'
                  : 'border-gray-300 bg-white hover:border-primary-400'
              }`}
            >
              <div className="text-center">
                <div className="text-lg font-semibold mb-1">{option}</div>
                <div className="text-xs text-gray-600">
                  {option === 'Trace' && '< 10ml'}
                  {option === 'Petit' && '10-30ml'}
                  {option === 'Modéré' && '30-60ml'}
                  {option === 'Large' && '> 60ml'}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {evaluation && (
        <div
          className={`p-4 rounded-lg border-2 ${
            severityColors[evaluation.severity]
          }`}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 text-2xl">
              {evaluation.severity === 'minimal' && '✓'}
              {evaluation.severity === 'mild' && 'ℹ️'}
              {evaluation.severity === 'moderate' && '⚠️'}
              {evaluation.severity === 'severe' && '🔴'}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-1">{evaluation.classification}</h4>
              <p className="text-sm">{evaluation.recommendation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StrokeTest;
