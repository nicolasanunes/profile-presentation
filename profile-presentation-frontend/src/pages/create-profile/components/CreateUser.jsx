import { useEffect, useState } from "react"

const CreateUser = () => {

  const [fullName, setFullName] = useState('');
  const [birth, setBirth] = useState('');
  const [address, setAddress] = useState('');
  const [academicEducation, setAcademicEducation] = useState('');
  const [hardSkills, setHardSkills] = useState('');
  const [softSkills, setSoftSkills] = useState('');
  const [formData, setFormData] = useState({});

  const resetForm = () => {
    setFullName(''),
    setBirth(''),
    setAddress(''),
    setAcademicEducation(''),
    setHardSkills(''),
    setSoftSkills('')
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      fullName,
      birth,
      address,
      academicEducation,
      hardSkills,
      softSkills
    }

    setFormData(data);
    resetForm();
  }

  useEffect(() => {
    if(Object.keys(formData).length > 0) {
      fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error(error));
    }
  }, [formData]);

  return (
    <div className="create-user">
        <h2>Criar usuário:</h2>
        <form onSubmit={handleSubmit}>
          <p>Nome:</p>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder='Digite o nome completo' />
          <p>Data de nascimento:</p>
          <input type="text" value={birth} onChange={(e) => setBirth(e.target.value)} placeholder='Digite a data de nascimento' />
          <p>Endereço:</p>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Digite o endereço' />
          <p>Formação:</p>
          <input type="text" value={academicEducation} onChange={(e) => setAcademicEducation(e.target.value)} placeholder='Digite a formação' />
          <p>Hard skills:</p>
          <input type="text" value={hardSkills} onChange={(e) => setHardSkills(e.target.value)} placeholder='Digite as hard skills' />
          <p>Soft skills:</p>
          <input type="text" value={softSkills} onChange={(e) => setSoftSkills(e.target.value)} placeholder='Digite as soft skills' />
          <button type='submit'>Criar usuário</button>
        </form>
      </div>
  )
}

export default CreateUser