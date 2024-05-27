"use client";
import PageTitle from "@/components/PageTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilePenLine } from "lucide-react";
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

  return (
    <main className="flex flex-col gap-5 w-full">
      <PageTitle title="Courses" />
      <Tabs defaultValue="published" className="w-full">
        <TabsList className="w-full rounded-none justify-start">
          <TabsTrigger value="published">
            Published ({microcredentials.length})
          </TabsTrigger>
          <TabsTrigger value="draft">Draft (0)</TabsTrigger>
        </TabsList>
        <Separator />
        <TabsContent value="published">
          <div className="flex flex-wrap gap-1 justify-between py-10">
            {isLoading
              ? Array.from({ length: 4 }, (_, index) => (
                  <SkeletonCard key={index} />
                ))
              : microcredentials.map((mc) => (
                  <Card
                    key={mc._id}
                    className="rounded-xl relative overflow-hidden group mb-5"
                  >
                    <div className="front-layer z-10 rounded-xl bg-background absolute transition duration-500 inset-0.5 "></div>
                    <div className="spinner-container absolute inset-0 transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-0 hidden group-hover:block">
                      <div className="spinner absolute transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                    <div className="relative z-20">
                      <Image
                        src={mc.thumbnail}
                        alt={mc.title}
                        width={300}
                        height={360}
                        className="rounded-t-xl max-h-52"
                      />
                      <CardFooter className="flex justify-between p-4">
                        <div className="flex-col">
                          <h6 className="text-xs">{mc.title}</h6>
                          <h6 className="text-xs">Price: ${mc.price}</h6>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => handleClick(mc._id)}
                          className="rounded-full hover:border-primary hover:text-primary transition duration-300 ease-in-out bg-transparent"
                        >
                          <FilePenLine className="mr-2 h-3 w-3" /> Edit
                        </Button>
                      </CardFooter>
                    </div>
                  </Card>
                ))}
          </div>
        </TabsContent>
        <TabsContent value="draft">No drafts.</TabsContent>
      </Tabs>
    </main>
  );
}
