export const handleValidation = (text) => {
  if (typeof text !== 'string') {
    console.error('Invalid input: text is not a string');
    return;
  }

  if (text.trim() === '') {
    alert('Veuillez entrer du texte.');
  } else {
    alert('Texte validé : ' + text.trim());
  }
};