import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";

type Props = {
  hotel: HotelType;
};
const LatestDestinationCard = ({ hotel }: Props) => {
  return (
    <Link
      to={`/details/${hotel._id}`}
      className="relative cursor-pointer overflow-hidden rounded-md"
    >
      <div className="h-[300px] flex relative items-center justify-center">
        <img
          src={hotel.imageUrls[0]}
          className="w-full h-full object-cover object-center"
        />
        <label className="text-xl text-black absolute bg-white/70 px-4 py-1 rounded-md font-bold">
          {hotel.city}
        </label>
      </div>
      <div className="absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md">
        <span className="text-white font-bold tracking-tight text-2xl md:text-3xl">
          {hotel.name}
        </span>
      </div>
    </Link>
  );
};

export default LatestDestinationCard;
