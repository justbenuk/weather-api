export interface AlertProps {
  interface: string
  headline: string
  msgtype: string
  severity: string
  urgency: string
  areas: string
  category: string
  event: string
  note: string
  effective: Date
  expires: Date
  desc: string
  instructions: string
}

export type AlertListProps = AlertProps[]
