import './App.css';
import Navbar from './Comnponent/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Comnponent/Home/Home';
import Footer from './Comnponent/Footer/Footer';
import JobAvl from './Comnponent/Job/JobAvl';
import Intern from './Comnponent/Internships/Intern';
import Register from './Comnponent/Auth/Register';
import JobDetail from './Comnponent/Job/JobDetail';
import InternDetail from './Comnponent/Internships/InternDetail';
import { useDispatch, } from 'react-redux';
import { login, logout} from './Feature/UserSlice';
import { useEffect } from 'react';
import { auth } from './Firebase/Firebase';
import Profile from './Profile/Profile';
import AdminLogin from './Admin/AdminLogin';
import Adminpanel from './Admin/Adminpanel';
import PostInternship from './Admin/PostInternship';
import PostJOb from './Admin/PostJob';
import ViewAllApplication from './Admin/ViewAllApplication';
import DetailApplication from './Applications/DetailApplication';
import DetailApplicationUser from './Applications/DetailApplicationUser';
import UserApplication from './Profile/UserApplication';
import { requestNotificationPermission } from './Profile/Notification';
import CheckoutPage from './Comnponent/Payment/Checkout';
import SubscriptionForm from './Comnponent/Payment/SubscriptionForm';
 


function App() {

  // const user =useSelector(selectUser);
  const dispatch=useDispatch();
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        dispatch(login({
          uid:authUser.uid,
          photo:authUser.photoURL,
          name:authUser.displayName,
          email:authUser.email,
          phonenumber:authUser.phoneNumber
        }))
      }
      else{
        dispatch(logout())
      }
    })
  },[dispatch]);

 requestNotificationPermission();
  return (
    <div className="App">
      <Navbar/>
       
       <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='/Jobs' element={<JobAvl/>}/>
      <Route path='/Internships' element={<Intern/>}/>
      <Route path='/detailJob' element={<JobDetail/>}></Route>
      <Route path='/detailInternship' element={<InternDetail/>}></Route>
      <Route path='/detailApplication' element={<DetailApplication/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      <Route path='/adminLogin' element={<AdminLogin/>}></Route>  
      <Route path='/adminpanel' element={<Adminpanel/>}></Route>    
      <Route path='/postInternship' element={<PostInternship/>}></Route>
      <Route path='/postJob' element={<PostJOb/>}></Route>
      <Route path='/applications' element={<ViewAllApplication/>}></Route>
      <Route path='/userapplicationdetail' element={<DetailApplicationUser/>}></Route>
      <Route path='/userapplication'element={<UserApplication/>}></Route>
      <Route path='/payment'element={<SubscriptionForm/>}></Route>

       </Routes>
        


        <Footer/>
      
    </div>
  );
}

export default App;
