describe("Keys", function() {

    it("throws error if key element isn't a string nor an object", function() {

        assert.throw(function() {
            new onScreenKeyboard.Key([2]);
        }, "The key provided is not a string nor an object");

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

        it("builds a new input value that reflects the key invoked", function() {

            var inputField = document.createElement("input");
            onScreenKeyboard._setCurrentInputNode(inputField);

            var defaultValue = "test";

            var tests = [
                {
                    key: "a",
                    expected: "testa"
                },
                {
                    key: {
                        action: "delete",
                        text: "backspace"
                    },
                    expected: "tes"
                }
            ];

            tests.forEach(function(test, index) {

                inputField.value = defaultValue;

                var assertTest = function(e) {
                    assert.equal(e.detail, test.expected);
                    onScreenKeyboard._getCurrentInputNode().removeEventListener("key-pressed", assertTest);
                };

                onScreenKeyboard._getCurrentInputNode().addEventListener("key-pressed", assertTest);
                var key = new onScreenKeyboard.Key(test.key);
                key._onClick();

            });

        });

    });

});