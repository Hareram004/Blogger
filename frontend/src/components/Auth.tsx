import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {signUPTypes} from "../zod/zod"
import axios from "axios"
import { BACKEND_URL } from "../config";

export  function Auth({type}: {type: "signup" |"signin"}){
    const Navigate = useNavigate();
    const [postInputs,setPostInputs] = useState<signUPTypes>({
            name: "",
            email: "",
            password: ""
    
    })

    async function sendRequest (){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup" ?"signup" : "signin"}`,postInputs)
            const {token} = response.data;
            if(!token){
                return alert("invalid");
            }            
            localStorage.setItem("token",token)
            Navigate("/blogs");
        }
        catch(e){
            return 
        }
    }
    
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="px-18">
                    <div className="text-3xl font-extrabold">
                        Create an account
                    </div>
                    <div className="text-slate-400">
                        {type === "signin" ? "Don't have an account" : "Already have an account?"}
                        <Link className="pt-2 pl-2 underline" to={type === "signin" ? "/signup":"/signin"}>
                            {type === "signin" ?"Sign up" : "Sign in"}</Link>
                    </div>
                </div>
                <div className="pt-4">
                    {type === "signup" ? <LabelInput label="Name" placeholder="Vivek Jadhav" onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setPostInputs({...postInputs,
                            name: e.target.value
                        })
                    }}></LabelInput> : null}

                    <LabelInput label="Username" placeholder="vivek@gmail.com" onChange={(e: ChangeEvent<HTMLInputElement>)=>{
                        setPostInputs({
                            ...postInputs,
                            email : e.target.value
                        })
                    }}></LabelInput>

                    <LabelInput label="Password" type="password" placeholder="12345" onChange={(e : ChangeEvent<HTMLInputElement>)=>{
                        setPostInputs({
                            ...postInputs,
                            password : e.target.value
                        })
                    }}></LabelInput>

                    <button onClick={sendRequest} type="button" className="w-full mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type ==="signup" ? "signup" : "signin"}</button>
                </div>
            </div>
        </div>
    </div>
}

interface labelInputType {
    label : string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type? : string
}

function LabelInput({label, placeholder, onChange, type}: labelInputType){
    return <div>
        <div>
            <label className="block pt-2 text-sm font-semibold text-black text-bold">{label}</label>
            <input onChange={onChange} type={type ||"text"} id="first_name" className="mb-2 mt-1 bg-gray-50 border
             border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
              block w-full p-2.5" placeholder={placeholder} required />
        </div>
    </div>
}