import { setRequestLocale } from 'next-intl/server';
import { HeroSlider } from '@/components/home/HeroSlider';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HeroSlider />;
}
