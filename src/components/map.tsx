import {
  Map,
  MapTileLayer,
} from "@/components/ui/map"
import { LocationProps } from "@/types/location-types"

export default function MapOuter({ location }: LocationProps) {
  return (
    <Map center={[location.lat, location.lon]} zoom={13} className="h-full w-full border-none">
      <MapTileLayer />
    </Map>
  )
}

