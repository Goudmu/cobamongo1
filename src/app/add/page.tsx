"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useEdgeStore } from "../lib/edgestore";
// import { toast } from "react-toastify";

let links:String;

type Inputs = {
  title: string;
  desc: string;
  price: number;
  catSlug: string;
};

type Option = {
  title: string;
  additionalPrice: number;
};

const AddPage = () => {
  const { data: session, status } = useSession();
  const [isUploading, setIsUploading] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [inputs, setInputs] = useState<Inputs>({
    title: "",
    desc: "",
    price: 0,
    catSlug: "",
  });

  const [option, setOption] = useState<Option>({
    title: "",
    additionalPrice: 0,
  });

  const [options, setOptions] = useState<Option[]>([]);
  const [file, setFile] = useState<File>();
  // const [imageUp, setimageUp] = useState<File>();
  const [imageShow, setimageShow] = useState("");
  const {edgestore} = useEdgeStore();

  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

//   if (status === "unauthenticated") {
//     router.push("/");
//   }

  const imgHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const item = (target.files as FileList)[0];
    setimageShow(URL.createObjectURL(item))
    setFile(item);
  };

  const removeImage = () => {
    setimageShow("")
    setFile(undefined)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const uploadImage = async () => {
    console.log("asd")
    setIsUploading(true)
    if(file) {
      await edgestore.myPublicImages.upload({file}).then((res) => {
        links = res.url;
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await uploadImage().then(async () => {
        const res = await fetch("http://localhost:3000/api/products2", {
          method: "POST",
          body: JSON.stringify({
            img: links,
            title: inputs.title,
            desc: inputs.desc,
            price: inputs.price,
            cat: inputs.catSlug,
            isFeatured: isFeatured
          }),
        });
        const data = await res.json();
        links ="";
        // toast.success("The product added successfully")
        router.push(`/product/${data.productss._id}`);
      })
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4 lg:px-20 xl:px-40 flex items-center justify-center text-red-500">
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-6">
        <h1 className="text-4xl mb-2 text-gray-300 font-bold">
          Add New Product
        </h1>
        <div className="w-full flex flex-col gap-2 "> 
          <div className="flex flex-col items-center justify-center w-full h-96">
              <div className="w-1/2 h-full relative">
                {imageShow != "" ? (
                  <div>
                    <Image src={imageShow} alt="preview" fill />
                    <div className="absolute right-0 hover:cursor-pointer" onClick={removeImage} >
                      <span>X</span>
                    </div>
                  </div>
                ) : (
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" onChange={imgHandler} />
                  </label>
                ) }
              </div>
              <button type="button" onClick={uploadImage}>Upload Image(temporary)</button>
          </div> 
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label className="text-sm">Title</label>
          <input
            className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
            type="text"
            placeholder="Bella Napoli"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm">Description</label>
          <textarea
            rows={3}
            className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
            placeholder="A timeless favorite with a twist, showcasing a thin crust topped with sweet tomatoes, fresh basil and creamy mozzarella."
            name="desc"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label className="text-sm">Price</label>
          <input
            className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
            type="number"
            placeholder="29"
            name="price"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label className="text-sm">Category</label>
          <input
            className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
            type="text"
            placeholder="pizzas"
            name="catSlug"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex " >
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="false" className="sr-only peer" onClick={((e) => {setIsFeatured(true)})} />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-red-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Is Featured ?</span>
          </label>
        </div>
        <button
          type="submit"
          className={`bg-red-500 p-4 hover:bg-red-700 text-white w-48 rounded-md relative h-14 flex items-center justify-center
          disabled:cursor-progress disabled:hover:bg-red-500 
          `}
          disabled={isUploading}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPage;