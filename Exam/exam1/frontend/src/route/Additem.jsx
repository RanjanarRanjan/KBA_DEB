import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddItem = () => {
    const [itemName, setItemName] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/additem", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    ItemName:itemName, 
                    Category:category, 
                    Quantity:quantity, 
                    Price:price })
            });
            const data = await response.text();
            setMessage(data);
        } catch (error) {
            setMessage("Server error");
        }
    };

    return (
        <div>
            <h2 className="text-cyan-600 mt-[50px] text-4xl text-center">Add Item</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center">
                    <input
                        className="w-[400px] mt-[20px] p-2 rounded border-2 border-cyan-300"
                        type="text"
                        placeholder="Item Name"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        required
                    />
                    <input
                        className="w-[400px] mt-[20px] p-2 rounded border-2 border-cyan-300"
                        type="text"
                        placeholder="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                    <input
                        className="w-[400px] mt-[20px] p-2 rounded border-2 border-cyan-300"
                        type="number"
                        placeholder="Quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                    <input
                        className="w-[400px] mt-[20px] p-2 rounded border-2 border-cyan-300"
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                    <button
                        className="w-[200px] mt-[30px] bg-[#0098B9] py-2 rounded border-4 border-white text-white"
                        type="submit"
                    >
                        Add Item
                    </button>
                    <Link to='/view'>
                        <button className="w-[200px] mt-[30px] bg-[#0098B9] py-2 rounded border-4 border-white text-white">
                            View item
                        </button>
                    </Link>
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddItem;

