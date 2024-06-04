import { blog } from "../hooks";
import { Appbar } from "./Appbar";
import { AvatarComponent } from "./BlogCard";

export function FullBlog({blog}:{blog:blog}){
    return <div>
        <Appbar></Appbar>
        <div className="flex justify-center">
            <div className="gred grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
                <div className="col-span-8">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        post on XX-XX-XXXX
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
                </div>
                <div className="cols-span-4">
                    <div className="text-slate-600 text-lg">
                        Author
                    </div>
                    <div className="flex w-full">
                        <div className="pr-4 flex flex-col justify-center">
                            <AvatarComponent size="big" name={blog.author.name || "Anonymous"}></AvatarComponent>
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                Where Words Ignite Imagination and Hearts Race
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
}