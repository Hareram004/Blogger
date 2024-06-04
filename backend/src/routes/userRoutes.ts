import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context, Hono } from "hono";
import { sign } from "hono/jwt";
import {signUpSchema,signinSchema} from '../zod/zod'
const user = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        JWT_SECRET : string
    }
}>();

user.post("/signup",async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    console.log("hi");
    const body =await c.req.json();
    const { success } = signUpSchema.safeParse(body);

    if(!success){
        return c.json({
            message : "invalid inputs"
        })
    }


    try{
        const response = await prisma.user.create({
            data : {
                email : body.email,
                password : body.password,
                name : body.name
            }
        })

        const token = await sign(response.id,c.env.JWT_SECRET);

        return c.text(token);
    }

    catch(e){
        console.log(e)
        return c.json({
            message : "internal server error"
        })
    }
})


user.post("/signin",async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body =await c.req.json()
    const {success} = signinSchema.safeParse(body)

    if(!success){
        return c.json({
            message : "invalid inputs"
        })
    }
    try{
        const response =await prisma.user.findUnique({
            where : {
                email : body.email,
                password : body.password
            }
        })

        if (response == null) {
            return c.json({
                message: "user not found"
            });
        }
        const token = await sign(
            {
                id: response.id,
            },
            c.env.JWT_SECRET
        );
        
        return c.json({
            message : "signed in successfully",
            token
        })
    }

    catch (e){
        return c.json({
            message : "internal server error"
        })
    }
})

export default user;