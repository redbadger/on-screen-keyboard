var onScreenKeyboard = (function() {

    var Keyboard = function(keyRows) {

        this.keyRows = keyRows;

        // Make sure the keyboard includes at least one key.
        if (typeof this.keyRows === "undefined" || this.keyRows.length === 0) {
            throw new Error("The keyboard needs to have at least one key");
        }

    };

    Keyboard.prototype.buildRow = function(row) {

        var DOMElement = document.createElement("div");
        DOMElement.setAttribute("class", "row");

        row.forEach(function(key) {
            key = new Key(key);
            DOMElement.appendChild(key.render());
        });

        return DOMElement;

    };

    Keyboard.prototype.render = function(wrapperElement) {

        this.buffer = document.createDocumentFragment();

        this.keyRows.forEach(function(row) {
            row = this.buildRow(row);
            this.buffer.appendChild(row);
        }.bind(this));

        var keyboardUI = document.createElement("div");
        keyboardUI.setAttribute("id", "keyboard");

        // Put all keys into a fragment to prevent superfluous DOM reflows.
        keyboardUI.appendChild(this.buffer);

        // Inject the keyboard into the DOM.
        document.getElementById(wrapperElement).appendChild(keyboardUI);

    };

    var Key = function(key) {

        if (typeof key[0] !== "string") {
            throw new Error("The key provided isn't a string");
        }

        this.key = key[0];
        this.render();

    };

    Key.prototype._onClick = function() {
        console.log(this.key);
    };

    Key.prototype.render = function() {

        // Construct the OOM element.
        var DOMElement = document.createElement("div");
        DOMElement.innerHTML = this.key;
        DOMElement.setAttribute("id", "key-" + this.key);

        // Add a click event listener.
        DOMElement.addEventListener("click", this._onClick.bind(this), false);

        return DOMElement;

    };

    return {
        Keyboard: Keyboard,
        Key: Key
    };

}());