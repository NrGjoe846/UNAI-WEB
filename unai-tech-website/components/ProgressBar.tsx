import React from 'react'

interface ProgressBarProps {
  progress: number
  color?: string
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, color = 'bg-blue-600' }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div
        className={`${color} h-2.5 rounded-full transition-all duration-300 ease-in-out`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  )
}

export default ProgressBar

