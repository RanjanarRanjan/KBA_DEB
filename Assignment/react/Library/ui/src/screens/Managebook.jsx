import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import Adminnav from '../components/Adminnav';
import { Link } from 'react-router-dom';

const Managebook = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/api/getallbook", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  const deleteBook = async (BookName) => {
    if (!window.confirm(`Are you sure you want to delete "${BookName}"?`)) return;

    try {
      const response = await fetch("/api/deletebook", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ BookName }),
      });

      if (response.ok) {
        setBooks(books.filter(book => book.BookName !== BookName));
      } else {
        console.error("Failed to delete book");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  // Function to toggle availability
  const toggleAvailability = async (id, currentStatus) => {
    const newStatus = currentStatus === "Available" ? "Unavailable" : "Available";

    try {
      const response = await fetch(`/api/updateAvailability/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ availability: newStatus }),
      });

      if (response.ok) {
        setBooks(books.map(book => 
          book._id === id ? { ...book, availability: newStatus } : book
        ));
      } else {
        console.error("Failed to update availability");
      }
    } catch (error) {
      console.error("Error updating availability:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#daf0ef]">
      <Nav />
      <div className="flex">
        <Adminnav />
        <div className="ml-[150px] mt-[90px] w-full">
          <div className="container mx-auto p-4">
            <h1 className="text-2xl text-[#03615C] font-bold mb-4 text-center">
              Library Book List
            </h1>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Book Name</th>
                  <th className="border p-2">Author</th>
                  <th className="border p-2">Availability</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.length > 0 ? (
                  books.map((book) => (
                    <tr key={book._id} className="text-center">
                      <td className="border p-2">{book.BookName}</td>
                      <td className="border p-2">{book.Author}</td>
                      <td
                        className={`border p-2 border-black ${
                          book.availability === "Available"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {book.availability}
                      </td>
                      <td className="border p-2 flex flex-col gap-[10px] ">
                        <Link to={`/update/${book._id}`} className="text-blue-600 ml-[10px] hover:underline">
                          Update
                        </Link>
                        <button 
                          onClick={() => deleteBook(book.BookName)}
                          className="ml-2 text-red-600 hover:underline">
                          Delete
                        </button>
                        <button onClick={() => toggleAvailability(book._id, book.availability)}
                            className={`rounded-lg text-white font-semibold 
                            ${book.availability === "Available" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}>
                            {book.availability === "Available" ? "Unavailable" : "Available"}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center p-4">
                      No books available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Managebook;










