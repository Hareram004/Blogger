import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import {createBlogSchema,updateBlogSchema } from '../zod/zod'

const blog = new Hono<{
    Bindings : {
        JWT_SECRET : string
        DATABASE_URL : string
    },
    Variables : {
        userid : {
            id : number
        }
    }
}>();


blog.use("/*",async (c,next)=>{
    const token= c.req.header("authorization") || "";
    const isVerified =await verify(token,c.env.JWT_SECRET);

    if(isVerified){ 
        console.log(isVerified);
        c.set('userid', isVerified)
        await next()
    }
    else{
        return c.json({
            message : "invalid user"
        })
    }
})

blog.post("/",async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body =await c.req.json();
    const {id} = c.get("userid")
    const data = {
        title : body.title,
        content : body.content,
        id : id,
    }
    console.log(data)
    const {success} = createBlogSchema.safeParse(data)

    if(!success){
        return c.json({
            message : "invalid inputs"
        })
    }

    try{
        const blog = await prisma.post.create({
            data : {
                title : body.title,
                content : body.content,
                authorId : id
            }
        })

        return c.json({
            id : blog.id
        })
    }
    catch(e){
        console.log(e);
        return c.json({
            message : "error while creating blog"
        })
    }
})

blog.put("/",async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const {success} = updateBlogSchema.safeParse(body);

    if(!success){
        return c.json({
            message : "invalid inputs"
        })
    }

    try{
        const blog = await prisma.post.update({
            where : {
                id : body.id
            },
            data : {
                title : body.title,
                content : body.content
            }
        })
        
        return c.json({
            blog
        })
    }
    catch(e){
        return c.json({
            message : "cannot update the blog"
        })
    }
})

blog.get("/bulk",async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blogs = await prisma.post.findMany({
            select : {
                title : true,
                id : true,
                content : true,
                author : {
                    select : {
                        name : true
                    }
                }
            }
        });

        return c.json({
            blogs
        })
    }

    catch(e){
        return c.json({
            message : "cannot get"
        })
    }
})

blog.get("/:id",async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
        const blog = await prisma.post.findFirst({
            where : {
                id : parseInt(c.req.param('id'))
            },
            select : {
                id :  true,
                title : true,
                content : true ,
                author : { 
                    select : {
                        name : true
                    }
                }
            }
        })

        return c.json({
            blog
        })
    }
    catch(e){
        return c.json({
            message : "cannot get the blog"
        })
    }
})

export default blog;