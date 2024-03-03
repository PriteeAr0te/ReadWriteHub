import React from "react";
import Hero_Image from "../Images/hero_image.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="w-full py-6 md:py-12 lg:py-16 bg-[#00C2A2]">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
          <img
            alt="Image"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
            height="310"
            src={Hero_Image}
            width="550"
          />
          <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                Welcome to ReadWriteHub
              </h1>
              <p className="max-w-[500px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                your ultimate destination for authors and readers alike! Whether
                you're an aspiring writer looking to share your stories with the
                world or a passionate reader seeking your next literary
                adventure, ReadWriteHub is here to fulfill your literary dreams.
              </p>
            </div>
            <div className="flex flex-col gap-2 mx-auto max-[400px]:flex-row">
              <Link className="text-black bg-white" to="/register">
                <button className="inline-flex h-10 items-center justify-center rounded-md hover:bg-amber-500 hover:text-white border border-gray-200 px-8 text-sm font-medium shadow-sm transition-colors  hover:text-md focus-visible:ring-1 focus-visible:ring-gray-950">
                  Author Login/Register{" "}
                </button>
              </Link>
              <Link className="text-black bg-white" to="/register">
                <button className="inline-flex h-10 items-center justify-center rounded-md hover:bg-amber-500 hover:text-white border border-gray-200 px-8 text-sm font-medium shadow-sm transition-colors  hover:text-md focus-visible:ring-1 focus-visible:ring-gray-950">
                  Reader Login/Register{" "}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
