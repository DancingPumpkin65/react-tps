import React, { useState, Component } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 5px;
`;

const SuccessMessage = styled.div`
  color: green;
  margin-top: 5px;
`;

class LoginForm extends Component {
  state = {
    name: "",
    errorMessages: {},
    isSubmitted: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { uname, upass } = event.target.elements;
    const userData = this.props.database.find((user) => user.username === uname.value);

    if (userData) {
      if (userData.password !== upass.value) {
        this.setState({ errorMessages: { name: "upass", message: "Votre mot de passe est incorrect." } });
      } else {
        this.setState({ isSubmitted: true, name: uname.value });
      }
    } else {
      this.setState({ errorMessages: { name: "uname", message: "Votre identifiant est incorrect." } });
    }
  };

  renderErrorMessage = (name) =>
    name === this.state.errorMessages.name && <ErrorMessage>{this.state.errorMessages.message}</ErrorMessage>;

  render() {
    return (
      <FormContainer>
        {this.state.isSubmitted ? (
          <SuccessMessage>Utilisateur {this.state.name} est connect</SuccessMessage>
        ) : (
          <div className="login-form">
            <h2>Connexion</h2>
            <form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label>L'identifiant</Label>
                <Input type="text" name="uname" required />
                {this.renderErrorMessage("uname")}
              </FormGroup>
              <FormGroup>
                <Label>Mot de passe</Label>
                <Input type="password" name="upass" required />
                {this.renderErrorMessage("upass")}
              </FormGroup>
              <Button type="submit">Se connecter</Button>
            </form>
            <Button onClick={this.props.switchToInscription}>S'inscrire</Button>
          </div>
        )}
      </FormContainer>
    );
  }
}

class InscriptionForm extends Component {
  state = {
    formData: {
      username: "",
      nom: "",
      prenom: "",
      password: "",
      confirmPassword: "",
      birthdate: "",
      anneeScolaire: "1er annee",
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
    this.props.addUser(formData);
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
      <FormContainer>
        {!isSubmitted ? (
          <form onSubmit={this.handleSubmit}>
            <h2>Inscription</h2>
            <FormGroup>
              <Label>Nom d'utilisateur</Label>
              <Input type="text" name="username" required onChange={this.handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label>Nom</Label>
              <Input type="text" name="nom" required onChange={this.handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label>Prenom</Label>
              <Input type="text" name="prenom" required onChange={this.handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label>Mot de passe</Label>
              <Input type="password" name="password" required onChange={this.handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label>Confirmer le mot de passe</Label>
              <Input type="password" name="confirmPassword" required onChange={this.handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label>Date de naissance</Label>
              <Input type="date" name="birthdate" required onChange={this.handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label>Année scolaire</Label>
              <select name="anneeScolaire" value={formData.anneeScolaire} onChange={this.handleInputChange}>
                <option value="1er annee">1er annee</option>
                <option value="2eme annee">2eme annee</option>
              </select>
            </FormGroup>
            <FormGroup>
              <Label>Abonnement</Label>
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
            </FormGroup>
            <FormGroup>
              <Label>Matières</Label>
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
            </FormGroup>
            <FormGroup>
              <Label>Commentaire</Label>
              <TextArea name="commentaire" onChange={this.handleInputChange}></TextArea>
            </FormGroup>
            <Button type="submit">Confirmer</Button>
          </form>
        ) : (
          <SuccessMessage>
            <h2>Inscription réussie !</h2>
            <p>
              Je suis {formData.nom} {formData.prenom} né le {this.formatDate(formData.birthdate)} en {formData.anneeScolaire}
              {formData.matieres.length > 0 && " et mes matieres sont : "}
              {formData.matieres.join(", ")}
            </p>
            <p>Abonnement : {formData.abonnement}</p>
            <p>Commentaire : {formData.commentaire}</p>
            <Button onClick={switchToLogin}>Retour a la connexion</Button>
          </SuccessMessage>
        )}
      </FormContainer>
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
        <LoginForm switchToInscription={switchToInscription} database={database} />
      ) : (
        <InscriptionForm switchToLogin={switchToLogin} addUser={addUser} />
      )}
    </div>
  );
};

export default AuthForm;