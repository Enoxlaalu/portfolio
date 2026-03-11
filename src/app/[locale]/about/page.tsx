import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

const SKILL_GROUPS = [
    { title: 'Core',         skills: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'HTML5', 'CSS3'] },
    { title: 'State & Data', skills: ['Redux', 'MobX', 'Zustand', 'TanStack Query', 'GraphQL'] },
    { title: 'Tooling',      skills: ['Vite', 'Webpack', 'Babel', 'Babel Plugins', 'Grunt', 'Gulp'] },
    { title: 'Testing',      skills: ['Jest', 'Cypress', 'Enzyme', 'Puppeteer', 'Selenium'] },
    { title: 'UI / Styling', skills: ['CSS Modules', 'SASS', 'LESS', 'Tailwind'] },
    { title: 'Other',        skills: ['Vue.js', 'jQuery', 'Backbone.js', 'Node.js', 'Git', 'GitLab'] },
]

export default async function AboutPage({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params
    setRequestLocale(locale)
    const t = await getTranslations('about')

    return (
        <div className="pt-24 pb-16 px-4 sm:px-6 max-w-6xl mx-auto">
            <div className="max-w-4xl">
                <h1 className="text-4xl font-bold text-foreground mb-10">
                    {t('title')}
                </h1>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Left: Bio */}
                    <div>
                        <div className="w-40 h-40 rounded-full overflow-hidden mb-6 border-2 border-border">
                            <Image
                                src="/images/photo.webp"
                                alt="Photo"
                                width={160}
                                height={160}
                                className="object-cover w-full h-full"
                                priority
                            />
                        </div>
                        <p className="text-foreground text-base leading-relaxed mb-6">
                            {t('bio')}
                        </p>
                        <p className="text-foreground text-base leading-relaxed mb-6">
                            {t('bio2')}
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                { label: t('yearsExp'), icon: '🚀' },
                                { label: t('companiesStat'), icon: '💼' },
                                { label: t('techLeadStat'), icon: '👥' },
                            ].map(({ label, icon }) => (
                                <div
                                    key={label}
                                    className="flex items-center gap-3 p-4 bg-surface rounded-xl border border-border"
                                >
                                    <span className="text-2xl">{icon}</span>
                                    <span className="text-foreground font-medium">
                                        {label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Skills */}
                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-6">
                            {t('skills')}
                        </h2>
                        <div className="space-y-6">
                            {SKILL_GROUPS.map(({ title, skills }) => (
                                <div key={title}>
                                    <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-2">
                                        {title}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="px-4 py-2 bg-surface border border-border rounded-full text-sm text-foreground font-medium hover:border-accent transition-colors"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
