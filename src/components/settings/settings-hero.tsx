'use client'

import { SplineScene } from "@/components/ui/spline";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"

export function SettingsHero() {
    return (
        <Card className="w-full h-[350px] bg-black/[0.96] relative overflow-hidden border-zinc-800 mb-8">
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
            />

            <div className="flex h-full flex-col md:flex-row">
                <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                        Zenith Pro
                    </h1>
                    <p className="mt-4 text-neutral-300 max-w-lg">
                        Unlock interactive 3D spatial monitoring. Experience your infrastructure in a fully immersive digital twin environment.
                    </p>
                </div>

                <div className="flex-1 relative hidden md:block">
                    {/* Using the scene URL provided */}
                    <SplineScene
                        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                        className="w-full h-full scale-125 translate-x-10 translate-y-10"
                    />
                </div>
            </div>
        </Card>
    )
}
