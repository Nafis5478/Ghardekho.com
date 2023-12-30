import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
export default function Listing() {
    SwiperCore.use([Navigation]);
  const params = useParams();
  const ListingId = params.listingId;
  const [error, seterror] = useState(false);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        seterror(false);
        const res = await fetch(`/api/listing/getListing/${ListingId}`, {
          method: "GET",
        });
        const data = await res.json();
        if (data.success === false) {
          setLoading(false);
          seterror(true);
          return;
        }
        seterror(false);
        setLoading(false);
        setListing(data);
      } catch (error) {
        seterror(error.message);
        setLoading(false);
      }
    };
    fetchListing();
  }, [ListingId]);
  return (
    <div>
      {error && <p className="text-center my-7 text-2xl text-green-700">Page not found</p>}
      {loading&& <p className="text-center my-7 text-2xl text-green-700">Loading...</p>}
      {listing&&!error&&!loading&&(
        <>
            <Swiper navigation>
                {listing.imageUrls.map((url)=>(
                    <SwiperSlide key={url}>
                        <div className="h-[550px]" style={{background: `url(${url}) center no-repeat`,backgroundSize: 'cover',
                  }}></div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
      )}
    </div>
  );
}
