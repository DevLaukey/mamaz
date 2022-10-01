import React, { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { supabaseClient } from "../../utils/supabase-client";

const add_inventory = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const clearForm = () => {
    setName("");
    setPrice("");
    setCategories([]);
    setImage("");
    setDescription("");
  };

  const options = [
    { value: "vegatables", label: "Vegatables" },
    { value: "fruits", label: "Fruits" },
  ];

  async function uploadAvatar(event) {
    event.preventDefault();
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { data, error: uploadError } = await supabaseClient.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }
      setImage(data.Key.slice(8));
      toast.success("Image added successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }
  const addItem = async () => {
    // add to database
    try {
      if (!name || !price || !categories.length || !description || !image) {
        throw new Error("Please fill out all fields");
      }
      const produce = {
        product_name: name,
        avatar_url: image,
        product_details: description,
        product_price: price,
        product_in_stock: true,
        categories: categories.map((item) => item.value),
      };

      let { error } = await supabaseClient.from("produce").upsert(produce, {
        returning: "minimal", // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
      toast.success("Item Added", {
        position: toast.POSITION.TOP_CENTER,
      });
      clearForm();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-full items-center justify-center">
      <h3 className="text-3xl">Add Item</h3>
      <div className="flex flex-1 justify-center">
        <div className="w-full max-w-144">
          <form className="bg-white shadow-xs rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <p className="text-sm flex-1 mb-4 border-2 px- py-3 rounded-sm bg-gray-500 focus:bg-gray-200">
                <label className="button primary block" htmlFor="single">
                  {uploading ? "Uploading ..." : "Upload"}
                </label>
              </p>
              <input
                style={{
                  visibility: "hidden",
                }}
                type="file"
                id="single"
                accept="image/*"
                onChange={uploadAvatar}
                disabled={uploading}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Item name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Item name"
                name="name"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="price"
              >
                Item price
              </label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                type="number"
                placeholder="Item price"
                name="price"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Item Description
              </label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                placeholder="Item Description"
                name="description"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="categories"
              >
                Item categories
              </label>
              <Select
                isMulti={true}
                options={options}
                onChange={(e) => setCategories(e)}
                value={categories}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="categories"
                placeholder="Comma separated list of item categories"
                name="categories"
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <button
                onClick={addItem}
                className="bg-primary hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Add Item
              </button>
              <a
                onClick={clearForm}
                className="inline-block align-baseline font-bold text-sm"
                href="#"
              >
                Clear Form
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default add_inventory;
