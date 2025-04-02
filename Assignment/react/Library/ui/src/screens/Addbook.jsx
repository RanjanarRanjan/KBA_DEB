import React, { useState } from "react";
import Nav from "../components/Nav";
import Adminnav from "../components/Adminnav";

const Addbook = () => {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [bookImage, setBookImage] = useState(null);

  const [message, setMessage] = useState("");

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleFileChange = (e) => {
    setBookImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bookName || !author || !category || !description) {
      setMessage("All fields are required!");
      return;
    }

    const formData = new FormData(); // Directly using FormData
    formData.append("BookName", bookName);
    formData.append("Author", author);
    formData.append("Category", category);
    formData.append("Description", description);
    if (bookImage) formData.append("bookImage", bookImage);

    try {
      const response = await fetch("/api/addbook", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Book added successfully!");
        setBookName("");
        setAuthor("");
        setCategory("");
        setDescription("");
        setBookImage(null);
      } else {
        setMessage(data.msg || "Failed to add book.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-[#daf0ef]">
      <Nav />
      <div className="flex">
        <Adminnav />
        <div className="ml-[150px] mt-[90px]">
          <div className="m-[20px_300px] bg-[#03615C] p-6 text-white font-[cursive] text-center rounded-[10px]">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <h1 className="underline text-2xl font-semibold">Add Book</h1>

              {message && <p className="text-yellow-300 my-2">{message}</p>}

              <div className="flex justify-between gap-[100px] my-3">
                <label>Book Name</label>
                <input
                  className="h-[30px] w-[300px] bg-white text-black px-2"
                  type="text"
                  value={bookName}
                  onChange={handleChange(setBookName)}
                />
              </div>

              <div className="flex justify-between gap-[100px] my-3">
                <label>Author</label>
                <input
                  className="h-[30px] w-[300px] bg-white text-black px-2"
                  type="text"
                  value={author}
                  onChange={handleChange(setAuthor)}
                />
              </div>

              <div className="flex justify-between gap-[100px] my-3">
                <label>Category</label>
                <input
                  className="h-[30px] w-[300px] bg-white text-black px-2"
                  type="text"
                  value={category}
                  onChange={handleChange(setCategory)}
                />
              </div>

              <div className="flex justify-between gap-[100px] my-3">
                <label>Description</label>
                <textarea
                  className="h-[60px] w-[300px] bg-white text-black px-2"
                  value={description}
                  onChange={handleChange(setDescription)}
                ></textarea>
              </div>

              <div className="flex justify-between gap-[100px] my-3">
                <label>Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-[300px] bg-white text-black"
                />
              </div>

              <div className="flex justify-center gap-5 mt-4">
                <button type="submit" className="w-[100px] bg-[#daf0ef] h-[30px] text-[#03615C] rounded">
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setBookName("");
                    setAuthor("");
                    setCategory("");
                    setDescription("");
                    setBookImage(null);
                  }}
                  className="w-[100px] bg-[#daf0ef] h-[30px] text-[#03615C] rounded"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addbook;



// import React, { useState } from "react";
// import Nav from "../components/Nav";
// import Adminnav from "../components/Adminnav";

// const Addbook = () => {
//   const [formData, setFormData] = useState({
//     BookName: "",
//     Author: "",
//     Category: "",
//     Description: "",
//     bookImage: null, // File input
//   });

//   const [message, setMessage] = useState("");

//   // Handle Input Change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle File Upload
//   const handleFileChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       bookImage: e.target.files[0], // Store file
//     }));
//   };

//   // Handle Form Submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.BookName || !formData.Author || !formData.Category || !formData.Description) {
//       setMessage("All fields are required!");
//       return;
//     }

//     const formDataObj = new FormData();
//     formDataObj.append("BookName", formData.BookName);
//     formDataObj.append("Author", formData.Author);
//     formDataObj.append("Category", formData.Category);
//     formDataObj.append("Description", formData.Description);
//     if (formData.bookImage) {
//       formDataObj.append("bookImage", formData.bookImage);
//     }

//     try {
//       const response = await fetch("/api/addbook", {
//         method: "POST",
//         body: formDataObj,
//         // credentials: "include", // For cookies (JWT token)
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage("Book added successfully!");
//         setFormData({
//           BookName: "",
//           Author: "",
//           Category: "",
//           Description: "",
//           bookImage: null,
//         });
//       } else {
//         setMessage(data.msg || "Failed to add book.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setMessage("Server error. Try again later.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#daf0ef]">
//       <Nav />
//       <div className="flex">
//         <Adminnav />
//         <div className="ml-[150px] mt-[90px]">
//           <div className="m-[20px_300px] bg-[#03615C] p-6 text-white font-[cursive] text-center rounded-[10px]">
//             <form onSubmit={handleSubmit} encType="multipart/form-data">
//               <h1 className="underline text-2xl font-semibold">Add Book</h1>

//               {message && <p className="text-yellow-300 my-2">{message}</p>}

//               <div className="flex justify-between gap-[100px] my-3">
//                 <label>Book Name</label>
//                 <input
//                   className="h-[30px] w-[300px] bg-white text-black px-2"
//                   type="text"
//                   name="BookName"
//                   value={formData.BookName}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="flex justify-between gap-[100px] my-3">
//                 <label>Author</label>
//                 <input
//                   className="h-[30px] w-[300px] bg-white text-black px-2"
//                   type="text"
//                   name="Author"
//                   value={formData.Author}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="flex justify-between gap-[100px] my-3">
//                 <label>Category</label>
//                 <input
//                   className="h-[30px] w-[300px] bg-white text-black px-2"
//                   type="text"
//                   name="Category"
//                   value={formData.Category}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="flex justify-between gap-[100px] my-3">
//                 <label>Description</label>
//                 <textarea
//                   className="h-[60px] w-[300px] bg-white text-black px-2"
//                   name="Description"
//                   value={formData.Description}
//                   onChange={handleChange}
//                 ></textarea>
//               </div>

//               <div className="flex justify-between gap-[100px] my-3">
//                 <label>Upload Image</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFileChange}
//                   className="w-[300px] bg-white text-black"
//                 />
//               </div>

//               <div className="flex justify-center gap-5 mt-4">
//                 <button type="submit" className="w-[100px] bg-[#daf0ef] h-[30px] text-[#03615C] rounded">
//                   Add
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() =>
//                     setFormData({ BookName: "", Author: "", Category: "", Description: "", bookImage: null })
//                   }
//                   className="w-[100px] bg-[#daf0ef] h-[30px] text-[#03615C] rounded"
//                 >
//                   Reset
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Addbook;



// import React from 'react'
// import Nav from '../components/Nav'
// import Adminnav from '../components/Adminnav'


// const Addbook = () => {
//   return (
//     <div class="h-screen bg-[#daf0ef]">
//       <Nav />
//       <div class="flex">
//         <Adminnav />
//         <div class="ml-[150px] mt-[90px]">
//           <a  href="manage_book.html" class="flex justify-start text-xl">Back</a>
//           <div class="m-[20px_300px] bg-[#03615C] p-[20px_40px] text-white font-[cursive] text-center rounded-[10px]">
//             <form>
//               <h1 class="underline text-2xl font-semibold"> Add Book</h1>
//               <div class="flex justify-between gap-[100px] my-5">
//                 <label>Book Name</label>
//                 <input class="h-[30px] w-[300px] bg-white text-black" type="text" />
//               </div>
//               <div class="flex justify-between gap-[100px] my-5">
//                 <label>Author</label>
//                 <input class="h-[30px] w-[300px] bg-white text-black" type="text" />
//               </div>
//               <div class="flex justify-between gap-[100px] my-5">
//                 <label>Category</label>
//                 <input class="h-[30px] w-[300px] bg-white text-black" type="text" />
//               </div>
              
//               <div class="flex justify-between gap-[100px] my-5">
//                 <label>Description</label>
//                 <textarea class="h-[40px] w-[300px] bg-white text-black"></textarea>
//               </div>
//               <button class="w-[70px] bg-[#daf0ef] h-[30px] text-[#03615C] rounded">Add</button>
//               <button class="w-[70px] bg-[#daf0ef] h-[30px] text-[#03615C] rounded">Reset</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Addbook