document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("SubmitDeckCodes").addEventListener('click', RerouteDecks)
    // document.getElementById("ClearCodes").addEventListener('click', clearFields)
})



function RerouteDecks(){
    let Deck1 = document.getElementById("DeckCode1").value.trim();
    let Deck2 = document.getElementById("DeckCode2").value.trim();
    let Deck3 = document.getElementById("DeckCode3").value.trim();
    //console.log(Deck1 + "\n" + Deck2 + "\n"+Deck3)

    //If any codes are not filled, do not procede.
    if(Deck1 == '' || Deck2 == "" || Deck3 == ""){
        alert("Please fill all deck-codes before submitting")
    }

    else{
       window.location.href = "/LUDisplay/"+Deck1+"/"+Deck2+"/"+Deck3
    }
}