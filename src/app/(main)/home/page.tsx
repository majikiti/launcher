import TopCarousel from "./TopCarousel"
import TrendSection from "./TrendSection"

export default function HomePage() {
  return (
    <div className="mb-4 flex flex-col gap-4">
      <TopCarousel />
      <TrendSection />
    </div>
  )
}
