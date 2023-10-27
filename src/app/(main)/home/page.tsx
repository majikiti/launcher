import TopCarousel from "./TopCarousel"
import TrendSection from "./TrendSection"

export default function HomePage() {
  return (
    <div className="flex h-full flex-col gap-4">
      <TopCarousel />
      <TrendSection />
    </div>
  )
}
