import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@ui/components/Card';
import { Skeleton } from '@ui/components/Skeleton';

export function ChartSkeleton() {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 max-w-[400px]" />
        </CardTitle>

        <CardDescription>
          <Skeleton className="h-4 max-w-[300px]" />
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Skeleton className="h-[350px] " />
      </CardContent>

      <CardFooter>
        <div className="w-full flex flex-col gap-[6px]">
          <Skeleton className="h-6 max-w-[400px]" />
          <Skeleton className="h-4 max-w-[300px]" />
        </div>
      </CardFooter>
    </Card>
  );
}
