'use client'

import { useState, useEffect } from 'react'
import { BarChart, PieChart, LineChart, Users, MapPin, DollarSign, Briefcase, Plane, Camera, Utensils, Hotel, Sun, ShoppingBag } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'

const analysisTypes = [
    { name: 'International Tourists', imageName: 'InternationalTouristsToIndia', icon: LineChart },
    { name: 'Total Arrivals', imageName: 'TotalArrivals-2001-2019', icon: MapPin },
    { name: 'Quarterly Distribution of FTAs', imageName: 'Quarterly Distribution of Tourists [2017, 2018, 2019]', icon: PieChart },
    { name: 'Quarterly Distribution - 2017', imageName: 'Quarterly Distribution of Tourists in 2017', icon: Users },
    { name: 'Percent Distribution Quaterly', imageName: 'Average _ Distribution of Tourists Quarterly from 2001-2019', icon: DollarSign },
    { name: 'Percent Distribution Quaterly - Pie', imageName: 'Average _ Distribution of Tourists Quarterly from 2001-2019_pie', icon: Briefcase },
    { name: 'Tourists segregation based on age', imageName: 'AgeBasedTourist', icon: Plane },
    { name: 'Percent Tourists By Age', imageName: 'PercentTouristByAge', icon: Camera },
    { name: 'Culinary Tourism', imageName: 'CulinaryTourism', icon: Utensils },
    { name: 'Accommodation Trends', imageName: 'AccommodationTrends', icon: Hotel },
    { name: 'Seasonal Patterns', imageName: 'SeasonalPatterns', icon: Sun },
    { name: 'Shopping Behavior', imageName: 'ShoppingTrends', icon: ShoppingBag },
]

export default function IndiaTourismAnalysis() {
    const [isLoading, setIsLoading] = useState(false)
    const [currentChart, setCurrentChart] = useState<string | null>(null)
    const [loadingProgress, setLoadingProgress] = useState(0)

    useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setLoadingProgress(prev => (prev >= 100 ? 0 : prev + 10))
            }, 200)
            return () => clearInterval(interval)
        }
    }, [isLoading])

    const runAnalysis = (imageName: string) => {
        setIsLoading(true)
        setCurrentChart(null)
        setLoadingProgress(0)

        setTimeout(() => {
            setIsLoading(false)
            setCurrentChart(imageName)
        }, 3000)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 p-8 relative overflow-hidden">
            <div className="max-w-6xl mx-auto space-y-8 relative z-10">
                <div className="text-center space-y-4">
                    <h1 className="text-6xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
                        Incredible India
                    </h1>
                    <p className="text-2xl font-light text-gray-300">Tourism Analysis Dashboard</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {analysisTypes.map(({ name, imageName, icon: Icon }) => (
                        <Button
                            key={imageName}
                            onClick={() => runAnalysis(imageName)}
                            className="flex flex-col items-center justify-center space-y-2 px-4 py-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-orange-500 group h-32"
                        >
                            <Icon className="w-8 h-8 text-gray-400 group-hover:text-orange-500 transition-colors duration-300" />
                            <span className="capitalize text-sm text-center line-clamp-2">{name}</span>
                        </Button>
                    ))}
                </div>

                <div className="mt-12 h-[36rem] flex items-center justify-center rounded-2xl bg-gray-800 border border-gray-700 overflow-hidden relative shadow-2xl">
                    {isLoading ? (
                        <div className="text-center space-y-4">
                            <div className="w-24 h-24 rounded-full border-4 border-orange-500 border-t-transparent animate-spin mx-auto" />
                            <div className="w-48 h-2 bg-gray-700 rounded-full mx-auto overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-full transition-all duration-300 ease-out"
                                    style={{ width: `${loadingProgress}%` }}
                                />
                            </div>
                            <p className="text-lg font-semibold mt-4 animate-pulse">Analyzing India Tourism Data...</p>
                        </div>
                    ) : currentChart ? (
                        <div className="text-center p-6 w-full h-full flex flex-col items-center justify-center space-y-6">
                            <div className="relative w-full h-96 mb-6 overflow-hidden rounded-xl shadow-lg">
                                <Image
                                    src={`/assets/${currentChart}.png`}
                                    alt={`${currentChart} Chart`}
                                    layout="fill"
                                    objectFit="contain"
                                    className="rounded-lg"
                                />
                            </div>
                            <div className="space-y-2">
                                <p className="text-2xl font-bold capitalize bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-transparent bg-clip-text">
                                    {analysisTypes.find(type => type.imageName === currentChart)?.name || currentChart} Analysis
                                </p>
                                <p className="text-sm text-gray-400">Data insights generated using advanced ML algorithms</p>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center space-y-4">
                            <p className="text-2xl text-gray-400">Select an analysis type to begin your journey through Incredible India</p>
                            <p className="text-sm text-gray-500">Explore the diverse facets of Indian tourism with our interactive dashboard</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}