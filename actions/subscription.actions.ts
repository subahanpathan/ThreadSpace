"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function actionToggleSubscription(communityId: string) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return { error: "You must be signed in to subscribe" }
    }

    const userId = session.user.id

    const existingSubscription = await db.user.findFirst({
      where: {
        id: userId,
        subscriptions: {
          some: {
            id: communityId,
          },
        },
      },
    })

    if (existingSubscription) {
      await db.user.update({
        where: { id: userId },
        data: {
          subscriptions: {
            disconnect: { id: communityId },
          },
        },
      })
    } else {
      await db.user.update({
        where: { id: userId },
        data: {
          subscriptions: {
            connect: { id: communityId },
          },
        },
      })
    }

    const community = await db.community.findUnique({
      where: { id: communityId },
      select: { slug: true }
    })

    revalidatePath("/")
    if (community) {
      revalidatePath(`/r/${community.slug}`)
    }
    return { success: true, isSubscribed: !existingSubscription }

  } catch (error) {
    console.error("[SUBSCRIPTION_ACTION_ERROR]", error)
    return { error: "Internal server error" }
  }
}
