var onScreenKeyboard = (function() {

    var foo = 0,
        keyboard;

    var Keyboard = function(keys) {

        this.keys = keys;

        // Make sure the keyboard includes at least one key.
        if (typeof this.keys === "undefined" || this.keys.length === 0) {
            throw new Error("The keyboard needs to have at least one key");
        }

        // Make sure the aforementioned keys are all strings.
        this.keys.forEach(function(key) {
            new Key(key);
        });

    };

    Keyboard.prototype.render = function(wrapperElement) {

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

    function get_area(w, h) {
        return w * h;
    }

    return {
        Keyboard: Keyboard,
        Key: Key
    };

}());