export const cacheTags = {
  catalog: {
    all: "catalog",
    courses: "catalog:courses",
    course: (slug: string) => `catalog:course:${slug}`,
  },
} as const
