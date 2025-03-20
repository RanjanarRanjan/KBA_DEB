import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Adminnav from "../components/Adminnav";

const Dashboard = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/api/getallbook", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        // Sort books alphabetically by BookName
        const sortedBooks = data.sort((a, b) => a.BookName.localeCompare(b.BookName));
        setBooks(sortedBooks);
      })
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#daf0ef]">
      <Nav />
      <div className="flex">
        <Adminnav /> {/* Always renders, but visibility can be handled inside Adminnav */}
        <div className="ml-[150px] mt-[90px] w-full">
          <div className="container mx-auto p-4">
            <h1 className="text-2xl text-[#03615C] font-bold mb-6 text-center">
              Library Book List
            </h1>

            {books.length === 0 ? (
              <p className="text-center text-lg text-gray-600">No books available.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {books.map((book) => (
                  <Link to={`/book/${book._id}`} key={book._id} className="block">
                    <div className="bg-white shadow-md rounded-lg p-4 text-center hover:shadow-lg transition">
                      <img
                        src={book.image || "https://via.placeholder.com/150"}
                        alt={book.BookName}
                        className="w-full h-48 object-cover rounded-md mb-3"
                      />
                      <h2 className="text-xl font-semibold text-gray-800">{book.BookName}</h2>
                      <p className={`font-semibold mt-2 ${book.availability === "Available" ? "text-green-600" : "text-red-600"}`}>
                        {book.availability}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
