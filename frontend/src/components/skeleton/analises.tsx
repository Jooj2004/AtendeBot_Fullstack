"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function AnalisesSkeleton() {
  return (
    <div className="flex-1 ml-[21%] bg-secondary md:px-1 p-4">

      <div className="mb-4">
        <Skeleton className="h-6 w-40 mb-1 bg-gray-300 dark:bg-gray-600" />
        <Skeleton className="h-3 w-64 bg-gray-300 dark:bg-gray-600" />
      </div>

      <div className="mb-4 w-full max-w-xl">
        <Skeleton className="h-32 w-full rounded-md bg-gray-300 dark:bg-gray-600" />
      </div>

      <section className="p-2 flex flex-col sm:flex-row gap-2 justify-around mb-4">
        <Skeleton className="h-40 w-full sm:w-60 rounded-md bg-gray-300 dark:bg-gray-600" />
        <Skeleton className="h-40 w-full sm:w-60 rounded-md bg-gray-300 dark:bg-gray-600" />
      </section>

      <section className="flex flex-col w-full gap-2 mb-4">
        <Skeleton className="w-full h-48 rounded-md bg-gray-300 dark:bg-gray-600" />
      </section>
      
    </div>
  )
}