"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {BsFillPencilFill ,BsTrash} from "react-icons/bs";
import  demoImage  from '@/public/img/demo_image.jpg';
import { AiFillHeart, AiOutlineComment, AiTwotoneCalendar } from 'react-icons/ai';
import Input from '@/components/Input';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import moment from 'moment';



const Blogdetails = ({params}) => {


    function splitParagraph(paragraph) {
        const MIN_LENGTH = 280;
        const sentences = paragraph.split(". ");
      
        let currentParagraph = "";
        let paragraphs = [];
      
        for (let i = 0; i < sentences.length; i++) {
          const sentence = sentences[i];
          const isLastSentence = i === sentences.length - 1;
      
          if (isLastSentence) {
            currentParagraph += sentence + " "; // No dot after the last sentence
          } else if (currentParagraph.length + sentence.length + 2 <= MIN_LENGTH) {
            currentParagraph += sentence + ". ";
          } else {
            paragraphs.push(<p key={paragraphs.length}>{currentParagraph.trim()}</p>);
            currentParagraph = sentence + ". ";
          }
        }
      
        if (currentParagraph) {
          paragraphs.push(<p key={paragraphs.length}>{currentParagraph.trim()}</p>);
        }
      
        return paragraphs;
      }

    const [blogDetails,setBlogDetails] = useState({});



    
    const router = useRouter();

   const {data: session,status} = useSession();

    async function fetchBlog() {

        try {
            const response = await fetch(`http://localhost:3000/api/blog/${params.id}`);
            const blog = await response.json();
            setBlogDetails(blog);
        } catch (error) {
            console.log(error)
        }
        
    }


    useEffect(() => {
        fetchBlog()
    },[])



    const timeStr = blogDetails?.createAt;
   
    const time = moment(timeStr);
  
    const formattedTime = time.format("MMMM Do YYYY")
      
   console.log(blogDetails)

  return (
   <section className="container max-w-3xl">

    {blogDetails?.authorId?._id.toString() === session?.user?._id.toString() && <div className='flex items-center justify-end gap-5 '>
       <Link  href={`/blog/edit/${params.id}`} className='flex items-center gap-1 text-primaryColor'>
         <BsFillPencilFill/>
         Edit
       </Link>
       <button className=' flex items-center gap-1 text-red-500'>
            <BsTrash />
             Delete
       </button>
    </div> }

    

    <div className='flex flex-col items-center justify-center'>

                <Link href={`/user/${blogDetails?.authorId?._id.toString()}`}  >
                <div className='flex flex-col justify-center items-center py-10'>

                    <Image src={blogDetails?.authorId?.avatar?.url ? blogDetails?.authorId?.avatar?.url : demoImage}  alt='avater image' width={0} height={0} sizes='100vw' className='w-20 h-20 rounded-full'/>      
   

                <div className='text-center'>
                <p className="text-whiteColor">{blogDetails?.authorId?.name}</p>
                  <p>{blogDetails?.authorId?.designation}</p>


   </div>


</div>
                </Link>
         

      




     <div className="text center space-y-3">

        <h2>{blogDetails?.title}</h2>

        <p>{blogDetails?.excerpt}....</p>

        <p className="flex items-center justify-certer gap-3">
            <span className='text-primaryColor'> {blogDetails?.category}

            </span>
            <span className="flex items-center gap-1">
                <AiTwotoneCalendar/>
                {formattedTime}
            </span>
        </p>

        <div>
            <Image  src={blogDetails?.image ? blogDetails?.image?.url : demoImage } priority  alt='blog details image' width={1000} height={100} sizes='100vw' className=' w-ful h-full rounded-lg py-10'

            /> 
        </div>


            <div className='text-start'>
                 <div className='space-y-5'>
                       {
                        blogDetails?.description && splitParagraph(blogDetails?.description).map(
                            (paragraph,pIndex) => (
                                <div key={pIndex}>
                                       {
                                        pIndex === Math.floor(splitParagraph(blogDetails?.description).length / 2) && (<blockquote className='border-l-4 border-primaryColor border-spacing-6 italic mb-5 '>
                                            <p className='ml-5'>{blogDetails?.qoute}</p>
                                        </blockquote>)
                                       }
                                       {paragraph}
                                </div>
                            )
                        )
                       }
                 </div>
            </div> 



     </div>

    </div>
 
     <div className='py-12'>
        <div className='flex gap-10 items-center text-xl justify-center'>

            <div className="flex items-center gap-1">
                <p>12</p>

                <AiFillHeart size={20} color='#ed5784' cursor="pointer" />
                <AiFillHeart size={20}  cursor="pointer" />
            </div>


            
            <div className="flex items-center gap-1">
                <p>12</p>

                <AiOutlineComment size={20}  />
                 
            </div>

        </div>
 
     </div>

         <div>
              <h3 className='text-red-500'>Kindly login to leave a comment.</h3>
               <form className='space-y-2'>

                    <Input name="comment" type="text" placeholder="Type message..." />

                    <button type='submit'className='btn' >
                        comment

                    </button>

               </form>

               <div className='flex gap-3 py-5 items-center' >
                    
            <Image src={demoImage}  alt='avater image' width={0} height={0} sizes='100vw' className='w-10 h-10 rounded-full'/>
            <div>
                <p className='text-whiteColor'>John</p>
                <p>This is our first comment</p>
                </div>
                <BsTrash cursor="pointer" className='text-red-500 ml-10'/> 

               
               </div>
         </div>
   </section>
  )
}

export default Blogdetails  







// "use client"
// import Image from 'next/image';
// import Link from 'next/link';
// import React, { useEffect, useState } from 'react';
// import {BsFillPencilFill ,BsTrash} from "react-icons/bs";
// import  demoImage  from '@/public/img/demo_image.jpg';
// import { AiFillHeart, AiOutlineComment, AiTwotoneCalendar } from 'react-icons/ai';
// import Input from '@/components/Input';
// import { useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import moment from 'moment';
// import { response } from 'express';
// import { deletePhoto } from '@/action/uploadAction';



// const Blogdetails = ({params}) => {


//     function splitParagraph(paragraph) {
//         const MIN_LENGTH = 280;
//         const sentences = paragraph.split(". ");
      
//         let currentParagraph = "";
//         let paragraphs = [];
      
//         for (let i = 0; i < sentences.length; i++) {
//           const sentence = sentences[i];
//           const isLastSentence = i === sentences.length - 1;
      
//           if (isLastSentence) {
//             currentParagraph += sentence + " "; // No dot after the last sentence
//           } else if (currentParagraph.length + sentence.length + 2 <= MIN_LENGTH) {
//             currentParagraph += sentence + ". ";
//           } else {
//             paragraphs.push(<p key={paragraphs.length}>{currentParagraph.trim()}</p>);
//             currentParagraph = sentence + ". ";
//           }
//         }
      
//         if (currentParagraph) {
//           paragraphs.push(<p key={paragraphs.length}>{currentParagraph.trim()}</p>);
//         }
      
//         return paragraphs;
//       }

//     const [blogDetails,setBlogDetails] = useState({})


//     const [isDeleting,setIsDeleting] = useSession(false)



    
//     const router = useRouter();

//    const {data: session,status} = useSession();

//     async function fetchBlog() {

//         try {
//             const response = await fetch(`http://localhost:3000/api/blog/${params.id}`);
//             const blog = await response.json();
//             setBlogDetails(blog);
//         } catch (error) {
//             console.log(error)
//         }
        
//     }


//     useEffect(() => {
//         fetchBlog()
//     },[])



//     const timeStr = blogDetails?.createAt;
   
//     const time = moment(timeStr);
  
//     const formattedTime = time.format("MMMM Do YYYY")
      
//    console.log(blogDetails)



//    const handleBlogDelete = async(imageId) => {

//     try {
//         const confirmModal = window.confirm("Are you sure you want to delete your blog ?")

//         if (confirmModal) {

//             setIsDeleting(true)

//             const res = await fetch(` http://localhost:3000/api/blog/${params.id}`,
//                 {
//                     method: "DELETE",
//                     headers: {
//                         Authorization: `Bearer ${session?.user?.accessToken}`
//                     }
//                 }
//             )

//             if (response?.status === 200) {
//                  await deletePhoto(imageId)

//                  router.refresh();
//                  router.push("/blog");
//             }
            
//         }
//         setIsDeleting(false)
        
//     } catch (error) {
//         console.log(error)
//     }

//    }

//   return (
//    <section className="container max-w-3xl">

//     {blogDetails?.authorId?._id.toString() === session?.user?._id.toString() && <div className='flex items-center justify-end gap-5 '>
//        <Link  href={`/blog/edit/${params.id}`} className='flex items-center gap-1 text-primaryColor'>
//          <BsFillPencilFill/>
//          Edit
//        </Link>
//        <button onClick={() => handleBlogDelete(blogDetails?.image?.id)} className=' flex items-center gap-1 text-red-500'>
//             <BsTrash />
//              Delete
//        </button>
//     </div> }

    

//     <div className='flex flex-col items-center justify-center'>

//                 <Link href={`/user/${blogDetails?.authorId?._id.toString()}`}  >
//                 <div className='flex flex-col justify-center items-center py-10'>

//                     <Image src={blogDetails?.authorId?.avatar?.url ? blogDetails?.authorId?.avatar?.url : demoImage}  alt='avater image' width={0} height={0} sizes='100vw' className='w-20 h-20 rounded-full'/>      
   

//                 <div className='text-center'>
//                 <p className="text-whiteColor">{blogDetails?.authorId?.name}</p>
//                   <p>{blogDetails?.authorId?.designation}</p>


//    </div>


// </div>
//                 </Link>
         

      




//      <div className="text center space-y-3">

//         <h2>{blogDetails?.title}</h2>

//         <p>{blogDetails?.excerpt}....</p>

//         <p className="flex items-center justify-certer gap-3">
//             <span className='text-primaryColor'> {blogDetails?.category}

//             </span>
//             <span className="flex items-center gap-1">
//                 <AiTwotoneCalendar/>
//                 {formattedTime}
//             </span>
//         </p>

//         <div>
//             <Image  src={blogDetails?.image ? blogDetails?.image?.url : demoImage } priority  alt='blog details image' width={1000} height={100} sizes='100vw' className=' w-ful h-full rounded-lg py-10'

//             /> 
//         </div>


//             <div className='text-start'>
//                  <div className='space-y-5'>
//                        {
//                         blogDetails?.description && splitParagraph(blogDetails?.description).map(
//                             (paragraph,pIndex) => (
//                                 <div key={pIndex}>
//                                        {
//                                         pIndex === Math.floor(splitParagraph(blogDetails?.description).length / 2) && (<blockquote className='border-l-4 border-primaryColor border-spacing-6 italic mb-5 '>
//                                             <p className='ml-5'>{blogDetails?.qoute}</p>
//                                         </blockquote>)
//                                        }
//                                        {paragraph}
//                                 </div>
//                             )
//                         )
//                        }
//                  </div>
//             </div> 



//      </div>

//     </div>
 
//      <div className='py-12'>
//         <div className='flex gap-10 items-center text-xl justify-center'>

//             <div className="flex items-center gap-1">
//                 <p>12</p>

//                 <AiFillHeart size={20} color='#ed5784' cursor="pointer" />
//                 <AiFillHeart size={20}  cursor="pointer" />
//             </div>


            
//             <div className="flex items-center gap-1">
//                 <p>12</p>

//                 <AiOutlineComment size={20}  />
                 
//             </div>

//         </div>
 
//      </div>

//          <div>
//               <h3 className='text-red-500'>Kindly login to leave a comment.</h3>
//                <form className='space-y-2'>

//                     <Input name="comment" type="text" placeholder="Type message..." />

//                     <button type='submit'className='btn' >
//                         comment

//                     </button>

//                </form>

//                <div className='flex gap-3 py-5 items-center' >
                    
//             <Image src={demoImage}  alt='avater image' width={0} height={0} sizes='100vw' className='w-10 h-10 rounded-full'/>
//             <div>
//                 <p className='text-whiteColor'>John</p>
//                 <p>This is our first comment</p>
//                 </div>
//                 <BsTrash cursor="pointer" className='text-red-500 ml-10'/> 

               
//                </div>
//          </div>
//    </section>
//   )
// }

// export default Blogdetails  
