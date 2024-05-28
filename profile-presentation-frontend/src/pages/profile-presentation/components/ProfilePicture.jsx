import { useEffect, useState } from "react"

const ProfilePicture = ({ profile }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3000/uploads/${profile.avatar}`)
    .then(response => response.blob())
    .then(blob => {
      const imageUrl = URL.createObjectURL(blob);
      setImageUrl(imageUrl);
    })
    .catch(error => console.error(error));
  }, []);

  return (
    <div className="profile-picture">
      <div className="profile-avatar">
        {imageUrl !== '' ? 
        <img src={imageUrl} alt="avatar-image" className="avatar-picture" /> : 
        <img src="./src/assets/img/default-avatar.jpg" alt="avatar-image" className="avatar-picture" />}
      </div>
    </div>
  )
}

export default ProfilePicture