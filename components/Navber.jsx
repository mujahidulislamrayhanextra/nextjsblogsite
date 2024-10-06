'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import  john  from '@/public/img/john.jpg';
import { AiOutlineClose } from 'react-icons/ai';
import { usePathname } from 'next/navigation';
import { signOut,useSession } from 'next-auth/react';


const Navber = () => {
   

  const {data: session ,status} = useSession();

  const pathname = usePathname()

  const [ showDropdown ,setShowDropdown] = useState(false);
  const handleShowDropdown = () => setShowDropdown(prev => true)
  const handleHideDropdown = () => setShowDropdown(prev => false)
 
  const loggedIn = false;


  return (
    <div className='container py-2 h-16 flex items-center justify-between' >
      <Link href="/">
      <h2>
        Light <span className='special-word'>Code.</span>
      </h2>
      </Link>
      <ul className='flex items-center gap-3'>
        <li>
          <Link href="/blog" className={ pathname === '/blog' ? "text-primaryColor font-bold" : " "}>Blog</Link>
        </li>

         {
          session?.user ? (
            <>
              <li>
          <Link href="/create-blog"  className={ pathname === '/create-blog' ? "text-primaryColor font-bold" : " "}  >Create</Link>
        </li>
        <li>
          <div className='relative'>
              <Image 
              onClick={handleShowDropdown}
              src={john}
              alt='avater'
              sizes='100vw'
              className='w-10 h-10 rounded-full cursor-pointer'
               />
               {showDropdown && (
                  <div className='absolute top-0 right-0 bg-primaryColorLight p-5'>

                    <AiOutlineClose onClick={handleHideDropdown} className='w-full cursor-pointer'  />

                    <button onClick={() => {signOut(); handleHideDropdown();}}> Logout</button>
                    <Link onClick={handleHideDropdown} href="/user" >profile
                    </Link>

                  </div>


               )}
          </div>
        </li>
            </>
          ) : (
            <>
               <li>
          <Link href="/login"  className={ pathname === '/login' ? "text-primaryColor font-bold" : " "}>Login</Link>
        </li>
        <li>
          <Link href="/signup"  className={ pathname === '/signup' ? "text-primaryColor font-bold" : " "}>Sign Up</Link>
        </li></>
          )
         }


      
     
        
      </ul>
    </div>
  )
}

export default Navber
