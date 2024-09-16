let api = "https://trouve-mot.fr/api";
let word = "";
let nbErreur = 0;

// fonctions asynchrones pour recuperer un mot de l'api
async function generateWord(api) {
  let level = document.getElementById("niveau").value;
  let cat = document.getElementById("categorie");
  let button = document.getElementById("button");
  button.innerHTML = "générer un nouveau mot";
  let texte = document.getElementById("texte");
  // requete fetch pour recup le mot et le convertir en json
  // let reponse = await fetch(api + "/size/" + level + "/10");
  let reponse = await fetch(api + "/size/" + level + "/10");

  let mot = await reponse.json();
  console.log(mot);
  let arrayMot = [];
  // boucle pour ne recupere que la liste des mots sans leur catégories afin de les envoyer dans un array
  for (let i = 0; i < mot.length; i++) {
    arrayMot.push(mot[i].name);
  }
  // pour choisir un mot au hasard parmi la liste de mot recup de l'api
  randomWord = `${arrayMot[Math.floor(Math.random() * arrayMot.length)]}`;
  // pour recup la catégorie qui correspond au mot choisi
  cat.innerHTML = `Le mot appartient à la catégorie ${
    mot[arrayMot.indexOf(randomWord)].categorie
  }`;
  // pour enlever les accents et mettre en majuscule
  word = randomWord
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
  console.log(word);
  texte.innerHTML = "";
  // pour masquer le mot et l'afficher dans le html
  for (let i = 0; i < word.length; i++) {
    if (word[i] === "-") {
      texte.innerHTML += "- ";
    } else {
      texte.innerHTML += `*`;
    }
  }
  document.getElementById("check").style.visibility = "visible";
  document.getElementById("reponse").innerHTML = "";
  nbErreur = 0;
  document.getElementById("input").value = "";
  return word, texte.innerHTML;
}

// fonction pour vérifier les input de l'user
function verify(word) {
  let letter = document.getElementById("input").value.toUpperCase();
  let reponse = document.getElementById("reponse");
  console.log(letter);
  let texte = document.getElementById("texte");
  let img = document.getElementById("img");
  let newText = "";
  if (nbErreur > 0) {
    document.getElementById("img").style.visibility = "visible";
  }
  // condition si le mot contient la valeur inscrite dans l'input
  if (nbErreur < 11) {
    if (word.includes(letter)) {
      // boucle pour parcourir toutes les lettres du mot
      for (var i = 0; i < word.length; i++) {
        // si le caractéres correspond à la lettre entrée dans l'input, remplace le tiret par la lettre
        if (word[i] === letter) {
          newText += word[i];
        } else {
          newText += texte.innerHTML[i];
        }
      }
      reponse.innerHTML = `félicitations, la lettre ${letter} fait partie du mot .`;
      nbErreur = nbErreur;
    } else {
      newText = texte.innerText;
      nbErreur += 1;
      img.src = "images/pendu" + nbErreur + ".png";
      reponse.innerHTML = `Malheuresement la lettre ${letter} ne fait pas partie du mot .`;
    }
    console.log(nbErreur);
    texte.innerHTML = newText;
    document.getElementById("input").value = "";
    console.log(texte.innerText + " = " + word);
    if (texte.innerText === word.toUpperCase()) {
      reponse.innerHTML = `vous avez trouvé le mot en faisant ${nbErreur} erreur BRAVOOO`;
      document.getElementById("check").style.visibility = "hidden";
    }
  } else {
    texte.innerHTML = word;
    reponse.innerHTML = `Malheuresement vous avez fait plus de 10 erreur, la partie est finie`;
    document.getElementById("check").style.visibility = "hidden";
  }
}

function reset() {
  document.getElementById("img").style.visibility = "hidden";
}
