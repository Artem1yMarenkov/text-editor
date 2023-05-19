import { AlertStatus } from "@chakra-ui/react"

export interface INotification {
	status: AlertStatus
	message: string
	header: string
	id: number
}