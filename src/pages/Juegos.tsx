import { useEffect, useState } from 'react';
import { client } from '@/lib/sanity';

interface Game {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: {
    asset: {
      url: string;
    };
  };
  platform: string;
  downloadLink: string;
}

const GamesPage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const query = `*[_type == "game"]{ _id, name, slug, description, price, image, platform, downloadLink }`;
        const games: Game[] = await client.fetch(query);
        setGames(games);
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Cargando juegos...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Juegos Digitales</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <div key={game._id} className="border rounded-lg p-4 shadow-md">
            <img
              src={game.image.asset.url}
              alt={game.name}
              width={400}
              height={300}
              className="w-full h-48 object-cover mb-4 rounded-lg"
            />
            <h2 className="text-xl font-semibold">{game.name}</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{game.description}</p>
            <p className="text-lg font-bold mt-4">${game.price}</p>
            <a
              href={game.downloadLink}
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Comprar
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesPage;