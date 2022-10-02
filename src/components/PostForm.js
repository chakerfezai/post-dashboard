import axios, { Axios } from 'axios';
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const Item = function (code1, weight2, destination1) {
    const code = code1;
    const weight = weight2;
    const destination = destination1;
    return { code, weight, destination };
};

function PostForm() {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [receptacleId, setReceptacleId] = useState(0)

    const url = "http://localhost:9000/itemWorkFlow";
    const [data1, setData1] = useState({
        code: "",
        weight: "",
        destination: ""
    })

    function handel(e) {
        const newdata = { ...data1 }
        newdata[e.target.id] = e.target.value
        setData1(newdata)
        console.log(newdata)
    }

    function submit(e) {
        e.preventDefault();
        const item0 = Item(data1.code, data1.weight, data1.destination);
        const item2 = { item: item0 }
        axios.post(url, item2)
            .then(res => {
                console.log(res.data.item.receptacleId);
                setReceptacleId(res.data.item.receptacleId);
                axios.get('http://localhost:9000/parcel/item/' + res.data.item.receptacleId)
                    .then(res => {
                        setData([]);
                        console.log(res.data);
                        setData(res.data);
                    });
            });
    }

    function closeReceptacle() {
        const url2 = 'http://localhost:9000/orchestrator';
        console.log(receptacleId);
        const receptacleIdInput = { receptacleId: receptacleId }
        axios.post(url2 , receptacleIdInput)
            .then(res => {
                console.log(res.data);
            });
    }

    return (
        <>
            <div>
                <form onSubmit={(e) => submit(e)}>
                    <input onChange={(e) => handel(e)} id="code" value={data1.code} placeholder='code' type="text"></input>
                    <input onChange={(e) => handel(e)} id="weight" value={data1.weight} placeholder='weight' type="text"></input>
                    <input onChange={(e) => handel(e)} id="destination" value={data1.destination} placeholder='destination' type="text"></input>
                    <button>Submit</button>
                </form>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell >CODE</TableCell>
                            <TableCell >Receptacle ID</TableCell>
                            <TableCell >weight</TableCell>
                            <TableCell>destination</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {item.id}
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    {item.code}
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    {item.receptacleId}
                                </TableCell>

                                <TableCell component="th" scope="row">
                                    {item.weight}
                                </TableCell>

                                <TableCell>

                                    <img
                                        src={`https://flagcdn.com/${item.destination.toLowerCase()}.svg`}
                                        width="50"
                                        alt={item.destination.toLowerCase()}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <button onClick={closeReceptacle}>Close Receptacle</button>
        </>
    );
}


export default PostForm;