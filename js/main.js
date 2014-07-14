var result = odd(13);
console.log(result);
console.log("qq" + [], 123, result);


var a1 = ["a", "b", "c"];
console.log('przed insertAt', a1);
a1.insertAt(1, "xxx");
console.log('po insertAt', a1);

var arr = ["a", "b", "c"];
console.log('przed delete', arr);
var deletedObject = arr.deleteAt(1);
//deletedObject === "b" && arr == ["a", "c"]
console.log('po delete', arr, deletedObject);