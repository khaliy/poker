var ComparatorsTest = TestCase("ComparatorsTest");
ComparatorsTest.prototype = {
    testHighestCardComparator: function () {
        var comparator = new HighestCardComparator();
        var hand1 = Hand.load(['S2']);
        var hand2 = Hand.load(['D3']);
        assertEquals('higher card should win', -1, comparator.compare(hand1, hand2));

        hand1 = Hand.load(['SA']);
        hand2 = Hand.load(['D3']);
        assertEquals('higher card should win', 1, comparator.compare(hand1, hand2));

        hand1 = Hand.load(['SA']);
        hand2 = Hand.load(['DA']);
        assertEquals('same cards are equal', 0, comparator.compare(hand1, hand2));
    },
    testHighestCardComparatorOnFullHand: function () {
        var comparator = new HighestCardComparator();
        var hand1 = Hand.load(['S2', 'C4', 'D7', 'H3', 'H6']);
        var hand2 = Hand.load(['D3', 'D8', 'D2', 'C3', 'H2']);
        assertEquals('higher card should win', -1, comparator.compare(hand1, hand2));
    }
};