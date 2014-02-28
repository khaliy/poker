var ClassesTest = TestCase("ClassesTest");
ClassesTest.prototype = {
    setUp: function() {
        this.deck = new Deck();
    },
    tearDown: function () {
        delete this.deck;
    },
    testClassesReference: function () {
        assertTrue("All of the classes are defined", !!Suit && !!Value && !!Card && !!Hand && !!Deck);
    },
    testDeckIsNotEmpty: function () {
        assertTrue("Deck contains 52 cards", this.deck.cards.length === 52);
    },
    testHandFromDeck: function () {
        assertTrue("Deck contains 52 cards", this.deck.cards.length === 52);
        assertTrue("Deck hands 5 cards", this.deck.hand().cards.length === 5);
        assertEquals("Deck contains now 47 cards", this.deck.cards.length, 47);
    },
    testHandContainsCards: function () {
        _.each(this.deck.hand().cards, function (card) {
            Interface.ensureImplements(card, interfaces.Card);
        });
    }
};