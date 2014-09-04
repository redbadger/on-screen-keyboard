describe("Keys", function() {

    it("throw error if key element isn't a string", function() {

        assert.throw(function() {
            new onScreenKeyboard.Key([[2]]);
        }, "The key provided isn't a string");

    });

});