import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import LatestDestinationCard from "../components/LatestDestinationCard";

const Home = () => {
  const { data: hotels, isLoading } = useQuery(["fetchQuery"], () =>
    apiClient.fetchHotels()
  );
  if (isLoading) return <span>Loading destinations...</span>;
  if (!hotels) return null;

  // Split data logically
  const topRowHotels = hotels.slice(0, 2);
  const bottomRowHotels = hotels.slice(2);

  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">Latest Destinations</h2>
      <p>Most recent destination added by our hosts</p>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {topRowHotels.map((hotel: any) => (
          <LatestDestinationCard key={hotel._id} hotel={hotel} />
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {bottomRowHotels.map((hotel: any) => (
          <LatestDestinationCard key={hotel._id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default Home;
