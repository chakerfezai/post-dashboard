import axios, { Axios } from 'axios';
import React, { useEffect, useState } from 'react';


function PostForm() {

    const url = "";
    const [data, setData] = useState({
        code: "",
        weight: "",
        destination:""
    })

    function handel(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }

    function submit(e){
        e.preventDefault();
        axios.post(url,{
            code:parseInt(data.code),
            weight:parseFloat(data.weight),
            destination: parseFloat(data.destination)
        })
        .then(res => {
            console.log(res.data)
        })
    }

    return (
        <div>
            <form onSubmit={(e) => submit(e)}>
                <input onChange={(e) => handel(e)} id="code" value={data.code} placeholder='code' type="text"></input>
                <input onChange={(e) => handel(e)} id="weight" value={data.weight} placeholder='weight' type="text"></input>
                <input onChange={(e) => handel(e)} id="destination" value={data.destination} placeholder='destination' type="text"></input>
                <button>Submit</button>
            </form>
        </div>
    );
}


export default PostForm;