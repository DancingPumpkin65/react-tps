import React, { useState, Component } from "react";

class LoginForm extends Component {
  state = {
    name: "",
    errorMessages: {},
    isSubmitted: false,
  };

  database = [
    { username: "user1", password: "pass1" },
    { username: "user2", password: "pass2" },
  ];

  errors = {
    uname: "Votre identifiant est incorrect.",
    upass: "Votre mot de passe est incorrect.",
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { uname, upass } = event.target.elements;
    const userData = this.database.find((user) => user.username === uname.value);

    if (userData) {
      if (userData.password !== upass.value) {
        this.setState({ errorMessages: { name: "upass", message: this.errors.upass } });
      } else {
        this.setState({ isSubmitted: true, name: uname.value });
      }
    } else {
      this.setState({ errorMessages: { name: "uname", message: this.errors.uname } });
    }
  };

  renderErrorMessage = (name) =>
    name === this.state.errorMessages.name && <div className="error">{this.state.errorMessages.message}</div>;

  render() {
    return (
      <div>
        {this.state.isSubmitted ? (
          <div>Utilisateur {this.state.name} est connecté!</div>
        ) : (
          <div className="login-form">
            <h2>Connexion</h2>
            <form onSubmit={this.handleSubmit}>
              <div className="input-container">
                <label>L'identifiant</label>
                <input type="text" name="uname" required />
                {this.renderErrorMessage("uname")}
              </div>
              <div className="input-container">
                <label>Mot de passe</label>
                <input type="password" name="upass" required />
                {this.renderErrorMessage("upass")}
              </div>
              <div className="button-container">
                <input type="submit" value="Se connecter" />
              </div>
            </form>
            <button onClick={this.props.switchToInscription}>S'inscrire</button>
          </div>
        )}
      </div>
    );
  }
}

class InscriptionForm extends Component {
  state = {
    formData: {
      nom: "",
      prenom: "",
      password: "",
      confirmPassword: "",
      birthdate: "",
      anneeScolaire: "1er année",
      abonnement: "Standard",
      matieres: [],
      commentaire: "",
    },
    isSubmitted: false,
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: { ...prevState.formData, [name]: value },
    }));
  };

  handleMatieresChange = (e) => {
    const { value, checked } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        matieres: checked
          ? [...prevState.formData.matieres, value]
          : prevState.formData.matieres.filter((matiere) => matiere !== value),
      },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { formData } = this.state;
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    this.props.addUser({
      username: formData.nom,
      password: formData.password,
      prenom: formData.prenom,
      birthdate: formData.birthdate,
      anneeScolaire: formData.anneeScolaire,
      abonnement: formData.abonnement,
      matieres: formData.matieres,
      commentaire: formData.commentaire,
    });
    this.setState({ isSubmitted: true });
  };

  formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  render() {
    const { formData, isSubmitted } = this.state;
    const { switchToLogin } = this.props;
    return (
      <div className="form-container">
        {!isSubmitted ? (
          <form onSubmit={this.handleSubmit}>
            <h2>Inscription</h2>
            <div className="form-group">
              <label>Nom</label>
              <input type="text" name="nom" required onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <label>Prénom</label>
              <input type="text" name="prenom" required onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <label>Mot de passe</label>
              <input type="password" name="password" required onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <label>Confirmer le mot de passe</label>
              <input type="password" name="confirmPassword" required onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <label>Date de naissance</label>
              <input type="date" name="birthdate" required onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <label>Année scolaire</label>
              <select name="anneeScolaire" value={formData.anneeScolaire} onChange={this.handleInputChange}>
                <option value="1er année">1er année</option>
                <option value="2ème année">2ème année</option>
              </select>
            </div>
            <div className="form-group">
              <label>Abonnement</label>
              <div className="radio-group">
                <label>
                  <input type="radio" name="abonnement" value="Standard" checked={formData.abonnement === "Standard"} onChange={this.handleInputChange} />
                  Standard
                </label>
                <label>
                  <input type="radio" name="abonnement" value="Premium" checked={formData.abonnement === "Premium"} onChange={this.handleInputChange} />
                  Premium
                </label>
              </div>
            </div>
            <div className="form-group">
              <label>Matières</label>
              <div className="checkbox-group">
                {["ReactJS", "Python", "Methodologie SCRUM"].map((matiere) => (
                  <label key={matiere}>
                    <input
                      type="checkbox"
                      value={matiere}
                      checked={formData.matieres.includes(matiere)}
                      onChange={this.handleMatieresChange}
                    />
                    {matiere}
                  </label>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Commentaire</label>
              <textarea name="commentaire" onChange={this.handleInputChange}></textarea>
            </div>
            <button type="submit">Confirmer</button>
          </form>
        ) : (
          <div className="success-message">
            <h2>Inscription réussie !</h2>
            <p>
              Je suis {formData.nom} {formData.prenom} né le {this.formatDate(formData.birthdate)} en {formData.anneeScolaire}
              {formData.matieres.length > 0 && " et mes matières sont : "}
              {formData.matieres.join(", ")}
            </p>
            <p>Abonnement : {formData.abonnement}</p>
            <p>Commentaire : {formData.commentaire}</p>
            <button onClick={switchToLogin}>Retour à la connexion</button>
          </div>
        )}
      </div>
    );
  }
}

const AuthForm = () => {
  const [currentForm, setCurrentForm] = useState("login");
  const [database, setDatabase] = useState([
    { username: "user1", password: "pass1" },
    { username: "user2", password: "pass2" },
  ]);

  const switchToInscription = () => setCurrentForm("inscription");
  const switchToLogin = () => setCurrentForm("login");

  const addUser = (user) => {
    setDatabase((prevDatabase) => [...prevDatabase, user]);
  };

  return (
    <div>
      {currentForm === "login" ? (
        <LoginForm switchToInscription={switchToInscription} />
      ) : (
        <InscriptionForm switchToLogin={switchToLogin} addUser={addUser} />
      )}
    </div>
  );
};

export default AuthForm;
