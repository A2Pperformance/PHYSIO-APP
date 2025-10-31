import React from 'react'

interface PainScaleProps {
  label: string
  value: number
  onChange: (value: number) => void
  className?: string
}

export const PainScale: React.FC<PainScaleProps> = ({
  label,
  value,
  onChange,
  className = ''
}) => {
  return (
    <div className={className}>
      <label className="form-label">{label}</label>
      <div className="pain-scale mt-3">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => onChange(num)}
            className={`pain-scale-button ${value === num ? 'selected' : ''}`}
            aria-label={`Douleur niveau ${num}`}
          >
            {num}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>Aucune douleur</span>
        <span>Douleur maximale</span>
      </div>
      <div className="mt-2 text-center">
        <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full font-semibold">
          {value}/10
        </span>
      </div>
    </div>
  )
}
