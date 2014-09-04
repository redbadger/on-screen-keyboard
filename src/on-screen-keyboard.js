var onScreenKeyboard = (function() {

    var foo = 0,
        keyboard;

    var Keyboard = function(keys) {

        this.keys = keys[0];

        // Make sure the keyboard includes at least one key.
        if (typeof this.keys === "undefined" || this.keys.length === 0) {
            throw new Error("The keyboard needs to have at least one key");
        }

    };

    Keyboard.prototype.render = function(wrapperElement) {

        this.buffer = document.createDocumentFragment();

        // Make sure the aforementioned keys are all strings.
        this.keys.forEach(function(key) {
            new Key(key);
        });

        // Inject the keyboard into the DOM.
        var keyboardUI = document.createElement('div');
        keyboardUI.setAttribute("id", "keyboard");
        document.getElementById(wrapperElement).appendChild(keyboardUI);

    };

    var Key = function(key) {
        if (typeof key !== "string") {
            throw new Error("The key provided isn't a string");
        }
    };

    Key.prototype.render = function() {
        
    };

    function get_area(w, h) {
        return w * h;
    }

    return {
        Keyboard: Keyboard,
        Key: Key
    };

}());