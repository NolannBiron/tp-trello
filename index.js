#!/usr/bin/env node

const program = require('commander')
const inquirer = require('inquirer')
const request = require('request')
const Trello = require('trello')
var trello = new Trello("ac61d8974aa86dd25f9597fa651a2ed8", "aeff492b0b2f12b8f505eb5c89d3f4a37c76188f40474969a648d91c9d197688");
var myListId = '5ab03d593eb7b0d0dfc95dc7';

program
.option('-a, --addcard', 'Ajouter une carte')
.option('-g, --listcards', 'Lister les cartes de la liste')
.option('-l, --addlists', 'Ajouter une liste a la board')

program.parse(process.argv)

if (program.addcard) {
  inquirer.prompt([
    {
     type: 'input',
     message: 'Entrez le nom de la carte',
     name: 'cardname'
   },{
     type: 'input',
     message: 'Entrez une description pour la carte',
     name: 'carddesc'
   }
 ]).then((answers) => {
   //on ajoute la carte après récupération des réponses
    trello.addCard(answers.cardname, answers.carddesc, myListId,
        function (error, trelloCard) {
            if (error) {
                console.log("Erreur lors de l'ajout de la carte", error);
            }
            else {
                console.log('La carte a bien été ajouté');
            }
        });
      });
}else if(program.listcards){
  trello.getCardsOnList(myListId,
      function(error, trelloCard) {
        if(error){
          console.log("Erreur", error);
        }
        else{
          console.log(trelloCard);
        }
      });
}
else if (program.addlists) {
  trello.getCardsForList(myListId, '',
    function(error, trelloCard){
      if(error){
        console.log('Erreur');
      }
      else{
        console.log(trelloCard);
      }
    }
  )
}else{
  program.help();
}
