import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { books } from "../Models/samples.js";
import { upload } from "../middleware/upload.js";

const adminauth = Router();

const convertToBase64 = (buffer) => {
    return buffer.toString("base64"); // Fix casing
};

adminauth.post("/addbook", authenticate, upload.single("bookImage"), async (req, res) => {
    try {
        if (!req.user || req.user.user_role !== "admin") {
            return res.status(403).json({ msg: "Only admin can add books" });
        }
        const { BookName, Author, Category, Description } = req.body;
        if (!BookName || !Author || !Category || !Description) {
            return res.status(400).json({ msg: "All fields are required" });
        }
        const existingBook = await books.findOne({ BookName });
        if (existingBook) {
            return res.status(400).json({ msg: "Book already exists" });
        }
        let imagePath = null;
        if (req.file) {
            imagePath = convertToBase64(req.file.buffer);
        }
        const newBook = new books({
            BookName,
            Author,
            Category,
            Description,
            image: imagePath,
        });
        await newBook.save();
        return res.status(201).json({ msg: "Book added successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server Error" });
    }
});


    adminauth.get('/getallbook',authenticate,async(req,res)=>
        {
            try{
                const result=await books.find()
                if(result)
                {
                    res.json(result)
                }
                else{
                    res.status(400).send("No book Available")
                }
            }
            catch
            {
                res.status(500).send("Server error")
            }
        })   
    

   
        adminauth.delete('/deletebook', authenticate, async (req, res) => {
            try {
                const { BookName } = req.body;  
        
                if (!BookName) {
                    return res.status(400).json({ msg: "Book name is required" });
                }
        
                const book = await books.findOne({ BookName });
        
                if (!book) {
                    return res.status(404).json({ msg: "Book not found" });
                }
        
                await books.findOneAndDelete({ BookName });
                res.status(200).json({ msg: "Book successfully deleted" });
        
            } catch (error) {
                console.error("Error deleting book:", error);
                res.status(500).json({ msg: "Server Error" });
            }
        });
        


        adminauth.get("/books/:id",authenticate ,async (req, res) => {
            try {
              const { id } = req.params;
              const book = await books.findById(id); // Corrected `book` to `books`
          
              if (!book) {
                return res.status(404).json({ message: "Book not found" });
              }
          
              res.json(book);
            } catch (error) {
              console.error("Error fetching book:", error);
              res.status(500).json({ message: "Internal Server Error" });
            }
          });
          
          // Update book details by ID
          adminauth.put("/books/:id",authenticate,upload.single("image"),async (req, res) => {
              try {
                const { id } = req.params;
                const { BookName, Author, Category, Description } = req.body;

                const existingBook = await books.findById(id); 
                if (!existingBook) {
                  return res.status(404).json({ message: "Book not found" });
                }
          
                const updateData = { BookName, Author, Category, Description };
          
                if (req.file) {
                  updateData.image = `data:image/png;base64,${req.file.buffer.toString(
                    "base64"
                  )}`;
                }
          
                const updatedBook = await books.findByIdAndUpdate(id, updateData, {
                  new: true,
                });
          
                res.json({ message: "Book updated successfully", updatedBook });
              } catch (error) {
                console.error("Error updating book:", error);
                res.status(500).json({ message: "Server error" });
              }
            }
          );




          adminauth.put("/updateAvailability/:id", async (req, res) => {
            try {
              const { id } = req.params;
              const { availability } = req.body;
          
              const updatedBook = await books.findByIdAndUpdate(id, { availability }, { new: true });
          
              if (!updatedBook) {
                return res.status(404).json({ message: "Book not found" });
              }
          
              res.json({ message: "Book availability updated successfully", updatedBook });
            } catch (error) {
              console.error("Error updating availability:", error);
              res.status(500).json({ message: "Internal Server Error" });
            }
          });


          adminauth.get("/getbook/:id", async (req, res) => {
            try {
              const book = await books.findById(req.params.id);
              if (!book) {
                return res.status(404).json({ message: "Book not found" });
              }
              res.json(book);
            } catch (error) {
              console.error("Error fetching book:", error);
              res.status(500).json({ message: "Server error" });
            }
          });
          

export { adminauth };




// adminauth.get('/getbook',authenticate,async(req,res)=>
//     {
//         try{
//             const name=req.query.BookName
//             const result=await books.findOne({BookName:name})
//             if(result)
//             {
//                 res.json(result)
//             }
//             else{
//                 res.status(400).send("Book not found")
//             }
//         }
//         catch
//         {
//             res.status(500).send("Server error")
//         }
//     })


 
// export {adminauth}