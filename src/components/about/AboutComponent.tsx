// <======================== component for about page ==============>

// importing the required modules
import React from "react";
import Image from "next/image";
import { FaBookReader, FaAward } from "react-icons/fa";

const AboutComponent = () => {
  return (
    <div className="w-full bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">About the Author</h1>
          <p className="mt-4 text-lg text-gray-600">
            Discover the world of books written by [Author Name] and explore the
            journey that shaped their literary works.
          </p>
        </div>

        {/* Author Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="flex justify-center items-center">
            <Image
              src="/images/author.jpg" // Replace with author's image path
              alt="[Author Name]"
              width={500}
              height={350}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-gray-800">
              About [Author Name]
            </h2>
            <p className="mt-4 text-lg text-gray-700">
              [Author Name] is a passionate author known for [brief background
              or genre]. With a deep love for [specific themes or topics],
              they&apos;ve dedicated their career to writing stories that
              [inspire, educate, entertain, etc.]. Over the years, [Author Name]
              has published [number of books] books, and their works have been
              recognized for [specific achievements or unique writing style].
            </p>
          </div>
        </div>

        {/* Key Works Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
            Key Works by [Author Name]
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <FaBookReader className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">
                [Book Title 1]
              </h3>
              <p className="mt-2 text-gray-600">
                A brief description of the book, its plot, and what makes it
                unique.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaBookReader className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">
                [Book Title 2]
              </h3>
              <p className="mt-2 text-gray-600">
                A brief description of the second book and why it&apos;s a
                must-read for fans.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaBookReader className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">
                [Book Title 3]
              </h3>
              <p className="mt-2 text-gray-600">
                A description highlighting the recognition and awards the book
                has received.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
            Awards & Recognitions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <FaAward className="text-4xl text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">
                Best Fiction Award 2022
              </h3>
              <p className="mt-2 text-gray-600">
                Awarded for [Book Title 1], recognized for its outstanding
                storytelling and character development.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaAward className="text-4xl text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">
                Reader&apos;s Choice Award 2021
              </h3>
              <p className="mt-2 text-gray-600">
                Voted by readers as their favorite book of the year. [Book Title
                2] became a fan favorite.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaAward className="text-4xl text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">
                International Book of the Year 2020
              </h3>
              <p className="mt-2 text-gray-600">
                Recognized globally for [Book Title 3], which reached
                international acclaim for its unique narrative.
              </p>
            </div>
          </div>
        </div>

        {/* Author's Mission Section */}
        <div className="bg-blue-600 text-white p-12 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center mb-4">
            [Author Name]&apos;s Mission
          </h2>
          <p className="text-lg text-center">
            [Author Name] believes in [mission or vision]. Their writing aims to
            [inspire, educate, entertain, etc.], and they are dedicated to
            creating stories that resonate with readers and leave a lasting
            impact. Through their works, they hope to [specific goals the author
            wants to achieve].
          </p>
        </div>

        {/* Footer Section */}
        <div className="mt-16 text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} [Author Name]. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutComponent;
