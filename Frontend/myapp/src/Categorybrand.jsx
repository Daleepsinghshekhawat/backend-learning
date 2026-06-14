import React from 'react'
import {useParams, useNavigate} from "react-router-dom";
import {useState,useEffect} from "react"




const Categorybrand = () => {
  const {category,brand} = useParams();

  const [data,setdata] =useState([]);

  const result = async()=>{
    const res = await axios.get(`http://localhost:3000/products/data?${category}&${brand}`)
    setdata(res.data.products)
  }
 
  return (
    <div>
      {data.map((item) =>(
        <div key ={item.id}>
          <h1>{item.name}</h1>
        </div>
      ))
    }
    </div>


  )
    
}

export default Categorybrand