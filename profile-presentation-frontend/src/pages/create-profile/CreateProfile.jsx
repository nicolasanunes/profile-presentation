import { useNavigate } from 'react-router-dom';
import '../../App.css'
import CreateUser from './components/CreateUser'

function CreateProfile() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  }

  return (
    <div>
      <div className="navbar">
        <button onClick={handleClick}>Página inicial</button>
      </div>
      <div className="app-create-profile">
        <CreateUser />
      </div>
    </div>
    
  )
}

export default CreateProfile