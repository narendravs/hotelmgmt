import React, { useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>(0);
  const [sortOption, setSortOption] = useState<string>("");

  const searchParams = {
    destination: search.destination,
    checkIn: search?.checkIn?.toISOString(),
    checkOut: search?.checkOut?.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    facilities: selectedFacilities,
    types: selectedHotelTypes,
    stars: selectedStars,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };

  const { data: hotelData } = useQuery(
    ["searchHotels", searchParams],
    async () => await apiClient.searchHotels(searchParams)
  );

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;
    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };
  const handleHotelTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelType = event.target.value;
    setSelectedHotelTypes((prevTypes) =>
      event.target.checked
        ? [...prevTypes, hotelType]
        : prevTypes.filter((type) => type !== hotelType)
    );
  };
  const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.value;
    setSelectedFacilities((prevFacilities) =>
      event.target.checked
        ? [...prevFacilities, facility]
        : prevFacilities.filter((facility) => facility !== facility)
    );
  };
  const onPageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div className="grid grid-cols-[1fr_3fr_1fr] ">
      <div className=" h-fit sticky top-0 rounded-lg border border-slate-300  ">
        <h3 className="text-lg font-semibold border-b border-slate-300 px-5 py-2">
          Filter by:
        </h3>
        <div className="p-5 space-y-5">
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <HotelTypesFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={handleHotelTypeChange}
          />
        </div>
      </div>

      <div className="grid">
        <div className="grid grid-cols-1 gap-5 py-2 p-5 ">
          <div className="flex justify-between items-center z-50">
            <span className="text-xl font-bold">
              {hotelData?.pagination.total} Hotels found{" "}
              {search?.destination ? `in ${search?.destination}` : ""}
            </span>
            <select
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="">Sort By</option>
              <option value="starRating">Star Rating</option>
              <option value="pricePerNightAsc">
                Price Per Night (low to high)
              </option>
              <option value="pricePerNightDesc">
                Price Per Night (high to low)
              </option>
            </select>
          </div>
          {hotelData?.data.map((hotel) => (
            <SearchResultsCard hotel={hotel} />
          ))}
        </div>
        <div>
          <Pagination
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
            onChange={onPageChange}
          />
        </div>
      </div>
      <div className="grid h-fit sticky top-0">
        <div className="rounded-lg border border-slate-300 p-5 ">
          <FacilitiesFilter
            selectedFacilities={selectedFacilities}
            onChange={handleFacilityChange}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value?: number) => setSelectedPrice(value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
