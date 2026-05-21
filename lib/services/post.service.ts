import { db } from "@/lib/db"
import { CreatePostInput } from "@/lib/validations/post.schema"

export const postService = {
  async getAll(sort: "latest" | "popular" = "latest") {
    const orderBy = sort === "popular"
      ? { votes: { _count: "desc" as const } }
      : { createdAt: "desc" as const }

    return await db.post.findMany({
      orderBy: sort === "popular" ? { votes: { _count: "desc" } } : { createdAt: "desc" },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
        community: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        votes: true,
        _count: {
          select: { comments: true },
        },
      },
    })
  },

  async getByCommunity(communityId: string, sort: "latest" | "popular" = "latest") {
    return await db.post.findMany({
      where: { communityId },
      orderBy: sort === "popular" ? { votes: { _count: "desc" } } : { createdAt: "desc" },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
        community: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        votes: true,
        _count: {
          select: { comments: true },
        },
      },
    })
  },

  async getById(id: string) {
    return await db.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
        community: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        votes: true,
        comments: {
          include: {
            author: {
              select: {
                id: true,
                username: true,
                image: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    })
  },

  async getByAuthor(authorId: string) {
    return await db.post.findMany({
      where: { authorId },
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
        community: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        votes: true,
        _count: {
          select: { comments: true },
        },
      },
    })
  },

  async getPersonalizedFeed(userId: string) {
    return await db.post.findMany({
      where: {
        community: {
          subscribers: {
            some: {
              id: userId,
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
        community: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        votes: true,
        _count: {
          select: { comments: true },
        },
      },
    })
  },

  async create(data: CreatePostInput, authorId: string) {
    return await db.post.create({
      data: {
        title: data.title,
        content: data.content || null,
        imageUrl: data.imageUrl || null,
        linkUrl: data.linkUrl || null,
        type: data.type,
        communityId: data.communityId,
        authorId,
      },
      select: {
        id: true,
        title: true,
        communityId: true,
        community: {
          select: {
            slug: true,
          },
        },
      },
    })
  },
  async search(query: string) {
    return await db.post.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { content: { contains: query, mode: "insensitive" } },
        ],
      },
      include: {
        author: {
          select: { id: true, username: true, image: true },
        },
        community: {
          select: { id: true, name: true, slug: true },
        },
        votes: true,
        _count: { select: { comments: true } },
      },
      orderBy: { createdAt: "desc" },
    })
  },
}
