'use client'

import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
    scene: string
    className?: string
    renderOnDemand?: boolean
}

export function SplineScene({ scene, className, renderOnDemand = false }: SplineSceneProps) {
    return (
        <Suspense
            fallback={
                <div className="w-full h-full flex items-center justify-center">
                    <span className="loader text-white">Loading 3D...</span>
                </div>
            }
        >
            <Spline
                scene={scene}
                className={className}
                renderOnDemand={renderOnDemand}
            />
        </Suspense>
    )
}
