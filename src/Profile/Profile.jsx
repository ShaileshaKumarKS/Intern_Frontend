import React from 'react';
import { useSelector , useDispatch} from 'react-redux';
import { selectUser ,updateProfile} from '../Feature/UserSlice';
import { Link } from 'react-router-dom';
import { useState ,useEffect} from 'react';
import '../../src/Comnponent/Navbar/Navbar.css'
import { ProfileSettings } from './ProfileSettings';

function Profile() {
 const user=useSelector(selectUser)
 const dispatch=useDispatch();

//  const [profile,setProfile]=useState()
 const [avatar, setAvatar] = useState(user.photoURL);


 useEffect(()=>{
  const savedAvatar=localStorage.getItem("userPhotoURL")
  if(savedAvatar){
    setAvatar(savedAvatar);
  }else{
    setAvatar(user?.photoURL || "")
  }
},[user]);

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        dispatch(updateProfile({photoURL:reader.result}));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="flex items-center mt-9 mb-4 justify-center" >
        <div className='max-w-xs'>
            <div className='bg-white shadow-lg rounded-lg py-3'>
   <div className="photo-wrapper p-2">
   
    
 <img src={avatar} alt="" className='w-32 h-32 rounded-full mx-auto' /> 
 {/* <i class="bi bi-plus ml-36 mb-40 cursor-pointer " htmlFor="file"></i> */}
 <label className="rounded-full font-semibold cursor-pointer pt-0  " id="lab"htmlFor='file'>+</label>
 <input type='file'id='file' accept='image/*' onChange={handleChange}></input>
   </div>
<div className='p-2'>
 
    <h3  className='text-center text-xl text-gray-900'>{user?.name}</h3>
</div>
<div className='text-xs my-3'>
<h3 className='text-xl font-bold'>UID</h3>
    <h3 className='text-center text-lg text-gray-900'>{user?.uid}</h3>
</div>
<div>

<h3  className='text-xl font-bold'>Email</h3>
    <h3 className='text-center text-xl text-gray-900'>{user?.email}</h3>
</div>
<div className='flex justify-center mt-3' >

<Link to="/userapplication" class="relative  items-center justify-start inline-block px-5 py-3 overflow-hidden font-medium transition-all bg-blue-600 rounded-full hover:bg-white group">
<span class="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-full"></span>
<span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-blue-600">View Applciations</span>
</Link>
</div>
<br/>

<ProfileSettings/>
<br/>
<Link to='/payment'> <button  className='bg-yellow-300 rounded-lg p-1'>Subscriptions</button></Link>


</div> 
</div>
</div>
      
    </div>
  );
}

export default Profile;
