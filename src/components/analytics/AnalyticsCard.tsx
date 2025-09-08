
import { useState } from 'react'

interface AnalyticsCardProps {
  title: string
  value: string | number
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
  icon: string
  color: string
  trend?: number[]
  period?: string
}

export default function AnalyticsCard({
  title,
  value,
  change,
  changeType,
  icon,
  color,
  trend = [],
  period = 'Son 7 gün'
}: AnalyticsCardProps) {
  const [showTrend, setShowTrend] = useState(false)

  const renderMiniChart = () => {
    if (trend.length === 0) return null
    
    const max = Math.max(...trend)
    const min = Math.min(...trend)
    const width = 80
    const height = 20
    
    const points = trend.map((value, index) => {
      const x = (index / (trend.length - 1)) * width
      const y = height - ((value - min) / (max - min)) * height
      return `${x},${y}`
    }).join(' ')
    
    return (
      <svg width={width} height={height} className="ml-auto">
        <polyline
          points={points}
          fill="none"
          stroke={changeType === 'positive' ? '#10b981' : changeType === 'negative' ? '#ef4444' : '#6b7280'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <div 
      className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={() => setShowTrend(!showTrend)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
          
          <div className="flex items-center">
            <span className={`text-sm font-medium flex items-center ${
              changeType === 'positive' ? 'text-green-600' : 
              changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
            }`}>
              {changeType === 'positive' && <i className="ri-arrow-up-line mr-1"></i>}
              {changeType === 'negative' && <i className="ri-arrow-down-line mr-1"></i>}
              {change}
            </span>
            <span className="text-xs text-gray-500 ml-2">{period}</span>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-2`}>
            <i className={`${icon} text-white text-xl`}></i>
          </div>
          {renderMiniChart()}
        </div>
      </div>
      
      {showTrend && trend.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>Trend Analizi</span>
            <span>{period}</span>
          </div>
          <div className="h-16 bg-gray-50 rounded-lg flex items-end justify-center px-2">
            {trend.map((value, index) => {
              const maxVal = Math.max(...trend)
              const height = (value / maxVal) * 48
              return (
                <div
                  key={index}
                  className={`w-2 mr-1 rounded-t transition-all duration-300 ${
                    changeType === 'positive' ? 'bg-green-400' : 
                    changeType === 'negative' ? 'bg-red-400' : 'bg-gray-400'
                  }`}
                  style={{ height: `${height}px` }}
                  title={`Gün ${index + 1}: ${value}`}
                />
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
