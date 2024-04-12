import PageTitle from "@/components/PageTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FilePenLine } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface CardData {
  id: number;
  imageUrl: string;
  title: string;
  subtitle: string;
}

const cards: CardData[] = [
  {
    id: 1,
    imageUrl:
      "https://i.pinimg.com/564x/af/43/0d/af430de0d19711b1ec294973bdf6e599.jpg",
    title: "Kinesiology",
    subtitle: "With Robert Johnson",
  },
  {
    id: 2,
    imageUrl:
      "https://i.pinimg.com/564x/af/43/0d/af430de0d19711b1ec294973bdf6e599.jpg",

    title: "Cardiology",
    subtitle: "With Jane Doe",
  },
  {
    id: 3,
    imageUrl:
      "https://i.pinimg.com/564x/af/43/0d/af430de0d19711b1ec294973bdf6e599.jpg",

    title: "Neuroscience",
    subtitle: "With John Smith",
  },
  {
    id: 4,
    imageUrl:
      "https://i.pinimg.com/564x/af/43/0d/af430de0d19711b1ec294973bdf6e599.jpg",

    title: "Pharmacology",
    subtitle: "With Alice Brown",
  },
];

export default function Page() {
  return (
    <main className="flex flex-col gap-5 w-full">
      <PageTitle title="Courses" />
      <Tabs defaultValue="published" className="w-full">
        <TabsList className="w-full rounded-none justify-start">
          <TabsTrigger value="published">Published (1)</TabsTrigger>
          <TabsTrigger value="draft">Draft (0)</TabsTrigger>
        </TabsList>
        <Separator />
        <TabsContent value="published">
          <div className="flex flex-wrap gap-1 justify-between py-10">
            {cards.map((card) => (
              <Card
                key={card.id}
                className="rounded-xl relative overflow-hidden group mb-5"
              >
                <div className="front-layer z-10 rounded-xl bg-background absolute transition duration-500 inset-0.5 "></div>
                <div className="spinner-container absolute inset-0 transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-0 hidden group-hover:block">
                  <div className="spinner absolute transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                </div>
                <div className="relative z-20">
                  <Image
                    src={card.imageUrl}
                    alt={card.title}
                    width={300}
                    height={360}
                    className="rounded-t-xl"
                  />
                  <CardFooter className="flex justify-between p-4">
                    <div className="flex-col">
                      <h6>{card.title}</h6>
                      <h6 className="text-xs">{card.subtitle}</h6>
                    </div>
                    <Button
                      variant="outline"
                      className="rounded-full hover:border-primary hover:text-primary transition duration-300 ease-in-out bg-transparent"
                    >
                      <FilePenLine className="mr-2 h-4 w-4" /> Edit
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
