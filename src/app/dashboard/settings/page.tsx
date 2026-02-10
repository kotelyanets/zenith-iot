'use client'

import { SettingsHero } from "@/components/settings/settings-hero"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SettingsPage() {
    return (
        <div className="p-4 pt-16 lg:pt-8 lg:p-8">
            <SettingsHero />

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full max-w-[400px] grid-cols-3 bg-zinc-900/50">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="notifications">Alerts</TabsTrigger>
                </TabsList>

                {/* General Tab */}
                <TabsContent value="general" className="mt-6">
                    <Card className="border-zinc-800 bg-zinc-900/30">
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Update your public profile and details.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-6">
                                <Avatar className="w-20 h-20 border-2 border-indigo-500/20">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>ZN</AvatarFallback>
                                </Avatar>
                                <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800">
                                    Change Avatar
                                </Button>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Display Name</Label>
                                    <Input id="name" defaultValue="Zenith Admin" className="bg-black/40 border-zinc-700" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" defaultValue="admin@zenithiott.com" className="bg-black/40 border-zinc-700" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security" className="mt-6">
                    <Card className="border-zinc-800 bg-zinc-900/30">
                        <CardHeader>
                            <CardTitle>Security Settings</CardTitle>
                            <CardDescription>Manage your password and authentication methods.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="current">Current Password</Label>
                                    <Input id="current" type="password" className="bg-black/40 border-zinc-700" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="new">New Password</Label>
                                    <Input id="new" type="password" className="bg-black/40 border-zinc-700" />
                                </div>
                            </div>

                            <div className="border-t border-zinc-800 pt-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base text-zinc-200">Two-Factor Authentication</Label>
                                        <p className="text-sm text-zinc-500">Add an extra layer of security to your account.</p>
                                    </div>
                                    <Switch />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications" className="mt-6">
                    <Card className="border-zinc-800 bg-zinc-900/30">
                        <CardHeader>
                            <CardTitle>Notifications</CardTitle>
                            <CardDescription>Configure how you receive alerts and system updates.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base text-zinc-200">Email Alerts</Label>
                                    <p className="text-sm text-zinc-500">Receive daily summaries and critical alerts via email.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base text-zinc-200">Push Notifications</Label>
                                    <p className="text-sm text-zinc-500">Real-time browser notifications for critical incidents.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base text-zinc-200">System Updates</Label>
                                    <p className="text-sm text-zinc-500">Notifications about maintenance and platform updates.</p>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
