'use client'

import { useState, useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Icon } from '@/components/ui/Icon'

export function MobileMenu() {
    const t = useTranslations('nav')
    const [open, setOpen] = useState(false)
    const triggerRef = useRef<HTMLButtonElement>(null)
    const menuRef = useRef<HTMLDivElement>(null)

    const navLinks = [
        { href: '/', label: t('home') },
        { href: '/projects', label: t('projects') },
        { href: '/about', label: t('about') },
        { href: '/contacts', label: t('contacts') },
    ] as const

    function close() {
        setOpen(false)
        triggerRef.current?.focus()
    }

    useEffect(() => {
        if (!open) return

        // Move focus to first button in menu when it opens
        const firstFocusable = menuRef.current?.querySelector<HTMLElement>('button, a')
        firstFocusable?.focus()

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                close()
                return
            }

            if (e.key !== 'Tab') return

            const focusable = Array.from(
                menuRef.current?.querySelectorAll<HTMLElement>('a, button') ?? []
            )
            const first = focusable[0]
            const last = focusable[focusable.length - 1]

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault()
                last?.focus()
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault()
                first?.focus()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [open])

    return (
        <div className="md:hidden">
            <button
                ref={triggerRef}
                onClick={() => setOpen(true)}
                aria-expanded={open}
                aria-haspopup="dialog"
                className="p-2 rounded-lg text-foreground hover:bg-surface transition-colors"
                aria-label="Open menu"
            >
                <Icon name="menu" className="w-6 h-6" />
            </button>

            {open && (
                <div
                    ref={menuRef}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Navigation menu"
                    className="fixed inset-0 z-50 bg-background flex flex-col"
                >
                    {/* Top bar */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                        <span className="text-lg font-bold text-foreground">
                            {t('menu')}
                        </span>
                        <button
                            onClick={close}
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
                                onClick={close}
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
