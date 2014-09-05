var assert = chai.assert;

var keys = [
            ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
            ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
            ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
            ['-', '_', '@', '.', 'backspace']
        ];

describe("Initialization", function() {

    beforeEach(function(){
        keyboard = new onScreenKeyboard.Keyboard([['key']]);
    });

    it("resides in a variable within the global namespace called onScreenKeyboard", function () {
        assert.property(window, "onScreenKeyboard");
    });

    it("instantiates a global with members defined by the onScreenKeyboard.Keyboard constructor", function () {
        assert.instanceOf(keyboard, onScreenKeyboard.Keyboard);
    });

});
