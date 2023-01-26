const deckCodeBoxes = document.getElementsByClassName("DeckCodeBox");

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("SubmitDeckCodes").addEventListener('click', RerouteDecks)
    // document.getElementById("ClearCodes").addEventListener('click', clearFields)
    for (let i = 0; i < deckCodeBoxes.length; i++){
        deckCodeBoxes[i].addEventListener("keypress", function(event){
            if (event.key === "Enter"){
                event.preventDefault();
                console.log("Here")
                RerouteDecks();
            }
        })
    }
})



function RerouteDecks(){
    let Deck1 = document.getElementById("DeckCode1").value.trim();
    let Deck2 = document.getElementById("DeckCode2").value.trim();
    let Deck3 = document.getElementById("DeckCode3").value.trim();
    //console.log(Deck1 + "\n" + Deck2 + "\n"+Deck3)

    //If any codes are not filled, do not procede.
    if(Deck1 == '' && Deck2 == "" && Deck3 == ""){
        alert("Please fill at least one deck code before submitting")
    }
    
    else{
        if(Deck1 == ''){
            Deck1 = "none";
        }
        if(Deck2 == ''){
            Deck2 = "none";
        }
        if(Deck3 == ''){
            Deck3 = "none";
        }
        window.location.href = "/LUDisplay/"+Deck1+"/"+Deck2+"/"+Deck3
    }
}