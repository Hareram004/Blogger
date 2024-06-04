import { useParams } from "react-router-dom";
import { useUniqueBlog } from "../hooks";
import { FullBlog } from "../components/FullBlog";
import { Appbar } from "../components/Appbar";
import { Spinner } from "../components/Spinner";

export function Blog() : any{
    const {id} = useParams();
    const {loading, myBlog} = useUniqueBlog({
        id : id || ""
    });

    if(loading){
        return <div>
            <Appbar></Appbar>

            <div className="h-screen flex flex-col justify-center">
                <div className="flex justify-center">
                    <Spinner></Spinner>
                </div>

            </div>
        </div>
    }

    return <div>
        {myBlog && <FullBlog blog={myBlog}></FullBlog>}
    </div>
    
}