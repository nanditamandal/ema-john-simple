import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

function Login() {

  const [userAdd,  setUserAdd]=useState(false);

  const [logInUser, setLogInUser]= useContext(UserContext);

 

  const [user, setUser]=useState({
    isSignedIn: false,
    name: '', 
    email:'',
    photo:'',
    password:'',
    error:'',
    success: false
  })

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };


  const provider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const clicksHandler = ()=>{
     firebase.auth().signInWithPopup(provider)
     .then(result =>{
       const {email, photoURL, displayName}=result.user;
       const signedInUser ={
         isSignedIn: true,
         name: displayName,
         email: email,
         photo: photoURL
       }
       setUser(signedInUser);
        console.log(email, photoURL, displayName);
     })
     .catch((err)=>{
       console.log(err);
       console.log(err.message);
     })
      
    
  }
  const handleFacebook=()=>{
    firebase.auth().signInWithPopup(fbProvider)
    .then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }
  const handelSignOut=()=>{
    console.log("sign out");
    firebase.auth().signOut()
    .then(function(res) {
      const signOutUser = {
      isSignedIn:false,
      name: '',
      email:'',
      photo:''
    }
    setUser(signOutUser);
    
    })
    .catch(function(error) {
      console.log("sign out");
    });
  }


 
  const handelSubmit=(e)=>{
    if(userAdd && user.email && user.password)
    {
      firebase.auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(res=>{
        let newUser={...user};
        newUser.error ='';
        newUser.success = true;
        setUser(newUser);
        updateUserName(user.name);
      
       })
      .catch((error)=> {
        var errorMessage = error.message;
        let newUser={...user};
        newUser.error=errorMessage;
        newUser.success = false;
        setUser( newUser);
        console.log(errorMessage);
   });
      console.log("user error",user.error)
    }
    if(!userAdd && user.email && user.password)
    {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(res=>{
        
        let newUser={...user};
        newUser.error =''; 
        newUser.success = true;
        setUser(newUser);
        setLogInUser(newUser);
        history.replace(from);
        console.log(newUser)

      })
      .catch(function(error) {
        
        var errorMessage = error.message;
        let newUser={...user};
        newUser.error=errorMessage;
        newUser.success = false;
        setUser( newUser);
       
        console.log(errorMessage);
      });
   }
      
    

    e.preventDefault();

  }
  console.log("user email",logInUser);
  const updateUserName= name=>{
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
      
    }).then(function() {
      console.log("user name update successfully",name);
    }).catch(function(error) {
      console.log(error);
    });
  }

  const handelBlur=(e)=>{
    let isFormValid;
    if(e.target.name === 'email')
    {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isFormValid= re.test(e.target.value.toLowerCase());
      console.log(isFormValid);

    }
    if(e.target.name === 'password')
    {
      const pass =e.target.value.length>6;
      const passNumber=/\d{1}/.test(e.target.value);

      isFormValid=pass && passNumber ;
    }
    if(e.target.name === 'name')
    {

      isFormValid= true;
    }
    if(isFormValid)
    {
      let newUser= {...user};
      newUser[e.target.name]=e.target.value;
      setUser(newUser);
    }
    console.log(e.target.name, e.target.value);
  

  }

  return (
    <div style={{textAlign: 'center'}}>
    
      {
        user.isSignedIn ?<button onClick={handelSignOut}>Sign out</button> : <button onClick={clicksHandler}>Sign in</button>
      }
      <button onClick={handleFacebook}>Sign in with Facebook </button>
     
     {
       user.isSignedIn && <div>
         <p>Welcome, {user.name}</p>
         <p>your email: {user.email}</p>
         <img style={{border:'2px solid black', borderRadius:'50px'}} src={user.photo} alt="no img"/>
         </div>
     }

      <form onSubmit={handelSubmit}>
        <h1>log in form </h1>
       
        <input type="checkbox" onChange={()=>setUserAdd(!userAdd)} name="userAdd" id=""/>
        <label htmlFor="userAdd">New user</label><br/>
          {userAdd &&   <input type="text" name="name" id="" onBlur={handelBlur} placeholder="enter name" />}
     
        <br/>
        <input type="text" name="email" id="" onBlur={handelBlur} placeholder="enter email" required/>
        <br/>
        <input type="password" name="password"  onBlur={handelBlur} placeholder="Enter password" required/>  <br/>
        <input type="submit"value={userAdd ? "sing up": "sign in"}/>
      </form>
        <p style={{color: 'red'}}>{user.error}</p>
        {
          user.success &&  <p style={{color: 'green'}}>User {userAdd? 'sing up' :'sign in'} successFully </p>
        }
    </div>
  );
}

export default Login;
