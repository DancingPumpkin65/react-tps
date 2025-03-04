import React, { useState } from 'react';

const InscriptionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    birthdate: '',
    city: 'Casablanca',
    gender: '',
    hobbies: [],
    photo: null
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleHobbiesChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      hobbies: checked 
        ? [...prev.hobbies, value] 
        : prev.hobbies.filter(hobby => hobby !== value)
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      photo: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="form-container">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <h1>Inscription</h1>

          <div className="form-group">
            <label>L'identifiant</label>
            <input 
              type="text" 
              name="name" 
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <input 
              type="password" 
              name="password" 
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Date de naissance</label>
            <input 
              type="date" 
              name="birthdate" 
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Ville</label>
            <select 
              name="city" 
              value={formData.city}
              onChange={handleInputChange}
            >
              <option value="Casablanca">Casablanca</option>
            </select>
          </div>

          <div className="form-group">
            <label>Genre</label>
            <div className="radio-group">
              <label>
                <input 
                  type="radio" 
                  name="gender" 
                  value="Homme"
                  onChange={handleInputChange}
                />
                Homme
              </label>
              <label>
                <input 
                  type="radio" 
                  name="gender" 
                  value="Femme"
                  onChange={handleInputChange}
                />
                Femme
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Loisirs</label>
            <div className="checkbox-group">
              {['Sport', 'Lecture', 'Musique'].map(hobby => (
                <label key={hobby}>
                  <input 
                    type="checkbox" 
                    value={hobby}
                    checked={formData.hobbies.includes(hobby)}
                    onChange={handleHobbiesChange}
                  />
                  {hobby}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Photo</label>
            <input 
              type="file" 
              onChange={handleFileChange}
            />
          </div>

          <button type="submit">S'inscrire</button>
        </form>
      ) : (
        <div className="success-message">
          <h2>Inscription réussie !</h2>
          <p>
            Je suis {formData.name} né le {formatDate(formData.birthdate)} à {formData.city}
            {formData.hobbies.length > 0 && ' et mes loisirs sont : '}
            {formData.hobbies.join(', ')}
          </p>
          {formData.photo && (
            <p>Photo : {formData.photo.name}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default InscriptionForm;