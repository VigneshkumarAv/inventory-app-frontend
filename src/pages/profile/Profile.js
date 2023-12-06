import React, { useEffect, useState } from 'react'
import './Profile.scss'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { useDispatch } from 'react-redux';
import { getUser } from '../../services/authService';
import { SET_NAME, SET_USER } from '../../redux/features/auth/authSlice';
import { SpinnerImg } from '../../components/loader/Loader';
import Card from '../../components/card/Card';
import { Link } from 'react-router-dom';

const Profile = () => {
    useRedirectLoggedOutUser("/login");
    const [profile, setProfile] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();
    
    useEffect(() => {
      setIsLoading(true);
      async function getUserData() {
        const data = await getUser();
        console.log(data);
        setProfile(data);
        await dispatch(SET_USER(data));
        await dispatch(SET_NAME(data.name));
        setIsLoading(false);
      }
      getUserData();
    }, [dispatch])
    

    return (
    <div className='profile --my2'>
      {isLoading && <SpinnerImg/>}
      <>
      {(!isLoading && profile === null) ? (<p>Something went wrong, Please reload Page</p>):
      (<Card cardClass="card --flex-dir-column">
        <span class="profile-photo">
            <img style={{width:"100%"}} src={profile?.photo} alt="profile pic"/>
        </span>
        <span class="profile-data">
            <p>
                <b>Name: </b> {profile?.name}
            </p>
            <p>
                <b>Email: </b> {profile?.email}
            </p>
            <p>
                <b>Phone: </b> {profile?.phone}
            </p>
            <p>
                <b>Bio: </b> {profile?.bio}
            </p>
            <div>
                <Link to="/edit-profile">
                    <button className='--btn --btn-primary'>Edit Profile</button>
                </Link>
            </div>

        </span>
      </Card>)}
      </>
    </div>
  )
}

export default Profile
