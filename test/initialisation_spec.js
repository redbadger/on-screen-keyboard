var assert = chai.assert;

var keys = [
            ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
            ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
            ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
            ['-', '_', '@', '.', 'backspace']
        ];

describe("Initialization", function() {

    beforeEach(function(){
        keyboard = new onScreenKeyboard.Keyboard(['key']);
    });

    it("reside in a variable within the global namespace called onScreenKeyboard", function () {
        assert.property(window, "onScreenKeyboard");
    });

    it("instantiate a global with members defined by the onScreenKeyboard.Keyboard constructor", function () {
        assert.instanceOf(keyboard, onScreenKeyboard.Keyboard);
    });

});

describe("Keyboard", function() {

    it("throw error if no keys are provided as an argument of the Keyboard constructor", function() {

        assert.throw(function() {
            new onScreenKeyboard.Keyboard();
        }, "The keyboard needs to have at least one key");

    });

    it("throw error if every key element isn't a string", function() {

        assert.throw(function() {
            new onScreenKeyboard.Keyboard([
                ['a'], ['b'], [{}]
            ]);
        }, "At least one of the keys provided isn't a string");

    });

    it("include a keyboard layout template", function() {

        var testContainer = document.createElement('div');
        testContainer.setAttribute("id", "test");
        document.body.appendChild(testContainer);

        //var keyboard = new onScreenKeyboard.Keyboard(['']);
        //keyboard.render('test');

        // Remove component from DOM here.

    });

});
