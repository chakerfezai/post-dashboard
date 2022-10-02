
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CountriesInfo from './countries-info.json';
import axios from 'axios';
import React, { useEffect, useState } from 'react';


function Containers() {

    const[loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                //const { data: response } = await axios.get('http://post-container-service-post-container-service.apps-crc.testing/containers/all');
                const { data: response } = await axios.get('http://localhost:9000/containers/all');
                setData(response);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }

        fetchData();
    }, []);

    return (

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Flag</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((country, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                {country.distination}
                            </TableCell>
                            <TableCell align="right">
                                
                                <img
                                    src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
                                    width="50"
                                    alt={country.code.toLowerCase()}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    );
}

export default Containers;