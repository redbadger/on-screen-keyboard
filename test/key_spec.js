describe("Keys", function() {

    it("throw error if key element isn't a string", function() {

        assert.throw(function() {
            new onScreenKeyboard.Key([[2]]);
        }, "The key provided isn't a string");

    });

    it("expose the key string from the Key constructor's argument as a public variable", function() {

        var key = new onScreenKeyboard.Key("test");
        assert.property(key, "key");

    });

    it("invoke a DOM node event listener upon a click event", function() {

        var clickEvent = new Event("click");
        var key = new onScreenKeyboard.Key("test");

        sinon.spy(key, "_onClick");
        key.render().dispatchEvent(clickEvent);

        assert.isTrue(key._onClick.calledOnce);

    });

});