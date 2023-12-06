import React, { useEffect, useState } from 'react'
import './Profile.scss'
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';
import Card from '../../components/card/Card';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateUser } from '../../services/authService';
import ChangePassword from '../../components/changePassword/ChangePassword';

const EditProfile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const {email} = user;

    const initialState = {
        name: user?.name,
        email: user?.email,
        bio: user?.bio,
        phone: user?.phone,
        photo: user?.photo,

    }
    const [profile, setProfile] = useState(initialState);
    const [profileImage, setProfileImage] = useState("");

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProfile({...profile, [name]: value})
    }

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0]);
    }

    useEffect(() => {
      if(!email){
        navigate("/profile");
      }
    }, [email, navigate])
    

    const saveProfile = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            //Handle image upload
            let imageURL;
            if((profileImage) &&(
                (profileImage.type === "image/jpeg") ||
                (profileImage.type === "image/jpg") ||
                (profileImage.type === "image/png"))){
                    const image = new FormData();
                    image.append("file",profileImage)
                    image.append("cloud_name","dvqtnaff8")
                    image.append("upload_preset","u8hjlcsj")
                    //First save image to cloudinary
                    const response = await fetch("https://api.cloudinary.com/v1_1/dvqtnaff8/image/upload",
                    {method: "post", body: image});
                    const imgData = await response.json(); // this willl contain cloudinary image url
                    imageURL = imgData.url.toString();
                }
                    //Save Profile
                    const formData = {
                        name: profile?.name,
                        phone: profile?.phone,
                        bio: profile?.bio,
                        photo: profileImage ? imageURL : profile?.photo,
                    }
                    const data = await updateUser(formData);
                    console.log(data);
                    toast.success("User Updated");
                    setIsLoading(false);
                    navigate("/profile");
            
        } catch (error) {
            isLoading(false);
            toast.error(error.message)
        }
    }

    return (
    <div className='profile --my2'>
      {isLoading && <Loader/>}
      <Card cardClass="card --flex-dir-column">
        <span class="profile-photo">
            <img style={{width:"100%"}} src={user?.photo} alt="profile pic"/>
        </span>
        <form className='form-control --m' onSubmit={saveProfile}>
        <span class="profile-data">
            <p>
                <label>Name: </label>
                <input type="text" name="name" value={profile?.name} onChange={(e)=>handleInputChange(e)}/>
            </p>
            <p>
                <label>Email: </label>
                <input type="text" name="email" value={profile?.email} disabled/>
                <br/>
                <code>Email cannot be changed.</code>
            </p>
            <p>
                <label>Phone: </label>
                <input type="text" name="phone" value={profile?.phone} onChange={(e)=>handleInputChange(e)}/>
            </p>
            <p>
                <label>Bio: </label>
                <textarea name="bio" value={profile?.bio} onChange={(e)=>handleInputChange(e)} cols={"30"} rows={"10"}>
                </textarea>
            </p>
            <p>
                <label>Photo: </label>
                <input type="file" name="image" onChange={(e)=>handleImageChange(e)}/>
            </p>
            <div>
                    <button className='--btn --btn-primary'>Save Changes</button>
            </div>

        </span>
        </form>
      </Card>
      <br/>
      <ChangePassword/>
    </div>
  )
}

export default EditProfile
