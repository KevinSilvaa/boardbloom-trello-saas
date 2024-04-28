import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { ActivityItem } from '@/components/activity-item'
import { Skeleton } from '@/components/ui/skeleton'
import { prisma } from '@/lib/prisma'

export async function ActivityList() {
  const { orgId } = auth()

  if (!orgId) {
    redirect('/select-org')
  }

  await new Promise((resolve) => setTimeout(resolve, 2000))

  const auditLogs = await prisma.auditLog.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <ol className="mt-4 space-y-4">
      <p className="hidden text-center text-xs text-muted-foreground last:block">
        No activity found inside this organization
      </p>

      {auditLogs.map((log) => (
        <ActivityItem key={log.id} data={log} />
      ))}
    </ol>
  )
}

ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <ol className="mt-4 space-y-4">
      <Skeleton className="h-9 w-[80%]" />
      <Skeleton className="h-9 w-[50%]" />
      <Skeleton className="h-9 w-[70%]" />
      <Skeleton className="h-9 w-[80%]" />
      <Skeleton className="h-9 w-[75%]" />
    </ol>
  )
}
