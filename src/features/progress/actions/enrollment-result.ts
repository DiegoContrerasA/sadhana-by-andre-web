export type EnrollmentResult =
  | { ok: true }
  | { ok: false; error: "unknownCourse" }
