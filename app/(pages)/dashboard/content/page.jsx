"use client";
import Blog from "../../../components/cards/blogmanagement/blog.jsx";

import Header from "../../../components/Header.jsx";
import GoogleAdsCard from "../../../components/cards/googleads/googleads.jsx";
import Roiinfo from "../../../components/table.jsx";
import AdvertisementCampaign from "../../../components/cards/advertisementcampaign/campaign.jsx";
export default function Content() {
  return (
    <>
      <div>
        <Header />

        {/* Content Area */}
        <div className="mt-4">
          <h1 className="font-bold text-xl sm:text-2xl">
            Content & Marketing Tools
          </h1>
          <p className="text-md text-gray-600 mt-1">
            Manage blog content, track SEO performance, and monitor advertising
            campaigns.
          </p>

          {/* Blog component section */}
          <div className="mt-4">
            <Blog />
          </div>
          <AdvertisementCampaign />
          <div>
            <GoogleAdsCard />
            <GoogleAdsCard />
            <Roiinfo />
          </div>
        </div>
      </div>
    </>
  );
}
