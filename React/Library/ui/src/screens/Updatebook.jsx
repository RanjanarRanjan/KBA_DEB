import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import Adminnav from "../components/Adminnav";

const Updatebook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    BookName: "",
    Author: "",
    Category: "",
    Description: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch book details
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/books/${id}`);
        if (!res.ok) throw new Error("Failed to fetch book details");
        const data = await res.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book:", error);
        setError("Failed to load book details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  // Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("BookName", book.BookName);
    formData.append("Author", book.Author);
    formData.append("Category", book.Category);
    formData.append("Description", book.Description);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const headers = {};
      const token = localStorage.getItem("token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(`/api/books/${id}`, {
        method: "PUT",
        body: formData,
        headers,
      });

      if (response.ok) {
        alert("Book updated successfully!");
        navigate("/managebook");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update book");
      }
    } catch (error) {
      console.error("Error updating book:", error);
      setError("Error updating book.");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-xl">Loading book details...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-xl text-red-500">{error}</div>
    );
  }

  return (
    <div className="min-h-screen bg-[#daf0ef]">
      <Nav />
      <div className="flex">
        <Adminnav />
        <div className="ml-[100px] mt-[90px] w-full">
          <div className="m-[20px_300px] bg-[#03615C] p-[20px_40px] text-white text-center rounded-[10px]">
            <form onSubmit={handleUpdate} encType="multipart/form-data">
              <h1 className="underline text-2xl font-semibold">
                Update Book Details
              </h1>

              <div className="my-5 flex justify-between ">
                <label>Book Name</label>
                <input
                  className="h-[30px] w-[300px] bg-white text-black p-1"
                  type="text"
                  value={book.BookName}
                  onChange={(e) =>
                    setBook({ ...book, BookName: e.target.value })
                  }
                  required
                />
              </div>

              <div className="my-5 flex justify-between">
                <label>Author</label>
                <input
                  className="h-[30px] w-[300px] bg-white text-black p-1"
                  type="text"
                  value={book.Author}
                  onChange={(e) =>
                    setBook({ ...book, Author: e.target.value })
                  }
                  required
                />
              </div>

              <div className="my-5 flex justify-between">
                <label>Category</label>
                <input
                  className="h-[30px] w-[300px] bg-white  text-black p-1"
                  type="text"
                  value={book.Category}
                  onChange={(e) =>
                    setBook({ ...book, Category: e.target.value })
                  }
                  required
                />
              </div>

              <div className="my-5 flex justify-between">
                <label>Description</label>
                <textarea
                  className="h-[40px] w-[300px] bg-white text-black p-1"
                  value={book.Description}
                  onChange={(e) =>
                    setBook({ ...book, Description: e.target.value })
                  }
                  required
                />
              </div>

              <div className="my-5 flex justify-between">
                <label>Upload New Image</label>
                <input
                  className="h-[30px] w-[300px] bg-white text-black"
                  type="file"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
              </div>

              <div className="flex justify-center gap-5">
                <button
                  type="submit"
                  className="bg-[#daf0ef] text-[#03615C] rounded px-4 py-1"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/managebook")}
                  className="bg-[#daf0ef] text-[#03615C] rounded px-4 py-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Updatebook;

