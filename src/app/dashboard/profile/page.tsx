import { auth } from "@/auth"
import { signOutAction } from "@/app/lib/signout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Mail, Shield, Bell, Key, LogOut } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default async function ProfilePage() {
    const session = await auth();
    const user = session?.user;

    // Use type assertion for role since we haven't updated types yet
    const role = (user as any)?.role || "user";

    return (
        <div className="p-4 pt-16 lg:pt-8 lg:p-8 space-y-8 max-w-4xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-zinc-100 mb-2">Profile</h1>
                <p className="text-zinc-400 text-sm lg:text-base">Manage your account settings and preferences</p>
            </div>

            {/* Profile Card */}
            <Card className="bg-zinc-900/60 border-white/10 backdrop-blur">
                <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        {/* Avatar */}
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center border-2 border-violet-400/30 shadow-lg shadow-violet-500/20">
                            {user?.image ? (
                                <img src={user.image} alt={user.name || "User"} className="w-full h-full rounded-full object-cover" />
                            ) : (
                                <User className="w-10 h-10 text-white" />
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold text-zinc-100">{user?.name || "User"}</h2>
                            <p className="text-zinc-400 text-sm">{user?.email}</p>
                            <div className="flex gap-2 mt-2">
                                <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30 hover:bg-violet-500/30 capitalize">
                                    {role}
                                </Badge>
                                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30">
                                    Verified
                                </Badge>
                            </div>
                        </div>

                        <Button variant="outline" className="border-white/10 text-zinc-300 hover:bg-white/5">
                            Edit Photo
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Settings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Info */}
                <Card className="bg-zinc-900/60 border-white/10 backdrop-blur">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-zinc-100 flex items-center gap-2 text-lg">
                            <User className="w-5 h-5 text-violet-400" />
                            Personal Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="text-xs text-zinc-500 uppercase tracking-wider mb-1.5 block">Full Name</label>
                            <Input
                                defaultValue={user?.name || ""}
                                className="bg-white/5 border-white/10 text-zinc-200 focus:border-violet-500"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-zinc-500 uppercase tracking-wider mb-1.5 block">Email</label>
                            <Input
                                defaultValue={user?.email || ""}
                                className="bg-white/5 border-white/10 text-zinc-200 focus:border-violet-500"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-zinc-500 uppercase tracking-wider mb-1.5 block">Role</label>
                            <Input
                                defaultValue={role}
                                disabled
                                className="bg-white/5 border-white/10 text-zinc-400 capitalize"
                            />
                        </div>
                        <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white">
                            Save Changes
                        </Button>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="space-y-6">
                    <Card className="bg-zinc-900/60 border-white/10 backdrop-blur">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-zinc-100 flex items-center gap-2 text-lg">
                                <Shield className="w-5 h-5 text-violet-400" />
                                Security
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <button className="flex items-center gap-3 w-full p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-colors text-left">
                                <Key className="w-4 h-4 text-zinc-400" />
                                <div className="flex-1">
                                    <p className="text-sm text-zinc-200">Change Password</p>
                                    <p className="text-xs text-zinc-500">Last changed 30 days ago</p>
                                </div>
                            </button>
                            <button className="flex items-center gap-3 w-full p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-colors text-left">
                                <Shield className="w-4 h-4 text-zinc-400" />
                                <div className="flex-1">
                                    <p className="text-sm text-zinc-200">Two-Factor Authentication</p>
                                    <p className="text-xs text-emerald-400">Enabled</p>
                                </div>
                            </button>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900/60 border-white/10 backdrop-blur">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-zinc-100 flex items-center gap-2 text-lg">
                                <Bell className="w-5 h-5 text-violet-400" />
                                Notifications
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <button className="flex items-center gap-3 w-full p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-colors text-left">
                                <Mail className="w-4 h-4 text-zinc-400" />
                                <div className="flex-1">
                                    <p className="text-sm text-zinc-200">Email Notifications</p>
                                    <p className="text-xs text-zinc-500">Critical alerts only</p>
                                </div>
                            </button>
                        </CardContent>
                    </Card>

                    <form action={signOutAction}>
                        <Button variant="outline" type="submit" className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300">
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign Out
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
