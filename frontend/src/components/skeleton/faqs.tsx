import { Skeleton } from "@/components/ui/skeleton"

export default function FaqsSkeleton() {
  return (
    <div className="flex-1 ml-[24%] bg-secondary px-1 py-4">
      <div className="mb-4">
        <Skeleton className="h-6 w-32 mb-1 bg-gray-300 dark:bg-gray-600" />
        <Skeleton className="h-3 w-64 bg-gray-300 dark:bg-gray-600" />
      </div>
      <div className="mx-auto border my-3 py-5 px-2 border-gray-400/50 rounded-md shadow-md w-60 md:w-1/2">
        <Skeleton className="h-5 w-32 mb-2 bg-gray-300 dark:bg-gray-600" />
        <Skeleton className="h-8 w-full bg-gray-300 dark:bg-gray-600 rounded-sm" />
      </div>
      <Skeleton className="h-3 w-72 mb-4 bg-gray-300 dark:bg-gray-600" />
      <div>
        <Skeleton className="h-6 w-40 mb-3 bg-gray-300 dark:bg-gray-600" />
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="border flex flex-col gap-2 my-3 mx-1 p-2 md:px-3 md:py-4 rounded-md shadow-md"
          >
            <Skeleton className="h-4 w-3/4 bg-gray-300 dark:bg-gray-600" />
            <Skeleton className="h-3 w-full bg-gray-300 dark:bg-gray-600" />
            <div className="flex gap-2">
              <Skeleton className="h-7 w-16 rounded-md bg-gray-300 dark:bg-gray-600" />
              <Skeleton className="h-7 w-16 rounded-md bg-gray-300 dark:bg-gray-600" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
