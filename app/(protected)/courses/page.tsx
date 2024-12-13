"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilePenLine, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { useCurrentToken } from "@/hooks/use-current-token";
import { getAllMicrocredentials } from "@/lib/api";
import { SkeletonCard } from "@/components/courses/SkeletonCard";
import { useRouter } from "next/navigation";
import { useMicrocredentialsStore } from "@/stores/courses/microcredential";
import Image from "next/image";

export default function Page() {
  const router = useRouter();
  const { microcredentials, setMicrocredentials } = useMicrocredentialsStore();
  const [error, setError] = useState<string | null>(null);
  const token = useCurrentToken();
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = async (id: string) => {
    router.push(`/courses/${id}`);
  };

  useEffect(() => {
    getAllMicrocredentials(token)
      .then((fetchedMicrocredentials) => {
        setMicrocredentials(fetchedMicrocredentials);
      })
      .catch(() => setError("Failed to load microcredentials"))
      .finally(() => setIsLoading(false));
  }, [token, setMicrocredentials]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <p className="text-destructive mb-4">{error}</p>
        <Button onClick={() => window.location.reload()} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  if (microcredentials.length === 0 && !isLoading) {
    return (
      <main className="flex flex-col gap-5 w-full p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Courses</h1>
          <Button onClick={() => router.push("/courses/new")}>
            <Plus className="mr-2 h-4 w-4" /> Add Course
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center min-h-[50vh] bg-muted/50 rounded-lg">
          <p className="text-muted-foreground mb-4">No courses found</p>
          <Button onClick={() => router.push("/courses/new")}>
            Create Your First Course
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-5 w-full p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-semibold">Courses</h1>
        <Button onClick={() => router.push("/courses/new")}>
          <Plus className="mr-2 h-4 w-4" /> Add Course
        </Button>
      </div>

      <Tabs defaultValue="published" className="w-full">
        <TabsList className="w-full rounded-none justify-start mb-4">
          <TabsTrigger value="published">
            Published ({microcredentials.length})
          </TabsTrigger>
        </TabsList>
        <Separator />

        <TabsContent value="published" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {isLoading
              ? Array.from({ length: 8 }, (_, index) => (
                  <SkeletonCard key={index} />
                ))
              : microcredentials.map((mc) => (
                  <Card
                    key={mc._id}
                    className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={mc.thumbnail}
                        alt={mc.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        priority={microcredentials.indexOf(mc) < 4}
                      />
                    </div>
                    <CardFooter className="flex flex-col p-4 gap-3">
                      <div className="w-full">
                        <h3 className="font-medium text-sm mb-1 line-clamp-2">
                          {mc.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          ${mc.price_usd.toFixed(2)} USD
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => handleClick(mc._id)}
                        className="w-full"
                      >
                        <FilePenLine className="mr-2 h-4 w-4" /> Edit Course
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
