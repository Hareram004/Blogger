import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/Skeleton";
import { useBlogs } from "../hooks";

export function Blogs() : any{
    const {loading, blog } = useBlogs();

    if(loading){
        return <div>
            <Appbar></Appbar>
            <div className="flex justify-center">
                <div>
                    <BlogSkeleton></BlogSkeleton>
                    <BlogSkeleton></BlogSkeleton>
                    <BlogSkeleton></BlogSkeleton>
                    <BlogSkeleton></BlogSkeleton>
                    <BlogSkeleton></BlogSkeleton>
                </div>
            </div>
        </div>
    }
    return<div>
        <Appbar></Appbar>
        <div className="flex justify-center">
            <div>
                {blog.map(b => <BlogCard
                    key = {b.id}
                    id = {b.id}
                    authorName={b.author.name || "Anonymous"}
                    title={b.title}
                    content={b.content}
                    publishedDate={"XX-XX-XXXX"}
                ></BlogCard>)}
            </div>
        </div> 
    </div>

}