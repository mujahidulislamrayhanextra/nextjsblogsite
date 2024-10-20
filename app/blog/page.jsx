import React from 'react';
import FirstBlog from '@/components/FirstBlog';
import OtherBlogs from '@/components/OtherBlogs';


async function fetchBlog() {

    const res = await fetch("http://localhost:3000/api/blog",{
        cache: "no-store"
    });
    if (!res.ok) {
        throw new Error("Failed to fetch data");
        
    }

    return res.json();
}

const Blog = async () => {
    const blogs = await fetchBlog();

    const firstBlog = blogs && blogs[0]

    const otherBlogs = blogs?.length > 0 && blogs.slice(1)
         
    console.log(blogs)
    return (
        <div> 
            {blogs?.length > 0 ? (<> 

            <div className="container"> 
                <h2 className='text-center my-10'>
                    <span className='text-primaryColor'>Trending</span> Blog
                    </h2> 
                    <FirstBlog firstBlog={firstBlog} /></div>

                       <OtherBlogs otherBlogs={otherBlogs} />
          
            </>) : (<h3>No Blogs.....</h3>) }
        
        </div>
    );
};

export default Blog;