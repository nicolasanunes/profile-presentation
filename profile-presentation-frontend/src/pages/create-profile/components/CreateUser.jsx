import { useEffect, useRef, useState } from 'react'

const CreateUser = () => {

  const [formData, setFormData] = useState({
    avatar: {
      preview: null,
      data: null
    },
    fullName: '',
    birth: '',
    address: '',
    academicEducation: '',
    hardSkills: '',
    softSkills: '',
  });

  const avatarInputRef = useRef(null);

  const handleAvatarUpdate = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      avatar: {
        preview: URL.createObjectURL(file),
        data: file
      }
    });
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const resetForm = () => {
    setFormData({
      avatar: {
        preview: null,
        data: null
      },
      fullName: '',
      birth: '',
      address: '',
      academicEducation: '',
      hardSkills: '',
      softSkills: '',
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append('avatar', formData.avatar.data);
    formDataObj.append('fullName', formData.fullName);
    formDataObj.append('birth', formData.birth);
    formDataObj.append('address', formData.address);
    formDataObj.append('academicEducation', formData.academicEducation);
    formDataObj.append('hardSkills', formData.hardSkills);
    formDataObj.append('softSkills', formData.softSkills);

    fetch('http://localhost:3000/user', {
      method: 'POST',
      body: formDataObj
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));

    avatarInputRef.current.value = '';
    resetForm();
  }

  useEffect(() => {
    return () => {
      if (formData.avatar.preview) {
        URL.revokeObjectURL(formData.avatar.preview);
      }
    };
  }, [formData.avatar.preview]);

  return (
    <div className="create-user">
        <h2>Criar usuário:</h2>
        <form onSubmit={handleSubmit}>
          <p>Imagem do perfil:</p>
          <input type="file" name="avatar" ref={avatarInputRef} onChange={handleAvatarUpdate} />
          <div className="display-avatar">
              <img src={formData.avatar.preview} className="avatar-preview"/>
          </div>
          <p>Nome:</p>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder='Digite o nome completo' />
          <p>Data de nascimento:</p>
          <input type="text" name="birth" value={formData.birth} onChange={handleInputChange} placeholder='Digite a data de nascimento' />
          <p>Endereço:</p>
          <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder='Digite o endereço' />
          <p>Formação:</p>
          <input type="text" name="academicEducation" value={formData.academicEducation} onChange={handleInputChange} placeholder='Digite a formação' />
          <p>Hard skills:</p>
          <input type="text" name="hardSkills" value={formData.hardSkills} onChange={handleInputChange} placeholder='Digite as hard skills' />
          <p>Soft skills:</p>
          <input type="text" name="softSkills" value={formData.softSkills} onChange={handleInputChange} placeholder='Digite as soft skills' />
          <button type='submit'>Criar usuário</button>
        </form>
      </div>
  )
}

export default CreateUser