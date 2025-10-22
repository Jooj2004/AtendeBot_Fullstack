import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardSkeleton() {
  return (
    <div className="flex-1 ml-[24%] bg-secondary p-4">
      
      <div className="mb-4">
        <Skeleton className="h-6 w-40 mb-1 bg-gray-300 dark:bg-gray-600" />
        <Skeleton className="h-3 w-64 bg-gray-300 dark:bg-gray-600" />
      </div>

      <div className="mb-4">
        <Skeleton className="h-6 w-full max-w-xl rounded-md bg-gray-300 dark:bg-gray-600" />
      </div>

      <section className="p-2 flex flex-col gap-2 sm:flex-row justify-around mb-4">
        <Skeleton className="h-24 w-full sm:w-40 rounded-md bg-gray-300 dark:bg-gray-600" />
        <Skeleton className="h-24 w-full sm:w-40 rounded-md bg-gray-300 dark:bg-gray-600" />
        <Skeleton className="h-24 w-full sm:w-40 rounded-md bg-gray-300 dark:bg-gray-600" />
        <Skeleton className="h-24 w-full sm:w-40 rounded-md bg-gray-300 dark:bg-gray-600" />
      </section>

      <section className="flex flex-col sm:flex-row w-full mx-auto gap-2 mb-4">
        <Skeleton className="w-full h-64 shadow-md rounded-md sm:flex-1 bg-gray-300 dark:bg-gray-600" />
        <Skeleton className="w-full h-64 shadow-md rounded-md sm:flex-1 bg-gray-300 dark:bg-gray-600" />
      </section>

    </div>
  )
}
