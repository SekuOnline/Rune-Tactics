### JS, HTML, & CSS done by David Sedarous,
### Assets done by [Emma Sawyer](https://EmmaSawyer.art)


# Introduction to Rune-Tactics

![RT-1](https://github.com/SekuOnline/Rune-Tactics/assets/93288807/09a9db7d-3b17-4b59-804f-f0f1bfe41299)

This project is used to display information for the Digital Card Game Legends of Runeterra.
It was done to practice Web Development skills, as well as to provide a tool for the games online community.
The project was uploaded in January 2023, and has since been taken down due to upkeeping costs.

The app allowed the user to display up to 3 decks using a 'deck code' used within the game.
The deck codes would be decoded using a js library into an array containing information about each card in the deck.
This array would then retrieve assets to display all decks.
The app informs users if the deck code submitted is invalid.

![RT 4](https://github.com/SekuOnline/Rune-Tactics/assets/93288807/251e33a3-d533-4b87-b95e-1ced23497126)

The user may hover over any card to view additional information within the margin:

![RT05](https://github.com/SekuOnline/Rune-Tactics/assets/93288807/2519d60b-df00-436b-8300-f58a7dfd9b16)


### Build Details:
Node version: 18.13.0
NPM version:  8.19.0

### Build Instructions:
1. Download and extract the zip file.
2. Open a command terminal in the immediate directory.
3. Run 'npm install'
4. Run 'node server.js'
5. Visit https://localhost:3000

### Additional Information:
The app pulls card information by set from json files posted online. 
To add a set:
1. Go to /Rune-Tactics-Main/public/js
2. Open lineup.js
3. add the name of the set within the variable setCodes.

For more information about development for Legends of Runeterra, visit the Riot Developer Portal:
https://developer.riotgames.com/docs/lor
