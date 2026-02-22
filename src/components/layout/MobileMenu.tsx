'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Icon } from '@/components/ui/Icon'

export function MobileMenu() {
    const t = useTranslations('nav')
    const [open, setOpen] = useState(false)

    const navLinks = [
        { href: '/', label: t('home') },
        { href: '/projects', label: t('projects') },
        { href: '/about', label: t('about') },
        { href: '/contacts', label: t('contacts') },
    ] as const

    return (
        <div className="md:hidden">
            <button
                onClick={() => setOpen(true)}
                className="p-2 rounded-lg text-foreground hover:bg-surface transition-colors"
                aria-label="Open menu"
            >
                <Icon name="menu" className="w-6 h-6" />
            </button>

            {open && (
                <div className="fixed inset-0 z-50 bg-background flex flex-col">
                    {/* Top bar */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                        <span className="text-lg font-bold text-foreground">
                            Menu
                        </span>
                        <button
                            onClick={() => setOpen(false)}
                            className="p-2 rounded-lg text-foreground hover:bg-surface transition-colors"
                            aria-label="Close menu"
                        >
                            <Icon name="x" className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Nav links */}
                    <nav className="flex flex-col gap-2 p-6 bg-background">
                        {navLinks.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                onClick={() => setOpen(false)}
                                className="text-2xl font-semibold text-foreground hover:text-accent transition-colors py-3 border-b border-border"
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </div>
    )
}
