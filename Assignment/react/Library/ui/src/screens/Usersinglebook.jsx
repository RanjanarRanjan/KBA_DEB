import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";


const Usersinglebook = () => {
  const { id } = useParams(); // Get book ID from URL
  const navigate = useNavigate(); // Hook for navigating back
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`/api/userbooks/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch((err) => console.error("Error fetching book details:", err));
  }, [id]);

  if (!book) {
    return <p className="text-center text-lg text-gray-600">Loading book details...</p>;
  }

  return (
    <div className="min-h-screen bg-[#daf0ef]">
      <Nav />
      <div className="flex">
        <div className="ml-[150px] mt-[90px] w-full">
          <div className="container mx-auto p-4">
           
            <button
              onClick={() => navigate(-1)}
              className="bg-[#03615C] text-white px-4 py-2 rounded-lg mb-4 hover:bg-[#024c48] transition duration-300"
            >
              ⬅ Back
            </button>

            <h1 className="text-3xl text-[#03615C] font-bold mb-6 text-center">
              {book.BookName}
            </h1>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <img
                src={book.image || "https://via.placeholder.com/250"}
                alt={book.BookName}
                className="w-[300px] object-cover rounded-md shadow-md"
              />
              <div className="text-lg">
                <p><strong>Author:</strong> {book.Author}</p>
                <p><strong>Category:</strong> {book.Category || "N/A"}</p>
                <p><strong>Description:</strong> {book.Description || "No description available."}</p>
                <p className={`mt-4 text-xl font-semibold ${book.availability === "Available" ? "text-green-600" : "text-red-600"}`}>
                  {book.availability}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usersinglebook;
