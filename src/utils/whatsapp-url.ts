import { whatsappNumber } from "@/constants/site"

export function getWhatsappUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
}
