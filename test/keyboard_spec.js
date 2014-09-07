describe("Keyboard", function() {

    it("throws an error if no keys are provided as an argument of the Keyboard constructor", function() {

        assert.throw(function() {
            new onScreenKeyboard.Keyboard([]);
        }, "The keyboard needs to have at least one key");

    });

    it("the currently focused INPUT element is stored as a reference in onScreenKeyboard.currentInputNode", function() {

        var inputField = document.createElement('input');
        inputField.setAttribute("class", "on-screen-keyboard");
        document.body.appendChild(inputField);

        var keyboard = new onScreenKeyboard.Keyboard([["test"]]);
        var renderedKeyboard = keyboard.render();

        var focusEvent = new Event("focus");
        inputField.dispatchEvent(focusEvent);

        assert.strictEqual(onScreenKeyboard._getCurrentInputNode(), inputField);

        document.body.removeChild(inputField);
        document.body.removeChild(renderedKeyboard);

    });

});