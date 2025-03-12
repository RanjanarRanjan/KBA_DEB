import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Viewitem = () => 
    {
        const [category, setCategory] = useState("");
        const [items, setItems] = useState([]);
        const [error, setError] = useState("");

        const fetchItems = async () => {
        try 
        {
            const item = category ? `/api/getitem?Category=${category}`:"/api/getallitems";
            const response = await fetch(item);
            if (!response.ok) 
            {
                throw new Error(await response.text());
            }
            const data = await response.json();
            setItems(data);
            setError("");
        }
        catch (err) 
        {
            setError(err.message || "An error occurred");
            setItems([]);
        }
    };

    useEffect(() =>
        {
            fetchItems();
        }, []);

  return (
    <div className="p-4">
        <h2 className="text-xl font-bold mb-2">View Items </h2>

        <input type="text" placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded mr-2"
        />

        <button onClick={fetchItems} className="bg-blue-500 text-white px-4 py-2 rounded">
            Get Items
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        
        <p className="mt-4">

        {items.length > 0 ? (items.map((item, index) => (
            <p key={index} className="mt-[10px]" >
              <strong className="ml-[20px]">Name :  </strong> {item.ItemName} 
              <strong className="ml-[20px]">Category : </strong>{item.Category}
              <strong className="ml-[20px]">Quantity : </strong> {item.Quantity} 
              <strong className="ml-[10px]">Price : </strong> Rs.{item.Price}
            </p>
        ))
        ) : (
          !error && <p>No items available.</p>
        )}
      </p>
      <Link to='/' className="bg-blue-500 text-white px-4 py-2 rounded">
      <button className="mt-[30px]">Back</button></Link>
    </div>
  );
};

export default Viewitem;
