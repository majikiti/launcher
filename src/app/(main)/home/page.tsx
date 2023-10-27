import TopCarousel from "./TopCarousel"
import TrendSection from "./TrendSection"

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4">
      <TopCarousel />
      <TrendSection />
    </div>
  )
}
