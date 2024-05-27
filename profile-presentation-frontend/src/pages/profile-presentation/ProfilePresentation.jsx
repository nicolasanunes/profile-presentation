import '../../App.css'
import { useEffect, useState } from 'react';
import ProfilePicture from './components/ProfilePicture'
import ProfileDescription from './components/ProfileDescription'

function ProfilePresentation() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/user')
    .then(res => res.json())
    .then(data => setData(data));
  }, []);

  return (
    <div>
    {data.map((profile) => (
      <div className="app-profile-presentation" key={profile.id}>
      <ProfilePicture />
      <ProfileDescription profile={profile}/>
    </div>
    ))}
    </div>
  )
}

export default ProfilePresentation