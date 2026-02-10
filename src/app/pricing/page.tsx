"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sparkles } from "@/components/ui/sparkles";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Zap, Shield, Cpu } from "lucide-react";

const plans = [
    {
        name: "Starter",
        icon: Zap,
        description:
            "Perfect for small deployments — monitor up to 25 devices with essential IoT analytics",
        price: 29,
        yearlyPrice: 290,
        buttonText: "Start free trial",
        buttonVariant: "outline" as const,
        includes: [
            "Core features:",
            "Up to 25 devices",
            "Real-time monitoring",
            "Basic energy analytics",
            "Email alerts",
            "7-day data retention",
            "Community support",
            "REST API access",
        ],
    },
    {
        name: "Professional",
        icon: Shield,
        description:
            "Best for growing operations — advanced analytics, AI insights, and priority support",
        price: 79,
        yearlyPrice: 790,
        buttonText: "Get started",
        buttonVariant: "default" as const,
        popular: true,
        includes: [
            "Everything in Starter, plus:",
            "Up to 200 devices",
            "AI-powered anomaly detection",
            "Predictive maintenance",
            "Custom dashboards",
            "90-day data retention",
            "Priority support (24/7)",
            "Webhook integrations",
        ],
    },
    {
        name: "Enterprise",
        icon: Cpu,
        description:
            "Unlimited scale — dedicated infrastructure, SLA guarantees, and white-glove onboarding",
        price: 199,
        yearlyPrice: 1990,
        buttonText: "Contact sales",
        buttonVariant: "outline" as const,
        includes: [
            "Everything in Professional, plus:",
            "Unlimited devices",
            "Multi-site management",
            "Custom AI model training",
            "SSO & SAML authentication",
            "Unlimited data retention",
            "Dedicated account manager",
            "On-premise deployment option",
        ],
    },
];

const PricingSwitch = ({
    onSwitch,
}: {
    onSwitch: (value: string) => void;
}) => {
    const [selected, setSelected] = useState("0");

    const handleSwitch = (value: string) => {
        setSelected(value);
        onSwitch(value);
    };

    return (
        <div className="flex justify-center">
            <div className="relative z-10 mx-auto flex w-fit rounded-full bg-zinc-900 border border-zinc-700 p-1">
                <button
                    onClick={() => handleSwitch("0")}
                    className={cn(
                        "relative z-10 w-fit h-10 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors",
                        selected === "0" ? "text-white" : "text-zinc-200"
                    )}
                >
                    {selected === "0" && (
                        <motion.span
                            layoutId="pricing-switch"
                            className="absolute top-0 left-0 h-10 w-full rounded-full border-4 shadow-sm shadow-violet-600 border-violet-600 bg-gradient-to-t from-violet-500 to-violet-600"
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                    )}
                    <span className="relative">Monthly</span>
                </button>

                <button
                    onClick={() => handleSwitch("1")}
                    className={cn(
                        "relative z-10 w-fit h-10 flex-shrink-0 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors",
                        selected === "1" ? "text-white" : "text-zinc-200"
                    )}
                >
                    {selected === "1" && (
                        <motion.span
                            layoutId="pricing-switch"
                            className="absolute top-0 left-0 h-10 w-full rounded-full border-4 shadow-sm shadow-violet-600 border-violet-600 bg-gradient-to-t from-violet-500 to-violet-600"
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                    )}
                    <span className="relative flex items-center gap-2">
                        Yearly
                        <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                            Save 17%
                        </span>
                    </span>
                </button>
            </div>
        </div>
    );
};

export default function PricingPage() {
    const [isYearly, setIsYearly] = useState(false);
    const pricingRef = useRef<HTMLDivElement>(null);

    const revealVariants = {
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                delay: i * 0.3,
                duration: 0.5,
            },
        }),
        hidden: {
            filter: "blur(10px)",
            y: -20,
            opacity: 0,
        },
    };

    const togglePricingPeriod = (value: string) =>
        setIsYearly(Number.parseInt(value) === 1);

    return (
        <div
            className="min-h-screen mx-auto relative bg-black overflow-x-hidden"
            ref={pricingRef}
        >
            {/* Back Navigation */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="fixed top-0 left-0 w-full flex justify-between items-center p-6 z-[100] bg-transparent"
            >
                <Link
                    href="/"
                    className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-xl font-bold text-white tracking-widest uppercase">
                        Zenith
                    </span>
                </Link>
                <div className="flex gap-4">
                    <Link href="/login">
                        <Button
                            variant="ghost"
                            className="text-zinc-300 hover:text-white hover:bg-white/10"
                        >
                            Log In
                        </Button>
                    </Link>
                    <Link href="/signup">
                        <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-6 shadow-[0_0_15px_rgba(124,58,237,0.5)]">
                            Sign Up
                        </Button>
                    </Link>
                </div>
            </motion.div>

            {/* Background: Sparkles + Grid */}
            <TimelineContent
                animationNum={4}
                timelineRef={pricingRef}
                customVariants={revealVariants}
                className="absolute top-0 h-96 w-screen overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]"
            >
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff2c_1px,transparent_1px),linear-gradient(to_bottom,#3a3a3a01_1px,transparent_1px)] bg-[size:70px_80px]" />
                <Sparkles
                    density={1200}
                    direction="bottom"
                    speed={0.8}
                    color="#FFFFFF"
                    className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
                />
            </TimelineContent>

            {/* Background: Violet glow */}
            <TimelineContent
                animationNum={5}
                timelineRef={pricingRef}
                customVariants={revealVariants}
                className="absolute left-0 top-[-114px] w-full h-[113.625vh] flex flex-col items-start justify-start content-start flex-none flex-nowrap gap-2.5 overflow-hidden p-0 z-0"
            >
                <div>
                    <div
                        className="absolute left-[-568px] right-[-568px] top-0 h-[2053px] flex-none rounded-full"
                        style={{
                            border: "200px solid #7c3aed",
                            filter: "blur(92px)",
                            WebkitFilter: "blur(92px)",
                        }}
                    />
                    <div
                        className="absolute left-[-568px] right-[-568px] top-0 h-[2053px] flex-none rounded-full"
                        style={{
                            border: "200px solid #7c3aed",
                            filter: "blur(92px)",
                            WebkitFilter: "blur(92px)",
                        }}
                    />
                </div>
            </TimelineContent>

            {/* Header */}
            <article className="text-center mb-6 pt-32 max-w-3xl mx-auto space-y-2 relative z-50 px-4">
                <h2 className="text-4xl sm:text-5xl font-medium text-white">
                    <VerticalCutReveal
                        splitBy="words"
                        staggerDuration={0.15}
                        staggerFrom="first"
                        reverse={true}
                        containerClassName="justify-center"
                        transition={{
                            type: "spring",
                            stiffness: 250,
                            damping: 40,
                            delay: 0,
                        }}
                    >
                        Scale your IoT infrastructure
                    </VerticalCutReveal>
                </h2>

                <TimelineContent
                    as="p"
                    animationNum={0}
                    timelineRef={pricingRef}
                    customVariants={revealVariants}
                    className="text-zinc-300 max-w-lg mx-auto"
                >
                    From prototype to production. Choose a plan that fits your deployment
                    size and unlock the full power of Zenith IoT.
                </TimelineContent>

                <TimelineContent
                    as="div"
                    animationNum={1}
                    timelineRef={pricingRef}
                    customVariants={revealVariants}
                >
                    <PricingSwitch onSwitch={togglePricingPeriod} />
                </TimelineContent>
            </article>

            {/* Violet radial glow behind cards */}
            <div
                className="absolute top-0 left-[10%] right-[10%] w-[80%] h-full z-0"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at center, #7c3aed 0%, transparent 70%)",
                    opacity: 0.5,
                    mixBlendMode: "multiply",
                }}
            />

            {/* Pricing Cards Grid */}
            <div className="grid md:grid-cols-3 max-w-5xl gap-4 py-6 mx-auto px-4">
                {plans.map((plan, index) => {
                    const Icon = plan.icon;
                    return (
                        <TimelineContent
                            key={plan.name}
                            as="div"
                            animationNum={2 + index}
                            timelineRef={pricingRef}
                            customVariants={revealVariants}
                        >
                            <Card
                                className={`relative text-white border-zinc-800 ${plan.popular
                                        ? "bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 shadow-[0px_-13px_300px_0px_#7c3aed] z-20"
                                        : "bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 z-10"
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <span className="bg-violet-600 text-white text-xs font-semibold px-4 py-1 rounded-full shadow-lg shadow-violet-800/50">
                                            Most Popular
                                        </span>
                                    </div>
                                )}

                                <CardHeader className="text-left">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-3xl mb-2 flex items-center gap-2">
                                            <Icon className="w-7 h-7 text-violet-400" />
                                            {plan.name}
                                        </h3>
                                    </div>
                                    <div className="flex items-baseline">
                                        <span className="text-4xl font-semibold">
                                            $
                                            <NumberFlow
                                                format={{ currency: "USD" }}
                                                value={isYearly ? plan.yearlyPrice : plan.price}
                                                className="text-4xl font-semibold"
                                            />
                                        </span>
                                        <span className="text-zinc-300 ml-1">
                                            /{isYearly ? "year" : "month"}
                                        </span>
                                    </div>
                                    <p className="text-sm text-zinc-300 mb-4">
                                        {plan.description}
                                    </p>
                                </CardHeader>

                                <CardContent className="pt-0">
                                    <button
                                        className={`w-full mb-6 p-4 text-xl rounded-xl font-medium transition-all ${plan.popular
                                                ? "bg-gradient-to-t from-violet-500 to-violet-600 shadow-lg shadow-violet-800 border border-violet-500 text-white hover:from-violet-400 hover:to-violet-500"
                                                : "bg-gradient-to-t from-zinc-950 to-zinc-600 shadow-lg shadow-zinc-900 border border-zinc-800 text-white hover:from-zinc-900 hover:to-zinc-500"
                                            }`}
                                    >
                                        {plan.buttonText}
                                    </button>

                                    <div className="space-y-3 pt-4 border-t border-zinc-700">
                                        <h4 className="font-medium text-base mb-3 text-zinc-200">
                                            {plan.includes[0]}
                                        </h4>
                                        <ul className="space-y-2.5">
                                            {plan.includes.slice(1).map((feature, featureIndex) => (
                                                <li
                                                    key={featureIndex}
                                                    className="flex items-center gap-2.5"
                                                >
                                                    <Check className="w-4 h-4 text-violet-400 shrink-0" />
                                                    <span className="text-sm text-zinc-300">
                                                        {feature}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        </TimelineContent>
                    );
                })}
            </div>

            {/* Footer CTA */}
            <TimelineContent
                as="div"
                animationNum={6}
                timelineRef={pricingRef}
                customVariants={revealVariants}
                className="text-center py-16 px-4 relative z-50"
            >
                <p className="text-zinc-400 mb-4">
                    Need a custom solution? We build tailored IoT platforms for
                    enterprise-grade operations.
                </p>
                <Link href="/signup">
                    <Button
                        size="lg"
                        className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-8 shadow-[0_0_15px_rgba(124,58,237,0.5)]"
                    >
                        Start your free trial
                    </Button>
                </Link>
            </TimelineContent>
        </div>
    );
}
