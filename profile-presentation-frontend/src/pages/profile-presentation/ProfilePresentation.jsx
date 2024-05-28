import '../../App.css'
import { useEffect, useState } from 'react';
import ProfilePicture from './components/ProfilePicture'
import ProfileDescription from './components/ProfileDescription'
import { useNavigate } from 'react-router-dom';

function ProfilePresentation() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/create-profile');
  }

  useEffect(() => {
    fetch('http://localhost:3000/user')
    .then(res => res.json())
    .then(data => setData(data));
  }, []);

  return (
    <div>
      <div className="navbar">
        <button onClick={handleClick}>Criar perfil</button>
      </div>
      {data.map((profile) => (
        <div className="app-profile-presentation" key={profile.id}>
        <ProfilePicture profile={profile}/>
        <ProfileDescription profile={profile}/>
      </div>
      ))}
    </div>
  )
}

export default ProfilePresentation