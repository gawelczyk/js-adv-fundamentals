var Root = extend(User, {
    constructor: function (login, perms) {
        this.super("constructor", arguments);
//        this.login = login;
        this.perms = perms;
    },
    getLogin: function () {
        var superVal = this.super("getLogin", arguments);
        return "ROOT: " + superVal;
    },
    getPermissions: function () {
        return this.perms;
    }
});

function testRoot(Root) {
    var login = "ed";
    var perms = ["r", "w", "d", "u"];

    var root = new Root(login, perms);

    assertEqual(root.constructor, Root);
    assertEqual(root.getLogin(), "ROOT: " + login);
//    assertEqual(root.getLogin(), login);
    assertEqual(root.getPermissions(), perms);
}
console.log('root test');
testRoot(Root);
//for (var p in User.prototype) {
//    console.log('user:\t', p);
//}
console.log('root');
//for (var p in Root.prototype) {
//    console.log('root:\t', p);
//}
console.log('//root test');