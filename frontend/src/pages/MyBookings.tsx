import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
const MyBookings = () => {
  const { data: hotels } = useQuery(["fetchMyBookings"], () =>
    apiClient.fetchMyBookings()
  );

  if (!hotels || hotels.length === 0) {
    return <span>No bookings found</span>;
  }
  return (
    <div className="container space-y-5">
      <h1 className="text-3xl font-bold">My Bookings</h1>
      {hotels.map((hotel: any) => (
        <div
          key={hotel._id}
          className="grid grid-cols-1 lg:grid-cols-[1fr_4fr] border justify-center border-slate-400 rounded-lg p-8 gap-5 overflow-hidden lg:items-stretch bg-white"
        >
          <div className="w-full h-[200px] lg:h-[250px]">
            <img
              src={hotel.imageUrls[0]}
              className="w-full h-full object-cover object-center rounded-md"
            />
          </div>
          <div className="flex flex-col w-full gap-4 mt-[-0.5%]">
            <div className="text-2xl font-bold">
              {hotel.name}
              <div className="text-xs font-normal">
                {hotel.city}, {hotel.country}
              </div>
            </div>
            {hotel.bookings.map((booking: any) => (
              <div key={booking._id}>
                <div>
                  <span className="font-bold mr-2">Dates:</span>
                  <span>
                    {new Date(booking.checkIn).toDateString()} -
                    {new Date(booking.checkOut).toDateString()}
                  </span>
                </div>
                <div>
                  <span className="font-bold mr-2">Guests:</span>
                  <span>
                    {booking.adultCount} adults, {booking.childCount} children
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
