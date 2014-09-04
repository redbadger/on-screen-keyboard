var onScreenKeyboard = (function() {

    var foo = 0,
        keyboard;

    var Keyboard = function(keys) {

        this.keys = keys;

        // Make sure that the keyboard includes at least one key.
        if (typeof this.keys === "undefined" || this.keys.length === 0) {
            throw new Error("The keyboard needs to have at least one key");
        }

        this.keys.forEach(function(key) {
            if (typeof key !== "string") {
                throw new Error("At least one of the keys provided isn't a string");
            }
        });

    };

    Keyboard.prototype.render = function(wrapperElement) {

        // Inject the keyboard into the DOM.
        var keyboardUI = document.createElement('div');
        keyboardUI.setAttribute("id", "keyboard");
        document.getElementById(wrapperElement).appendChild(keyboardUI);

    };

    var Key = function() {
        //console.log("This works really well!");
    };

    function get_area(w, h) {
        return w * h;
    }

    return {
        Keyboard: Keyboard
    };

}());