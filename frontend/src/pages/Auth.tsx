import  { useEffect, } from 'react';
import { useUser,SignedIn, SignInButton, SignUpButton, SignedOut, UserButton, UserProfile} from '@clerk/clerk-react';
import { Navigate, useNavigate } from 'react-router-dom';
import image1 from "../assets/penny-counter.jpg";

const Auth = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();


  useEffect(()=> {
  if(isSignedIn){
    navigate('/');
  }

}, [isSignedIn, navigate]);
  return (
    <>
    <div className="sign-in-container" >
      <SignedOut>
        <SignUpButton mode="modal"/>
        <SignInButton mode="modal" />
        
      </SignedOut>
      
      <SignedIn>
       <Navigate to="/" />
      </SignedIn>
    </div>
    <div className="image">
    <img src={image1} alt="Electronic Penny Counter" />
    </div>
    </>
  )
}

export default Auth;
