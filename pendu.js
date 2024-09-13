
let api = "https://trouve-mot.fr/api";
let word = "";


// fonctions asynchrones pour recuperer un mot de l'api
async function generateWord(api) {
    let level = document.getElementById("niveau").value;
    console.log(level);
    let cat = document.getElementById("categorie");
    let button = document.getElementById('button');
    button.innerHTML = "générer un nouveau mot";
    let texte = document.getElementById("texte");
    // requete fetch pour recup le mot et le convertir en json
    // let reponse = await fetch(api + "/sizemax/4/10");
    let reponse = await fetch(api + "/size/" + level + "/10");

    let mot = await reponse.json();
    console.log(mot);
    let arrayMot = [];
    // boucle pour ne recupere que la liste des mots sans leur catégories afin de les envoyer dans un array
    for (let i = 0; i < mot.length; i++) {
        arrayMot.push(mot[i].name);
    }
    // pour choisir un mot au hasard parmi la liste de mot recup de l'api
    randomWord = `${arrayMot[Math.floor(Math.random()*arrayMot.length)]}`;
    // pour recup la catégorie qui correspond au mot choisi
    cat.innerHTML = `Le mot appartient à la catégorie ${mot[arrayMot.indexOf(randomWord)].categorie}`;
    // pour enlever les accents et mettre en majuscule
    word = randomWord.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    console.log(word);
    texte.innerHTML = "";
    // pour masquer le mot et l'afficher dans le html
    for (let i = 0; i < word.length; i++) {
        if (word[i] === "-") {
            texte.innerHTML += "- ";
        } else {
        texte.innerHTML += `_ `;
        }
    }
        document.getElementById("check").style.visibility = "visible";
    return word, texte.innerHTML;
}



// fonction pour vérifier les input de l'user
function verify(word) {
    let letter = document.getElementById("input").value.toUpperCase();
    let reponse = document.getElementById("reponse");
    console.log(letter);
    let texte = document.getElementById("texte");
    let newText = "";
    // condition si le mot contient la valeur inscrite dans l'input
    if (word.includes(letter)) {
        // boucle pour parcourir toutes les lettres du mot
        for (var i = 0; i < word.length; i++) {
            // si le caractéres correspond à la lettre entrée dans l'input, remplace le tiret par la lettre
                    if (word[i] === letter){
                        newText += word[i];
                        newText += " ";
                        // sinon laisse le tiret
                    } else {
                        newText += texte.innerHTML[i*2];
                        newText += texte.innerHTML[i*2+1];
                    }
                }
            reponse.innerHTML = `félicitations, la lettre ${letter} fait partie du mot .`
        
        } else {
            newText = texte.innerText;
            reponse.innerHTML = `Malheuresement la lettre ${letter} ne fait pas partie du mot .`
        }
    texte.innerHTML = newText;
    document.getElementById("input").value = "";
    console.log(texte.innerText + " = " + word);
    if (texte.innerText.replace(/\s/g, "") === word.toUpperCase()) {
        reponse.innerHTML = `vous avez trouvé le mot BRAVOOO`;
    }
}



