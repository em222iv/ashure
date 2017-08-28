export default function cardDeck(){
	this.names = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
	this.suits = ['Hearts','Diamonds','Spades','Clubs'];
	let deck = [];

    for( var s = 0; s < this.suits.length; s++ ) {
        for( var n = 0; n < this.names.length; n++ ) {
            deck.push( new card( n+1, this.names[n], this.suits[s] ) );
        }
    }

    return deck;
}
function card(value, name, suit){
	this.value = value;
	this.name = name;
	this.suit = suit;
	this.id = Math.random(2,1000000).toString();
}
