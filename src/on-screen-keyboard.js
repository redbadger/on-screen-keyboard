var onScreenKeyboard = (function() {

    var currentInputNode;

    var Keyboard = function(keyRows) {

        this.keyRows = keyRows;

        // Make sure the keyboard includes at least one key.
        if (typeof this.keyRows === "undefined" || this.keyRows.length === 0) {
            throw new Error("The keyboard needs to have at least one key");
        }

        var setCurrentInputNode = function(e) {
            currentInputNode = e.target;
            currentInputNode.addEventListener("key-pressed", function(e) {
                //e.target.value = e.target.value + "Hello!";
            });
        };

        var inputNodes = document.querySelectorAll('input.on-screen-keyboard');
        for(var x=0; x<inputNodes.length; x++) {
            inputNodes[x].addEventListener("focus", setCurrentInputNode, true);
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
        document.body.appendChild(keyboardUI);

        return keyboardUI;

    };

    var Key = function(key) {

        // Only allow keys that are either a string or whose class is object.
        if (typeof key !== "string" && Object.prototype.toString.call(key) !== "[object Object]") {
            throw new Error("The key provided is not a string nor an object");
        }

        this.key = key;

        this.render();

    };

    Key.prototype._buildInputValue = function() {

        var inputValue;

        if (typeof this.text === "object") {
            console.log(this);
        } else {
            inputValue = currentInputNode.value + this.key;
        }

        return inputValue;

    };

    Key.prototype._onClick = function() {

        // We need to check the existence of currentInputNode, since we're
        // testing Key instances in isolation (in our unit tests) - i.e outside
        // of Keyboard instances.
        if (currentInputNode) {

            var keyPressEvent = new CustomEvent("key-pressed", {
                // Publish the .val() of currentInputNode here, so the value can
                // be parsed straight through on the eventListener.
                detail: this._buildInputValue()
            });
            currentInputNode.dispatchEvent(keyPressEvent);

        }

    };

    Key.prototype.render = function() {

        var text = this.key;

        // Construct the OOM element.
        var DOMElement = document.createElement("div");
        if (typeof text === "object") {
            text = this.key.text;
        }
        DOMElement.innerHTML = text;
        DOMElement.setAttribute("id", "key-" + text);

        // Add a click event listener.
        DOMElement.addEventListener("click", this._onClick.bind(this), false);

        return DOMElement;

    };

    return {
        Keyboard: Keyboard,
        Key: Key,
        // This getter/setter pair shouldn't be called explicitly, but are used
        // for unit testing.
        _getCurrentInputNode: function() {
            return currentInputNode;
        },
        _setCurrentInputNode: function(value) {
            currentInputNode = value;
        }
    };

}());