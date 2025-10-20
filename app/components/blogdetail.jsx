"use client";
import React from "react";
import BlogCard from "../components/blog_card";
import { IoIosArrowRoundForward } from "react-icons/io";
import { motion } from "framer-motion";
const Page = () => {
  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,_#000000_30%,_#33C6F4_100%)] bg-fixed text-sky-100">

      <div className="container mx-auto px-2 py-36">
        <div className="p-6">
          <section className="grid gap-3">
            <p className="text-2xl font-bold text-white tracking-wide flex items-center ml-2">
              OUR BLOG
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              <span className="text-white">Thoughts &amp; Trends</span>
            </h1>
          </section>

          {/* CONTROLS */}
          <section className="mt-20">
            {/* Grid: label | select | search (stacks on small) */}
            <div
              className="
              grid grid-cols-1 md:grid-cols-[10%_30%_30%]  gap-2
              sm:items-center
              md:gap-3
            "
            >
              {/* Label */}
              <label
                htmlFor="category"
                className="text-lg sm:text-xl md:text-2xl font-bold text-white"
              >
                Filter By:
              </label>

              {/* Select (dark glassy) */}
              <div className="relative">
                <select
                  id="category"
                  defaultValue="all"
                  className="
                  w-full appearance-none
                  rounded-xl border border-sky-300/30 bg-white/10 text-sky-100
                  px-4 py-2.5 pr-10 shadow-sm backdrop-blur
                  placeholder:text-sky-200/60
                  focus:outline-none focus:ring-2 focus:ring-sky-300/60 focus:border-sky-300/60
                "
                >
                  <option className="text-gray-900" value="all">
                    All
                  </option>
                  <option className="text-gray-900" value="design">
                    Design
                  </option>
                  <option className="text-gray-900" value="development">
                    Development
                  </option>
                  <option className="text-gray-900" value="marketing">
                    Marketing
                  </option>
                  <option className="text-gray-900" value="news">
                    News
                  </option>
                </select>

                {/* Chevron */}
                <svg
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-200/80"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.169l3.71-2.94a.75.75 0 111.04 1.08l-4.24 3.36a.75.75 0 01-.94 0l-4.24-3.36a.75.75 0 01-.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              {/* Search (fills remaining grid space) */}
              <div className="w-full">
                <label htmlFor="search" className="sr-only">
                  Search blogs
                </label>
                <input
                  id="search"
                  type="text"
                  placeholder="Search blogs..."
                  className="
                  w-full rounded-xl border border-sky-300/30 bg-white/10 text-sky-100
                  px-4 py-2.5 shadow-sm backdrop-blur
                  placeholder:text-sky-200/60
                  focus:outline-none focus:ring-2 focus:ring-sky-300/60 focus:border-sky-300/60
                "
                />
              </div>
            </div>
          </section>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16  p-5">
          <BlogCard />
          <BlogCard />
        </div>
        <div className="p-6">
          <motion.button
            className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-xl px-6 py-4 hover:shadow-md transition"
            whileHover="hovered" // define hover state for children
            initial="initial"
          >
            <span className="text-7xl font-bold text-black">Let’s</span>
            <span className="text-7xl font-bold stroke">Discuss</span>

            {/* Arrow that reacts to parent hover */}
            <motion.div
              variants={{
                initial: { rotate: 320 },
                hovered: { rotate: 360 },
              }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              style={{ display: "inline-block" }}
            >
              <IoIosArrowRoundForward fontSize={60} />
            </motion.div>
          </motion.button>
        </div>
   
      </div>
    </div>
  );
};

export default Page;
