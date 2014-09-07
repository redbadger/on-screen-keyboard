describe("Keys", function() {

    it("throws error if key element isn't a string nor an object", function() {

        assert.throw(function() {
            new onScreenKeyboard.Key([2]);
        }, "The key provided isn't a string nor an object");

    });

    it("exposes the key string from the Key constructor's argument as a public variable", function() {

        var key = new onScreenKeyboard.Key("test");
        assert.property(key, "key");

    });

    describe("Render", function() {

        it("creates a DOM node", function() {

            var key = new onScreenKeyboard.Key("test");

            assert.instanceOf(key.render(), HTMLElement);

        });

        it("adds an HTML ID attribute where the value is the key name prepended with 'key-'", function() {

            var key = new onScreenKeyboard.Key("test");

            //console.log(key.render().querySelector("[id='t']"));

        });

        it("invokes the appropriate click event listener", function() {

            var key = new onScreenKeyboard.Key("test");
            var clickEvent = new Event("click");

            sinon.spy(key, "_onClick");
            key.render().dispatchEvent(clickEvent);

            assert.isTrue(key._onClick.calledOnce);

        });

    });

});