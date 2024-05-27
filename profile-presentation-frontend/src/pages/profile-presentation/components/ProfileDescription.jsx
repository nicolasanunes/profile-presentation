const ProfileDescription = ({ profile }) => {
  return (
    <div className="profile-description">
      <h1>Descrição</h1>
      <p><b>Nome: </b>{profile.fullName}</p>
      <p><b>Data de Nascimento: </b>{profile.birth}</p>
      <p><b>Endereço: </b>{profile.address}</p>
      <p><b>Formação: </b>{profile.academicEducation}</p>
      <p><b>Hard Skills: </b>{profile.hardSkills}</p>
      <p><b>Soft Skills: </b>{profile.softSkills}</p>
    </div>
  )
}

export default ProfileDescription