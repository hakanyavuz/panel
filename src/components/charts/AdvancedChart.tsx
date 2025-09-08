
import { useState, useEffect } from 'react'

interface ChartData {
  labels: string[]
  datasets: Array<{
    label: string
    data: number[]
    backgroundColor?: string
    borderColor?: string
    fill?: boolean
  }>
}

interface AdvancedChartProps {
  type: 'line' | 'bar' | 'pie' | 'area' | 'radar'
  data: ChartData
  title: string
  height?: string
  showLegend?: boolean
  animated?: boolean
}

export default function AdvancedChart({ 
  type, 
  data, 
  title, 
  height = 'h-80', 
  showLegend = true,
  animated = true 
}: AdvancedChartProps) {
  const [isAnimated, setIsAnimated] = useState(false)

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setIsAnimated(true), 100)
      return () => clearTimeout(timer)
    }
  }, [animated])

  const maxValue = Math.max(...data.datasets.flatMap(d => d.data))
  const minValue = Math.min(...data.datasets.flatMap(d => d.data))

  const renderLineChart = () => {
    const chartHeight = 200
    const chartWidth = 400
    
    return (
      <div className="relative">
        <svg 
          width="100%" 
          height={chartHeight} 
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="overflow-visible"
        >
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <line
              key={i}
              x1="40"
              y1={40 + (i * (chartHeight - 80) / 4)}
              x2={chartWidth - 20}
              y2={40 + (i * (chartHeight - 80) / 4)}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
          ))}
          
          {/* Data lines */}
          {data.datasets.map((dataset, datasetIndex) => {
            const points = dataset.data.map((value, index) => {
              const x = 40 + (index * (chartWidth - 60) / (data.labels.length - 1))
              const y = chartHeight - 40 - ((value - minValue) / (maxValue - minValue)) * (chartHeight - 80)
              return `${x},${y}`
            }).join(' ')

            return (
              <g key={datasetIndex}>
                {/* Area fill for area charts */}
                {type === 'area' && (
                  <polygon
                    points={`40,${chartHeight - 40} ${points} ${chartWidth - 20},${chartHeight - 40}`}
                    fill={dataset.backgroundColor || '#3b82f6'}
                    fillOpacity="0.1"
                    className={isAnimated ? 'transition-all duration-1000 ease-out' : ''}
                  />
                )}
                
                {/* Line */}
                <polyline
                  points={points}
                  fill="none"
                  stroke={dataset.borderColor || '#3b82f6'}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={isAnimated ? 'transition-all duration-1000 ease-out' : ''}
                  style={{
                    strokeDasharray: isAnimated ? 'none' : '1000',
                    strokeDashoffset: isAnimated ? '0' : '1000'
                  }}
                />
                
                {/* Data points */}
                {dataset.data.map((value, index) => {
                  const x = 40 + (index * (chartWidth - 60) / (data.labels.length - 1))
                  const y = chartHeight - 40 - ((value - minValue) / (maxValue - minValue)) * (chartHeight - 80)
                  
                  return (
                    <circle
                      key={index}
                      cx={x}
                      cy={y}
                      r="4"
                      fill={dataset.borderColor || '#3b82f6'}
                      className={`transition-all duration-500 hover:r-6 cursor-pointer ${
                        isAnimated ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <title>{`${data.labels[index]}: ${value}`}</title>
                    </circle>
                  )
                })}
              </g>
            )
          })}
          
          {/* Y-axis labels */}
          {[0, 1, 2, 3, 4].map(i => {
            const value = maxValue - (i * (maxValue - minValue) / 4)
            return (
              <text
                key={i}
                x="35"
                y={45 + (i * (chartHeight - 80) / 4)}
                textAnchor="end"
                className="text-xs fill-gray-500"
              >
                {Math.round(value)}
              </text>
            )
          })}
          
          {/* X-axis labels */}
          {data.labels.map((label, index) => {
            const x = 40 + (index * (chartWidth - 60) / (data.labels.length - 1))
            return (
              <text
                key={index}
                x={x}
                y={chartHeight - 20}
                textAnchor="middle"
                className="text-xs fill-gray-500"
              >
                {label}
              </text>
            )
          })}
        </svg>
      </div>
    )
  }

  const renderBarChart = () => {
    const chartHeight = 200
    const chartWidth = 400
    const barWidth = (chartWidth - 80) / data.labels.length / data.datasets.length
    
    return (
      <div className="relative">
        <svg 
          width="100%" 
          height={chartHeight} 
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="overflow-visible"
        >
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <line
              key={i}
              x1="40"
              y1={40 + (i * (chartHeight - 80) / 4)}
              x2={chartWidth - 20}
              y2={40 + (i * (chartHeight - 80) / 4)}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
          ))}
          
          {/* Bars */}
          {data.datasets.map((dataset, datasetIndex) => 
            dataset.data.map((value, index) => {
              const x = 40 + (index * (chartWidth - 80) / data.labels.length) + (datasetIndex * barWidth)
              const barHeight = ((value - minValue) / (maxValue - minValue)) * (chartHeight - 80)
              const y = chartHeight - 40 - barHeight
              
              return (
                <rect
                  key={`${datasetIndex}-${index}`}
                  x={x}
                  y={y}
                  width={barWidth * 0.8}
                  height={isAnimated ? barHeight : 0}
                  fill={dataset.backgroundColor || '#3b82f6'}
                  className="transition-all duration-700 ease-out hover:opacity-80 cursor-pointer"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <title>{`${data.labels[index]}: ${value}`}</title>
                </rect>
              )
            })
          )}
          
          {/* Y-axis labels */}
          {[0, 1, 2, 3, 4].map(i => {
            const value = maxValue - (i * (maxValue - minValue) / 4)
            return (
              <text
                key={i}
                x="35"
                y={45 + (i * (chartHeight - 80) / 4)}
                textAnchor="end"
                className="text-xs fill-gray-500"
              >
                {Math.round(value)}
              </text>
            )
          })}
          
          {/* X-axis labels */}
          {data.labels.map((label, index) => {
            const x = 40 + (index * (chartWidth - 80) / data.labels.length) + ((chartWidth - 80) / data.labels.length / 2)
            return (
              <text
                key={index}
                x={x}
                y={chartHeight - 20}
                textAnchor="middle"
                className="text-xs fill-gray-500"
              >
                {label}
              </text>
            )
          })}
        </svg>
      </div>
    )
  }

  const renderPieChart = () => {
    const total = data.datasets[0]?.data.reduce((sum, value) => sum + value, 0) || 0
    let currentAngle = -90
    const radius = 80
    const centerX = 120
    const centerY = 100
    
    return (
      <div className="flex items-center">
        <svg width="240" height="200" className="overflow-visible">
          {data.datasets[0]?.data.map((value, index) => {
            const angle = (value / total) * 360
            const startAngle = currentAngle
            const endAngle = currentAngle + angle
            
            const startX = centerX + radius * Math.cos(startAngle * Math.PI / 180)
            const startY = centerY + radius * Math.sin(startAngle * Math.PI / 180)
            const endX = centerX + radius * Math.cos(endAngle * Math.PI / 180)
            const endY = centerY + radius * Math.sin(endAngle * Math.PI / 180)
            
            const largeArcFlag = angle > 180 ? 1 : 0
            
            const pathData = [
              `M ${centerX} ${centerY}`,
              `L ${startX} ${startY}`,
              `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
              'Z'
            ].join(' ')
            
            currentAngle += angle
            
            const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']
            
            return (
              <path
                key={index}
                d={pathData}
                fill={colors[index % colors.length]}
                className={`transition-all duration-500 hover:opacity-80 cursor-pointer ${
                  isAnimated ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <title>{`${data.labels[index]}: ${value} (${Math.round((value / total) * 100)}%)`}</title>
              </path>
            )
          })}
        </svg>
        
        {showLegend && (
          <div className="ml-6 space-y-2">
            {data.labels.map((label, index) => {
              const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']
              const value = data.datasets[0]?.data[index] || 0
              const percentage = Math.round((value / total) * 100)
              
              return (
                <div key={index} className="flex items-center text-sm">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  ></div>
                  <span className="text-gray-700">{label}: {percentage}%</span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center space-x-2">
          <i className="ri-bar-chart-2-line text-gray-400"></i>
        </div>
      </div>
      
      <div className={`${height} flex items-center justify-center`}>
        {type === 'line' || type === 'area' ? renderLineChart() : 
         type === 'bar' ? renderBarChart() : 
         type === 'pie' ? renderPieChart() : 
         renderLineChart()}
      </div>
    </div>
  )
}
