import Link from 'next/link'
import {
    Globe,
    Share2,
    MessageCircle,
    Link as LinkIcon,
    Send,
    Feather,
} from 'lucide-react'

const links = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Devices', href: '/dashboard/devices' },
    { title: 'Analytics', href: '/dashboard/analytics' },
    { title: 'Zenith AI', href: '/dashboard/ai-chat' },
    { title: 'Support', href: '/dashboard/support' },
    { title: 'Settings', href: '/dashboard/settings' },
]

export default function FooterSection() {
    return (
        <footer className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="text-zinc-500 hover:text-violet-400 block duration-150">
                            <span>{link.title}</span>
                        </Link>
                    ))}
                </div>
                <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                    <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="Share" className="text-zinc-500 hover:text-violet-400 block">
                        <Share2 className="size-5" />
                    </Link>
                    <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="Messages" className="text-zinc-500 hover:text-violet-400 block">
                        <MessageCircle className="size-5" />
                    </Link>
                    <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="Links" className="text-zinc-500 hover:text-violet-400 block">
                        <LinkIcon className="size-5" />
                    </Link>
                    <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="Website" className="text-zinc-500 hover:text-violet-400 block">
                        <Globe className="size-5" />
                    </Link>
                    <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="Send" className="text-zinc-500 hover:text-violet-400 block">
                        <Send className="size-5" />
                    </Link>
                    <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="Blog" className="text-zinc-500 hover:text-violet-400 block">
                        <Feather className="size-5" />
                    </Link>
                </div>
                <span className="text-zinc-600 block text-center text-sm">© {new Date().getFullYear()} Zenith IoT Platform. All rights reserved.</span>
            </div>
        </footer>
    )
}
