const setCodes = ["set1", "set2", "set3", "set4", "set5", "set6", "set6cde"]
// const regionColors = {"Bandle City":"#9fc000", "Targon":"#6939cc", "Shurima":"#eec01e", "Noxus": "#b6001e", "Freljord":"#87d3e9", "Demacia":"#e9dab3", "Ionia":"#f86bb3",  "Bilgewater":"#b5452c", "Piltover & Zaun":"#ff8135", "Runeterra":"#81704a", "Shadow Isles":"#00a384"}
const regionColors = {"Bandle City":"rgba(159, 192, 0, 1)", "Targon":"rgba(105, 57, 204, 1)", "Shurima":"rgba(238, 192, 30,1)", "Noxus": "rgba(182, 0, 30,1)", "Freljord":"rgba(135, 211, 233, 1)", "Demacia":"rgba(233, 218, 179, 1)", "Ionia":"rgba(248, 107, 179, 1)",  "Bilgewater":"rgba(181, 69, 44,1)", "Piltover & Zaun":"rgba(255, 129, 53,1)", "Runeterra":"rgba(129, 112, 74, 1)", "Shadow Isles":"rgba(0, 163, 132,1)"}
const CardBox = "<div class=CardBox>"
const deckCodeBoxes = document.getElementsByClassName("DeckCodeBox");

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("SubmitDeckCodes").addEventListener('click', ProcessDecks)
    // document.getElementById("ClearCodes").addEventListener('click', clearFields)
    if (document.getElementById("DeckCode1").value.trim() != '' && document.getElementById("DeckCode1").value.trim() != '' && document.getElementById("DeckCode1").value.trim() != ''){
        ProcessDecks();
    }

    for(let i = 1; i <= 3; i++){
        document.getElementById("Xbutton"+i).addEventListener('click', function(){
            clearDeck(i)
        });
    }

    for (let i = 0; i < deckCodeBoxes.length; i++){
        deckCodeBoxes[i].addEventListener("keypress", function(event){
            if (event.key === "Enter"){
                event.preventDefault();
                console.log("Here")
                ProcessDecks();
            }
        })
    }
})


async function ProcessDecks(){
    let Deck1 = document.getElementById("DeckCode1").value.trim();
    let Deck2 = document.getElementById("DeckCode2").value.trim();
    let Deck3 = document.getElementById("DeckCode3").value.trim();

    //If any codes are not filled, do not procede.
    if(Deck1 == '' && Deck2 == "" && Deck3 == ""){
        alert("Please fill at least one deck code before submitting")
    }
    else{
        if(Deck1 == ''){
            Deck1 = 'none';
        }
        if(Deck2 == ''){
            Deck2 = 'none';
        }
        if(Deck3 == ''){
            Deck3 = 'none';
        }
        //let xml = new XMLHttpRequest();
        let deckUrl = "/Lineup/"+Deck1+"/"+Deck2+"/"+Deck3

        let promises = [];
        for (let i = 0; i < setCodes.length; i++){
            promises.push(fetch(`/GetSet/${setCodes[i]}`))
            //console.log(`set a promise for ${setCodes[i]}`)
        }
        promises.push(fetch(deckUrl))
        
        Promise.all(promises).then((values) =>{
            let promiseBodies = []
            for (let i = 0; i < values.length; i++){
                promiseBodies.push(values[i].json())
            }
           return promiseBodies;
        }).then((pBody)=>{
            Promise.all(pBody).then((arrays)=>{
                //console.log(arrays)
                
                let decks = (arrays.pop())["SubmitDeckCodes"]
                //console.log(decks)
                let allSets = arrays[0]
                
                for (let i = 1; i < arrays.length; i++){
                    allSets = allSets.concat(arrays[i])
                }
                
                
                for (let deckIndex = 0; deckIndex < 3; deckIndex++){
                    //Check invalid code:
                    let currDeck = decks[deckIndex];
                    //console.log(currDeck)
                    let deckBox = "DeckBox"+(deckIndex+1)
                   
                    
                    
                    
                    let fullDeck = []
                    if (currDeck == 'invalid'){
                        
                        document.getElementById(deckBox).innerHTML = "<div class='InvalidBox'><p>Invalid Code</p></div>"
                        document.getElementById("HiddenVB"+(deckIndex+1)).style.display = 'none'
                        document.getElementById("Deck"+(deckIndex+1)+"VB").style.display = 'flex';
                    }
                    else if (currDeck == 'none'){
                        clearDeck((deckIndex+1))
                    }
                    else{
                        console.log('here')

                        document.getElementById(deckBox).innerHTML = ""
                        // console.log( document.getElementById(deckBox).innerHTML)
                        //Loop through cards
                        for(let cardIndex = 0; cardIndex < decks[deckIndex].length; cardIndex++){
                            let currCard = currDeck[cardIndex]
                            //console.log(currCard)
                            
                            for(let setIndex = 0; setIndex < allSets.length; setIndex++){
                                if (allSets[setIndex].cardCode == currCard.code){
                                    
                                    let cardInfo = {"Cost": allSets[setIndex].cost, "Name": allSets[setIndex].name, "Type":allSets[setIndex].type, "Count":currCard.count, "Region":allSets[setIndex].regions[0], "Art":allSets[setIndex].assets[0].fullAbsolutePath}
                                    
                                    fullDeck.push(cardInfo)
                                    //console.log(cardInfo)
                                    break;

                                    //We found the card, now we need to design the boxes for the card & format the display.
                                }
                            }
                            

                            

                        }
                       
                        displayDeck(fullDeck, deckBox)
                        console.log('here')
                        document.getElementById("HiddenVB"+(deckIndex+1)).style.display = 'none'
                        document.getElementById("Deck"+(deckIndex+1)+"VB").style.display = 'flex';
                    }
                }

                

            })
        });
        

    }
    
    
}

function displayDeck(deck, deckBox){
    deck.sort(function(a,b){
        return parseFloat(a.Cost) - parseFloat(b.Cost);
    })
    //console.log(deck)
    //console.log(deck[0]["Cost"])
    for (let i = 0; i < deck.length; i++){
        
        //card = "<div class='CardBox' style='background-color:"+regionColors[deck[i]["Region"]]+"'>";
        let backgroundY;
        if(deck[i]["Type"] == "Unit"){
            backgroundY = "20%"
        }
        else if (deck[i]["Type"] == "Spell"){
            backgroundY = "40%"
        }
        else{
            backgroundY = "40%"
        }
        card = "<div class='CardBox' style='background-image: linear-gradient(to right, "+regionColors[deck[i]["Region"]]+" 30%, rgba(0,0,0,0) 70%), url("+deck[i]["Art"]+"); background-position-y:"+backgroundY+"'>";
        card += "<img class='mana' src='/img/Mana-"+deck[i]["Cost"]+".png'></img>"
        card += "<p>"+deck[i]["Name"]+"</p>"
        card += "<img class='count' src='/img/Qty-"+deck[i]["Count"]+".png'></img>"
        
        card += "</div>"
       // console.log(deck[i]["Art"])
        document.getElementById(deckBox).innerHTML += card;
    }
   
    
}

function clearDeck(index){
    document.getElementById("DeckCode"+index).value = '';
    document.getElementById("Deck"+index+"VB").style.display = 'none';
    document.getElementById("HiddenVB"+index).style.display = 'block';
}