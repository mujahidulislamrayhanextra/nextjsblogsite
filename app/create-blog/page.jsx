"use client"
import React, { useEffect, useState } from 'react';
import Input from '@/components/Input';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import Textarea from '@/components/Textarea';
const initialState = {
    title:"",
  description: "",
  excerpt: "",
  quote: "",
  catagory: "Songbirds",
  photo:""
}

const handleChange = (event) => {
    setError("")
    setState({ ...state, [event.target.name]: event.target.value })
  }

const CreateBlog = () => {
    const [state,setState ] = useState(initialState);

    const [error,setError] = useState("")
  
    const [success,setSuccess] = useState("")
  
    const [isLoading,setIsLoading] = useState(false)

    const router = useRouter();






    return (
       <section className="container max-w-3xl" >
            <h2 className="mb-5">
                <span className="special-word">Create</span>Blog </h2>
                 <form  className="space-y-5">
                     
                 <Input label="Title"
                  type="text" 
                  name="title"
                  placeholder= "Write your title here..."
                   onChange={handleChange} 
                   value={state.title} />
                 <Textarea label="Description"
                  rows="4" 
                  name="description"
                  placeholder= "Write your title here..."
                   onChange={handleChange} 
                   value={state.description} />
                 <Textarea label="Excerpt"
                  rows="2" 
                  name="excerpt"
                  placeholder= "Write your title here..."
                   onChange={handleChange} 
                   value={state.excerpt} />
                 <Textarea label="Qoute"
                  rows="2" 
                  name="qoute"
                  placeholder= "Write your title here..."
                   onChange={handleChange} 
                   value={state.qoute} />
                 </form>
       </section>
    );
};

export default CreateBlog;