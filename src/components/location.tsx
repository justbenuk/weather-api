import { LocationProps } from "@/types/location-types"

export default function Location({ location }: LocationProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
      <span className="font-medium">{location.name}</span>
      {location.region && (
        <>
          <span>•</span>
          <span>{location.region}</span>
        </>
      )}
      {location.country && (
        <>
          <span>•</span>
          <span>{location.country}</span>
        </>
      )}
    </div>
  )
}

