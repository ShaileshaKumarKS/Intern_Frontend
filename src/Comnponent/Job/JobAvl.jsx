import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import compLogo from '../../Assets/netflix.png'
import './JobDetail.css'
import axios from 'axios'

function JobAvl() {

    const [searchCategory,setSearchCategory]=useState("");
   const [searchLocation,setSearchLocation]=useState("")
   const [filterJob,setFilterJob]=useState([])
    const [isDivVisible,setDivVisible]=useState(false)

    const [JobData,setJobData]=useState([])

    useEffect(()=>{
      const fetchData=async()=>{
        try{
        const response=await axios.get("https://internareabackend-nrg6.onrender.com/api/job")
        setJobData(response.data)
      
      }catch(error){
        console.log(error)
      }
    }
      fetchData();
    },[])



  const showDiv=()=>{
  setDivVisible(true)
  }
  const hidediv=()=>{
    setDivVisible(false)
  }
  const handleCategoryChange=(e)=>{
    const categoryValue=e.target.value;
    setSearchCategory(categoryValue);
    setFilterJob([categoryValue,searchLocation])
  }
  
  const handleCategoryLocationChange=(e)=>{
    const locationValue=e.target.value;
    setSearchLocation(locationValue);
    setFilterJob([searchCategory,locationValue])
  }
  const filterJobs = useCallback((category, location) => {
    
        const filterData = JobData.filter(
          (Job) =>
            Job.category.toLowerCase().includes(category.toLowerCase()) &&
            Job.location.toLowerCase().includes(location.toLowerCase())
        )
        setFilterJob(filterData);
      
    },[JobData])
  
   useEffect(()=>{

     filterJobs(searchCategory,searchLocation);
   },[searchCategory,searchLocation,filterJobs])
   



  return (
    <>
    <div className='flex internship-filter'>
<div className="first-int mb-14">
  <div className="filter-section w-1/6">
<p  className=' text-center' ><i  class="bi bi-funnel  text-blue-400"></i> Filter</p>
<div className='fill flex flex-col ml-2'>
<label htmlFor="pro">Profile</label>
<input type="text" id='pro'  value={searchCategory} onChange={handleCategoryChange} className='profile border-2 mr-3 w-full' placeholder='Profile manager'/>
<label htmlFor="loc">Location</label>
<input type="text" id='loc'  value={searchLocation}  onChange={handleCategoryLocationChange} className='location border-2  mr-3 w-full' placeholder='Mumbai'/>
</div>
<div className=" preferences mt-8 flex flex-col">
<div className="flex mt-3 ml-3 mr-3">
  <input type="checkbox" name="wfh" id="whf"  className='mr-2 ml-3'/>
  <label htmlFor="wfh">Work From home</label>
</div>
<div className="flex mt-3 ml-3 mr-3">
<input type="checkbox" name="pt" id="whf"  className='mr-2 ml-3'/>
  <label htmlFor="pt">Part-time</label>
</div>
<p>Annual salary(in lakhs)</p>
<input type="range" name="" id="" />
<p className='mt-2 ml-3 mr-3'>0  2  &nbsp;  4  &nbsp;  6 &nbsp;  8   &nbsp; 10</p>
</div>

<p className= ' mt-5 text-blue-400'>View more filters <i class="bi bi-chevron-down"></i></p>
<span className='justify-end flex text-blue-400 mr-3'>Clear all</span>
</div>
<div className="search-2"><div className="search-container">
  <label htmlFor='ex'>Experience</label>
  <input type="text" id='ex' placeholder='eg. 0-1 year' />
  <div className="search-icon">
  <i class="bi bi-search"></i>
  </div>
  </div></div>
  </div>

  <div className="all-internships">
    <div className=" show show2 flex justify-center">
      <p className='filterico text-center' onClick={showDiv}>filter <i class="bi bi-funnel  text-blue-400"></i>   </p>

    </div>
    <p className='head font-bold text-lg text-center '  >{filterJob.length} total jobs</p>

    { 
    filterJob.map((data,index)=>(
     
     
<div className='shadow-lg rounded-lg bg-white m-7 ' id='display' >
  <div className="m-4">
    
  <p className='mb-4 mt-3' id='boxer'> <i className='bi bi-arrow-up-right text-blue-500' ></i> Actively Hiring</p>
  <div className="flex justify-end">
<img src={compLogo} className='w-14' alt="" />
  </div>
<div className="all-ele">


<div className='text-lg text-black m-2 mt-7 font-bold'>{data.title}</div>
<div className="info">
<p className='text-sm text-slate-300 font-bold'>{data.company}</p>
<p className=' mt-2'>{data.location}</p>
</div>
<div className="flex text-sm justify-between">
  <p className='mt-3'> <i class="bi bi-play-circle-fill"></i>   Start Date  <br />  {data.StartDate}</p>


  <p className='mt-3'> <i class="bi bi-calendar-check-fill"></i> Experience<br />
  {data.Experience}</p>

  <p className='mt-3'>  <i class="bi bi-cash"></i>  Salary <br /> {data.CTC}</p>
   </div>
   </div>
   <span className='bg-slate-200 text-slate-400 w-20 rounded-sm text-center'>Job</span>
   <br />
   <span><i class="bi bi-stopwatch text-green-300"></i>23/11/2024</span>
   <div className="flex justify-end" id='hr'>
<Link to={`/detailJob?q=${data._id}`} className='mt-10'>
<button id='viewButtons' className='bg-transparent text-blue-500'>View In Deatils</button></Link>
   </div>
  </div>
  </div>
  
    ))
     
    }

  </div>
  {
  isDivVisible &&(
    <>
    <div className="first2-int mb-14">
  <div className="filter-section w-1/6">
      <button id='close-btn' onClick={hidediv}><i class=" text-3xl bi bi-x"></i></button>
<p className='text-center'><i class="bi bi-funnel  text-blue-400"></i> Filter</p>
<div className='fill flex flex-col ml-2'>
<label htmlFor="pro">Profile</label>
<input type="text" id='pro'  value={searchCategory} onChange={handleCategoryChange} className='profile border-2 mr-3 w-full' placeholder='Profile manager'/>
<label htmlFor="loc">Location</label>
<input type="text" id='loc'  value={searchLocation}  onChange={handleCategoryLocationChange} className='location border-2 mt-10  -m-0 w-full' placeholder='Mumbai'/>
</div>
<div className=" preferences mt-8 flex flex-col">
<div className="flex mt-3 ml-3 mr-3">
  <input type="checkbox" name="wfh" id="whf"  className='mr-2 ml-3'/>
  <label htmlFor="wfh">Work From home</label>
</div>
<div className="flex mt-3 ml-3 mr-3">
<input type="checkbox" name="pt" id="whf"  className='mr-2 ml-3'/>
  <label htmlFor="pt">Part-time</label>
</div>
<p> Annual salary (in lakhs)</p>
<input type="range" name="" id="" />
<p className='mt-2 ml-3 mr-3'>0 &nbsp;  &nbsp;  2 &nbsp;  &nbsp;  4  &nbsp;   &nbsp;  6  &nbsp; &nbsp; 8   &nbsp; &nbsp;   10</p>
</div>

<p className= ' mt-5 text-blue-400'>View more filters <i class="bi bi-chevron-down"></i></p>
<span className='justify-end flex text-blue-400 mr-3'>Clear all</span>
</div>
<div className="search-2"><div className="search-container">
  <label htmlFor="ex ">Experience</label>
  <input type="text" id='ex' placeholder='eg. 0-1 year' />
  <div className="search-icon">
  <i class="bi bi-search"></i>
  </div>
  </div></div>
  </div>
    </>
  )
}
</div>

</>
  );
}

export default JobAvl;
