import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config";

export interface blog{
    "content" : string;
    "title" : string;
    "id" : number;
    "author" : {
        "name" : string
    }

}

export const useUniqueBlog = ({id}:{id:string})=>{
    const [loading , setLoading] = useState(true);
    const [myBlog,setMyBlog] = useState<blog>();

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers : {
                Authorization : localStorage.getItem("token")
            }
        }).then((response)=>{
            setMyBlog(response.data.blog)
            setLoading(false)
        })
    },[id])

    return { 
        myBlog,
        loading
    }
}

export const useBlogs = ()=>{
    const [loading,setLoading] = useState(true);
    const [blog,setBlog] = useState<blog[]>([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers : {Authorization : localStorage.getItem("token")}
        })
            .then((response)=>{
                setBlog(response.data.blogs)
                setLoading(false)
            })
    },[])

    return {
        loading,
        blog
    }
}