import { Skeleton } from "@/components/ui/skeleton"

export default function AtividadesSkeleton() {
  return (
    <div className="flex-1 ml-[21%] bg-secondary px-1">
      <div className="mb-4">
        <Skeleton className="h-6 w-40 mb-2 bg-gray-300 dark:bg-gray-600" />
        <Skeleton className="h-3 w-72 bg-gray-300 dark:bg-gray-600" />
      </div>

      <div className="mb-4">
        <Skeleton className="h-8 w-48 rounded-md bg-gray-300 dark:bg-gray-600" />
      </div>

      <div className="border border-cyan-950/20 rounded-lg p-2 shadow-sm bg-white">
        <ul className="flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i} className="flex flex-col md:flex-row justify-between gap-3 border-b border-cyan-950/10 pb-3">
              <Skeleton className="h-4 w-24 bg-gray-300 dark:bg-gray-600" />
              <Skeleton className="h-4 w-56 bg-gray-300 dark:bg-gray-600" />
              <Skeleton className="h-4 w-56 bg-gray-300 dark:bg-gray-600" />
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-center mt-4 space-x-2">
        <Skeleton className="h-8 w-8 rounded-md bg-gray-300 dark:bg-gray-600" />
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-8 rounded-md bg-gray-300 dark:bg-gray-600" />
        ))}
        <Skeleton className="h-8 w-8 rounded-md bg-gray-300 dark:bg-gray-600" />
      </div>
    </div>
  )
}