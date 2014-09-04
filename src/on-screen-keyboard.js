var onScreenKeyboard = (function() {

    var foo = 0,
        keyboard;

    var Keyboard = function(keyRows) {

        this.keyRows = keyRows;

        // Make sure the keyboard includes at least one key.
        if (typeof this.keyRows === "undefined" || this.keyRows.length === 0) {
            throw new Error("The keyboard needs to have at least one key");
        }

    };

    Keyboard.prototype.buildRow = function(row) {

        var rowBuffer = document.createDocumentFragment();

        row.forEach(function(key) {
            key = new Key(key);
            rowBuffer.appendChild(key.render());
        });
        //console.log(rowBuffer);
        return rowBuffer;

    };

    Keyboard.prototype.render = function(wrapperElement) {

        this.buffer = document.createDocumentFragment();

        // Make sure the aforementioned keys are all strings.
        this.keyRows.forEach(function(row) {
            this.buildRow(row);
        }.bind(this));

        // Inject the keyboard into the DOM.
        var keyboardUI = document.createElement("div");
        keyboardUI.setAttribute("id", "keyboard");
        document.getElementById(wrapperElement).appendChild(keyboardUI);

    };

    var Key = function(key) {

        if (typeof key[0] !== "string") {
            throw new Error("The key provided isn't a string");
        }
        this.key = key[0];
        this.render();

    };

    Key.prototype._onClick = function() {};

    Key.prototype.render = function() {

        // Construct the OOM element.
        var DOMElement = document.createElement("div");
        DOMElement.innerHTML = this.key;
        DOMElement.setAttribute("id", this.key);

        // Add the event listener.
        DOMElement.addEventListener("click", this._onClick, false);

        return DOMElement;

    };

    function get_area(w, h) {
        return w * h;
    }

    return {
        Keyboard: Keyboard,
        Key: Key
    };

}());