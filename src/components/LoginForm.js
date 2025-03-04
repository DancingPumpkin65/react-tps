import React, { useState } from "react";

const LoginForm = () => {
  const [name, setName] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const database = [
    { username: "user1", password: "pass1" },
    { username: "user2", password: "pass2" },
  ];

  const errors = {
    uname: "Votre identifiant est incorrect.",
    upass: "Votre mot de passe est incorrect.",
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { uname, upass } = event.target.elements;

    const userData = database.find((user) => user.username === uname.value);

    if (userData) {
      if (userData.password !== upass.value) {
        setErrorMessages({ name: "upass", message: errors.upass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = (
    <div className="login-form">
      <div className="title">Connexion</div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>L'identifiant</label>
            <input type="text" name="uname" required />
            {renderErrorMessage("uname")}
          </div>
          <div className="input-container">
            <label>Mot de passe</label>
            <input type="password" name="upass" required />
            {renderErrorMessage("upass")}
          </div>
          <div className="button-container">
            <input type="submit" value="Se connecter" />
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div>
      {isSubmitted ? (
        <div>Utilisateur {name} est connecté!</div>
      ) : (
        renderForm
      )}
    </div>
  );
};

export default LoginForm;