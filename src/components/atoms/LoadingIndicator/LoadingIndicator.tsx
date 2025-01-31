import { cn } from "~/utils/tailwind";

export const LoadingIndicator = ({className, style}: ComponentStyling) => (
  <div className={cn("flex h-full w-full items-center justify-center", className)} style={style}>
    <div className="size-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
  </div>
);
