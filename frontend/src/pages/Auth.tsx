import  { useEffect, } from 'react';
import { useUser,SignedIn, SignInButton, SignUpButton, SignedOut, UserButton, UserProfile} from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();


  useEffect(()=> {
  if(isSignedIn){
    navigate('/');
  }

}, [isSignedIn, navigate]);
  return (
    <div className="sign-in-container" >
      <SignedOut>
        <SignUpButton mode="modal"/>
        <SignInButton mode="modal" />
      </SignedOut>

      <SignedIn>
        <UserButton/>
      </SignedIn>
    </div>
  )
}

export default Auth;
