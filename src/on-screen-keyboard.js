var onScreenKeyboard = (function() {

    "use strict";

    // Store a reference to the INPUT element that has received focus - and
    // can therefore accept text input.
    var currentInputNode;

    /**
     * Creates a keyboard instance.
     *
     * @constructor
     * @param {Array} keyRows - An array of arrays that contain individual keys.
     */
    var Keyboard = function(keyRows) {

        this.keyRows = keyRows;

        // Make sure the keyboard includes at least one key.
        if (typeof this.keyRows === "undefined" || this.keyRows.length === 0) {
            throw new Error("The keyboard needs to have at least one key");
        }

        // Set a reference to the focused DOM INPUT node, and add an event
        // listener that receives the updated .value value.
        this.setCurrentInputNode = function(e) {
            currentInputNode = e.target;
            currentInputNode.addEventListener("key-pressed", function(e) {
                e.target.value = e.detail;
            });
        };

        // Apply 'focus' event listeners upon keyboard initialization.
        this.inputNodes = document.querySelectorAll('input.on-screen-keyboard');
        for(var x=0; x<this.inputNodes.length; x++) {
            this.inputNodes[x].addEventListener("focus", this.setCurrentInputNode, true);
        }

        // Store a reference to the keys within the keyboard, so that we can
        // call methods on those instances after initialisation - i.e .remove()
        this.keys = [];

    };

    /**
     * Manages the removal of all associations of the keyboard from the DOM,
     * including individual associations.
     */
    Keyboard.prototype.remove = function() {
        // Remove event listeners on the applicable INPUT elements.
        for (var x=0; x<this.inputNodes.length; x++) {
            this.inputNodes[x].removeEventListener("focus", this.setCurrentInputNode, true);
        }
        for (var y=0; y<this.keys.length; y++) {
            this.keys[x]._remove();
        }
    };

    /**
     * Build (render) a row of keys within the keyboard. Responsible for
     * instantiating Key instances.
     *
     * @param {Array} row - An array of keys.
     */
    Keyboard.prototype.buildRow = function(row) {

        var DOMElement = document.createElement("div");
        DOMElement.setAttribute("class", "row");

        row.forEach(function(key) {
            key = new Key(key);
            DOMElement.appendChild(key.el);
            // Keep a store of initialized keys, so that we can remove attached
            // event listeners when we need to.
            this.keys.push(key);
        }.bind(this));

        return DOMElement;

    };

    /**
     * Render the fully constructed keyboard.
     */
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

    /**
     * Key values can either be a string literal, or have a class of 'object'.
     *
     * If key is a string, then it's assumed that upon pressing the rendered
     * key, it's value is appended to the current value of the INPUT element.
     *
     * If the key is an object, then it must be structured as follows:
     *
     * {
     *     action: [action_type],
     *     text: [text]
     * }
     *
     * action_type: Must be 'delete'.
     * text: The text to display in the rendered key.
     *
     * @constructor
     * @param {(object|string)} key - The unprocessed key data.
     */
    var Key = function(key) {

        // Only allow keys that are either a string or who have an object class.
        if (typeof key !== "string" && Object.prototype.toString.call(key) !== "[object Object]") {
            throw new Error("The key provided is not a string nor an object");
        }

        this.key = key;

        // Since a new function reference is created after .bind() is called,
        // we need to cache this reference (acting as the 'click' event handler)
        // so we can refer to it when adding/removing event listeners.
        this._onClick = this._onClick.bind(this);

        // Keep a reference to the rendered DOM node in the constructor.
        this.el = this.render();

    };

    /**
     * Remove all associations of the key from the DOM.
     *
     * Currently, this only includes removing attached event listeners since
     * Backbone removes the actual elements out of the DOM.
     */
    Key.prototype._remove = function() {

        this.el.removeEventListener("click", this._onClick);

    };

    /**
     * Computes the new value of the inputField
     *
     * @returns {String}
     */
    Key.prototype._buildInputValue = function() {

        var newInputValue,
            currentInputValue = currentInputNode.value;

        if (typeof this.key === "object") {

            // Must be a registered action.
            switch(this.key.action) {

                case "delete":
                    newInputValue = currentInputValue.substr(0, currentInputValue.length - 1);
                    break;

            }

        } else {
            newInputValue = currentInputValue + this.key;
        }

        return newInputValue;

    };

    /**
     * An event handler that is invoked upon the 'click' event.
     *
     * @listens click
     */
    Key.prototype._onClick = function() {

        // We need to check the existence of currentInputNode, since we're
        // testing Key instances in isolation (in our unit tests) - i.e outside
        // of Keyboard instances.
        if (currentInputNode) {

            // Establish a CustomEvent instance, passing the computed input
            // value to the event's subscribers.
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
        DOMElement.addEventListener("click", this._onClick);

        return DOMElement;

    };

    return {
        Keyboard: Keyboard,
        Key: Key,
        // The below getter/setter pair shouldn't be called explicitly, unless
        // from within a unit test. currentInputNode should only be set through
        // the 'focus' event handler.
        _getCurrentInputNode: function() {
            return currentInputNode;
        },
        _setCurrentInputNode: function(value) {
            currentInputNode = value;
        }
    };

}());