

module.exports = {
    isDataType: function (type) {
        return function (value) {
            return Object.prototype.toString.call(value) === "[object " + type + "]"
        }
    }
};