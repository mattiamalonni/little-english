import { notFound } from "next/navigation";
import { Results } from "@/components/english-app";
import { games } from "@/lib/games";

export function generateStaticParams() {
  return games.map((game) => ({ gameId: game.id }));
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ gameId: string }>;
}) {
  const { gameId } = await params;
  const game = games.find((entry) => entry.id === gameId);
  if (!game) notFound();
  return <Results game={game} />;
}
