import { profileSchema } from "../schema/profile.schema"

export function parseSavedProfile(value = "") {
  try {
    return profileSchema.safeParse(JSON.parse(value)).data
  } catch {
    return undefined
  }
}
