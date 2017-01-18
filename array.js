
/**
 * 判断一组数组是否存在相同的元素
 * @type {[e]}
 */
Array.prototype.S = String.fromCharCode(2);
Array.prototype.inArray = function(e) {
  var r = new RegExp(this.S + e + this.S);
  return (r.test(this.S + this.join(this.S) + this.S));
}
var arr = [1,2,"test","test2"]
console.log(arr.inArray("test")) //true (存在)
console.log(arr.inArray("hello")) //false (不存在)


/**
 * 判断数组中是否存在相同
 * @param  {[type]}  arrA [数组A]
 * @param  {[type]}  arrB [数组B]
 * @return {Boolean}      [description]
 */
function isSame(arrA, arrB){
  if(arrA.length != arrB.length){
    return false;
  }
  return arrA.sort().toString() == arrB.sort().toString();
}
 var arrA = [1, 2, 3];
 var arrB = [1, 3, 2];
 var re = isSame(arrA, arrB);
 console.log(re); //true


/**
 * 取数组中的最大值
 * @param  {[type]} array [数组]
 * @return {[type]}       [description]
 */
Array.max = function(array) {
    return Math.max.apply(Math, array);
}
console.log(Array.max([1,3,2,21])) //21



/**
 * 取数组中的最小值
 * @param  {[type]} array [数组]
 * @return {[type]}       [description]
 */
Array.min = function(array) {
    return Math.min.apply(Math, array);
}
console.log(Array.min([1,3,2,21])) //1


/**
 * 删除数组中指定的元素
 * @param  {[type]} val [数组中值]
 * @return {[type]}     [description]
 */
Array.prototype.isRemove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
}
var arr = [1,23, 4, 34 ,"aa"]
console.log(arr)  //[1,23, 4, 34 ,"aa"]
arr.isRemove("aa")
console.log(arr) // [1,23, 4, 34]


//by函数接受一个成员名字符串做为参数
//并返回一个可以用来对包含该成员的对象数组进行排序的比较函数
var by = function(name){
 return function(o, p){
   var a, b;
   if (typeof o === "object" && typeof p === "object" && o && p) {
     a = o[name];
     b = p[name];
     if (a === b) {
       return 0;
     }
     if (typeof a === typeof b) {
       return a < b ? -1 : 1;
     }
     return typeof a < typeof b ? -1 : 1;
   }
   else {
     throw ("error");
   }
 }
}
// var employees=[{name:"George", age:32, retiredate:"March 12, 2014"},{name:"Edward", age:17, retiredate:"June 2, 2023"},{name:"Christine", age:58, retiredate:"December 20, 2036"},{name:"Sarah", age:62, retiredate:"April 30, 2020"}]
// console.log(employees.sort(by("age")))


/**
 * 合并两个数组
 * @param {any} arr1
 * @param {any} arr2
 * @returns
 */
function _concat(arr1,arr2){
	//不要直接使用var arr = arr1，这样arr只是arr1的一个引用，两者的修改会互相影响
	var arr = arr1.concat();
	//或者使用slice()复制，var arr = arr1.slice(0)
	for(var i=0;i<arr2.length;i++){
		arr.indexOf(arr2[i]) === -1 ? arr.push(arr2[i]) : 0;
	}
	return arr.sort();
}
var arr1 = ['1','3','2'];
var arr2 = ['2','4','8'];
console.log(_concat(arr1,arr2))


/*
 * 数组去掉重复数据
 */
function unique(arr) {
  var result = [], 
      hash = {};
  for (var i = 0, elem; (elem = arr[i]) != null; i++) {
    if (!hash[elem]) {
      result.push(elem);
      hash[elem] = true;
    }
  }
  return result;
}
var uu = [1,2,3,5,2,1]
console.log(unique(uu)) //[1, 2, 3, 5]
/*
 * 数组去掉重复数据
 */
Array.prototype.isUnique = function(){
    var a = {};
    for(var i = 0; i < this.length; i++){
        if(typeof a[this[i]] == "undefined")
            a[this[i]] = 1;
    }
    this.length = 0;
    for(var i in a)
        this[this.length] = i;
    return this;
}
var a = [1,2,3,1];
var b = [2,3,4];
var c = a.concat(b).isUnique(); //合并数组、去重
console.log(c.isUnique())
console.log(a.isUnique())
