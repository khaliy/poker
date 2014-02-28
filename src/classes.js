var interfaces = {
    Card: new Interface("Card", ['compareTo', 'toString']),
    Suit: new Interface("Suit", ['compareTo','getSuites', 'toString']),
    Value:new Interface("Value", ['compareTo', 'getValues', 'toString']),
    Hand: new Interface("Hand", ['compareTo', 'toString']),
    Deck: new Interface("Deck", ['compareTo', 'toString', 'hand'])
};

var Suit = function (suit) {
    this.suit = suit;
};
Suit.prototype = {
    getSuites: function () {
        return 'HDCS';
    },
    compareTo: function (suit) {
        Interface.ensureImplements(suit, interfaces.Suit);
        return 0; //sign(this.getSuites().indexOf(this.suit) - this.getSuites().indexOf(suit));
    },
    toString: function () {
        return this.suit;
    }
};


var Value = function (value) {
    this.value = value;
};
Value.prototype = {
    getValues: function () {
        return '23456789TJQKA';
    },
    compareTo: function(value) {
        Interface.ensureImplements(value, interfaces.Value);
        return sign(this.getValues().indexOf(this.value) - this.getValues().indexOf(value));
    },
    toString: function () {
        return this.value;
    }
};


var Card = function (suit, value) {
    Interface.ensureImplements(suit, interfaces.Suit);
    Interface.ensureImplements(value, interfaces.Value);
    this.suit = suit;
    this.value = value;
};
Card.prototype = {
    compareTo: function(card) {
        Interface.ensureImplements(card, interfaces.Card);
        return this.value.compareTo(card.value);
    },
    toString: function () {
        return this.suit.toString() + this.value.toString();
    }
};
Card.load = function (cardTxt) {
    return new Card(new Suit(cardTxt.split('')[0]), new Value(cardTxt.split('')[1]));
};
Card.compare = function (card1, card2) {
    return card1.compareTo(card2);
};

var Hand = function(cards) {
    _.each(cards, function (card) {
        Interface.ensureImplements(card, interfaces.Card);
    });
    this.cards = cards && cards.sort(Card.compare).reverse() || [];

};
Hand.prototype = {
    compareTo: function (hand) {
        Interface.ensureImplements(hand, interfaces.Hand);
        return 0; // TODO apply comparator chain
    },
    toString: function () {
        return this.cards.join(' ');
    }
};
Hand.load = function (cards) {
    var cardsToReturn = [];
    _.each(cards, function (cardText) {
        cardsToReturn.push(Card.load(cardText));
    });
    return new Hand(cardsToReturn);
};

var Deck = function() {
    var cards = [];
    _.each(Suit.prototype.getSuites().split(''), function(suit) {
        _.each(Value.prototype.getValues().split(''), function (value) {
            cards.push(new Card(new Suit(suit), new Value(value)));
        });
    });
    Hand.call(this, cards);
    _.shuffle(this.cards);
};
Deck.prototype = new Hand();
Deck.prototype.constructor = Deck;
Deck.prototype.hand = function () {
    return new Hand(this.cards.splice(0, 5));
};