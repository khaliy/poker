var interfaces = interfaces || {};
interfaces.Comparator = new Interface("Comparator", ['compare']);

var HighestCardComparator = function () {};
HighestCardComparator.prototype.compare = function (hand1, hand2) {
    Interface.ensureImplements(hand1, interfaces.Hand);
    Interface.ensureImplements(hand2, interfaces.Hand);
    var cards1 = hand1.cards;
    var cards2 = hand2.cards;
    var comp = -1;
    _.every(cards1, function (card1, i) {
        comp = card1.compareTo(cards2[i]);
        if (comp !== 0) {
            return false;
        }
    });
    return comp;
};

var PairComparator = function () {};
PairComparator.prototype.compare = function (hand1, hand2) {
    Interface.ensureImplements(hand1, interfaces.Hand);
    Interface.ensureImplements(hand2, interfaces.Hand);
    var cards1 = hand1.cards;
    var cards2 = hand2.cards;
    var comp = -1;
    // TODO continue
    return comp;
};