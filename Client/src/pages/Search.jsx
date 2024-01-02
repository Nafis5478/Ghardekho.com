import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "./ListingItem";
export default function Search() {
  const navigate=useNavigate();
  const [Listing, setListing] = useState([])
  const [loading, setloading] = useState(false)
  const [sidebardata, setsidebardata] = useState({
    searchTerm:'',
    type:'all',
    parking:false,
    furnished:false,
    offer:false,
    sort:'created_at',
    order:'desc',
  })
  useEffect(() => {
    const urlParams=new URLSearchParams(location.search);
    const searchTermFromurl=urlParams.get('searchTerm');
    const parkingFromurl=urlParams.get('parking');
    const furnishedFromurl=urlParams.get('furnished');
    const offerFromurl=urlParams.get('offer');
    const sortFromurl=urlParams.get('sort');
    const orderFromurl=urlParams.get('order');
    const typeFromurl=urlParams.get('type');
    if(searchTermFromurl||parkingFromurl||furnishedFromurl||offerFromurl||sortFromurl||orderFromurl){
      setsidebardata({
        searchTerm:searchTermFromurl ||'',
        parking:parkingFromurl=== 'true'?true:false,
        furnished:furnishedFromurl=== 'true'?true:false,
        offer:offerFromurl=== 'true'?true:false,
        sort:sortFromurl||'created_at',
        order:orderFromurl||'desc',
        type:typeFromurl||'all',
      })
    }
    const fetchListing=async()=>{
      setloading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data=await res.json();
      setListing(data);
      setloading(false);
    }
    fetchListing();
  }, [location.search])
  
  const handleChange=(e)=>{
    if(e.target.id==='all'||e.target.id==='rent'||e.target.id==='sell'){
      setsidebardata({...sidebardata,type:e.target.id})
    }
    if(e.target.id==='searchTerm'){
      setsidebardata({...sidebardata,searchTerm:e.target.value});
    }
    if(e.target.id==='parking'||e.target.id==='furnished'||e.target.id==='offer'){
      setsidebardata({
        ...sidebardata, [e.target.id]: e.target.checked?true:false,
      })
    }
    if(e.target.id==='sort_order'){
      const sort=e.target.value.split('_')[0]||'created_at';
      const order=e.target.value.split('_')[1]||'desc';
      setsidebardata({...sidebardata,sort,order});
    }
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    const urlParams=new URLSearchParams();
    urlParams.set('searchTerm',sidebardata.searchTerm);
    urlParams.set('type',sidebardata.type);
    urlParams.set('furnished',sidebardata.furnished);
    urlParams.set('parking',sidebardata.parking);
    urlParams.set('offer',sidebardata.offer);
    urlParams.set('sort',sidebardata.sort);
    urlParams.set('order',sidebardata.order);
    const searchQuery=urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }
  return (
    <div className="flex flex-col md:flex-row md:min-h-screen">
      <div className="p-7 border-b-2 md:border-r-2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Text:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
              onChange={handleChange}
              value={sidebardata.searchTerm}
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <label className="whitespace-nowrap font-semibold">Type:</label>
            <div className="flex gap-2">
              <input type="checkbox" id="all" className="w-5" onChange={handleChange} checked={sidebardata.type==='all'}/>
              <span>Rent & Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" onChange={handleChange} checked={sidebardata.type==='rent'}/>
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="sell" className="w-5" onChange={handleChange} checked={sidebardata.type==='sell'}/>
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" onChange={handleChange} checked={sidebardata.offer}/>
              <span>Offer</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <label className="whitespace-nowrap font-semibold">
              Amenities:
            </label>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" onChange={handleChange} checked={sidebardata.parking}/>
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" onChange={handleChange} checked={sidebardata.furnished}/>
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Sort:</label>
            <select onChange={handleChange} defaultValue={'created_at_desc'}id="sort_order" className="border rounded-lg p-3">
              <option value="regularPrice_desc">Price Low to High</option>
              <option value="regularPrice_asc">Price High to Low</option>
              <option value="created_at_desc">Latest</option>
              <option value="created_at_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing Results
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
        {!loading&&Listing.length===0&&(
          <p className="text-slate-700 text-center font-semibold text-xl">Listing not found</p> // in future we can add something much better.
        )}
        {loading&&(
          <p className="text-slate-700 text-center font-semibold text-xl">Loading...</p>
        )}
        {!loading&&Listing&&Listing.map((listing)=>(
          <ListingItem key={listing._id} listing={listing}/>
        ))}
        </div>
      </div>
    </div>
  );
}
