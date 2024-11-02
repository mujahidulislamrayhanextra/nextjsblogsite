
// // http://localhost:3000/api/blog/blogid/comment/commentid

import Blog from '@/model/Blog';
import { connect } from '@/lib/db';
import { NextResponse } from 'next/server';
import { verifyJwtToken } from '@/lib/jwt';


export async function DELETE(req,res) {
    await connect();
    
    const id = (await res.params).id;
      
    const commentId = res.params.commentId


    const accessToken = req.headers.get("authorization");
    const token = accessToken.split(" ")[1];
        
   //  console.log(accessToken)

    const decodedToken = verifyJwtToken(token);

    if(!accessToken || !decodedToken ){
       return NextResponse.json({
           error: "unauthorized (wrong or expried token)"
       },
       {status:403} 
   
   )
    } 
    try {

     
    
       const blog = await Blog.findById(id).populate("authorId").populate("commnents.user")

   const comment = blog.comments.find(commnet => comment.id === commentId)

  if (!comment) {
    return NextResponse.json({
        message: "commnet does not exist"
    },{status:404})
    
  }

if (comment?.user?._id.toString() !== decodedToken._id.toString() ) {
return NextResponse.json(
   {msg: "Only author can delete his/her comment" },
   {status:403}
)
}

 blog.comments = blog.comments.filter(comment  => comment.id !== commentId )
 await blog.save()
       return NextResponse.json({message:"Comment Deleted"},{status:200})
       
    } catch (error) {
       return NextResponse.json(error);
      
    } 
}