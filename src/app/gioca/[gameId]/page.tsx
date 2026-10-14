import { notFound } from "next/navigation";
import { PlayGame } from "@/components/english-app";
import { games } from "@/lib/games";

export function generateStaticParams() {
  return games.map((game) => ({ gameId: game.id }));
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ gameId: string }>;
}) {
  const { gameId } = await params;
  const game = games.find((entry) => entry.id === gameId);
  if (!game) notFound();
  return <PlayGame game={game} />;
}
