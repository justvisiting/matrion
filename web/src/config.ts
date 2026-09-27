function required(name: string, value: string | undefined): string {
  if (!value) throw new Error(`Missing required env var ${name} — set it in web/.env`)
  return value
}

export const CONTACT_EMAIL = required('VITE_CONTACT_EMAIL', import.meta.env.VITE_CONTACT_EMAIL)
