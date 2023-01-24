// const url = require('url')
const { DeckEncoder } = require('runeterra')
const http = require('http');


//An array of all set-names for LOR.
const setCodes = ["set1", "set2", "set3", "set4", "set5", "set6", "set6cde"]

//Home Page
exports.index = function(request, response){
    console.log('/')
    response.render("Home.hbs")
}

exports.LUDisplay = function(request, response){
    console.log(request.url);
    response.render("LineupDisplay.hbs", {deck1 : '', deck2 : '', deck3:''})
}

exports.LUReady = function(request, response){
    console.log(request.url)
    response.render("LineupDisplay.hbs", {deck1 : request.params.deck1, deck2 : request.params.deck2, deck3 : request.params.deck3})
}

//Single-Lineup Page
exports.lineup = function(request, response){
   
    var SubmitDeckCodes = []
    var DeckCodes = [request.params.deck1, request.params.deck2, request.params.deck3]
    for (let i = 0; i < 3; i++){
        //console.log(DeckCodes[i])
        if (isValidCode(DeckCodes[i])){
            //console.log("True")
            SubmitDeckCodes[i] = DeckEncoder.decode(DeckCodes[i]) 
        }
        else{
           
           // console.log("False = "+isValidCode(DeckCodes[i]))
            SubmitDeckCodes[i] = "invalid"
        }
    }
    
    //console.log(SubmitDeckCodes)
    // for(let i = 0; i < 3; i++){
    //     if (SubmitDeckCodes[i] != 'invalid'){
    //         let deck = SubmitDeckCodes[i]
    //         for (let k = 0; k <deck.length; k++){
    //             console.log("card:")
    //             console.log(deck[k].code)
    //             let set = deck[k].code.substring(0, 2);
    //             console.log(set)
                
    //             if (set == "06"){
    //                 set = setCodes[set][0]
    //             }
    //             else{
    //                 set = setCodes[set]
    //             }
    //             console.log(set)
    //             getSet(set, deck[k].code)
                
    //         }
            
    //     }
    // }
    response.setHeader("Content-Type", "application/json")
    // response.write(SubmitDeckCodes);
    // response.end();
    response.send({SubmitDeckCodes})
}

exports.getSet = function(request, response){
    let set = request.params.set
    let url = `https://dd.b.pvp.net/latest/${set}/en_us/data/${set}-en_us.json`

    fetch(url)
  .then((response) => response.json())
  .then((data) => {
    response.setHeader("Content-Type", "application/json")
    response.send(data)
    response.end();
  });

        
}


//Checks if a deck-code is valid. 
//Returns the decoded deck if it is a valid deck-code, or false otherwise.
function isValidCode(code){
    try{
        //console.log(DeckEncoder.decode(code))
        return DeckEncoder.decode(code)}
    catch(err){
        console.log(code+" is not a valid deck code")
        return false
    }
   
}




//Recursive function that will return the set within 'setcodes' at the position 'index'
// async function getSets(){
//     //Base case: The value of index is => to the # of elements in the 'setcodes' array - there are no more sets to get.
//     //Return the concatenated set
//     var allSetsJSON = {};
//     let index = 0;
//     try{
//         let response = await fetch(`dd.b.pvp.net/latest/${setCodes[index]}}/en_us/data/${setCodes[index]}-en_us.json`)
//         if (!response.ok){
//             throw new Error(`HTTP error: ${response.status}`);
//         }
//         let data = await response.json();

//         console.log(data)

//     }
//     catch (err){
//         console.error(`Could not get products: ${err}`)
//     }

// }


   
