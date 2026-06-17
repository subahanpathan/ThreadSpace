import { db } from "@/lib/db"
import { CreateCommunityInput } from "@/lib/validations/community.schema"

export const communityService = {
  async getAll() {
    return await db.community.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    })
  },

  async getBySlug(slug: string) {
    return await db.community.findUnique({
      where: { slug },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    })
  },

  async create(data: CreateCommunityInput) {
    const slug = data.name.toLowerCase().replace(/\s+/g, "-")

    return await db.community.create({
      data: {
        name: data.name,
        slug,
        description: data.description,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        createdAt: true,
      },
    })
  },

  async exists(slug: string) {
    const community = await db.community.findUnique({ where: { slug } })
    return !!community
  },
  async search(query: string) {
    return await db.community.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { description: { contains: query } },
        ],
      },
      include: {
        _count: { select: { posts: true } },
      },
      orderBy: { createdAt: "desc" },
    })
  },
}
