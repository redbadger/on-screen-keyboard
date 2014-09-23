# on-screen-keyboard


An on-screen keyboard, useful in touchscreen web applications

## Dependencies
* [Node.js](https://github.com/joyent/node)
* [npm](https://github.com/npm/npm)
* [grunt](https://github.com/gruntjs/grunt)

## Build
1. `npm run build`

## Creating a keyboard instance
Create an instance by using the onScreenKeyboard constructor, being sure to parse in an object literal consisting of both `keys` and `afterElement` keys.

### Configuring the layout
#### Rows
Each key 'row' is parsed into `keys` as an array, meaning we can change the order of these rows however we like.

    #!keys Array
    ["this", "will", "be", "on"],
    ["two", "different", "lines"],

#### Key formats
A key can either be an object literal or a string. If it's a string, then it's value will be used as the key value, and will concatenated 
to the current input string. If however, you require a key with a special action (i.e deleting the previous character), then you can use an object with the follwing structure:

    {
        action: delete,
        text: "Delete"
    }

**NOTE** Only the *delete* `action` is currently supported
