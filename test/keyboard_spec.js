describe("Keyboard", function() {

    it("throws an error if no keys are provided as an argument of the Keyboard constructor", function() {

        assert.throw(function() {
            new onScreenKeyboard.Keyboard([]);
        }, "The keyboard needs to have at least one key");

    });

    it("includes a keyboard layout template", function() {

        var testContainer = document.createElement("div");
        testContainer.setAttribute("id", "test");
        document.body.appendChild(testContainer);

        var keyboard = new onScreenKeyboard.Keyboard([["a", "b"], ["c", "d"]]);
        keyboard.render('test');

        // Remove component from DOM here.

    });

});