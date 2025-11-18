import { ConditionProps } from "@/types/condition-types"
import Image from "next/image"

export default function Condition({ condition }: ConditionProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image src={`https:${condition.icon}`} alt="condition" width={75} height={75} />
      <span>{condition.text}</span>
    </div>
  )
}

