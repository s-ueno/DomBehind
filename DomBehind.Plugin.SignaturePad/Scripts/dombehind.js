// Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
// This work is free. You can redistribute it and/or modify it
// under the terms of the WTFPL, Version 2
// For more information see LICENSE.txt or http://www.wtfpl.net/
//
// For more information, the home page:
// http://pieroxy.net/blog/pages/lz-string/testing.html
//
// LZ-based compression algorithm, version 1.3.3
var LZString = {
  
  
  // private property
  _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  _f : String.fromCharCode,
  
  compressToBase64 : function (input) {
    if (input == null) return "";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    
    input = LZString.compress(input);
    
    while (i < input.length*2) {
      
      if (i%2==0) {
        chr1 = input.charCodeAt(i/2) >> 8;
        chr2 = input.charCodeAt(i/2) & 255;
        if (i/2+1 < input.length) 
          chr3 = input.charCodeAt(i/2+1) >> 8;
        else 
          chr3 = NaN;
      } else {
        chr1 = input.charCodeAt((i-1)/2) & 255;
        if ((i+1)/2 < input.length) {
          chr2 = input.charCodeAt((i+1)/2) >> 8;
          chr3 = input.charCodeAt((i+1)/2) & 255;
        } else 
          chr2=chr3=NaN;
      }
      i+=3;
      
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      
      output = output +
        LZString._keyStr.charAt(enc1) + LZString._keyStr.charAt(enc2) +
          LZString._keyStr.charAt(enc3) + LZString._keyStr.charAt(enc4);
      
    }
    
    return output;
  },
  
  decompressFromBase64 : function (input) {
    if (input == null) return "";
    var output = "",
        ol = 0, 
        output_,
        chr1, chr2, chr3,
        enc1, enc2, enc3, enc4,
        i = 0, f=LZString._f;
    
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    
    while (i < input.length) {
      
      enc1 = LZString._keyStr.indexOf(input.charAt(i++));
      enc2 = LZString._keyStr.indexOf(input.charAt(i++));
      enc3 = LZString._keyStr.indexOf(input.charAt(i++));
      enc4 = LZString._keyStr.indexOf(input.charAt(i++));
      
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      
      if (ol%2==0) {
        output_ = chr1 << 8;
        
        if (enc3 != 64) {
          output += f(output_ | chr2);
        }
        if (enc4 != 64) {
          output_ = chr3 << 8;
        }
      } else {
        output = output + f(output_ | chr1);
        
        if (enc3 != 64) {
          output_ = chr2 << 8;
        }
        if (enc4 != 64) {
          output += f(output_ | chr3);
        }
      }
      ol+=3;
    }
    
    return LZString.decompress(output);
    
  },

  compressToUTF16 : function (input) {
    if (input == null) return "";
    var output = "",
        i,c,
        current,
        status = 0,
        f = LZString._f;
    
    input = LZString.compress(input);
    
    for (i=0 ; i<input.length ; i++) {
      c = input.charCodeAt(i);
      switch (status++) {
        case 0:
          output += f((c >> 1)+32);
          current = (c & 1) << 14;
          break;
        case 1:
          output += f((current + (c >> 2))+32);
          current = (c & 3) << 13;
          break;
        case 2:
          output += f((current + (c >> 3))+32);
          current = (c & 7) << 12;
          break;
        case 3:
          output += f((current + (c >> 4))+32);
          current = (c & 15) << 11;
          break;
        case 4:
          output += f((current + (c >> 5))+32);
          current = (c & 31) << 10;
          break;
        case 5:
          output += f((current + (c >> 6))+32);
          current = (c & 63) << 9;
          break;
        case 6:
          output += f((current + (c >> 7))+32);
          current = (c & 127) << 8;
          break;
        case 7:
          output += f((current + (c >> 8))+32);
          current = (c & 255) << 7;
          break;
        case 8:
          output += f((current + (c >> 9))+32);
          current = (c & 511) << 6;
          break;
        case 9:
          output += f((current + (c >> 10))+32);
          current = (c & 1023) << 5;
          break;
        case 10:
          output += f((current + (c >> 11))+32);
          current = (c & 2047) << 4;
          break;
        case 11:
          output += f((current + (c >> 12))+32);
          current = (c & 4095) << 3;
          break;
        case 12:
          output += f((current + (c >> 13))+32);
          current = (c & 8191) << 2;
          break;
        case 13:
          output += f((current + (c >> 14))+32);
          current = (c & 16383) << 1;
          break;
        case 14:
          output += f((current + (c >> 15))+32, (c & 32767)+32);
          status = 0;
          break;
      }
    }
    
    return output + f(current + 32);
  },
  

  decompressFromUTF16 : function (input) {
    if (input == null) return "";
    var output = "",
        current,c,
        status=0,
        i = 0,
        f = LZString._f;
    
    while (i < input.length) {
      c = input.charCodeAt(i) - 32;
      
      switch (status++) {
        case 0:
          current = c << 1;
          break;
        case 1:
          output += f(current | (c >> 14));
          current = (c&16383) << 2;
          break;
        case 2:
          output += f(current | (c >> 13));
          current = (c&8191) << 3;
          break;
        case 3:
          output += f(current | (c >> 12));
          current = (c&4095) << 4;
          break;
        case 4:
          output += f(current | (c >> 11));
          current = (c&2047) << 5;
          break;
        case 5:
          output += f(current | (c >> 10));
          current = (c&1023) << 6;
          break;
        case 6:
          output += f(current | (c >> 9));
          current = (c&511) << 7;
          break;
        case 7:
          output += f(current | (c >> 8));
          current = (c&255) << 8;
          break;
        case 8:
          output += f(current | (c >> 7));
          current = (c&127) << 9;
          break;
        case 9:
          output += f(current | (c >> 6));
          current = (c&63) << 10;
          break;
        case 10:
          output += f(current | (c >> 5));
          current = (c&31) << 11;
          break;
        case 11:
          output += f(current | (c >> 4));
          current = (c&15) << 12;
          break;
        case 12:
          output += f(current | (c >> 3));
          current = (c&7) << 13;
          break;
        case 13:
          output += f(current | (c >> 2));
          current = (c&3) << 14;
          break;
        case 14:
          output += f(current | (c >> 1));
          current = (c&1) << 15;
          break;
        case 15:
          output += f(current | c);
          status=0;
          break;
      }
      
      
      i++;
    }
    
    return LZString.decompress(output);
    //return output;
    
  },


  
  compress: function (uncompressed) {
    if (uncompressed == null) return "";
    var i, value,
        context_dictionary= {},
        context_dictionaryToCreate= {},
        context_c="",
        context_wc="",
        context_w="",
        context_enlargeIn= 2, // Compensate for the first entry which should not count
        context_dictSize= 3,
        context_numBits= 2,
        context_data_string="", 
        context_data_val=0, 
        context_data_position=0,
        ii,
        f=LZString._f;
    
    for (ii = 0; ii < uncompressed.length; ii += 1) {
      context_c = uncompressed.charAt(ii);
      if (!Object.prototype.hasOwnProperty.call(context_dictionary,context_c)) {
        context_dictionary[context_c] = context_dictSize++;
        context_dictionaryToCreate[context_c] = true;
      }
      
      context_wc = context_w + context_c;
      if (Object.prototype.hasOwnProperty.call(context_dictionary,context_wc)) {
        context_w = context_wc;
      } else {
        if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
          if (context_w.charCodeAt(0)<256) {
            for (i=0 ; i<context_numBits ; i++) {
              context_data_val = (context_data_val << 1);
              if (context_data_position == 15) {
                context_data_position = 0;
                context_data_string += f(context_data_val);
                context_data_val = 0;
              } else {
                context_data_position++;
              }
            }
            value = context_w.charCodeAt(0);
            for (i=0 ; i<8 ; i++) {
              context_data_val = (context_data_val << 1) | (value&1);
              if (context_data_position == 15) {
                context_data_position = 0;
                context_data_string += f(context_data_val);
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }
          } else {
            value = 1;
            for (i=0 ; i<context_numBits ; i++) {
              context_data_val = (context_data_val << 1) | value;
              if (context_data_position == 15) {
                context_data_position = 0;
                context_data_string += f(context_data_val);
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = 0;
            }
            value = context_w.charCodeAt(0);
            for (i=0 ; i<16 ; i++) {
              context_data_val = (context_data_val << 1) | (value&1);
              if (context_data_position == 15) {
                context_data_position = 0;
                context_data_string += f(context_data_val);
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }
          }
          context_enlargeIn--;
          if (context_enlargeIn == 0) {
            context_enlargeIn = Math.pow(2, context_numBits);
            context_numBits++;
          }
          delete context_dictionaryToCreate[context_w];
        } else {
          value = context_dictionary[context_w];
          for (i=0 ; i<context_numBits ; i++) {
            context_data_val = (context_data_val << 1) | (value&1);
            if (context_data_position == 15) {
              context_data_position = 0;
              context_data_string += f(context_data_val);
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
          
          
        }
        context_enlargeIn--;
        if (context_enlargeIn == 0) {
          context_enlargeIn = Math.pow(2, context_numBits);
          context_numBits++;
        }
        // Add wc to the dictionary.
        context_dictionary[context_wc] = context_dictSize++;
        context_w = String(context_c);
      }
    }
    
    // Output the code for w.
    if (context_w !== "") {
      if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
        if (context_w.charCodeAt(0)<256) {
          for (i=0 ; i<context_numBits ; i++) {
            context_data_val = (context_data_val << 1);
            if (context_data_position == 15) {
              context_data_position = 0;
              context_data_string += f(context_data_val);
              context_data_val = 0;
            } else {
              context_data_position++;
            }
          }
          value = context_w.charCodeAt(0);
          for (i=0 ; i<8 ; i++) {
            context_data_val = (context_data_val << 1) | (value&1);
            if (context_data_position == 15) {
              context_data_position = 0;
              context_data_string += f(context_data_val);
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
        } else {
          value = 1;
          for (i=0 ; i<context_numBits ; i++) {
            context_data_val = (context_data_val << 1) | value;
            if (context_data_position == 15) {
              context_data_position = 0;
              context_data_string += f(context_data_val);
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = 0;
          }
          value = context_w.charCodeAt(0);
          for (i=0 ; i<16 ; i++) {
            context_data_val = (context_data_val << 1) | (value&1);
            if (context_data_position == 15) {
              context_data_position = 0;
              context_data_string += f(context_data_val);
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
        }
        context_enlargeIn--;
        if (context_enlargeIn == 0) {
          context_enlargeIn = Math.pow(2, context_numBits);
          context_numBits++;
        }
        delete context_dictionaryToCreate[context_w];
      } else {
        value = context_dictionary[context_w];
        for (i=0 ; i<context_numBits ; i++) {
          context_data_val = (context_data_val << 1) | (value&1);
          if (context_data_position == 15) {
            context_data_position = 0;
            context_data_string += f(context_data_val);
            context_data_val = 0;
          } else {
            context_data_position++;
          }
          value = value >> 1;
        }
        
        
      }
      context_enlargeIn--;
      if (context_enlargeIn == 0) {
        context_enlargeIn = Math.pow(2, context_numBits);
        context_numBits++;
      }
    }
    
    // Mark the end of the stream
    value = 2;
    for (i=0 ; i<context_numBits ; i++) {
      context_data_val = (context_data_val << 1) | (value&1);
      if (context_data_position == 15) {
        context_data_position = 0;
        context_data_string += f(context_data_val);
        context_data_val = 0;
      } else {
        context_data_position++;
      }
      value = value >> 1;
    }
    
    // Flush the last char
    while (true) {
      context_data_val = (context_data_val << 1);
      if (context_data_position == 15) {
        context_data_string += f(context_data_val);
        break;
      }
      else context_data_position++;
    }
    return context_data_string;
  },
  
  decompress: function (compressed) {
    if (compressed == null) return "";
    if (compressed == "") return null;
    var dictionary = [],
        next,
        enlargeIn = 4,
        dictSize = 4,
        numBits = 3,
        entry = "",
        result = "",
        i,
        w,
        bits, resb, maxpower, power,
        c,
        f = LZString._f,
        data = {string:compressed, val:compressed.charCodeAt(0), position:32768, index:1};
    
    for (i = 0; i < 3; i += 1) {
      dictionary[i] = i;
    }
    
    bits = 0;
    maxpower = Math.pow(2,2);
    power=1;
    while (power!=maxpower) {
      resb = data.val & data.position;
      data.position >>= 1;
      if (data.position == 0) {
        data.position = 32768;
        data.val = data.string.charCodeAt(data.index++);
      }
      bits |= (resb>0 ? 1 : 0) * power;
      power <<= 1;
    }
    
    switch (next = bits) {
      case 0: 
          bits = 0;
          maxpower = Math.pow(2,8);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = 32768;
              data.val = data.string.charCodeAt(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }
        c = f(bits);
        break;
      case 1: 
          bits = 0;
          maxpower = Math.pow(2,16);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = 32768;
              data.val = data.string.charCodeAt(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }
        c = f(bits);
        break;
      case 2: 
        return "";
    }
    dictionary[3] = c;
    w = result = c;
    while (true) {
      if (data.index > data.string.length) {
        return "";
      }
      
      bits = 0;
      maxpower = Math.pow(2,numBits);
      power=1;
      while (power!=maxpower) {
        resb = data.val & data.position;
        data.position >>= 1;
        if (data.position == 0) {
          data.position = 32768;
          data.val = data.string.charCodeAt(data.index++);
        }
        bits |= (resb>0 ? 1 : 0) * power;
        power <<= 1;
      }

      switch (c = bits) {
        case 0: 
          bits = 0;
          maxpower = Math.pow(2,8);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = 32768;
              data.val = data.string.charCodeAt(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }

          dictionary[dictSize++] = f(bits);
          c = dictSize-1;
          enlargeIn--;
          break;
        case 1: 
          bits = 0;
          maxpower = Math.pow(2,16);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = 32768;
              data.val = data.string.charCodeAt(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }
          dictionary[dictSize++] = f(bits);
          c = dictSize-1;
          enlargeIn--;
          break;
        case 2: 
          return result;
      }
      
      if (enlargeIn == 0) {
        enlargeIn = Math.pow(2, numBits);
        numBits++;
      }
      
      if (dictionary[c]) {
        entry = dictionary[c];
      } else {
        if (c === dictSize) {
          entry = w + w.charAt(0);
        } else {
          return null;
        }
      }
      result += entry;
      
      // Add w+entry[0] to the dictionary.
      dictionary[dictSize++] = w + entry.charAt(0);
      enlargeIn--;
      
      w = entry;
      
      if (enlargeIn == 0) {
        enlargeIn = Math.pow(2, numBits);
        numBits++;
      }
      
    }
  }
};

if( typeof module !== 'undefined' && module != null ) {
  module.exports = LZString
}

var collections;
(function (collections) {
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var has = function (obj, prop) {
        return _hasOwnProperty.call(obj, prop);
    };
    function defaultCompare(a, b) {
        if (a < b) {
            return -1;
        }
        else if (a === b) {
            return 0;
        }
        else {
            return 1;
        }
    }
    collections.defaultCompare = defaultCompare;
    function defaultEquals(a, b) {
        return a === b;
    }
    collections.defaultEquals = defaultEquals;
    function defaultToString(item) {
        if (item === null) {
            return 'COLLECTION_NULL';
        }
        else if (collections.isUndefined(item)) {
            return 'COLLECTION_UNDEFINED';
        }
        else if (collections.isString(item)) {
            return '$s' + item;
        }
        else {
            return '$o' + item.toString();
        }
    }
    collections.defaultToString = defaultToString;
    function makeString(item, join = ",") {
        if (item === null) {
            return 'COLLECTION_NULL';
        }
        else if (collections.isUndefined(item)) {
            return 'COLLECTION_UNDEFINED';
        }
        else if (collections.isString(item)) {
            return item.toString();
        }
        else {
            var toret = "{";
            var first = true;
            for (var prop in item) {
                if (has(item, prop)) {
                    if (first)
                        first = false;
                    else
                        toret = toret + join;
                    toret = toret + prop + ":" + item[prop];
                }
            }
            return toret + "}";
        }
    }
    collections.makeString = makeString;
    function isFunction(func) {
        return (typeof func) === 'function';
    }
    collections.isFunction = isFunction;
    function isUndefined(obj) {
        return (typeof obj) === 'undefined';
    }
    collections.isUndefined = isUndefined;
    function isString(obj) {
        return Object.prototype.toString.call(obj) === '[object String]';
    }
    collections.isString = isString;
    function reverseCompareFunction(compareFunction) {
        if (!collections.isFunction(compareFunction)) {
            return function (a, b) {
                if (a < b) {
                    return 1;
                }
                else if (a === b) {
                    return 0;
                }
                else {
                    return -1;
                }
            };
        }
        else {
            return function (d, v) {
                return compareFunction(d, v) * -1;
            };
        }
    }
    collections.reverseCompareFunction = reverseCompareFunction;
    function compareToEquals(compareFunction) {
        return function (a, b) {
            return compareFunction(a, b) === 0;
        };
    }
    collections.compareToEquals = compareToEquals;
    let arrays;
    (function (arrays) {
        function indexOf(array, item, equalsFunction) {
            var equals = equalsFunction || collections.defaultEquals;
            var length = array.length;
            for (var i = 0; i < length; i++) {
                if (equals(array[i], item)) {
                    return i;
                }
            }
            return -1;
        }
        arrays.indexOf = indexOf;
        function lastIndexOf(array, item, equalsFunction) {
            var equals = equalsFunction || collections.defaultEquals;
            var length = array.length;
            for (var i = length - 1; i >= 0; i--) {
                if (equals(array[i], item)) {
                    return i;
                }
            }
            return -1;
        }
        arrays.lastIndexOf = lastIndexOf;
        function contains(array, item, equalsFunction) {
            return arrays.indexOf(array, item, equalsFunction) >= 0;
        }
        arrays.contains = contains;
        function remove(array, item, equalsFunction) {
            var index = arrays.indexOf(array, item, equalsFunction);
            if (index < 0) {
                return false;
            }
            array.splice(index, 1);
            return true;
        }
        arrays.remove = remove;
        function frequency(array, item, equalsFunction) {
            var equals = equalsFunction || collections.defaultEquals;
            var length = array.length;
            var freq = 0;
            for (var i = 0; i < length; i++) {
                if (equals(array[i], item)) {
                    freq++;
                }
            }
            return freq;
        }
        arrays.frequency = frequency;
        function equals(array1, array2, equalsFunction) {
            var equals = equalsFunction || collections.defaultEquals;
            if (array1.length !== array2.length) {
                return false;
            }
            var length = array1.length;
            for (var i = 0; i < length; i++) {
                if (!equals(array1[i], array2[i])) {
                    return false;
                }
            }
            return true;
        }
        arrays.equals = equals;
        function copy(array) {
            return array.concat();
        }
        arrays.copy = copy;
        function swap(array, i, j) {
            if (i < 0 || i >= array.length || j < 0 || j >= array.length) {
                return false;
            }
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            return true;
        }
        arrays.swap = swap;
        function toString(array) {
            return '[' + array.toString() + ']';
        }
        arrays.toString = toString;
        function forEach(array, callback) {
            var lenght = array.length;
            for (var i = 0; i < lenght; i++) {
                if (callback(array[i]) === false) {
                    return;
                }
            }
        }
        arrays.forEach = forEach;
    })(arrays = collections.arrays || (collections.arrays = {}));
    class LinkedList {
        constructor() {
            this.firstNode = null;
            this.lastNode = null;
            this.nElements = 0;
        }
        add(item, index) {
            if (collections.isUndefined(index)) {
                index = this.nElements;
            }
            if (index < 0 || index > this.nElements || collections.isUndefined(item)) {
                return false;
            }
            var newNode = this.createNode(item);
            if (this.nElements === 0) {
                this.firstNode = newNode;
                this.lastNode = newNode;
            }
            else if (index === this.nElements) {
                this.lastNode.next = newNode;
                this.lastNode = newNode;
            }
            else if (index === 0) {
                newNode.next = this.firstNode;
                this.firstNode = newNode;
            }
            else {
                var prev = this.nodeAtIndex(index - 1);
                newNode.next = prev.next;
                prev.next = newNode;
            }
            this.nElements++;
            return true;
        }
        first() {
            if (this.firstNode !== null) {
                return this.firstNode.element;
            }
            return undefined;
        }
        last() {
            if (this.lastNode !== null) {
                return this.lastNode.element;
            }
            return undefined;
        }
        elementAtIndex(index) {
            var node = this.nodeAtIndex(index);
            if (node === null) {
                return undefined;
            }
            return node.element;
        }
        indexOf(item, equalsFunction) {
            var equalsF = equalsFunction || collections.defaultEquals;
            if (collections.isUndefined(item)) {
                return -1;
            }
            var currentNode = this.firstNode;
            var index = 0;
            while (currentNode !== null) {
                if (equalsF(currentNode.element, item)) {
                    return index;
                }
                index++;
                currentNode = currentNode.next;
            }
            return -1;
        }
        contains(item, equalsFunction) {
            return (this.indexOf(item, equalsFunction) >= 0);
        }
        remove(item, equalsFunction) {
            var equalsF = equalsFunction || collections.defaultEquals;
            if (this.nElements < 1 || collections.isUndefined(item)) {
                return false;
            }
            var previous = null;
            var currentNode = this.firstNode;
            while (currentNode !== null) {
                if (equalsF(currentNode.element, item)) {
                    if (currentNode === this.firstNode) {
                        this.firstNode = this.firstNode.next;
                        if (currentNode === this.lastNode) {
                            this.lastNode = null;
                        }
                    }
                    else if (currentNode === this.lastNode) {
                        this.lastNode = previous;
                        previous.next = currentNode.next;
                        currentNode.next = null;
                    }
                    else {
                        previous.next = currentNode.next;
                        currentNode.next = null;
                    }
                    this.nElements--;
                    return true;
                }
                previous = currentNode;
                currentNode = currentNode.next;
            }
            return false;
        }
        clear() {
            this.firstNode = null;
            this.lastNode = null;
            this.nElements = 0;
        }
        equals(other, equalsFunction) {
            var eqF = equalsFunction || collections.defaultEquals;
            if (!(other instanceof collections.LinkedList)) {
                return false;
            }
            if (this.size() !== other.size()) {
                return false;
            }
            return this.equalsAux(this.firstNode, other.firstNode, eqF);
        }
        equalsAux(n1, n2, eqF) {
            while (n1 !== null) {
                if (!eqF(n1.element, n2.element)) {
                    return false;
                }
                n1 = n1.next;
                n2 = n2.next;
            }
            return true;
        }
        removeElementAtIndex(index) {
            if (index < 0 || index >= this.nElements) {
                return undefined;
            }
            var element;
            if (this.nElements === 1) {
                element = this.firstNode.element;
                this.firstNode = null;
                this.lastNode = null;
            }
            else {
                var previous = this.nodeAtIndex(index - 1);
                if (previous === null) {
                    element = this.firstNode.element;
                    this.firstNode = this.firstNode.next;
                }
                else if (previous.next === this.lastNode) {
                    element = this.lastNode.element;
                    this.lastNode = previous;
                }
                if (previous !== null) {
                    element = previous.next.element;
                    previous.next = previous.next.next;
                }
            }
            this.nElements--;
            return element;
        }
        forEach(callback) {
            var currentNode = this.firstNode;
            while (currentNode !== null) {
                if (callback(currentNode.element) === false) {
                    break;
                }
                currentNode = currentNode.next;
            }
        }
        reverse() {
            var previous = null;
            var current = this.firstNode;
            var temp = null;
            while (current !== null) {
                temp = current.next;
                current.next = previous;
                previous = current;
                current = temp;
            }
            temp = this.firstNode;
            this.firstNode = this.lastNode;
            this.lastNode = temp;
        }
        toArray() {
            var array = [];
            var currentNode = this.firstNode;
            while (currentNode !== null) {
                array.push(currentNode.element);
                currentNode = currentNode.next;
            }
            return array;
        }
        size() {
            return this.nElements;
        }
        isEmpty() {
            return this.nElements <= 0;
        }
        toString() {
            return collections.arrays.toString(this.toArray());
        }
        nodeAtIndex(index) {
            if (index < 0 || index >= this.nElements) {
                return null;
            }
            if (index === (this.nElements - 1)) {
                return this.lastNode;
            }
            var node = this.firstNode;
            for (var i = 0; i < index; i++) {
                node = node.next;
            }
            return node;
        }
        createNode(item) {
            return {
                element: item,
                next: null
            };
        }
    }
    collections.LinkedList = LinkedList;
    class Dictionary {
        constructor(toStrFunction) {
            this.table = {};
            this.nElements = 0;
            this.toStr = toStrFunction || collections.defaultToString;
        }
        getValue(key) {
            var pair = this.table['$' + this.toStr(key)];
            if (collections.isUndefined(pair)) {
                return undefined;
            }
            return pair.value;
        }
        setValue(key, value) {
            if (collections.isUndefined(key) || collections.isUndefined(value)) {
                return undefined;
            }
            var ret;
            var k = '$' + this.toStr(key);
            var previousElement = this.table[k];
            if (collections.isUndefined(previousElement)) {
                this.nElements++;
                ret = undefined;
            }
            else {
                ret = previousElement.value;
            }
            this.table[k] = {
                key: key,
                value: value
            };
            return ret;
        }
        remove(key) {
            var k = '$' + this.toStr(key);
            var previousElement = this.table[k];
            if (!collections.isUndefined(previousElement)) {
                delete this.table[k];
                this.nElements--;
                return previousElement.value;
            }
            return undefined;
        }
        keys() {
            var array = [];
            for (var name in this.table) {
                if (has(this.table, name)) {
                    var pair = this.table[name];
                    array.push(pair.key);
                }
            }
            return array;
        }
        values() {
            var array = [];
            for (var name in this.table) {
                if (has(this.table, name)) {
                    var pair = this.table[name];
                    array.push(pair.value);
                }
            }
            return array;
        }
        forEach(callback) {
            for (var name in this.table) {
                if (has(this.table, name)) {
                    var pair = this.table[name];
                    var ret = callback(pair.key, pair.value);
                    if (ret === false) {
                        return;
                    }
                }
            }
        }
        containsKey(key) {
            return !collections.isUndefined(this.getValue(key));
        }
        clear() {
            this.table = {};
            this.nElements = 0;
        }
        size() {
            return this.nElements;
        }
        isEmpty() {
            return this.nElements <= 0;
        }
        toString() {
            var toret = "{";
            this.forEach((k, v) => {
                toret = toret + "\n\t" + k.toString() + " : " + v.toString();
            });
            return toret + "\n}";
        }
    }
    collections.Dictionary = Dictionary;
    class LinkedDictionaryPair {
        constructor(key, value) {
            this.key = key;
            this.value = value;
        }
        unlink() {
            this.prev.next = this.next;
            this.next.prev = this.prev;
        }
    }
    class LinkedDictionary extends Dictionary {
        constructor(toStrFunction) {
            super(toStrFunction);
            this.head = new LinkedDictionaryPair(null, null);
            this.tail = new LinkedDictionaryPair(null, null);
            this.head.next = this.tail;
            this.tail.prev = this.head;
        }
        appendToTail(entry) {
            var lastNode = this.tail.prev;
            lastNode.next = entry;
            entry.prev = lastNode;
            entry.next = this.tail;
            this.tail.prev = entry;
        }
        getLinkedDictionaryPair(key) {
            if (collections.isUndefined(key)) {
                return undefined;
            }
            var k = '$' + this.toStr(key);
            var pair = (this.table[k]);
            return pair;
        }
        getValue(key) {
            var pair = this.getLinkedDictionaryPair(key);
            if (!collections.isUndefined(pair)) {
                return pair.value;
            }
            return undefined;
        }
        remove(key) {
            var pair = this.getLinkedDictionaryPair(key);
            if (!collections.isUndefined(pair)) {
                super.remove(key);
                pair.unlink();
                return pair.value;
            }
            return undefined;
        }
        clear() {
            super.clear();
            this.head.next = this.tail;
            this.tail.prev = this.head;
        }
        replace(oldPair, newPair) {
            var k = '$' + this.toStr(newPair.key);
            newPair.next = oldPair.next;
            newPair.prev = oldPair.prev;
            this.remove(oldPair.key);
            newPair.prev.next = newPair;
            newPair.next.prev = newPair;
            this.table[k] = newPair;
            ++this.nElements;
        }
        setValue(key, value) {
            if (collections.isUndefined(key) || collections.isUndefined(value)) {
                return undefined;
            }
            var existingPair = this.getLinkedDictionaryPair(key);
            var newPair = new LinkedDictionaryPair(key, value);
            var k = '$' + this.toStr(key);
            if (!collections.isUndefined(existingPair)) {
                this.replace(existingPair, newPair);
                return existingPair.value;
            }
            else {
                this.appendToTail(newPair);
                this.table[k] = newPair;
                ++this.nElements;
                return undefined;
            }
        }
        keys() {
            var array = [];
            this.forEach((key, value) => {
                array.push(key);
            });
            return array;
        }
        values() {
            var array = [];
            this.forEach((key, value) => {
                array.push(value);
            });
            return array;
        }
        forEach(callback) {
            var crawlNode = this.head.next;
            while (crawlNode.next != null) {
                var ret = callback(crawlNode.key, crawlNode.value);
                if (ret === false) {
                    return;
                }
                crawlNode = crawlNode.next;
            }
        }
    }
    collections.LinkedDictionary = LinkedDictionary;
    class MultiDictionary {
        constructor(toStrFunction, valuesEqualsFunction, allowDuplicateValues = false) {
            this.dict = new Dictionary(toStrFunction);
            this.equalsF = valuesEqualsFunction || collections.defaultEquals;
            this.allowDuplicate = allowDuplicateValues;
        }
        getValue(key) {
            var values = this.dict.getValue(key);
            if (collections.isUndefined(values)) {
                return [];
            }
            return collections.arrays.copy(values);
        }
        setValue(key, value) {
            if (collections.isUndefined(key) || collections.isUndefined(value)) {
                return false;
            }
            if (!this.containsKey(key)) {
                this.dict.setValue(key, [value]);
                return true;
            }
            var array = this.dict.getValue(key);
            if (!this.allowDuplicate) {
                if (collections.arrays.contains(array, value, this.equalsF)) {
                    return false;
                }
            }
            array.push(value);
            return true;
        }
        remove(key, value) {
            if (collections.isUndefined(value)) {
                var v = this.dict.remove(key);
                return !collections.isUndefined(v);
            }
            var array = this.dict.getValue(key);
            if (collections.arrays.remove(array, value, this.equalsF)) {
                if (array.length === 0) {
                    this.dict.remove(key);
                }
                return true;
            }
            return false;
        }
        keys() {
            return this.dict.keys();
        }
        values() {
            var values = this.dict.values();
            var array = [];
            for (var i = 0; i < values.length; i++) {
                var v = values[i];
                for (var j = 0; j < v.length; j++) {
                    array.push(v[j]);
                }
            }
            return array;
        }
        containsKey(key) {
            return this.dict.containsKey(key);
        }
        clear() {
            this.dict.clear();
        }
        size() {
            return this.dict.size();
        }
        isEmpty() {
            return this.dict.isEmpty();
        }
    }
    collections.MultiDictionary = MultiDictionary;
    class Heap {
        constructor(compareFunction) {
            this.data = [];
            this.compare = compareFunction || collections.defaultCompare;
        }
        leftChildIndex(nodeIndex) {
            return (2 * nodeIndex) + 1;
        }
        rightChildIndex(nodeIndex) {
            return (2 * nodeIndex) + 2;
        }
        parentIndex(nodeIndex) {
            return Math.floor((nodeIndex - 1) / 2);
        }
        minIndex(leftChild, rightChild) {
            if (rightChild >= this.data.length) {
                if (leftChild >= this.data.length) {
                    return -1;
                }
                else {
                    return leftChild;
                }
            }
            else {
                if (this.compare(this.data[leftChild], this.data[rightChild]) <= 0) {
                    return leftChild;
                }
                else {
                    return rightChild;
                }
            }
        }
        siftUp(index) {
            var parent = this.parentIndex(index);
            while (index > 0 && this.compare(this.data[parent], this.data[index]) > 0) {
                collections.arrays.swap(this.data, parent, index);
                index = parent;
                parent = this.parentIndex(index);
            }
        }
        siftDown(nodeIndex) {
            var min = this.minIndex(this.leftChildIndex(nodeIndex), this.rightChildIndex(nodeIndex));
            while (min >= 0 && this.compare(this.data[nodeIndex], this.data[min]) > 0) {
                collections.arrays.swap(this.data, min, nodeIndex);
                nodeIndex = min;
                min = this.minIndex(this.leftChildIndex(nodeIndex), this.rightChildIndex(nodeIndex));
            }
        }
        peek() {
            if (this.data.length > 0) {
                return this.data[0];
            }
            else {
                return undefined;
            }
        }
        add(element) {
            if (collections.isUndefined(element)) {
                return undefined;
            }
            this.data.push(element);
            this.siftUp(this.data.length - 1);
            return true;
        }
        removeRoot() {
            if (this.data.length > 0) {
                var obj = this.data[0];
                this.data[0] = this.data[this.data.length - 1];
                this.data.splice(this.data.length - 1, 1);
                if (this.data.length > 0) {
                    this.siftDown(0);
                }
                return obj;
            }
            return undefined;
        }
        contains(element) {
            var equF = collections.compareToEquals(this.compare);
            return collections.arrays.contains(this.data, element, equF);
        }
        size() {
            return this.data.length;
        }
        isEmpty() {
            return this.data.length <= 0;
        }
        clear() {
            this.data.length = 0;
        }
        forEach(callback) {
            collections.arrays.forEach(this.data, callback);
        }
    }
    collections.Heap = Heap;
    class Stack {
        constructor() {
            this.list = new LinkedList();
        }
        push(elem) {
            return this.list.add(elem, 0);
        }
        add(elem) {
            return this.list.add(elem, 0);
        }
        pop() {
            return this.list.removeElementAtIndex(0);
        }
        peek() {
            return this.list.first();
        }
        size() {
            return this.list.size();
        }
        contains(elem, equalsFunction) {
            return this.list.contains(elem, equalsFunction);
        }
        isEmpty() {
            return this.list.isEmpty();
        }
        clear() {
            this.list.clear();
        }
        forEach(callback) {
            this.list.forEach(callback);
        }
    }
    collections.Stack = Stack;
    class Queue {
        constructor() {
            this.list = new LinkedList();
        }
        enqueue(elem) {
            return this.list.add(elem);
        }
        add(elem) {
            return this.list.add(elem);
        }
        dequeue() {
            if (this.list.size() !== 0) {
                var el = this.list.first();
                this.list.removeElementAtIndex(0);
                return el;
            }
            return undefined;
        }
        peek() {
            if (this.list.size() !== 0) {
                return this.list.first();
            }
            return undefined;
        }
        size() {
            return this.list.size();
        }
        contains(elem, equalsFunction) {
            return this.list.contains(elem, equalsFunction);
        }
        isEmpty() {
            return this.list.size() <= 0;
        }
        clear() {
            this.list.clear();
        }
        forEach(callback) {
            this.list.forEach(callback);
        }
    }
    collections.Queue = Queue;
    class PriorityQueue {
        constructor(compareFunction) {
            this.heap = new Heap(collections.reverseCompareFunction(compareFunction));
        }
        enqueue(element) {
            return this.heap.add(element);
        }
        add(element) {
            return this.heap.add(element);
        }
        dequeue() {
            if (this.heap.size() !== 0) {
                var el = this.heap.peek();
                this.heap.removeRoot();
                return el;
            }
            return undefined;
        }
        peek() {
            return this.heap.peek();
        }
        contains(element) {
            return this.heap.contains(element);
        }
        isEmpty() {
            return this.heap.isEmpty();
        }
        size() {
            return this.heap.size();
        }
        clear() {
            this.heap.clear();
        }
        forEach(callback) {
            this.heap.forEach(callback);
        }
    }
    collections.PriorityQueue = PriorityQueue;
    class Set {
        constructor(toStringFunction) {
            this.dictionary = new Dictionary(toStringFunction);
        }
        contains(element) {
            return this.dictionary.containsKey(element);
        }
        add(element) {
            if (this.contains(element) || collections.isUndefined(element)) {
                return false;
            }
            else {
                this.dictionary.setValue(element, element);
                return true;
            }
        }
        intersection(otherSet) {
            var set = this;
            this.forEach(function (element) {
                if (!otherSet.contains(element)) {
                    set.remove(element);
                }
                return true;
            });
        }
        union(otherSet) {
            var set = this;
            otherSet.forEach(function (element) {
                set.add(element);
                return true;
            });
        }
        difference(otherSet) {
            var set = this;
            otherSet.forEach(function (element) {
                set.remove(element);
                return true;
            });
        }
        isSubsetOf(otherSet) {
            if (this.size() > otherSet.size()) {
                return false;
            }
            var isSub = true;
            this.forEach(function (element) {
                if (!otherSet.contains(element)) {
                    isSub = false;
                    return false;
                }
                return true;
            });
            return isSub;
        }
        remove(element) {
            if (!this.contains(element)) {
                return false;
            }
            else {
                this.dictionary.remove(element);
                return true;
            }
        }
        forEach(callback) {
            this.dictionary.forEach(function (k, v) {
                return callback(v);
            });
        }
        toArray() {
            return this.dictionary.values();
        }
        isEmpty() {
            return this.dictionary.isEmpty();
        }
        size() {
            return this.dictionary.size();
        }
        clear() {
            this.dictionary.clear();
        }
        toString() {
            return collections.arrays.toString(this.toArray());
        }
    }
    collections.Set = Set;
    class Bag {
        constructor(toStrFunction) {
            this.toStrF = toStrFunction || collections.defaultToString;
            this.dictionary = new Dictionary(this.toStrF);
            this.nElements = 0;
        }
        add(element, nCopies = 1) {
            if (collections.isUndefined(element) || nCopies <= 0) {
                return false;
            }
            if (!this.contains(element)) {
                var node = {
                    value: element,
                    copies: nCopies
                };
                this.dictionary.setValue(element, node);
            }
            else {
                this.dictionary.getValue(element).copies += nCopies;
            }
            this.nElements += nCopies;
            return true;
        }
        count(element) {
            if (!this.contains(element)) {
                return 0;
            }
            else {
                return this.dictionary.getValue(element).copies;
            }
        }
        contains(element) {
            return this.dictionary.containsKey(element);
        }
        remove(element, nCopies = 1) {
            if (collections.isUndefined(element) || nCopies <= 0) {
                return false;
            }
            if (!this.contains(element)) {
                return false;
            }
            else {
                var node = this.dictionary.getValue(element);
                if (nCopies > node.copies) {
                    this.nElements -= node.copies;
                }
                else {
                    this.nElements -= nCopies;
                }
                node.copies -= nCopies;
                if (node.copies <= 0) {
                    this.dictionary.remove(element);
                }
                return true;
            }
        }
        toArray() {
            var a = [];
            var values = this.dictionary.values();
            var vl = values.length;
            for (var i = 0; i < vl; i++) {
                var node = values[i];
                var element = node.value;
                var copies = node.copies;
                for (var j = 0; j < copies; j++) {
                    a.push(element);
                }
            }
            return a;
        }
        toSet() {
            var toret = new Set(this.toStrF);
            var elements = this.dictionary.values();
            var l = elements.length;
            for (var i = 0; i < l; i++) {
                var value = elements[i].value;
                toret.add(value);
            }
            return toret;
        }
        forEach(callback) {
            this.dictionary.forEach(function (k, v) {
                var value = v.value;
                var copies = v.copies;
                for (var i = 0; i < copies; i++) {
                    if (callback(value) === false) {
                        return false;
                    }
                }
                return true;
            });
        }
        size() {
            return this.nElements;
        }
        isEmpty() {
            return this.nElements === 0;
        }
        clear() {
            this.nElements = 0;
            this.dictionary.clear();
        }
    }
    collections.Bag = Bag;
    class BSTree {
        constructor(compareFunction) {
            this.root = null;
            this.compare = compareFunction || collections.defaultCompare;
            this.nElements = 0;
        }
        add(element) {
            if (collections.isUndefined(element)) {
                return false;
            }
            if (this.insertNode(this.createNode(element)) !== null) {
                this.nElements++;
                return true;
            }
            return false;
        }
        clear() {
            this.root = null;
            this.nElements = 0;
        }
        isEmpty() {
            return this.nElements === 0;
        }
        size() {
            return this.nElements;
        }
        contains(element) {
            if (collections.isUndefined(element)) {
                return false;
            }
            return this.searchNode(this.root, element) !== null;
        }
        remove(element) {
            var node = this.searchNode(this.root, element);
            if (node === null) {
                return false;
            }
            this.removeNode(node);
            this.nElements--;
            return true;
        }
        inorderTraversal(callback) {
            this.inorderTraversalAux(this.root, callback, {
                stop: false
            });
        }
        preorderTraversal(callback) {
            this.preorderTraversalAux(this.root, callback, {
                stop: false
            });
        }
        postorderTraversal(callback) {
            this.postorderTraversalAux(this.root, callback, {
                stop: false
            });
        }
        levelTraversal(callback) {
            this.levelTraversalAux(this.root, callback);
        }
        minimum() {
            if (this.isEmpty()) {
                return undefined;
            }
            return this.minimumAux(this.root).element;
        }
        maximum() {
            if (this.isEmpty()) {
                return undefined;
            }
            return this.maximumAux(this.root).element;
        }
        forEach(callback) {
            this.inorderTraversal(callback);
        }
        toArray() {
            var array = [];
            this.inorderTraversal(function (element) {
                array.push(element);
                return true;
            });
            return array;
        }
        height() {
            return this.heightAux(this.root);
        }
        searchNode(node, element) {
            var cmp = null;
            while (node !== null && cmp !== 0) {
                cmp = this.compare(element, node.element);
                if (cmp < 0) {
                    node = node.leftCh;
                }
                else if (cmp > 0) {
                    node = node.rightCh;
                }
            }
            return node;
        }
        transplant(n1, n2) {
            if (n1.parent === null) {
                this.root = n2;
            }
            else if (n1 === n1.parent.leftCh) {
                n1.parent.leftCh = n2;
            }
            else {
                n1.parent.rightCh = n2;
            }
            if (n2 !== null) {
                n2.parent = n1.parent;
            }
        }
        removeNode(node) {
            if (node.leftCh === null) {
                this.transplant(node, node.rightCh);
            }
            else if (node.rightCh === null) {
                this.transplant(node, node.leftCh);
            }
            else {
                var y = this.minimumAux(node.rightCh);
                if (y.parent !== node) {
                    this.transplant(y, y.rightCh);
                    y.rightCh = node.rightCh;
                    y.rightCh.parent = y;
                }
                this.transplant(node, y);
                y.leftCh = node.leftCh;
                y.leftCh.parent = y;
            }
        }
        inorderTraversalAux(node, callback, signal) {
            if (node === null || signal.stop) {
                return;
            }
            this.inorderTraversalAux(node.leftCh, callback, signal);
            if (signal.stop) {
                return;
            }
            signal.stop = callback(node.element) === false;
            if (signal.stop) {
                return;
            }
            this.inorderTraversalAux(node.rightCh, callback, signal);
        }
        levelTraversalAux(node, callback) {
            var queue = new Queue();
            if (node !== null) {
                queue.enqueue(node);
            }
            while (!queue.isEmpty()) {
                node = queue.dequeue();
                if (callback(node.element) === false) {
                    return;
                }
                if (node.leftCh !== null) {
                    queue.enqueue(node.leftCh);
                }
                if (node.rightCh !== null) {
                    queue.enqueue(node.rightCh);
                }
            }
        }
        preorderTraversalAux(node, callback, signal) {
            if (node === null || signal.stop) {
                return;
            }
            signal.stop = callback(node.element) === false;
            if (signal.stop) {
                return;
            }
            this.preorderTraversalAux(node.leftCh, callback, signal);
            if (signal.stop) {
                return;
            }
            this.preorderTraversalAux(node.rightCh, callback, signal);
        }
        postorderTraversalAux(node, callback, signal) {
            if (node === null || signal.stop) {
                return;
            }
            this.postorderTraversalAux(node.leftCh, callback, signal);
            if (signal.stop) {
                return;
            }
            this.postorderTraversalAux(node.rightCh, callback, signal);
            if (signal.stop) {
                return;
            }
            signal.stop = callback(node.element) === false;
        }
        minimumAux(node) {
            while (node.leftCh !== null) {
                node = node.leftCh;
            }
            return node;
        }
        maximumAux(node) {
            while (node.rightCh !== null) {
                node = node.rightCh;
            }
            return node;
        }
        heightAux(node) {
            if (node === null) {
                return -1;
            }
            return Math.max(this.heightAux(node.leftCh), this.heightAux(node.rightCh)) + 1;
        }
        insertNode(node) {
            var parent = null;
            var position = this.root;
            var cmp = null;
            while (position !== null) {
                cmp = this.compare(node.element, position.element);
                if (cmp === 0) {
                    return null;
                }
                else if (cmp < 0) {
                    parent = position;
                    position = position.leftCh;
                }
                else {
                    parent = position;
                    position = position.rightCh;
                }
            }
            node.parent = parent;
            if (parent === null) {
                this.root = node;
            }
            else if (this.compare(node.element, parent.element) < 0) {
                parent.leftCh = node;
            }
            else {
                parent.rightCh = node;
            }
            return node;
        }
        createNode(element) {
            return {
                element: element,
                leftCh: null,
                rightCh: null,
                parent: null
            };
        }
    }
    collections.BSTree = BSTree;
})(collections || (collections = {}));
//# sourceMappingURL=collections.js.map
// https://stackoverflow.com/questions/9514179/how-to-find-the-operating-system-version-using-javascript/9514341
// https://jsfiddle.net/ChristianL/AVyND/
/**
 * JavaScript Client Detection
 * (C) viazenetti GmbH (Christian Ludwig)
 */
(function (window) {
    {
        var unknown = '-';

        // screen
        var screenSize = '';
        if (screen.width) {
            width = (screen.width) ? screen.width : '';
            height = (screen.height) ? screen.height : '';
            screenSize += '' + width + " x " + height;
        }

        // browser
        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;
        var browser = navigator.appName;
        var version = '' + parseFloat(navigator.appVersion);
        var majorVersion = parseInt(navigator.appVersion, 10);
        var nameOffset, verOffset, ix;

        // Opera
        if ((verOffset = nAgt.indexOf('Opera')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Opera Next
        if ((verOffset = nAgt.indexOf('OPR')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 4);
        }
        // Edge
        else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
            browser = 'Microsoft Edge';
            version = nAgt.substring(verOffset + 5);
        }
        // MSIE
        else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(verOffset + 5);
        }
        // Chrome
        else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
            browser = 'Chrome';
            version = nAgt.substring(verOffset + 7);
        }
        // Safari
        else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
            browser = 'Safari';
            version = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Firefox
        else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
            browser = 'Firefox';
            version = nAgt.substring(verOffset + 8);
        }
        // MSIE 11+
        else if (nAgt.indexOf('Trident/') != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(nAgt.indexOf('rv:') + 3);
        }
        // Other browsers
        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
            browser = nAgt.substring(nameOffset, verOffset);
            version = nAgt.substring(verOffset + 1);
            if (browser.toLowerCase() == browser.toUpperCase()) {
                browser = navigator.appName;
            }
        }
        // trim the version string
        if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

        majorVersion = parseInt('' + version, 10);
        if (isNaN(majorVersion)) {
            version = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }

        // mobile version
        var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

        // cookie
        var cookieEnabled = (navigator.cookieEnabled) ? true : false;

        if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
            document.cookie = 'testcookie';
            cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
        }

        // system
        var os = unknown;
        var clientStrings = [
            { s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ },
            { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
            { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
            { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
            { s: 'Windows Vista', r: /Windows NT 6.0/ },
            { s: 'Windows Server 2003', r: /Windows NT 5.2/ },
            { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
            { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
            { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
            { s: 'Windows 98', r: /(Windows 98|Win98)/ },
            { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
            { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
            { s: 'Windows CE', r: /Windows CE/ },
            { s: 'Windows 3.11', r: /Win16/ },
            { s: 'Android', r: /Android/ },
            { s: 'Open BSD', r: /OpenBSD/ },
            { s: 'Sun OS', r: /SunOS/ },
            { s: 'Linux', r: /(Linux|X11)/ },
            { s: 'iOS', r: /(iPhone|iPad|iPod)/ },
            { s: 'Mac OS X', r: /Mac OS X/ },
            { s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
            { s: 'QNX', r: /QNX/ },
            { s: 'UNIX', r: /UNIX/ },
            { s: 'BeOS', r: /BeOS/ },
            { s: 'OS/2', r: /OS\/2/ },
            { s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ }
        ];
        for (var id in clientStrings) {
            var cs = clientStrings[id];
            if (cs.r.test(nAgt)) {
                os = cs.s;
                break;
            }
        }

        var osVersion = unknown;

        if (/Windows/.test(os)) {
            osVersion = /Windows (.*)/.exec(os)[1];
            os = 'Windows';
        }

        switch (os) {
            case 'Mac OS X':
                osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'Android':
                osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'iOS':
                osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                break;
        }

        // flash (you'll need to include swfobject)
        /* script src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js" */
        var flashVersion = 'no check';
        if (typeof swfobject != 'undefined') {
            var fv = swfobject.getFlashPlayerVersion();
            if (fv.major > 0) {
                flashVersion = fv.major + '.' + fv.minor + ' r' + fv.release;
            }
            else {
                flashVersion = unknown;
            }
        }
    }

    window._clientDetection = {
        screen: screenSize,
        browser: browser,
        browserVersion: version,
        browserMajorVersion: majorVersion,
        mobile: mobile,
        os: os,
        osVersion: osVersion,
        cookies: cookieEnabled,
        flashVersion: flashVersion
    };
}(this));




/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

// minimal template polyfill
(function () {
    'use strict';

    var needsTemplate = (typeof HTMLTemplateElement === 'undefined');
    var brokenDocFragment = !(document.createDocumentFragment().cloneNode() instanceof DocumentFragment);
    var needsDocFrag = false;

    // NOTE: Replace DocumentFragment to work around IE11 bug that
    // causes children of a document fragment modified while
    // there is a mutation observer to not have a parentNode, or
    // have a broken parentNode (!?!)
    if (/Trident/.test(navigator.userAgent)) {
        (function () {

            needsDocFrag = true;

            var origCloneNode = Node.prototype.cloneNode;
            Node.prototype.cloneNode = function cloneNode(deep) {
                var newDom = origCloneNode.call(this, deep);
                if (this instanceof DocumentFragment) {
                    newDom.__proto__ = DocumentFragment.prototype;
                }
                return newDom;
            };

            // IE's DocumentFragment querySelector code doesn't work when
            // called on an element instance
            DocumentFragment.prototype.querySelectorAll = HTMLElement.prototype.querySelectorAll;
            DocumentFragment.prototype.querySelector = HTMLElement.prototype.querySelector;

            Object.defineProperties(DocumentFragment.prototype, {
                'nodeType': {
                    get: function () {
                        return Node.DOCUMENT_FRAGMENT_NODE;
                    },
                    configurable: true
                },

                'localName': {
                    get: function () {
                        return undefined;
                    },
                    configurable: true
                },

                'nodeName': {
                    get: function () {
                        return '#document-fragment';
                    },
                    configurable: true
                }
            });

            var origInsertBefore = Node.prototype.insertBefore;
            function insertBefore(newNode, refNode) {
                if (newNode instanceof DocumentFragment) {
                    var child;
                    while ((child = newNode.firstChild)) {
                        origInsertBefore.call(this, child, refNode);
                    }
                } else {
                    origInsertBefore.call(this, newNode, refNode);
                }
                return newNode;
            }
            Node.prototype.insertBefore = insertBefore;

            var origAppendChild = Node.prototype.appendChild;
            Node.prototype.appendChild = function appendChild(child) {
                if (child instanceof DocumentFragment) {
                    insertBefore.call(this, child, null);
                } else {
                    origAppendChild.call(this, child);
                }
                return child;
            };

            var origRemoveChild = Node.prototype.removeChild;
            var origReplaceChild = Node.prototype.replaceChild;
            Node.prototype.replaceChild = function replaceChild(newChild, oldChild) {
                if (newChild instanceof DocumentFragment) {
                    insertBefore.call(this, newChild, oldChild);
                    origRemoveChild.call(this, oldChild);
                } else {
                    origReplaceChild.call(this, newChild, oldChild);
                }
                return oldChild;
            };

            Document.prototype.createDocumentFragment = function createDocumentFragment() {
                var frag = this.createElement('df');
                frag.__proto__ = DocumentFragment.prototype;
                return frag;
            };

            var origImportNode = Document.prototype.importNode;
            Document.prototype.importNode = function importNode(impNode, deep) {
                deep = deep || false;
                var newNode = origImportNode.call(this, impNode, deep);
                if (impNode instanceof DocumentFragment) {
                    newNode.__proto__ = DocumentFragment.prototype;
                }
                return newNode;
            };
        })();
    }

    // NOTE: we rely on this cloneNode not causing element upgrade.
    // This means this polyfill must load before the CE polyfill and
    // this would need to be re-worked if a browser supports native CE
    // but not <template>.
    var capturedCloneNode = Node.prototype.cloneNode;
    var capturedCreateElement = Document.prototype.createElement;
    var capturedImportNode = Document.prototype.importNode;
    var capturedRemoveChild = Node.prototype.removeChild;
    var capturedAppendChild = Node.prototype.appendChild;
    var capturedReplaceChild = Node.prototype.replaceChild;
    var capturedParseFromString = DOMParser.prototype.parseFromString;
    var capturedHTMLElementInnerHTML = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, 'innerHTML') || {
        get: function () {
            return this.innerHTML;
        },
        set: function (text) {
            this.innerHTML = text;
        }
    };
    var capturedChildNodes = Object.getOwnPropertyDescriptor(window.Node.prototype, 'childNodes') || {
        get: function () {
            return this.childNodes;
        }
    };

    var elementQuerySelectorAll = Element.prototype.querySelectorAll;
    var docQuerySelectorAll = Document.prototype.querySelectorAll;
    var fragQuerySelectorAll = DocumentFragment.prototype.querySelectorAll;

    var scriptSelector = 'script:not([type]),script[type="application/javascript"],script[type="text/javascript"]';

    function QSA(node, selector) {
        // IE 11 throws a SyntaxError with `scriptSelector` if the node has no children due to the `:not([type])` syntax
        if (!node.childNodes.length) {
            return [];
        }
        switch (node.nodeType) {
            case Node.DOCUMENT_NODE:
                return docQuerySelectorAll.call(node, selector);
            case Node.DOCUMENT_FRAGMENT_NODE:
                return fragQuerySelectorAll.call(node, selector);
            default:
                return elementQuerySelectorAll.call(node, selector);
        }
    }

    // returns true if nested templates cannot be cloned (they cannot be on
    // some impl's like Safari 8 and Edge)
    // OR if cloning a document fragment does not result in a document fragment
    var needsCloning = (function () {
        if (!needsTemplate) {
            var t = document.createElement('template');
            var t2 = document.createElement('template');
            t2.content.appendChild(document.createElement('div'));
            t.content.appendChild(t2);
            var clone = t.cloneNode(true);
            return (clone.content.childNodes.length === 0 || clone.content.firstChild.content.childNodes.length === 0
                || brokenDocFragment);
        }
    })();

    var TEMPLATE_TAG = 'template';
    var PolyfilledHTMLTemplateElement = function () { };

    if (needsTemplate) {

        var contentDoc = document.implementation.createHTMLDocument('template');
        var canDecorate = true;

        var templateStyle = document.createElement('style');
        templateStyle.textContent = TEMPLATE_TAG + '{display:none;}';

        var head = document.head;
        head.insertBefore(templateStyle, head.firstElementChild);

        /**
          Provides a minimal shim for the <template> element.
        */
        PolyfilledHTMLTemplateElement.prototype = Object.create(HTMLElement.prototype);


        // if elements do not have `innerHTML` on instances, then
        // templates can be patched by swizzling their prototypes.
        var canProtoPatch =
            !(document.createElement('div').hasOwnProperty('innerHTML'));

        /*
          The `decorate` method moves element children to the template's `content`.
          NOTE: there is no support for dynamically adding elements to templates.
        */
        PolyfilledHTMLTemplateElement.decorate = function (template) {
            // if the template is decorated or not in HTML namespace, return fast
            if (template.content ||
                template.namespaceURI !== document.documentElement.namespaceURI) {
                return;
            }
            template.content = contentDoc.createDocumentFragment();
            var child;
            while ((child = template.firstChild)) {
                capturedAppendChild.call(template.content, child);
            }
            // NOTE: prefer prototype patching for performance and
            // because on some browsers (IE11), re-defining `innerHTML`
            // can result in intermittent errors.
            if (canProtoPatch) {
                template.__proto__ = PolyfilledHTMLTemplateElement.prototype;
            } else {
                template.cloneNode = function (deep) {
                    return PolyfilledHTMLTemplateElement._cloneNode(this, deep);
                };
                // add innerHTML to template, if possible
                // Note: this throws on Safari 7
                if (canDecorate) {
                    try {
                        defineInnerHTML(template);
                        defineOuterHTML(template);
                    } catch (err) {
                        canDecorate = false;
                    }
                }
            }
            // bootstrap recursively
            PolyfilledHTMLTemplateElement.bootstrap(template.content);
        };

        // Taken from https://github.com/jquery/jquery/blob/73d7e6259c63ac45f42c6593da8c2796c6ce9281/src/manipulation/wrapMap.js
        var topLevelWrappingMap = {
            'option': ['select'],
            'thead': ['table'],
            'col': ['colgroup', 'table'],
            'tr': ['tbody', 'table'],
            'th': ['tr', 'tbody', 'table'],
            'td': ['tr', 'tbody', 'table']
        };

        var getTagName = function (text) {
            // Taken from https://github.com/jquery/jquery/blob/73d7e6259c63ac45f42c6593da8c2796c6ce9281/src/manipulation/var/rtagName.js
            return (/<([a-z][^/\0>\x20\t\r\n\f]+)/i.exec(text) || ['', ''])[1].toLowerCase();
        };

        var defineInnerHTML = function defineInnerHTML(obj) {
            Object.defineProperty(obj, 'innerHTML', {
                get: function () {
                    return getInnerHTML(this);
                },
                set: function (text) {
                    // For IE11, wrap the text in the correct (table) context
                    var wrap = topLevelWrappingMap[getTagName(text)];
                    if (wrap) {
                        for (var i = 0; i < wrap.length; i++) {
                            text = '<' + wrap[i] + '>' + text + '</' + wrap[i] + '>';
                        }
                    }
                    contentDoc.body.innerHTML = text;
                    PolyfilledHTMLTemplateElement.bootstrap(contentDoc);
                    while (this.content.firstChild) {
                        capturedRemoveChild.call(this.content, this.content.firstChild);
                    }
                    var body = contentDoc.body;
                    // If we had wrapped, get back to the original node
                    if (wrap) {
                        for (var j = 0; j < wrap.length; j++) {
                            body = body.lastChild;
                        }
                    }
                    while (body.firstChild) {
                        capturedAppendChild.call(this.content, body.firstChild);
                    }
                },
                configurable: true
            });
        };

        var defineOuterHTML = function defineOuterHTML(obj) {
            Object.defineProperty(obj, 'outerHTML', {
                get: function () {
                    return '<' + TEMPLATE_TAG + '>' + this.innerHTML + '</' + TEMPLATE_TAG + '>';
                },
                set: function (innerHTML) {
                    if (this.parentNode) {
                        contentDoc.body.innerHTML = innerHTML;
                        var docFrag = this.ownerDocument.createDocumentFragment();
                        while (contentDoc.body.firstChild) {
                            capturedAppendChild.call(docFrag, contentDoc.body.firstChild);
                        }
                        capturedReplaceChild.call(this.parentNode, docFrag, this);
                    } else {
                        throw new Error("Failed to set the 'outerHTML' property on 'Element': This element has no parent node.");
                    }
                },
                configurable: true
            });
        };

        defineInnerHTML(PolyfilledHTMLTemplateElement.prototype);
        defineOuterHTML(PolyfilledHTMLTemplateElement.prototype);

        /*
          The `bootstrap` method is called automatically and "fixes" all
          <template> elements in the document referenced by the `doc` argument.
        */
        PolyfilledHTMLTemplateElement.bootstrap = function bootstrap(doc) {
            var templates = QSA(doc, TEMPLATE_TAG);
            for (var i = 0, l = templates.length, t; (i < l) && (t = templates[i]); i++) {
                PolyfilledHTMLTemplateElement.decorate(t);
            }
        };

        // auto-bootstrapping for main document
        document.addEventListener('DOMContentLoaded', function () {
            PolyfilledHTMLTemplateElement.bootstrap(document);
        });

        // Patch document.createElement to ensure newly created templates have content
        Document.prototype.createElement = function createElement() {
            var el = capturedCreateElement.apply(this, arguments);
            if (el.localName === 'template') {
                PolyfilledHTMLTemplateElement.decorate(el);
            }
            return el;
        };

        DOMParser.prototype.parseFromString = function () {
            var el = capturedParseFromString.apply(this, arguments);
            PolyfilledHTMLTemplateElement.bootstrap(el);
            return el;
        };

        Object.defineProperty(HTMLElement.prototype, 'innerHTML', {
            get: function () {
                return getInnerHTML(this);
            },
            set: function (text) {
                capturedHTMLElementInnerHTML.set.call(this, text);
                PolyfilledHTMLTemplateElement.bootstrap(this);
            },
            configurable: true,
            enumerable: true
        });

        // http://www.whatwg.org/specs/web-apps/current-work/multipage/the-end.html#escapingString
        var escapeAttrRegExp = /[&\u00A0"]/g;
        var escapeDataRegExp = /[&\u00A0<>]/g;

        var escapeReplace = function (c) {
            switch (c) {
                case '&':
                    return '&amp;';
                case '<':
                    return '&lt;';
                case '>':
                    return '&gt;';
                case '"':
                    return '&quot;';
                case '\u00A0':
                    return '&nbsp;';
            }
        };

        var escapeAttr = function (s) {
            return s.replace(escapeAttrRegExp, escapeReplace);
        };

        var escapeData = function (s) {
            return s.replace(escapeDataRegExp, escapeReplace);
        };

        var makeSet = function (arr) {
            var set = {};
            for (var i = 0; i < arr.length; i++) {
                set[arr[i]] = true;
            }
            return set;
        };

        // http://www.whatwg.org/specs/web-apps/current-work/#void-elements
        var voidElements = makeSet([
            'area',
            'base',
            'br',
            'col',
            'command',
            'embed',
            'hr',
            'img',
            'input',
            'keygen',
            'link',
            'meta',
            'param',
            'source',
            'track',
            'wbr'
        ]);

        var plaintextParents = makeSet([
            'style',
            'script',
            'xmp',
            'iframe',
            'noembed',
            'noframes',
            'plaintext',
            'noscript'
        ]);

        var getOuterHTML = function (node, parentNode, callback) {
            switch (node.nodeType) {
                case Node.ELEMENT_NODE: {
                    var tagName = node.localName;
                    var s = '<' + tagName;
                    var attrs = node.attributes;
                    for (var i = 0, attr; (attr = attrs[i]); i++) {
                        s += ' ' + attr.name + '="' + escapeAttr(attr.value) + '"';
                    }
                    s += '>';
                    if (voidElements[tagName]) {
                        return s;
                    }
                    return s + getInnerHTML(node, callback) + '</' + tagName + '>';
                }
                case Node.TEXT_NODE: {
                    var data = /** @type {Text} */ (node).data;
                    if (parentNode && plaintextParents[parentNode.localName]) {
                        return data;
                    }
                    return escapeData(data);
                }
                case Node.COMMENT_NODE: {
                    return '<!--' + /** @type {Comment} */ (node).data + '-->';
                }
                default: {
                    window.console.error(node);
                    throw new Error('not implemented');
                }
            }
        };

        var getInnerHTML = function (node, callback) {
            if (node.localName === 'template') {
                node =  /** @type {HTMLTemplateElement} */ (node).content;
            }
            var s = '';
            var c$ = callback ? callback(node) : capturedChildNodes.get.call(node);
            for (var i = 0, l = c$.length, child; (i < l) && (child = c$[i]); i++) {
                s += getOuterHTML(child, node, callback);
            }
            return s;
        };

    }

    // make cloning/importing work!
    if (needsTemplate || needsCloning) {

        PolyfilledHTMLTemplateElement._cloneNode = function _cloneNode(template, deep) {
            var clone = capturedCloneNode.call(template, false);
            // NOTE: decorate doesn't auto-fix children because they are already
            // decorated so they need special clone fixup.
            if (this.decorate) {
                this.decorate(clone);
            }
            if (deep) {
                // NOTE: use native clone node to make sure CE's wrapped
                // cloneNode does not cause elements to upgrade.
                capturedAppendChild.call(clone.content, capturedCloneNode.call(template.content, true));
                // now ensure nested templates are cloned correctly.
                fixClonedDom(clone.content, template.content);
            }
            return clone;
        };

        // Given a source and cloned subtree, find <template>'s in the cloned
        // subtree and replace them with cloned <template>'s from source.
        // We must do this because only the source templates have proper .content.
        var fixClonedDom = function fixClonedDom(clone, source) {
            // do nothing if cloned node is not an element
            if (!source.querySelectorAll) return;
            // these two lists should be coincident
            var s$ = QSA(source, TEMPLATE_TAG);
            if (s$.length === 0) {
                return;
            }
            var t$ = QSA(clone, TEMPLATE_TAG);
            for (var i = 0, l = t$.length, t, s; i < l; i++) {
                s = s$[i];
                t = t$[i];
                if (PolyfilledHTMLTemplateElement && PolyfilledHTMLTemplateElement.decorate) {
                    PolyfilledHTMLTemplateElement.decorate(s);
                }
                capturedReplaceChild.call(t.parentNode, cloneNode.call(s, true), t);
            }
        };

        // make sure scripts inside of a cloned template are executable
        var fixClonedScripts = function fixClonedScripts(fragment) {
            var scripts = QSA(fragment, scriptSelector);
            for (var ns, s, i = 0; i < scripts.length; i++) {
                s = scripts[i];
                ns = capturedCreateElement.call(document, 'script');
                ns.textContent = s.textContent;
                var attrs = s.attributes;
                for (var ai = 0, a; ai < attrs.length; ai++) {
                    a = attrs[ai];
                    ns.setAttribute(a.name, a.value);
                }
                capturedReplaceChild.call(s.parentNode, ns, s);
            }
        };

        // override all cloning to fix the cloned subtree to contain properly
        // cloned templates.
        var cloneNode = Node.prototype.cloneNode = function cloneNode(deep) {
            var dom;
            // workaround for Edge bug cloning documentFragments
            // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8619646/
            if (!needsDocFrag && brokenDocFragment && this instanceof DocumentFragment) {
                if (!deep) {
                    return this.ownerDocument.createDocumentFragment();
                } else {
                    dom = importNode.call(this.ownerDocument, this, true);
                }
            } else if (this.nodeType === Node.ELEMENT_NODE &&
                this.localName === TEMPLATE_TAG &&
                this.namespaceURI === document.documentElement.namespaceURI) {
                dom = PolyfilledHTMLTemplateElement._cloneNode(this, deep);
            } else {
                dom = capturedCloneNode.call(this, deep);
            }
            // template.content is cloned iff `deep`.
            if (deep) {
                fixClonedDom(dom, this);
            }
            return dom;
        };

        // NOTE: we are cloning instead of importing <template>'s.
        // However, the ownerDocument of the cloned template will be correct!
        // This is because the native import node creates the right document owned
        // subtree and `fixClonedDom` inserts cloned templates into this subtree,
        // thus updating the owner doc.
        var importNode = Document.prototype.importNode = function importNode(element, deep) {
            deep = deep || false;
            if (element.localName === TEMPLATE_TAG) {
                return PolyfilledHTMLTemplateElement._cloneNode(element, deep);
            } else {
                var dom = capturedImportNode.call(this, element, deep);
                if (deep) {
                    fixClonedDom(dom, element);
                    fixClonedScripts(dom);
                }
                return dom;
            }
        };
    }

    if (needsTemplate) {
        window.HTMLTemplateElement = PolyfilledHTMLTemplateElement;
    }

})();
function NewUid() {
    var uuid = "", i, random;
    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;
        if (i == 8 || i == 12 || i == 16 || i == 20) {
            uuid += "-";
        }
        uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
}
function ExtendIIdentity() {
    return { __uuid: NewUid() };
}
function using(resource, func) {
    try {
        func(resource);
    }
    finally {
        resource.Dispose();
    }
}
//# sourceMappingURL=Global.js.map
//# sourceMappingURL=IDisposable.js.map
var DomBehind;
(function (DomBehind) {
    class EventArgs {
    }
    DomBehind.EventArgs = EventArgs;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=EventArgs.js.map
var DomBehind;
(function (DomBehind) {
    class CancelEventArgs {
        constructor(Cancel = false) {
            this.Cancel = Cancel;
        }
    }
    DomBehind.CancelEventArgs = CancelEventArgs;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=CancelEventArgs.js.map
var DomBehind;
(function (DomBehind) {
    class CollectionChangedEventArgs extends DomBehind.EventArgs {
    }
    DomBehind.CollectionChangedEventArgs = CollectionChangedEventArgs;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=CollectionChangedEventArgs.js.map
var DomBehind;
(function (DomBehind) {
    class Exception {
        constructor(Message) {
            this.Message = Message;
        }
        ToString() { return this.Message; }
    }
    DomBehind.Exception = Exception;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Exception.js.map
var DomBehind;
(function (DomBehind) {
    class AjaxException extends DomBehind.Exception {
        constructor(JqXHR, TextStatus, ErrorThrown) {
            super(TextStatus);
            this.JqXHR = JqXHR;
            this.TextStatus = TextStatus;
            this.ErrorThrown = ErrorThrown;
        }
        get ErrorStatus() {
            return (this.JqXHR) ? this.JqXHR.status : null;
        }
        get ErrorTitle() {
            if (this.JqXHR) {
                let json = this.JqXHR.responseJSON;
                if (json && json.Message) {
                    return json.Message;
                }
                return $(this.JqXHR.responseText).filter("title").text();
            }
            return `${this.TextStatus}:${this.ErrorThrown}`;
        }
        ToString() {
            return `status:${this.ErrorStatus}\n${this.ErrorTitle}`;
        }
    }
    DomBehind.AjaxException = AjaxException;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=AjaxException.js.map
var DomBehind;
(function (DomBehind) {
    var Validation;
    (function (Validation) {
        class ValidationException {
            constructor(Message, Selector) {
                this.Message = Message;
                this.Selector = Selector;
            }
        }
        Validation.ValidationException = ValidationException;
        class AggregateValidationException {
            constructor(Items) {
                this.Items = Items;
            }
        }
        Validation.AggregateValidationException = AggregateValidationException;
    })(Validation = DomBehind.Validation || (DomBehind.Validation = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=ValidationException.js.map
var DomBehind;
(function (DomBehind) {
    class ApplicationException extends DomBehind.Exception {
        constructor(Message) {
            super();
            this.Message = Message;
            super(Message);
        }
        ToString() { return this.Message; }
    }
    DomBehind.ApplicationException = ApplicationException;
    class ApplicationAggregateException extends DomBehind.Exception {
        constructor(exceptions) {
            super();
            this.exceptions = exceptions;
        }
    }
    DomBehind.ApplicationAggregateException = ApplicationAggregateException;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=ApplicationException.js.map
var DomBehind;
(function (DomBehind) {
    class TypedEvent {
        constructor() {
            this.handlers = [];
            this._disposed = false;
        }
        get EventName() {
            return this._eventName;
        }
        set EventName(value) {
            this._eventName = value;
        }
        AddHandler(handler) {
            this.handlers.push(handler);
        }
        RemoveHandler(handler) {
            this.handlers = this.handlers.filter(h => h !== handler);
        }
        Raise(sender, data) {
            this.handlers.slice(0).forEach(h => h(sender, data));
        }
        Clear() {
            $.each(this.handlers, (i, each) => {
                this.handlers[i] = null;
            });
            this.handlers = [];
        }
        Ensure(behavior) {
            if (this.EnsureHandler) {
                this.EnsureHandler(behavior);
            }
        }
        Dispose() {
            if (!this._disposed) {
                if (this.handlers) {
                    this.handlers.length = 0;
                }
            }
            this._disposed = true;
        }
    }
    DomBehind.TypedEvent = TypedEvent;
    class EventBuilder {
        constructor(eventName) {
            this._eventName = eventName;
        }
        Create() {
            let event = new TypedEvent();
            event.EventName = this.EventName;
            event.EnsureHandler = this.ensureHandler;
            return event;
        }
        get EventName() {
            return this._eventName;
        }
        static RegisterAttached(eventName, ensure) {
            let builder = new EventBuilder(eventName);
            builder.ensureHandler = ensure;
            return builder;
        }
    }
    DomBehind.EventBuilder = EventBuilder;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=EventBuilder.js.map
var DomBehind;
(function (DomBehind) {
    class PropertyChangedEventArgs extends DomBehind.EventArgs {
        constructor(Name) {
            super();
            this.Name = Name;
        }
    }
    DomBehind.PropertyChangedEventArgs = PropertyChangedEventArgs;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=INotifyPropertyChanged.js.map
var DomBehind;
(function (DomBehind) {
    class PropertyChangingEventArgs extends DomBehind.EventArgs {
        constructor(Name, OldValue, NewValue) {
            super();
            this.Name = Name;
            this.OldValue = OldValue;
            this.NewValue = NewValue;
        }
    }
    DomBehind.PropertyChangingEventArgs = PropertyChangingEventArgs;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=INotifyPropertyChanging.js.map
var DomBehind;
(function (DomBehind) {
    class NotifiableImp {
        constructor() {
            this.PropertyChanged = new DomBehind.TypedEvent();
            this._dic = {};
            this._disposed = false;
        }
        GetProperty(name, defaultValue) {
            let obj = this._dic[name];
            return Object.IsNullOrUndefined(obj) ? defaultValue : obj;
        }
        SetProperty(name, value) {
            var result = false;
            let oldValue = this.GetProperty(name);
            if (value !== oldValue) {
                result = true;
                this._dic[name] = value;
                this._dic[`${name}_old___`] = oldValue;
                this.OnPropertyChanged(name);
            }
            return result;
        }
        Dispose() {
            if (!this._disposed) {
                this._dic = null;
                if (this.PropertyChanged) {
                    this.PropertyChanged.Dispose();
                }
            }
            this._disposed = true;
        }
        OnPropertyChanged(name) {
            this.PropertyChanged.Raise(this, new DomBehind.PropertyChangedEventArgs(name));
        }
    }
    DomBehind.NotifiableImp = NotifiableImp;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=NotifiableImp.js.map
//# sourceMappingURL=IValueConverter.js.map
var DomBehind;
(function (DomBehind) {
    class PropertyInfo {
        constructor(DataContext, MemberPath) {
            this.DataContext = DataContext;
            this.MemberPath = MemberPath;
        }
        SetValue(value) {
            var arr = this.MemberPath.split(".");
            var lastDataContext = this.DataContext;
            $.each(arr.slice(0, arr.length - 1), (i, source) => {
                if (Object.IsNullOrUndefined(lastDataContext)) {
                    return false;
                }
                lastDataContext = lastDataContext[source];
            });
            if (Object.IsNullOrUndefined(lastDataContext)) {
                return null;
            }
            var path = arr[arr.length - 1];
            lastDataContext[path] = value;
        }
        GetValue() {
            var arr = this.MemberPath.split(".");
            var lastDataContext = this.DataContext;
            $.each(arr.slice(0, arr.length - 1), (i, source) => {
                if (Object.IsNullOrUndefined(lastDataContext)) {
                    return false;
                }
                lastDataContext = lastDataContext[source];
            });
            if (Object.IsNullOrUndefined(lastDataContext)) {
                return null;
            }
            var path = arr[arr.length - 1];
            return lastDataContext[path];
        }
        Dispose() {
            this.DataContext = null;
            this.MemberPath = null;
        }
    }
    DomBehind.PropertyInfo = PropertyInfo;
    class LamdaExpression extends PropertyInfo {
        constructor(dataContext, Lamda) {
            super(dataContext, LamdaExpression.ParsePropertyPath(Lamda));
            this.Lamda = Lamda;
        }
        static ParsePropertyPath(exp) {
            var path = LamdaExpression.NameOf(exp);
            return path.split(".").slice(1).join(".");
        }
        static NameOf(expression) {
            let m = LamdaExpression._extractor_Minified.exec(expression + "");
            let s = m[1].trim();
            if (s.charAt(s.length - 1) === "}" ||
                s.charAt(s.length - 1) === ";") {
                m = LamdaExpression._extractor.exec(expression + "");
                s = m[1];
            }
            return s;
        }
        Dispose() {
            this.Lamda = null;
            super.Dispose();
        }
        static Path(exp) {
            return LamdaExpression.ParsePropertyPath(exp);
        }
        static GetValueCore(dataContext, lamda) {
            let exp = new LamdaExpression(dataContext, lamda);
            return exp.GetValue();
        }
    }
    LamdaExpression._extractor = new RegExp("return (.*);");
    LamdaExpression._extractor_Minified = new RegExp("return (.*)}");
    DomBehind.LamdaExpression = LamdaExpression;
    class BooleanFakeExpression extends PropertyInfo {
        constructor(Value) {
            super(null, ".");
            this.Value = Value;
        }
        SetValue(value) {
        }
        GetValue() {
            return this.Value;
        }
    }
    DomBehind.BooleanFakeExpression = BooleanFakeExpression;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=PropertyInfo.js.map
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        class ListCollectionView extends DomBehind.NotifiableImp {
            constructor(source, DisplayMemberPath) {
                super();
                this.DisplayMemberPath = DisplayMemberPath;
                this.CurrentChanging = new DomBehind.TypedEvent();
                this.CurrentChanged = new DomBehind.TypedEvent();
                this.Added = new DomBehind.TypedEvent();
                this.Removed = new DomBehind.TypedEvent();
                this.engaged = false;
                this.Source = new collections.LinkedList();
                this.List = new collections.LinkedList();
                $.each(source, (i, value) => {
                    this.Source.add(value);
                    this.List.add(value);
                });
                this.ViewReflected = ListCollectionView.ViewReflectedStatus.None;
            }
            get Current() { return this._current; }
            set Current(value) {
                if (this.OnCurrentChanging().Cancel)
                    return;
                this._current = value;
                this.ViewReflected = ListCollectionView.ViewReflectedStatus.NoReflected;
                if (this.engaged)
                    return;
                this.OnCurrentChanged();
                this.OnPropertyChanged("Current");
            }
            OnCurrentChanging() {
                var e = new DomBehind.CancelEventArgs();
                this.CurrentChanging.Raise(this, e);
                return e;
            }
            OnCurrentChanged() {
                if (this.engaged)
                    return;
                this.CurrentChanged.Raise(this, new DomBehind.EventArgs());
            }
            Find(predicate) {
                return this.List.toArray().FirstOrDefault(predicate);
            }
            Contains(obj) {
                if (obj instanceof Array) {
                    var contains = true;
                    $.each(obj, (i, value) => {
                        if (!this.List.contains(value)) {
                            contains = false;
                            return false;
                        }
                    });
                    return contains;
                }
                return this.List.contains(obj);
            }
            Select(obj) {
                this.Current = obj;
                return this;
            }
            UnSelect() {
                this.Current = null;
                return this;
            }
            MoveFirst() {
                this.Current = this.List.first();
                return this;
            }
            MoveLast() {
                this.Current = this.List.last();
                return this;
            }
            MoveToPosition(index) {
                this.Current = this.List.elementAtIndex(index);
                return this;
            }
            Refresh() {
                this.RefreshRaw();
                this.OnPropertyChanged();
                return this;
            }
            RefreshRaw() {
                this.List = new collections.LinkedList();
                $.each(this.Source.toArray(), (i, value) => {
                    if (this.Filter) {
                        if (this.Filter(value)) {
                            this.List.add(value);
                        }
                    }
                    else {
                        this.List.add(value);
                    }
                });
                if (this.Current) {
                    if (!this.Contains(this.Current)) {
                        this.MoveFirst();
                    }
                }
            }
            OnPropertyChanged(name) {
                if (this.engaged)
                    return;
                this.PropertyChanged.Raise(this, new DomBehind.PropertyChangedEventArgs(name));
            }
            Begin() {
                this.engaged = true;
                return this;
            }
            End() {
                this.engaged = false;
                return this;
            }
            Add(obj) {
                this.Source.add(obj);
                this.RefreshRaw();
                this.ViewReflected = ListCollectionView.ViewReflectedStatus.NoReflected;
                var e = new DomBehind.CollectionChangedEventArgs();
                e.Item = obj;
                this.Added.Raise(this, e);
                this.OnPropertyChanged("Source - Add");
            }
            Remove(obj) {
                this.Source.remove(obj);
                this.RefreshRaw();
                this.ViewReflected = ListCollectionView.ViewReflectedStatus.NoReflected;
                var e = new DomBehind.CollectionChangedEventArgs();
                e.Item = obj;
                this.Removed.Raise(this, e);
                this.OnPropertyChanged("Source - Remove");
            }
            ToArray() {
                return (this.Filter) ?
                    this.List.toArray().Where(x => this.Filter(x)) :
                    this.List.toArray();
            }
        }
        Data.ListCollectionView = ListCollectionView;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
(function (DomBehind) {
    var Data;
    (function (Data) {
        var ListCollectionView;
        (function (ListCollectionView) {
            let ViewReflectedStatus;
            (function (ViewReflectedStatus) {
                ViewReflectedStatus[ViewReflectedStatus["None"] = 0] = "None";
                ViewReflectedStatus[ViewReflectedStatus["NoReflected"] = 1] = "NoReflected";
                ViewReflectedStatus[ViewReflectedStatus["Reflected"] = 2] = "Reflected";
            })(ViewReflectedStatus = ListCollectionView.ViewReflectedStatus || (ListCollectionView.ViewReflectedStatus = {}));
        })(ListCollectionView = Data.ListCollectionView || (Data.ListCollectionView = {}));
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=ListCollectionView.js.map
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        let UpdateSourceTrigger;
        (function (UpdateSourceTrigger) {
            UpdateSourceTrigger[UpdateSourceTrigger["Explicit"] = 0] = "Explicit";
            UpdateSourceTrigger[UpdateSourceTrigger["LostForcus"] = 1] = "LostForcus";
            UpdateSourceTrigger[UpdateSourceTrigger["PropertyChanged"] = 2] = "PropertyChanged";
        })(UpdateSourceTrigger = Data.UpdateSourceTrigger || (Data.UpdateSourceTrigger = {}));
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=UpdateSourceTrigger.js.map
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        let BindingMode;
        (function (BindingMode) {
            BindingMode[BindingMode["TwoWay"] = 0] = "TwoWay";
            BindingMode[BindingMode["OneWay"] = 1] = "OneWay";
            BindingMode[BindingMode["OneWayToSource"] = 2] = "OneWayToSource";
        })(BindingMode = Data.BindingMode || (Data.BindingMode = {}));
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=BindingMode.js.map
var DomBehind;
(function (DomBehind) {
    class List extends collections.LinkedList {
    }
    DomBehind.List = List;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=List.js.map
var DomBehind;
(function (DomBehind) {
    class Observable {
        constructor(source, option) {
            this.source = source;
            this.PropertyChanging = new DomBehind.TypedEvent();
            this.PropertyChanged = new DomBehind.TypedEvent();
            if (source == null)
                return;
            let keys = Object.keys(source);
            for (var i = 0; i < keys.length; i++) {
                let name = keys[i];
                if (String.IsNullOrWhiteSpace(name))
                    continue;
                if (option) {
                    this.Wrapper = option.wrapper;
                    if (option.marks) {
                        $.each(option.marks, (i, value) => {
                            let buff = value.Split(".");
                            let parentName = "";
                            $.each(buff, (k, each) => {
                                this.Recurcive(source, each, parentName);
                                if (parentName) {
                                    parentName = `${parentName}.${each}`;
                                }
                                else {
                                    parentName = each;
                                }
                            });
                        });
                    }
                    else {
                        this.Recurcive(source, name, null);
                    }
                }
                else {
                    this.Recurcive(source, name, null);
                }
            }
        }
        static Register(target, ...marks) {
            return new Observable(target, { marks: marks });
        }
        static RegisterAttached(target, option) {
            return new Observable(target, option);
        }
        Recurcive(source, name, parentName) {
            let value = source[name];
            let notifibleName = (parentName) ? `${parentName}.${name}` : name;
            Object.defineProperty(source, name, this.CreateDescriptor(notifibleName, value));
            if (Object.IsNullOrUndefined(value))
                return;
            if (typeof value !== "object")
                return;
            let keys = Object.keys(value);
            for (var i = 0; i < keys.length; i++) {
                this.Recurcive(value, keys[i], notifibleName);
            }
        }
        get Source() {
            return this.source;
        }
        CreateDescriptor(notifibleName, value) {
            let changing = this.PropertyChanging;
            let notifier = this.PropertyChanged;
            let wrapper = this.Wrapper;
            let e = new DomBehind.PropertyChangedEventArgs(notifibleName);
            let sender = this.source;
            return {
                get: function () {
                    if (wrapper)
                        return wrapper(value, notifibleName);
                    return value;
                },
                set: function (v) {
                    changing.Raise(sender, new DomBehind.PropertyChangingEventArgs(e.Name, value, v));
                    value = v;
                    notifier.Raise(sender, e);
                },
                enumerable: true,
                configurable: true
            };
        }
    }
    DomBehind.Observable = Observable;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Observable.js.map
//# sourceMappingURL=IDisplayMemberPath.js.map
;
Object.defineProperty(String.prototype, "ExtendedPrototype", {
    configurable: true,
    enumerable: false,
    writable: true,
    value: function (key, value) {
        let me = this;
        Object.defineProperty(key, me, {
            configurable: true,
            enumerable: false,
            writable: true,
            value: value
        });
    }
});
//# sourceMappingURL=PropertyDescriptorExtensions.js.map
"Where".ExtendedPrototype(Array.prototype, function (predicate) {
    let me = this;
    return me.filter(value => predicate(value));
});
"Select".ExtendedPrototype(Array.prototype, function (select) {
    let me = this;
    return me.map(x => select(x));
});
"Any".ExtendedPrototype(Array.prototype, function (predicate) {
    let me = this;
    if (!predicate) {
        return me.length !== 0;
    }
    return me.some(x => predicate(x));
});
"OrderBy".ExtendedPrototype(Array.prototype, function (selector) {
    let me = this;
    return me.sort((x, y) => {
        let xx = selector(x);
        let yy = selector(y);
        if (typeof xx === 'string' &&
            typeof yy === 'string') {
            return yy === xx ? 0 : yy < xx ? 1 : -1;
        }
        return xx - yy;
    });
});
"OrderByDecording".ExtendedPrototype(Array.prototype, function (selector) {
    let me = this;
    return me.sort((x, y) => {
        let xx = selector(x);
        let yy = selector(y);
        if (typeof xx === 'string' &&
            typeof yy === 'string') {
            return yy === xx ? 0 : xx < yy ? 1 : -1;
        }
        return yy - xx;
    });
});
"FirstOrDefault".ExtendedPrototype(Array.prototype, function (predicate) {
    let me = this;
    if (predicate) {
        me = me.filter(x => predicate(x));
    }
    return 0 < me.length ? me[0] : null;
});
"LastOrDefault".ExtendedPrototype(Array.prototype, function (predicate) {
    let me = this;
    if (predicate) {
        me = me.filter(x => predicate(x));
    }
    return 0 < me.length ? me[me.length - 1] : null;
});
"GroupBy".ExtendedPrototype(Array.prototype, function (selector) {
    let me = this;
    let result = new Array();
    $.each(me, (i, value) => {
        let groupKey = selector(value);
        if (!result.some(x => x.Key === groupKey)) {
            result.push({ Key: groupKey, Values: new Array() });
        }
        let item = result.FirstOrDefault(x => x.Key === groupKey);
        item.Values.push(value);
    });
    return result;
});
"SequenceEqual".ExtendedPrototype(Array.prototype, function (target, predicate) {
    let me = this;
    if (Object.IsNullOrUndefined(me) ||
        Object.IsNullOrUndefined(target)) {
        return false;
    }
    if (me.length !== target.length)
        return false;
    let result = true;
    for (var i = 0; i < me.length; i++) {
        let x = me[i];
        let y = target[i];
        if (predicate) {
            if (!predicate(x, y)) {
                result = false;
                break;
            }
        }
        else {
            if (x !== y) {
                result = false;
                break;
            }
        }
    }
    return result;
});
"Sum".ExtendedPrototype(Array.prototype, function (selector) {
    let me = this;
    let value = 0;
    me.forEach(x => {
        value += selector(x);
    });
    return value;
});
"Chunk".ExtendedPrototype(Array.prototype, function (size) {
    let arr = this;
    if (!size) {
        size = 1;
    }
    return arr.reduce((chunks, el, i) => {
        if (i % size === 0) {
            chunks.push([el]);
        }
        else {
            chunks[chunks.length - 1].push(el);
        }
        return chunks;
    }, []);
});
//# sourceMappingURL=EnumerableExtensions.js.map
Object.IsNullOrUndefined = (obj) => {
    if (obj == null)
        return true;
    if (obj === null)
        return true;
    if (typeof obj === 'undefined')
        return true;
    return false;
};
Object.IsPromise = value => {
    if (Object.IsNullOrUndefined(value))
        return false;
    if (typeof value === 'object' && typeof value.then !== "function") {
        return false;
    }
    var promiseThenSrc = String($.Deferred().then);
    var valueThenSrc = String(value.then);
    return promiseThenSrc === valueThenSrc;
};
//# sourceMappingURL=ObjectExtensions.js.map
String.IsNullOrEmpty = (str) => !str;
String.IsNullOrWhiteSpace = (s) => String.IsNullOrEmpty(s) || s.replace(/\s/g, '').length < 1;
String.Split = function (s, sep) {
    return s.split(sep);
};
String.ToBoolean = function (s, defaultValue = false) {
    if (Object.IsNullOrUndefined(s))
        return defaultValue;
    s = s.toLowerCase();
    if (s === 'true')
        return true;
    if (s === 'false')
        return false;
    return defaultValue;
};
var StringSplitOptions;
(function (StringSplitOptions) {
    StringSplitOptions[StringSplitOptions["None"] = 0] = "None";
    StringSplitOptions[StringSplitOptions["RemoveEmptyEntries"] = 1] = "RemoveEmptyEntries";
})(StringSplitOptions || (StringSplitOptions = {}));
"Split".ExtendedPrototype(String.prototype, function (separator, option) {
    let me = this;
    if (Object.IsNullOrUndefined(option) ||
        option === StringSplitOptions.RemoveEmptyEntries)
        return me.split(separator).filter(x => !String.IsNullOrWhiteSpace(x));
    return me.split(separator);
});
"Escape".ExtendedPrototype(String.prototype, function () {
    let me = this;
    return me
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
});
"UnEscape".ExtendedPrototype(String.prototype, function () {
    let me = this;
    return me
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
});
"Replace".ExtendedPrototype(String.prototype, function (searchValue, replaceValue) {
    let me = this;
    return me.split(searchValue).join(replaceValue);
});
"Repeat".ExtendedPrototype(String.prototype, function (count) {
    'use strict';
    if (this == null) {
        throw new TypeError('can\'t convert ' + this + ' to object');
    }
    var str = '' + this;
    count = +count;
    if (count != count) {
        count = 0;
    }
    if (count < 0) {
        throw new RangeError('repeat count must be non-negative');
    }
    if (count == Infinity) {
        throw new RangeError('repeat count must be less than infinity');
    }
    count = Math.floor(count);
    if (str.length == 0 || count == 0) {
        return '';
    }
    if (str.length * count >= 1 << 28) {
        throw new RangeError('repeat count must not overflow maximum string size');
    }
    var rpt = '';
    for (;;) {
        if ((count & 1) == 1) {
            rpt += str;
        }
        count >>>= 1;
        if (count == 0) {
            break;
        }
        str += str;
    }
    return rpt;
});
"PadLeft".ExtendedPrototype(String.prototype, function (totalWidth, paddingChar) {
    totalWidth = totalWidth >> 0;
    paddingChar = String((typeof paddingChar !== 'undefined' ? paddingChar : ' '));
    if (this.length > totalWidth) {
        return String(this);
    }
    else {
        totalWidth = totalWidth - this.length;
        if (totalWidth > paddingChar.length) {
            paddingChar += paddingChar.Repeat(totalWidth / paddingChar.length);
        }
        return paddingChar.slice(0, totalWidth) + String(this);
    }
});
"PadRight".ExtendedPrototype(String.prototype, function (totalWidth, paddingChar) {
    totalWidth = totalWidth >> 0;
    paddingChar = String((typeof paddingChar !== 'undefined' ? paddingChar : ' '));
    if (this.length > totalWidth) {
        return String(this);
    }
    else {
        totalWidth = totalWidth - this.length;
        if (totalWidth > paddingChar.length) {
            paddingChar += paddingChar.Repeat(totalWidth / paddingChar.length);
        }
        return String(this) + paddingChar.slice(0, totalWidth);
    }
});
"SubString".ExtendedPrototype(String.prototype, function (start, length) {
    let me = this;
    return me.toString().substr(start, length);
});
"Contains".ExtendedPrototype(String.prototype, function (search) {
    let me = this;
    if (search.length > me.length) {
        return false;
    }
    else {
        return me.indexOf(search, 0) !== -1;
    }
});
"StartsWith".ExtendedPrototype(String.prototype, function (s) {
    let me = this;
    if (!String.prototype.startsWith) {
        return this.substr(0, s.length) === s;
    }
    else {
        return me.startsWith(s);
    }
});
"EndsWith".ExtendedPrototype(String.prototype, function (s) {
    let me = this;
    if (!String.prototype.endsWith) {
        return me.indexOf(s, this.length - s.length) !== -1;
    }
    else {
        return me.endsWith(s);
    }
});
//# sourceMappingURL=StringExtensions.js.map
$.ToPromise = function (pms) {
    let p = new Promise((resolve, reject) => {
        pms.done(x => resolve(x))
            .fail(x => reject(x));
    });
    return p;
};
const z_indexKey = "z_indexKey";
$.GenerateZIndex = function () {
    var value = $.GetDomStorage(z_indexKey, 500);
    var newValue = value + 1;
    $.SetDomStorage(z_indexKey, newValue);
    return newValue;
};
$.GetLocalStorage = function (key, defaultValue) {
    if (!window.localStorage.getItem(key)) {
        return defaultValue;
    }
    return JSON.parse(window.localStorage.getItem(key));
};
$.SetLocalStorage = function (key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
};
$.GetSessionStorage = function (key, defaultValue) {
    if (!window.sessionStorage.getItem(key)) {
        return defaultValue;
    }
    return JSON.parse(window.sessionStorage.getItem(key));
};
$.SetSessionStorage = function (key, value) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
};
$.GetDomStorage = function (key, defaultValue) {
    var value = $("body").find(`#DomStorage_${key}`).val();
    if (!value) {
        return defaultValue;
    }
    return JSON.parse(value);
};
$.SetDomStorage = function (key, value) {
    if ($("body").find(`#DomStorage_${key}`).length === 0) {
        $("<input>", {
            type: "hidden",
            id: `DomStorage_${key}`,
        }).appendTo("body");
    }
    if (Object.IsNullOrUndefined(value)) {
        let domId = `#DomStorage_${key}`;
        let dom = $(domId);
        if (dom.length !== 0) {
            dom.remove();
            return;
        }
    }
    $("body").find(`#DomStorage_${key}`).val(JSON.stringify(value));
};
$.SetRootUri = function (uri) {
    if (!uri)
        return;
    $.SetLocalStorage("RootUri", uri);
};
$.GetRootUri = function () {
    return $.GetLocalStorage("RootUri");
};
$.AbsoluteUri = function (uri) {
    if (uri.toLowerCase().StartsWith("http://"))
        return uri;
    if (uri.toLowerCase().StartsWith("https://"))
        return uri;
    return `${location.origin}/${uri}`;
};
const w_dynamicPrefix = "__Framework";
$.GetWindowDynamic = function (key, defaultValue) {
    let newKey = `${w_dynamicPrefix}.${key}`;
    return window[newKey];
};
$.SetWindowDynamic = function (key, value) {
    let newKey = `${w_dynamicPrefix}.${key}`;
    window[newKey] = value;
};
$.ClientDetection = function () {
    return window._clientDetection;
};
$.fn.ValidityState = function () {
    let me = this;
    let validity = me.validity;
    if (Object.IsNullOrUndefined(validity)) {
        $.each(me, (i, value) => {
            validity = value.validity;
            if (!Object.IsNullOrUndefined(validity)) {
                return false;
            }
        });
    }
    return validity;
};
$.fn.HasError = function () {
    let me = this;
    let validity = me.ValidityState();
    return !validity.valid;
};
$.fn.SetCustomError = function (errorMessage) {
    let me = this;
    if (Object.IsNullOrUndefined(me.setCustomValidity)) {
        $.each(me, (i, value) => {
            if (!Object.IsNullOrUndefined(value.setCustomValidity)) {
                value.setCustomValidity(errorMessage);
            }
        });
    }
    else {
        me.setCustomValidity(errorMessage);
    }
};
$.fn.ClearCustomError = function () {
    let me = this;
    me.SetCustomError("");
};
$.fn.CheckValidity = function () {
    let me = this;
    let result = true;
    if (Object.IsNullOrUndefined(me.checkValidity)) {
        $.each(me, (i, value) => {
            if (!Object.IsNullOrUndefined(value.checkValidity)) {
                result = value.checkValidity();
            }
        });
    }
    else {
        result = me.checkValidity();
    }
};
$.fn.Raise = function (event, ensure) {
    let me = this;
    let e = $.Event(event.EventName);
    if (ensure) {
        ensure(e);
    }
    me.trigger(e);
    return e;
};
$.fn.Equals = function (compareTo) {
    if (!compareTo || this.length != compareTo.length) {
        return false;
    }
    for (var i = 0; i < this.length; ++i) {
        if (this[i] !== compareTo[i]) {
            return false;
        }
    }
    return true;
};
//# sourceMappingURL=JQueryExtensions.js.map
var DomBehind;
(function (DomBehind) {
    class TypedFactory {
        constructor(_ctor) {
            this._ctor = _ctor;
        }
        CreateInstance() {
            return new this._ctor();
        }
    }
    DomBehind.TypedFactory = TypedFactory;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=TypedFactory.js.map
var DomBehind;
(function (DomBehind) {
    class Repository {
        static AddService(context, getType, priority = 0) {
            Repository.contextList.push({ Context: context, GetType: getType, Priority: priority });
        }
        static RemoveService(context) {
            Repository.contextList = Repository.contextList.filter(x => x.Context !== context);
        }
        static GetService(context) {
            let value = Repository.contextList
                .Where(x => x.Context === context)
                .OrderBy(x => x.Priority)
                .FirstOrDefault();
            if (!value)
                return null;
            let factory = new DomBehind.TypedFactory(value.GetType());
            return factory.CreateInstance();
        }
        static CreateInstance(resolveType) {
            let factory = new DomBehind.TypedFactory(resolveType());
            return factory.CreateInstance();
        }
    }
    Repository.contextList = [];
    DomBehind.Repository = Repository;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Repository.js.map
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        class DependencyProperty {
            constructor(name) {
                this._propertyName = name;
            }
            get PropertyName() {
                return this._propertyName;
            }
            get GetValue() {
                return this._getter;
            }
            get SetValue() {
                return this._setter;
            }
            get UpdateSourceTrigger() {
                return this._updateSourceTrigger;
            }
            get BindingMode() {
                return this._bindingMode;
            }
            get Ensure() {
                return this._ensure;
            }
            static RegisterAttached(propertyName, getValue, setValue, defaultUpdateSourceTrigger = Data.UpdateSourceTrigger.Explicit, mode = Data.BindingMode.TwoWay, ensure) {
                let dp = new DependencyProperty(propertyName);
                dp._getter = getValue;
                dp._setter = setValue;
                dp._updateSourceTrigger = defaultUpdateSourceTrigger;
                dp._bindingMode = mode;
                dp._ensure = ensure;
                return dp;
            }
        }
        Data.DependencyProperty = DependencyProperty;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=DependencyProperty.js.map
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        class BindingPolicy {
            constructor() {
                this.Trigger = Data.UpdateSourceTrigger.Explicit;
                this.Mode = Data.BindingMode.TwoWay;
                this.Validators = new DomBehind.Validation.ValidatorCollection();
            }
        }
        Data.BindingPolicy = BindingPolicy;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=BindingPolicy.js.map
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        class BindingBehavior {
            constructor() {
                this.BindingPolicy = new Data.BindingPolicy();
                this.Priolity = 0;
                this.AdditionalInfo = new collections.LinkedDictionary();
                this._disposed = false;
            }
            Dispose() {
                if (!this._disposed) {
                    this.DataContext = null;
                    this.Element = null;
                }
                this._disposed = true;
            }
        }
        Data.BindingBehavior = BindingBehavior;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=BindingBehavior.js.map
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        class DataBindingBehavior extends Data.BindingBehavior {
            constructor() {
                super(...arguments);
                this.Marks = [];
                this.UpdateSourceEvent = new DomBehind.TypedEvent();
                this.UpdateTargetEvent = new DomBehind.TypedEvent();
                this.Events = [];
            }
            get PInfo() {
                return this._pinfo;
            }
            set PInfo(newValue) {
                if (this._pinfo === newValue)
                    return;
                this._pinfo = newValue;
                if (newValue) {
                    this.Marks.push(newValue.MemberPath);
                }
            }
            get ValueCore() {
                let value = this.Property.GetValue(this.Element);
                if (!Object.IsNullOrUndefined(this.BindingPolicy.Converter) &&
                    !Object.IsNullOrUndefined(this.BindingPolicy.Converter.ConvertBack)) {
                    value = this.BindingPolicy.Converter.ConvertBack(value);
                }
                return value;
            }
            UpdateSource() {
                if (this.BindingPolicy.Mode === Data.BindingMode.OneWay)
                    return;
                if (Object.IsNullOrUndefined(this.Property))
                    return;
                if (Object.IsNullOrUndefined(this.Property.GetValue))
                    return;
                this.PInfo.SetValue(this.ValueCore);
                this.UpdateSourceEvent.Raise(this, this.ValueCore);
                if (this.DataContext instanceof DomBehind.NotifiableImp) {
                    var e = new DomBehind.PropertyChangedEventArgs(this.PInfo.MemberPath);
                    this.DataContext.PropertyChanged.Raise(this, e);
                }
            }
            UpdateTarget() {
                if (Object.IsNullOrUndefined(this.Property))
                    return;
                if (Object.IsNullOrUndefined(this.Property.SetValue))
                    return;
                let value = this.PInfo.GetValue();
                if (!Object.IsNullOrUndefined(this.BindingPolicy.Converter)) {
                    value = this.BindingPolicy.Converter.Convert(value);
                }
                if (this.Element) {
                    this.Property.SetValue(this.Element, value, this);
                    this.UpdateTargetEvent.Raise(this, value);
                }
            }
            Ensure() {
                if (this.BindingPolicy.Trigger === Data.UpdateSourceTrigger.LostForcus) {
                    let event = 'focusout';
                    this.Events.push(event);
                    this.Element.off(event);
                    this.Element.on(event, e => {
                        this.UpdateSource();
                    });
                }
                if ((this.Property) && (this.Property.Ensure)) {
                    this.Property.Ensure(this);
                }
            }
            EventsOff() {
                if (Object.IsNullOrUndefined(this.Element))
                    return;
                if (Object.IsNullOrUndefined(this.Events))
                    return;
                $.each(this.Events, (i, value) => {
                    if (!String.IsNullOrEmpty(value)) {
                        this.Element.off(value);
                    }
                });
            }
            Dispose() {
                if (!this._disposed) {
                    this.EventsOff();
                    this.Property = null;
                    if (this.PInfo)
                        this.PInfo.Dispose();
                    this.PInfo = null;
                    this.Marks.length = 0;
                    super.Dispose();
                }
            }
        }
        Data.DataBindingBehavior = DataBindingBehavior;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=DataBindingBehavior.js.map
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        class RelativeDataBindingBehavior extends Data.DataBindingBehavior {
            constructor() {
                super(...arguments);
                this.Bindings = new DomBehind.List();
            }
            get CurrentElement() {
                return this._currentElement;
            }
            set CurrentElement(newValue) {
                if (this._currentElement === newValue)
                    return;
                if (this._currentElement) {
                    this.Unsubscribe(this._currentElement);
                }
                this._currentElement = newValue;
                if (newValue) {
                    this.Subscribe(newValue);
                }
            }
            Unsubscribe(value) {
                if (!this.Bindings)
                    return;
                $.each(this.Bindings.toArray(), (i, each) => {
                    let binding = each.Binding;
                    binding.Element.off();
                    if (binding instanceof Data.ActionBindingBehavior) {
                        binding.Event.Clear();
                    }
                });
            }
            Subscribe(value) {
                if (!this.Bindings)
                    return;
                $.each(this.Bindings.toArray(), (i, each) => {
                    let binding = each.Binding;
                    let selector = each.Selector;
                    let el = value.find(selector);
                    if (el) {
                        binding.Element = el;
                        binding.Ensure();
                    }
                });
            }
            get LastBinding() {
                let b = this.Bindings.last();
                return b ? b.Binding : null;
            }
            UpdateTarget() {
                if (!this.Bindings)
                    return;
                $.each(this.Bindings.toArray(), (i, value) => {
                    if (value.Binding instanceof Data.DataBindingBehavior) {
                        value.Binding.UpdateTarget();
                    }
                });
            }
            UpdateSource() {
                if (!this.Bindings)
                    return;
                $.each(this.Bindings.toArray(), (i, value) => {
                    if (value.Binding instanceof Data.DataBindingBehavior) {
                        value.Binding.UpdateSource();
                    }
                });
            }
            AddBinding(binding, selector) {
                this.Bindings.add({ Binding: binding, Selector: selector });
                return binding;
            }
        }
        Data.RelativeDataBindingBehavior = RelativeDataBindingBehavior;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=RelativeDataBindingBehavior.js.map
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        class ActionBindingBehavior extends Data.BindingBehavior {
            constructor() {
                super(...arguments);
                this.ActionPolicyCollection = [];
            }
            Ensure() {
                this.ActionHandle = x => this.OnTrigger(x);
                if (this.Event && this.Event) {
                    this.Event.Ensure(this);
                }
                if (this.Event && !String.IsNullOrWhiteSpace(this.Event.EventName)) {
                    this.Element.on(this.Event.EventName, e => this.ActionHandle(e));
                }
                this.EventHandle = (sender, data) => this.Do(sender, data);
                if (this.Event) {
                    this.Event.AddHandler(this.EventHandle);
                }
                if (this.Element.is("a") && !this.Element.attr("href")) {
                    this.Element.attr("href", "javascript:void(0);");
                }
            }
            OnTrigger(e) {
                this.Event.Raise(this, e);
            }
            get ActionInvoker() {
                if (!this._actionInvoker) {
                    var defaultPolicies = DomBehind.Application.Current.DefaultActionPolicy;
                    var list = this.ActionPolicyCollection.concat(defaultPolicies);
                    this._actionInvoker = this.CreateActionInvoker(list);
                }
                return this._actionInvoker;
            }
            CreateActionInvoker(policies) {
                var list = [];
                if (policies) {
                    list = list.concat(policies);
                }
                list = list.OrderBy(x => x.Priority());
                $.each(list, (i, value) => {
                    var nextIndex = i + 1;
                    if (nextIndex < list.length) {
                        value.NextPolicy = list[nextIndex];
                    }
                    value.Behavior = this;
                });
                return list[0];
            }
            Do(sender, e) {
                if (!this.AllowBubbling) {
                    if (e.stopPropagation) {
                        e.stopPropagation();
                    }
                }
                this.ActionInvoker.Do(() => {
                    let result;
                    if (this.Action) {
                        if (this.ActionParameterCount === 1) {
                            result = this.Action(this.DataContext);
                        }
                        else if (this.ActionParameterCount === 2) {
                            e.AdditionalInfo = this.AdditionalInfo;
                            e.Args = this.AdditionalInfo["Args"];
                            result = this.Action(this.DataContext, e);
                        }
                        else {
                            result = this.Action(this.DataContext);
                        }
                    }
                    return result;
                });
            }
            Dispose() {
                if (!this._disposed) {
                    if (!Object.IsNullOrUndefined(this.Element)) {
                        if (!Object.IsNullOrUndefined(this.Event)) {
                            if (!String.IsNullOrWhiteSpace(this.Event.EventName)) {
                                this.Element.off(this.Event.EventName, this.ActionHandle);
                            }
                            this.ActionHandle = null;
                            this.Action = null;
                            this.Event.RemoveHandler(this.EventHandle);
                            this.EventHandle = null;
                            this.Event = null;
                        }
                        this.Element = null;
                    }
                    this.ActionParameterCount = null;
                    super.Dispose();
                }
            }
        }
        Data.ActionBindingBehavior = ActionBindingBehavior;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=ActionBindingBehavior.js.map
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        class ViewViewModelBindingBehavior extends Data.BindingBehavior {
            Ensure() {
                this.View = this.GetView(this.DataContext);
                this.ViewModel = this.GetViewModel(this.DataContext);
                this.View.Container = this.Element;
                this.View.DataContext = this.ViewModel;
                this.View.Ensure();
            }
            Dispose() {
                if (!this._disposed) {
                    if (!Object.IsNullOrUndefined(this.View)) {
                        this.View.Dispose();
                        this.View = null;
                    }
                    if (!Object.IsNullOrUndefined(this.ViewModel)) {
                        this.ViewModel.Dispose();
                        this.ViewModel = null;
                    }
                    this.GetView = null;
                    this.GetViewModel = null;
                    super.Dispose();
                }
            }
        }
        Data.ViewViewModelBindingBehavior = ViewViewModelBindingBehavior;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=ViewViewModelBindingBehavior.js.map
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        class BindingBehaviorCollection extends collections.LinkedList {
            constructor() {
                super(...arguments);
                this._disposed = false;
            }
            Ensure() {
                var sortedList = [];
                var grouping = this.toArray().GroupBy(x => x.Element);
                grouping.forEach(x => {
                    var items = x.Values.OrderBy(x => x.Priolity);
                    items.forEach(y => {
                        sortedList.push(y);
                    });
                });
                this.clear();
                sortedList.forEach(x => {
                    this.add(x);
                    x.Ensure();
                });
            }
            ListDataBindingBehavior(mark) {
                let list = this.toArray().filter(x => x instanceof Data.DataBindingBehavior);
                if (!String.IsNullOrWhiteSpace(mark)) {
                    list = list.filter((x) => x.Marks.some(y => y === mark));
                }
                return list;
            }
            UpdateTarget(mark) {
                var list = this.ListDataBindingBehavior(mark);
                $.each(list, (i, x) => {
                    x.UpdateTarget();
                });
            }
            UpdateSource(mark) {
                var list = this.ListDataBindingBehavior(mark);
                $.each(list, (i, x) => {
                    x.UpdateSource();
                });
            }
            Dispose() {
                if (!this._disposed) {
                    $.each(this.toArray(), (i, x) => x.Dispose());
                    this.clear();
                }
                this._disposed = true;
            }
        }
        Data.BindingBehaviorCollection = BindingBehaviorCollection;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=BindingBehaviorCollection.js.map
var DomBehind;
(function (DomBehind) {
    class BindingBehaviorBuilder {
        constructor(owner) {
            this.Owner = owner;
        }
        Element(value) {
            if (typeof value === "string") {
                this.CurrentElement = this.Owner.Container.find(value);
                this.CurrentSelector = value;
            }
            else {
                this.CurrentElement = value;
            }
            this.CurrentBehavior = null;
            return this;
        }
        SetValue(dp, value) {
            dp.SetValue(this.CurrentElement, value, this.CurrentBehavior);
            return this;
        }
        Binding(property, bindingExpression, mode, updateTrigger) {
            let behavior = this.Add(new DomBehind.Data.DataBindingBehavior());
            behavior.Property = property;
            behavior.PInfo = new DomBehind.LamdaExpression(this.Owner.DataContext, bindingExpression);
            behavior.BindingPolicy.Trigger = !Object.IsNullOrUndefined(updateTrigger) ? updateTrigger : property.UpdateSourceTrigger;
            behavior.BindingPolicy.Mode = !Object.IsNullOrUndefined(mode) ? mode : property.BindingMode;
            behavior.AdditionalInfo["selector"] = this.CurrentSelector;
            let dataBindingBuilder = new DomBehind.Data.DataBindingBehaviorBuilder(this.Owner);
            dataBindingBuilder.CurrentBehavior = this.CurrentBehavior;
            dataBindingBuilder.CurrentElement = this.CurrentElement;
            return dataBindingBuilder.PartialMark(behavior.PInfo.MemberPath);
        }
        SetConverter(conv) {
            this.CurrentBehavior.BindingPolicy.Converter = conv;
            return this;
        }
        ConvertTarget(exp) {
            if (this.CurrentBehavior.BindingPolicy.Converter) {
                throw new DomBehind.Exception("Another 'IValueConverter' has already been assigned.");
            }
            let conv = new SimpleConverter();
            conv.ConvertHandler = exp;
            this.CurrentBehavior.BindingPolicy.Converter = conv;
            return this;
        }
        ConvertSource(exp) {
            if (this.CurrentBehavior.BindingPolicy.Converter) {
                throw new DomBehind.Exception("Another 'IValueConverter' has already been assigned.");
            }
            let conv = new SimpleConverter();
            conv.ConvertBackHandler = exp;
            this.CurrentBehavior.BindingPolicy.Converter = conv;
            return this;
        }
        BindingViewViewModel(view, viewModel) {
            let behavior = this.Add(new DomBehind.Data.ViewViewModelBindingBehavior());
            behavior.GetView = view;
            behavior.GetViewModel = viewModel;
            return this;
        }
        BindingAction(event, action, allowBubbling = false) {
            let behavior = this.Add(new DomBehind.Data.ActionBindingBehavior());
            behavior.Event = event.Create();
            behavior.Action = action;
            behavior.ActionParameterCount = action.length;
            behavior.AllowBubbling = allowBubbling;
            let actionBindingBuilder = new DomBehind.Data.ActionBindingBehaviorBuilder(this.Owner);
            actionBindingBuilder.CurrentBehavior = this.CurrentBehavior;
            actionBindingBuilder.CurrentElement = this.CurrentElement;
            return actionBindingBuilder;
        }
        BindingActionWithOption(event, action, option) {
            let result = this.BindingAction(event, action);
            if (option && this.CurrentBehavior instanceof DomBehind.Data.ActionBindingBehavior) {
                this.CurrentBehavior.AllowBubbling = option.allowBubbling;
                this.CurrentBehavior.AdditionalInfo["Args"] = option.args;
            }
            return result;
        }
        Add(behavior) {
            this.CurrentBehavior = behavior;
            behavior.DataContext = this.Owner.DataContext;
            behavior.Element = this.CurrentElement;
            this.Owner.BindingBehaviors.add(behavior);
            return behavior;
        }
    }
    DomBehind.BindingBehaviorBuilder = BindingBehaviorBuilder;
    class SimpleConverter {
        Convert(value) {
            if (!this.ConvertHandler)
                return value;
            return this.ConvertHandler(value);
        }
        ConvertBack(value) {
            if (!this.ConvertBackHandler)
                return value;
            return this.ConvertBackHandler(value);
        }
    }
    DomBehind.SimpleConverter = SimpleConverter;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=BindingBehaviorBuilder.js.map
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        class DataBindingBehaviorBuilder extends DomBehind.BindingBehaviorBuilder {
            constructor(owner) {
                super(owner);
            }
            get Behavior() {
                return this.CurrentBehavior;
            }
            PartialMark(...mark) {
                $.each(mark, (i, value) => {
                    this.Behavior.Marks.push(value);
                });
                return this;
            }
            Converter(converter) {
                this.Behavior.BindingPolicy.Converter = converter;
                return this;
            }
            AddValidator(validator) {
                this.Behavior.BindingPolicy.Validators.add(validator);
                validator.Behavior = this.Behavior;
                return validator;
            }
        }
        Data.DataBindingBehaviorBuilder = DataBindingBehaviorBuilder;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=DataBindingBehaviorBuilder.js.map
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        class ActionBindingBehaviorBuilder extends DomBehind.BindingBehaviorBuilder {
            constructor(owner) {
                super(owner);
            }
            get Behavior() {
                return this.CurrentBehavior;
            }
            ActionPolicy(...policies) {
                $.each(policies, (i, x) => {
                    this.Behavior.ActionPolicyCollection.push(x);
                });
                return this;
            }
        }
        Data.ActionBindingBehaviorBuilder = ActionBindingBehaviorBuilder;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=ActionBindingBehaviorBuilder.js.map
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        class ActionPolicy {
            Do(func) {
                let result;
                try {
                    this.Begin();
                    if (Object.IsNullOrUndefined(this.NextPolicy)) {
                        result = func();
                    }
                    else {
                        result = this.NextPolicy.Do(func);
                    }
                    if (!Object.IsPromise(result)) {
                        this.Done();
                        this.Always();
                        return result;
                    }
                    else if (result instanceof Promise) {
                        let dfd = $.Deferred();
                        result.then(x => {
                            this.Done();
                            this.Always();
                            dfd.resolve(x);
                        }).catch(x => {
                            let ex = new Data.ActionPolicyExceptionEventArgs(this, x);
                            this.Fail(ex);
                            this.Always();
                            if (!ex.Handled) {
                                dfd.reject(ex);
                            }
                            else {
                                dfd.reject(x);
                            }
                        });
                        return dfd.promise();
                    }
                    else {
                        let p = result;
                        p.done(() => {
                            this.Done();
                            this.Always();
                        }).fail(x => {
                            let ex = new Data.ActionPolicyExceptionEventArgs(this, x);
                            this.Fail(ex);
                            this.Always();
                            if (!ex.Handled) {
                                return ex;
                            }
                        });
                        return p;
                    }
                }
                catch (e) {
                    let ex = new Data.ActionPolicyExceptionEventArgs(this, e);
                    this.Fail(ex);
                    this.Always();
                    if (!ex.Handled)
                        throw e;
                }
            }
        }
        Data.ActionPolicy = ActionPolicy;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=ActionPolicy.js.map
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        class ActionPolicyExceptionEventArgs extends DomBehind.EventArgs {
            constructor(sender, errorData) {
                super();
                this.Data = errorData;
                this.Handled = false;
                this.Sender = sender;
            }
        }
        Data.ActionPolicyExceptionEventArgs = ActionPolicyExceptionEventArgs;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=ActionPolicyExceptionEventArgs.js.map
//# sourceMappingURL=IExceptionHandling.js.map
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        class ExceptionHandlingActionPolicy extends Data.ActionPolicy {
            constructor() {
                super(...arguments);
                this._priority = 1;
            }
            Priority() {
                return this._priority;
            }
            Begin() {
            }
            Done() {
            }
            Fail(ex) {
                if (this.Behavior.DataContext) {
                    var handlingObj = this.Behavior.DataContext;
                    if (handlingObj.Catch) {
                        handlingObj.Catch(ex);
                    }
                    if (ex.Handled)
                        return;
                }
                DomBehind.Application.Current.UnhandledException(ex.Data);
                ex.Handled = true;
            }
            Always() {
            }
        }
        Data.ExceptionHandlingActionPolicy = ExceptionHandlingActionPolicy;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=ExceptionHandlingActionPolicy.js.map
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        class ValidationExceptionHandlingActionPolicy extends Data.ActionPolicy {
            constructor() {
                super(...arguments);
                this._priority = 50;
            }
            Priority() {
                return this._priority;
            }
            Begin() { }
            Done() { }
            Fail(ex) {
                if (!this.Supported)
                    return;
                if (ex.Data instanceof DomBehind.Validation.AggregateValidationException) {
                    var vex = ex.Data;
                    $.each(vex.Items, (i, each) => {
                        this.SetCustomError(each);
                    });
                    ex.Handled = true;
                }
                else if (ex.Data instanceof DomBehind.Validation.ValidationException) {
                    this.SetCustomError(ex.Data);
                    ex.Handled = true;
                }
            }
            SetCustomError(vex) {
                this.Owner.find(vex.Selector).SetCustomError(vex.Message);
            }
            get Supported() {
                if (!this.ViewModel)
                    return false;
                if (!this.View)
                    return false;
                if (!this.Owner)
                    return false;
                return true;
            }
            get ViewModel() {
                return this.Behavior.DataContext;
            }
            get View() {
                return this.ViewModel.View;
            }
            get Owner() {
                return this.View.Container;
            }
            Always() { }
        }
        Data.ValidationExceptionHandlingActionPolicy = ValidationExceptionHandlingActionPolicy;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=ValidationExceptionHandlingActionPolicy.js.map
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        class DefaultWaitingOverlayOption {
            constructor() {
                this.Color = "rgba(255, 255, 255, 0.8)";
                this.Custom = "";
                this.Fade = true;
                this.Fontawesome = "";
                this.Image = null;
                this.ImagePosition = "center center";
                this.MaxSize = "100px";
                this.MinSize = "20px";
                this.ResizeInterval = 50;
                this.Size = "50%";
                this.ZIndex = 65535;
            }
        }
        class WaitingOverlayActionPolicy extends Data.ActionPolicy {
            constructor(option) {
                super();
                this._priority = 100;
                this._option = $.extend(true, {}, new DefaultWaitingOverlayOption(), option);
                ;
            }
            get Option() {
                return this._option;
            }
            Priority() {
                return this._priority;
            }
            Begin() {
                var container = this.Container();
                var overlay = $("<div>", {
                    class: "loadingoverlay",
                    css: {
                        "background-color": this.Option.Color,
                        "display": "flex",
                        "flex-direction": "column",
                        "align-items": "center",
                        "justify-content": "center"
                    }
                });
                if (this.Option.ZIndex !== undefined)
                    overlay.css("z-index", this.Option.ZIndex);
                if (this.Option.Image)
                    overlay.css({
                        "background-image": "url(" + this.Option.Image + ")",
                        "background-position": this.Option.ImagePosition,
                        "background-repeat": "no-repeat"
                    });
                if (this.Option.Fontawesome)
                    $("<div>", {
                        class: "loadingoverlay_fontawesome " + this.Option.Fontawesome
                    }).appendTo(overlay);
                if (this.Option.Custom)
                    $(this.Option.Custom).appendTo(overlay);
                if (this.IsWholePage()) {
                    overlay.css({
                        "position": "fixed",
                        "top": 0,
                        "left": 0,
                        "width": "100%",
                        "height": "100%"
                    });
                }
                else {
                    overlay.css("position", (container.css("position") == "fixed") ? "fixed" : "absolute");
                }
                this.Resize(overlay);
                if (this.Option.ResizeInterval > 0) {
                    var resizeIntervalId = setInterval(() => this.Resize(overlay), this.Option.ResizeInterval);
                    container.data("LoadingOverlayResizeIntervalId", resizeIntervalId);
                }
                if (!this.Option.Fade) {
                    this.Option.Fade = [0, 0];
                }
                else if (this.Option.Fade === true) {
                    this.Option.Fade = [400, 200];
                }
                else if (typeof this.Option.Fade == "string" || typeof this.Option.Fade == "number") {
                    this.Option.Fade = [this.Option.Fade, this.Option.Fade];
                }
                container.data({
                    "LoadingOverlay": overlay,
                    "LoadingOverlayFadeOutDuration": this.Option.Fade[1]
                });
                overlay
                    .hide()
                    .appendTo("body")
                    .fadeIn(this.Option.Fade[0]);
            }
            Resize(overlay) {
                var container = this.Container();
                var wholePage = this.IsWholePage();
                if (!wholePage) {
                    var x = (container.css("position") == "fixed") ? container.position() : container.offset();
                    overlay.css({
                        top: x.top + parseInt(container.css("border-top-width"), 10),
                        left: x.left + parseInt(container.css("border-left-width"), 10),
                        width: container.innerWidth(),
                        height: container.innerHeight()
                    });
                }
                var c = wholePage ? $(window) : container;
                var size = "auto";
                if (this.Option.Size && this.Option.Size != "auto") {
                    size = Math.min(c.innerWidth(), c.innerHeight()) * parseFloat(this.Option.Size) / 100;
                    if (this.Option.MaxSize && size > parseInt(this.Option.MaxSize, 10))
                        size = parseInt(this.Option.MaxSize, 10) + "px";
                    if (this.Option.MinSize && size < parseInt(this.Option.MinSize, 10))
                        size = parseInt(this.Option.MinSize, 10) + "px";
                }
                overlay.css("background-size", size);
                overlay.children(".loadingoverlay_fontawesome").css("font-size", size);
            }
            Done() {
            }
            Fail(ex) {
            }
            Always() {
                var container = this.Container();
                var resizeIntervalId = container.data("LoadingOverlayResizeIntervalId");
                if (resizeIntervalId)
                    clearInterval(resizeIntervalId);
                container.data("LoadingOverlay").fadeOut(container.data("LoadingOverlayFadeOutDuration"), function () {
                    $(this).remove();
                });
                container.removeData(["LoadingOverlay", "LoadingOverlayFadeOutDuration", "LoadingOverlayResizeIntervalId"]);
            }
        }
        Data.WaitingOverlayActionPolicy = WaitingOverlayActionPolicy;
        class ElementWaitingOverlayActionPolicy extends WaitingOverlayActionPolicy {
            constructor(element, option) {
                super(option);
                this._container = element;
                this.Option.Image = "/Content/images/preloader.gif";
            }
            Container() {
                return this._container;
            }
            IsWholePage() {
                return false;
            }
        }
        Data.ElementWaitingOverlayActionPolicy = ElementWaitingOverlayActionPolicy;
        class WindowWaitingOverlayActionPolicy extends ElementWaitingOverlayActionPolicy {
            constructor(option) {
                super($(document), option);
            }
            IsWholePage() {
                return true;
            }
        }
        Data.WindowWaitingOverlayActionPolicy = WindowWaitingOverlayActionPolicy;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
(function (DomBehind) {
    var Data;
    (function (Data) {
        Data.ActionBindingBehaviorBuilder.prototype.WaitingOverlay = function (policy) {
            let me = this;
            if (!policy) {
                policy = new Data.WindowWaitingOverlayActionPolicy();
            }
            me.ActionPolicy(policy);
            return me;
        };
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=WaitingOverlayActionPolicy.js.map
var DomBehind;
(function (DomBehind) {
    var Data;
    (function (Data) {
        class SuppressDuplicateWorkException extends DomBehind.Exception {
            constructor() { super("This exception is a safe exception issued to prevent double press"); }
        }
        class SuppressDuplicateActionPolicy extends Data.ActionPolicy {
            constructor() {
                super(...arguments);
                this._priority = 10;
                this.IsEnabled = DomBehind.UIElement.IsEnabledProperty;
                this.referencecount = 0;
                this.engaged = false;
            }
            Priority() {
                return this._priority;
            }
            Begin() {
                ++this.referencecount;
                if (this.engaged) {
                    throw new SuppressDuplicateWorkException();
                }
                this.engaged = true;
                this.IsEnabled.SetValue(this.Behavior.Element, false);
            }
            Done() {
            }
            Fail(ex) {
                if (ex.Data instanceof SuppressDuplicateWorkException) {
                    ex.Handled = true;
                }
            }
            Always() {
                if (--this.referencecount === 0) {
                    this.engaged = false;
                    this.IsEnabled.SetValue(this.Behavior.Element, true);
                }
            }
        }
        Data.SuppressDuplicateActionPolicy = SuppressDuplicateActionPolicy;
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=SuppressDuplicateActionPolicy.js.map
var DomBehind;
(function (DomBehind) {
    class IndexedDBHelper {
        constructor(ctor, db) {
            let schema = new ctor();
            let name = schema.toString();
            if (name === "[object Object]") {
                name = schema.constructor.name;
            }
            if (name === "Object") {
                throw Error("dynamic object is not supported");
            }
            this.DbName = db;
            this.TableName = name;
        }
        Drop() {
            let d = $.Deferred();
            let db = this.Open();
            db.done(x => {
                if (!x.objectStoreNames.contains(this.TableName)) {
                    d.resolve();
                    return;
                }
                this.Upgrade(x.version + 1, y => {
                    let newDb = y.target.result;
                    if (newDb && newDb.deleteObjectStore)
                        newDb.deleteObjectStore(this.TableName);
                    d.resolve();
                });
            }).fail(() => {
                d.reject();
            });
            return d.promise();
        }
        DropAsync() {
            return $.ToPromise(this.Drop());
        }
        List() {
            let d = $.Deferred();
            let db = this.Open();
            db.done(x => {
                if (!x.objectStoreNames.contains(this.TableName)) {
                    d.resolve([]);
                    return;
                }
                let trans = x.transaction(this.TableName, "readwrite");
                let objectStore = trans.objectStore(this.TableName);
                let dbRequest = objectStore.getAll();
                dbRequest.onsuccess = e => {
                    let result = dbRequest.result;
                    d.resolve(result);
                };
                dbRequest.onerror = e => {
                    d.reject();
                };
            }).fail(() => {
                d.reject();
            });
            return d.promise();
        }
        ListAsync() {
            return $.ToPromise(this.List());
        }
        Truncate() {
            let d = $.Deferred();
            let db = this.Open();
            db.done(x => {
                if (!x.objectStoreNames.contains(this.TableName)) {
                    d.resolve([]);
                    return;
                }
                let trans = x.transaction(this.TableName, "readwrite");
                let objectStore = trans.objectStore(this.TableName);
                let dbRequest = objectStore.clear();
                dbRequest.onsuccess = e => {
                    d.resolve();
                };
                dbRequest.onerror = e => {
                    d.reject();
                };
            }).fail(() => {
                d.reject();
            });
            return d.promise();
        }
        TruncateAsync() {
            return $.ToPromise(this.Truncate());
        }
        FindRow(exp, value) {
            let d = $.Deferred();
            this.FindRows(exp, value).done(x => {
                d.resolve(x.FirstOrDefault());
            }).fail(x => {
                d.reject(x);
            });
            return d.promise();
        }
        FindRowAsync(exp, value) {
            return $.ToPromise(this.FindRow(exp, value));
        }
        FindRows(exp, value) {
            let path = DomBehind.LamdaExpression.Path(exp);
            let d = $.Deferred();
            let db = this.Open();
            db.done(x => {
                if (!x.objectStoreNames.contains(this.TableName)) {
                    d.resolve([]);
                    return;
                }
                let trans = x.transaction(this.TableName, "readwrite");
                let objectStore = trans.objectStore(this.TableName);
                if (objectStore.keyPath === path) {
                    let dbRequest = objectStore.get(value);
                    dbRequest.onsuccess = e => {
                        let result = [dbRequest.result];
                        d.resolve(result);
                    };
                    dbRequest.onerror = e => {
                        d.reject(e);
                    };
                }
                else if (objectStore.indexNames.contains(path)) {
                    this.FetchCursor(objectStore.index(path), value, d);
                }
                else {
                    x.close();
                    this.Upgrade(x.version + 1, y => {
                        let newDb = y.target.result;
                        let newTrans = y.target.transaction;
                        let newObjectStore = newTrans.objectStore(this.TableName);
                        let indexStore = newObjectStore.createIndex(path, path, { unique: false });
                        this.FetchCursor(indexStore, value, d);
                    });
                }
            }).fail(x => {
                d.reject(x);
            });
            return d.promise();
        }
        FindRowsAsync(exp, value) {
            return $.ToPromise(this.FindRows(exp, value));
        }
        FetchCursor(indexStore, value, d) {
            let list = new DomBehind.List();
            let cursorHandler = indexStore.openCursor(value);
            cursorHandler.onsuccess = (e) => {
                let cursor = e.target.result;
                if (cursor) {
                    let value = cursor.value;
                    if (!Object.IsNullOrUndefined(value)) {
                        list.add(value);
                    }
                    cursor.continue();
                }
                else {
                    d.resolve(list.toArray());
                }
            };
            cursorHandler.onerror = e => {
                d.reject(e);
            };
        }
        Upsert(entity, primaryKey) {
            let path;
            if (primaryKey) {
                path = DomBehind.LamdaExpression.Path(primaryKey);
            }
            let d = $.Deferred();
            let db = this.Open();
            db.done(x => {
                if (!x.objectStoreNames.contains(this.TableName)) {
                    x.close();
                    this.Upgrade(x.version + 1, y => {
                        let newDb = y.target.result;
                        let newStore;
                        if (path) {
                            newStore = newDb.createObjectStore(this.TableName, { keyPath: path });
                        }
                        else {
                            newStore = newDb.createObjectStore(this.TableName, { keyPath: "__identity", autoIncrement: true });
                        }
                        newStore.transaction.oncomplete = e => {
                            newDb.close();
                            this.Upsert(entity, primaryKey).done(x => d.resolve()).fail(x => d.reject(x));
                        };
                    });
                    return;
                }
                let trans = x.transaction(this.TableName, "readwrite");
                let store = trans.objectStore(this.TableName);
                if (entity instanceof Array) {
                    $.each(entity, (i, value) => {
                        store.put(value);
                    });
                }
                else {
                    store.put(entity);
                }
                d.resolve();
            }).fail(x => {
                d.reject(x);
            });
            return d.promise();
        }
        UpsertAsync(entity, primaryKey) {
            return $.ToPromise(this.Upsert(entity, primaryKey));
        }
        Delete(entity) {
            let d = $.Deferred();
            let db = this.Open();
            db.done(x => {
                if (!x.objectStoreNames.contains(this.TableName)) {
                    d.resolve();
                }
                else {
                    let trans = x.transaction(this.TableName, "readwrite");
                    if (trans.objectStoreNames.contains(this.TableName)) {
                        let store = trans.objectStore(this.TableName);
                        if (entity instanceof Array) {
                            $.each(entity, (i, value) => {
                                let id = value[`${store.keyPath}`];
                                store.delete(id);
                            });
                        }
                        else {
                            let identity = entity[`${store.keyPath}`];
                            store.delete(identity);
                        }
                        d.resolve();
                    }
                    else {
                        d.reject(`table not found. ${this.TableName}`);
                    }
                }
            }).fail(x => {
                d.reject(x);
            });
            return d.promise();
        }
        DeleteAsync(entity) {
            return $.ToPromise(this.Delete(entity));
        }
        Open() {
            let d = $.Deferred();
            let factory = window.indexedDB;
            let openRequest = factory.open(this.DbName);
            openRequest.onsuccess = e => {
                let db = openRequest.result;
                d.resolve(db);
                db.close();
            };
            openRequest.onblocked = e => {
                d.reject(e);
            };
            openRequest.onerror = e => {
                d.reject(e);
            };
            return d.promise();
        }
        OpenAsync() {
            let pms = this.Open();
            var p = new Promise((resolve, reject) => {
                pms.done(x => resolve(x))
                    .fail(x => reject(x));
            });
            return p;
        }
        Upgrade(version, action) {
            let factory = window.indexedDB;
            let openRequest = factory.open(this.DbName, version);
            openRequest.onsuccess = e => {
                let dummy = e;
            };
            openRequest.onupgradeneeded = (e) => {
                let db = e.target.result;
                action(e);
                db.close();
            };
            openRequest.onerror = e => {
            };
        }
    }
    DomBehind.IndexedDBHelper = IndexedDBHelper;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=IndexedDBHelper.js.map
var DomBehind;
(function (DomBehind) {
    var Navigation;
    (function (Navigation) {
        let ModalStartupLocation;
        (function (ModalStartupLocation) {
            ModalStartupLocation[ModalStartupLocation["CenterScreen"] = 0] = "CenterScreen";
            ModalStartupLocation[ModalStartupLocation["Manual"] = 1] = "Manual";
        })(ModalStartupLocation = Navigation.ModalStartupLocation || (Navigation.ModalStartupLocation = {}));
    })(Navigation = DomBehind.Navigation || (DomBehind.Navigation = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=INavigator.js.map
var DomBehind;
(function (DomBehind) {
    var Navigation;
    (function (Navigation) {
        const OnModalCloseEventName = "ModalClose";
        const ReferenceCountKey = "ReferenceCountKey";
        class DefaultNavigator {
            constructor() {
                this.DefaultSetting = {
                    FadeInDuration: 100,
                    FadeOutDuration: 100,
                    AllowCloseByClickOverlay: true,
                    ShowCloseButton: true,
                    ShowHeader: true,
                    StartupLocation: Navigation.ModalStartupLocation.CenterScreen,
                    StartupLocationTop: null,
                    StartupLocationLeft: null
                };
            }
            NewWindow(uri, target, style) {
                if (!String.IsNullOrWhiteSpace(uri) && uri !== "about:blank") {
                    uri = $.AbsoluteUri(uri);
                }
                return window.open(uri, target, style);
            }
            Move(uri, historyBack) {
                uri = $.AbsoluteUri(uri);
                if (location.href === uri)
                    return;
                if (historyBack) {
                    location.href = uri;
                }
                else {
                    location.replace(uri);
                }
            }
            Reload(forcedReload) {
                location.reload(forcedReload);
            }
            ShowModal(arg, option) {
                let setting = $.extend(true, this.DefaultSetting, option);
                ;
                let overlay = $("<div>", {
                    class: "modal-overlay",
                });
                overlay.css("z-index", $.GenerateZIndex());
                $("body").css("overflow", "hidden");
                overlay
                    .appendTo("body")
                    .fadeIn(setting.FadeInDuration, () => {
                    $.SetDomStorage(ReferenceCountKey, $.GetDomStorage(ReferenceCountKey, 0) + 1);
                });
                var container;
                if (typeof arg === "string") {
                    var ex;
                    var ajax = $.ajax({
                        url: $.AbsoluteUri(arg),
                        async: false,
                        type: "GET",
                        cache: false,
                        error: (xhr, status, error) => {
                            ex = new DomBehind.AjaxException(xhr, status, error);
                        },
                    });
                    if (ex)
                        throw ex;
                    var html = ajax.responseText;
                    container = $(html);
                }
                else {
                    container = arg;
                }
                container.find(".close").on("click", (e, args) => {
                    $(e.target).trigger(OnModalCloseEventName, args);
                });
                if (!setting.ShowCloseButton) {
                    container.find(".close").hide();
                }
                if (setting.StartupLocation === Navigation.ModalStartupLocation.Manual) {
                    if (Object.IsNullOrUndefined(setting.StartupLocationTop) &&
                        Object.IsNullOrUndefined(setting.StartupLocationLeft)) {
                        var buffCount = $.GetDomStorage(ReferenceCountKey, 0) + 1;
                        container.find(".modal-dialog")
                            .css("top", `${-50 + (buffCount * 5)}%`)
                            .css("left", `${-25 + (buffCount * 5)}%`);
                    }
                    else {
                        container.find(".modal-dialog")
                            .css("top", setting.StartupLocationTop)
                            .css("left", setting.StartupLocationLeft);
                    }
                }
                let modal = container.find(".modal-dialog");
                if (modal.draggable) {
                    modal.draggable({
                        handle: ".modal-header",
                        cursor: "move",
                    });
                }
                if (setting.Width) {
                    modal.css("width", setting.Width);
                }
                if (setting.Height) {
                    modal.css("height", setting.Height);
                }
                if (!setting.ShowHeader) {
                    container.find(".modal-header").hide();
                    container.find(".modal-body").css("height", "100%");
                }
                if (setting.AllowCloseByClickOverlay) {
                    overlay.click(overlay, e => {
                        $(e.target).trigger(OnModalCloseEventName);
                    });
                    container.click(e => {
                        e.stopPropagation();
                    });
                }
                let d = $.Deferred();
                overlay.off(OnModalCloseEventName);
                overlay.on(OnModalCloseEventName, { me: overlay, option: setting, target: container }, (e, args) => {
                    var eventObj = $.Event('modalClosing');
                    var modalBody = e.data.target.find(".modal-body");
                    $(modalBody.children()[0]).trigger(eventObj);
                    if (eventObj.result === false) {
                        d.reject();
                        return;
                    }
                    d.resolve(args);
                    var eventOption = e.data.option;
                    var me = e.data.me;
                    me.off(OnModalCloseEventName);
                    me.fadeOut(eventOption.FadeOutDuration, () => {
                        me.remove();
                        $.SetDomStorage(ReferenceCountKey, $.GetDomStorage(ReferenceCountKey, 0) - 1);
                        if ($.GetDomStorage(ReferenceCountKey, 0) === 0) {
                            $("body").css("overflow", "auto");
                        }
                    });
                });
                overlay.append(container);
                container.hide().show(0);
                return d.promise();
            }
        }
        Navigation.DefaultNavigator = DefaultNavigator;
    })(Navigation = DomBehind.Navigation || (DomBehind.Navigation = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=DefaultNavigator.js.map
var DomBehind;
(function (DomBehind) {
    var Validation;
    (function (Validation) {
        class Validator {
            constructor(attribute) {
                this._disposed = false;
                this.Attribute = attribute;
            }
            get AttributeValue() {
                var ret = this.ParseAttributeValue();
                return Object.IsNullOrUndefined(ret) ? "" : ret;
            }
            ParseAttributeValue() {
                if (Object.IsNullOrUndefined(this.AttributeExpression))
                    return null;
                let obj = this.AttributeExpression;
                let value;
                if (typeof obj === "string" || typeof obj === "number") {
                    value = this.AttributeExpression;
                }
                else {
                    value = this.AttributeExpression(this.Behavior.DataContext);
                }
                return value;
            }
            OnValidationg() {
                this.HasError = false;
                this.Apply();
                this.HasError = !this.Validate(this.Behavior.ValueCore);
                if (this.HasError) {
                    var message = this.ValidationMessage(this.Behavior.Element.ValidityState());
                    if (!String.IsNullOrWhiteSpace(message)) {
                        this.Behavior.Element.SetCustomError(message);
                    }
                }
            }
            Apply() {
                if (!Object.IsNullOrUndefined(this.AllowApply)) {
                    var ret = this.AllowApply(this.Behavior.DataContext);
                    if (!ret) {
                        this.RemoveValidation();
                        return;
                    }
                }
                this.AddValidation();
            }
            RemoveValidation() {
                if (!String.IsNullOrWhiteSpace(this.Attribute)) {
                    this.Behavior.Element.removeAttr(this.Attribute);
                }
                this.Behavior.Element.ClearCustomError();
            }
            ClearValidation() {
                if (!String.IsNullOrWhiteSpace(this.Attribute) &&
                    Validator._ignoreMarks.Any(x => x !== this.Attribute)) {
                    this.Behavior.Element.removeAttr(this.Attribute);
                }
                this.Behavior.Element.ClearCustomError();
            }
            AddValidation() {
                this.RemoveValidation();
                if (!String.IsNullOrWhiteSpace(this.Attribute)) {
                    this.Behavior.Element.attr(this.Attribute, this.AttributeValue);
                }
            }
            Validate(value) {
                return !this.Behavior.Element.HasError();
            }
            ValidationMessage(validity) {
                if (Object.IsNullOrUndefined(this.Message))
                    return null;
                let obj = this.Message;
                let errorMessage;
                if (typeof obj === "string") {
                    errorMessage = this.Message;
                }
                else {
                    errorMessage = this.Message(this.Behavior.DataContext);
                }
                return errorMessage;
            }
            Dispose() {
                if (!this._disposed) {
                }
                this._disposed = true;
            }
        }
        Validator._ignoreMarks = [
            "maxlength"
        ];
        Validation.Validator = Validator;
    })(Validation = DomBehind.Validation || (DomBehind.Validation = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Validator.js.map
var DomBehind;
(function (DomBehind) {
    var Validation;
    (function (Validation) {
        class ValidatorCollection extends collections.LinkedList {
            constructor() {
                super(...arguments);
                this._disposed = false;
            }
            RemoveValidator() {
                $.each(this.toArray(), (i, x) => x.RemoveValidation());
            }
            ClearValidator() {
                $.each(this.toArray(), (i, x) => x.ClearValidation());
            }
            ApplyValidator() {
                $.each(this.toArray(), (i, x) => x.Apply());
            }
            Validate() {
                let result = true;
                $.each(this.toArray(), (i, x) => {
                    x.OnValidationg();
                    if (x.HasError) {
                        result = false;
                    }
                });
                return result;
            }
            Dispose() {
                if (!this._disposed) {
                    $.each(this.toArray(), (i, x) => x.Dispose());
                    this.clear();
                }
                this._disposed = true;
            }
        }
        Validation.ValidatorCollection = ValidatorCollection;
    })(Validation = DomBehind.Validation || (DomBehind.Validation = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=ValidatorCollection.js.map
var DomBehind;
(function (DomBehind) {
    var Validation;
    (function (Validation) {
        class MaxLengthValidator extends Validation.Validator {
            constructor() {
                super("maxlength");
            }
            Dispose() {
                if (!this._disposed) {
                    super.Dispose();
                }
            }
        }
        Validation.MaxLengthValidator = MaxLengthValidator;
    })(Validation = DomBehind.Validation || (DomBehind.Validation = {}));
})(DomBehind || (DomBehind = {}));
(function (DomBehind) {
    DomBehind.BindingBehaviorBuilder.prototype.MaxLength = function (maxlength, message, applyRule) {
        let me = this;
        let dataBinding = this;
        if (dataBinding.AddValidator) {
            let validator = dataBinding.AddValidator(new DomBehind.Validation.MaxLengthValidator());
            validator.AttributeExpression = maxlength;
            validator.Message = message;
            validator.AllowApply = applyRule;
        }
        let inputType = me.CurrentElement.attr("type");
        if (inputType == "number") {
            me.CurrentElement.off('input');
            me.CurrentElement.on('input', function (e) {
                let el = $(this);
                let value = String(el.val());
                if (value.length > maxlength) {
                    el.val(value.slice(0, maxlength));
                }
            });
        }
        else {
            DomBehind.UIElement.MaxLengthProperty.SetValue(me.CurrentElement, maxlength);
        }
        return me;
    };
    DomBehind.BindingBehaviorBuilder.prototype.MaxNumeric = function (max) {
        let me = this;
        DomBehind.UIElement.MaxNumericProperty.SetValue(me.CurrentElement, max);
        let length = max.toString().length;
        me.CurrentElement.off('input');
        me.CurrentElement.on('input', function (e) {
            let el = $(this);
            let maxlength = el.attr('max').length;
            let value = String(el.val());
            if (value.length > maxlength) {
                el.val(value.slice(0, maxlength));
            }
        });
        return me;
    };
    DomBehind.BindingBehaviorBuilder.prototype.MinNumeric = function (min) {
        let me = this;
        DomBehind.UIElement.MinNumericProperty.SetValue(me.CurrentElement, min);
        return me;
    };
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=MaxLengthValidator.js.map
var DomBehind;
(function (DomBehind) {
    var Validation;
    (function (Validation) {
        class RegexValidator extends Validation.Validator {
            constructor() {
                super("pattern");
            }
            RemoveValidation() {
                super.RemoveValidation();
                this.Behavior.Element.removeAttr("title");
            }
            ValidationMessage(validity) {
                var message = super.ValidationMessage(validity);
                if (String.IsNullOrWhiteSpace(message)) {
                    this.Behavior.Element.attr("title", this.AttributeValue);
                }
                return message;
            }
            Dispose() {
                if (!this._disposed) {
                    super.Dispose();
                }
            }
        }
        Validation.RegexValidator = RegexValidator;
    })(Validation = DomBehind.Validation || (DomBehind.Validation = {}));
})(DomBehind || (DomBehind = {}));
(function (DomBehind) {
    var Data;
    (function (Data) {
        Data.DataBindingBehaviorBuilder.prototype.Pattern = function (regex, message, applyRule) {
            let me = this;
            var validator = me.AddValidator(new DomBehind.Validation.RegexValidator());
            validator.AttributeExpression = regex;
            validator.Message = message;
            validator.AllowApply = applyRule;
            return me;
        };
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=RegexValidator.js.map
var DomBehind;
(function (DomBehind) {
    var Validation;
    (function (Validation) {
        class RequiredValidator extends Validation.Validator {
            constructor() {
                super("required");
            }
            Dispose() {
                if (!this._disposed) {
                    super.Dispose();
                }
            }
        }
        Validation.RequiredValidator = RequiredValidator;
    })(Validation = DomBehind.Validation || (DomBehind.Validation = {}));
})(DomBehind || (DomBehind = {}));
(function (DomBehind) {
    var Data;
    (function (Data) {
        Data.DataBindingBehaviorBuilder.prototype.Required = function (message, applyRule) {
            let me = this;
            var validator = me.AddValidator(new DomBehind.Validation.RequiredValidator());
            validator.Message = message;
            validator.AllowApply = applyRule;
            return me;
        };
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=RequiredValidator.js.map
var DomBehind;
(function (DomBehind) {
    var Validation;
    (function (Validation) {
        class PipelineValidator extends DomBehind.Validation.Validator {
            constructor() {
                super();
                this.Validators = [];
            }
            Validate(value) {
                let result = true;
                let lastErrorMessage;
                this.Error = null;
                $.each(this.Validators, (i, x) => {
                    x.OnValidationg();
                    if (x.HasError) {
                        lastErrorMessage = x.Message;
                        result = false;
                        this.Error = x;
                        return false;
                    }
                });
                this.Message = lastErrorMessage;
                return result;
            }
            Apply() {
                this.Validators.forEach(x => x.Apply());
            }
            RemoveValidation() {
                this.Validators.forEach(x => x.RemoveValidation());
            }
            ClearValidation() {
                this.Validators.forEach(x => x.ClearValidation());
            }
            AddValidation() {
                this.Validators.forEach(x => x.AddValidation());
            }
            AddValidator(validator) {
                validator.Behavior = this.Behavior;
                this.Validators.push(validator);
            }
            Dispose() {
                this.Validators.forEach(x => x.Dispose());
            }
        }
        Validation.PipelineValidator = PipelineValidator;
    })(Validation = DomBehind.Validation || (DomBehind.Validation = {}));
})(DomBehind || (DomBehind = {}));
(function (DomBehind) {
    DomBehind.BindingBehaviorBuilder.prototype.AddPipelineValidator = function (validator) {
        let me = this;
        if (me.CurrentBehavior instanceof DomBehind.Data.DataBindingBehavior) {
            let lastValidator = me.CurrentBehavior.BindingPolicy.Validators.toArray().LastOrDefault();
            if (lastValidator && lastValidator instanceof DomBehind.Validation.PipelineValidator) {
                lastValidator.AddValidator(validator);
            }
            else {
                let pipelineValidator = new DomBehind.Validation.PipelineValidator();
                pipelineValidator.Behavior = me.CurrentBehavior;
                pipelineValidator.AddValidator(validator);
                me.CurrentBehavior.BindingPolicy.Validators.add(pipelineValidator);
            }
        }
        return me;
    };
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=PipelineValidator.js.map
var DomBehind;
(function (DomBehind) {
    let PoolType;
    (function (PoolType) {
        PoolType[PoolType["PreLoad"] = 1] = "PreLoad";
        PoolType[PoolType["Reload"] = 2] = "Reload";
    })(PoolType = DomBehind.PoolType || (DomBehind.PoolType = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=PoolType.js.map
var DomBehind;
(function (DomBehind) {
    var Threading;
    (function (Threading) {
        class WorkerPool {
            static Register(type, defaultPoolCount = 2) {
                $("body").ready(e => {
                    let factory = new DomBehind.TypedFactory(type());
                    for (var i = 0; i < defaultPoolCount; i++) {
                        let newThread = factory.CreateInstance();
                        if ((newThread.PoolType & DomBehind.PoolType.PreLoad) == DomBehind.PoolType.PreLoad) {
                            newThread.Load();
                        }
                        this.Pool.push(newThread);
                    }
                });
            }
            static Do(type, arg) {
                let thread = null;
                let newPool = [];
                $.each(WorkerPool.Pool, (i, value) => {
                    if (thread) {
                        newPool.push(value);
                    }
                    else {
                        if (value instanceof type) {
                            thread = value;
                        }
                        else {
                            newPool.push(value);
                        }
                    }
                });
                WorkerPool.Pool = newPool;
                if (!thread) {
                    let factory = new DomBehind.TypedFactory(type);
                    thread = factory.CreateInstance();
                    thread.Load();
                }
                return thread.Do(arg).always(() => {
                    if (thread.PoolType & DomBehind.PoolType.Reload) {
                        thread.Terminate();
                        thread.Load();
                    }
                    WorkerPool.Pool.push(thread);
                });
            }
        }
        WorkerPool.Pool = [];
        Threading.WorkerPool = WorkerPool;
    })(Threading = DomBehind.Threading || (DomBehind.Threading = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=WorkerPool.js.map
var DomBehind;
(function (DomBehind) {
    var Threading;
    (function (Threading) {
        class WorkerWrapper {
            constructor() {
                this.PoolType = DomBehind.PoolType.Reload;
            }
            get Thread() { return this._thread; }
            ;
            Load() {
                if (!this._thread)
                    this._thread = new Worker(this.WorkerScript);
            }
            get WorkerScript() { return null; }
            Do(arg) {
                let d = $.Deferred();
                this.Thread.onmessage = e => {
                    d.resolve(e.data);
                };
                this.Thread.onerror = (e) => {
                    console.error(`${e.filename}:(${e.lineno})\n${e.message}`);
                    var errorMessage;
                    var stackTrace;
                    try {
                        $.each($(e.message), (i, value) => {
                            if (value instanceof HTMLTitleElement) {
                                errorMessage = value.text;
                            }
                            if (value instanceof Comment) {
                                stackTrace = value.textContent;
                            }
                        });
                    }
                    catch (ex) {
                        console.error(ex.message);
                    }
                    d.reject({ ErrorMessage: errorMessage, Description: stackTrace });
                };
                this.Thread.postMessage(arg);
                return d.promise();
            }
            Terminate() {
                if (this._thread) {
                    this._thread.terminate();
                    this._thread = null;
                }
            }
        }
        Threading.WorkerWrapper = WorkerWrapper;
    })(Threading = DomBehind.Threading || (DomBehind.Threading = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=WorkerWrapper.js.map
var DomBehind;
(function (DomBehind) {
    var Web;
    (function (Web) {
        DomBehind.Threading.WorkerPool.Register(() => PlainXMLHttpRequestWorker);
        class PlainXMLHttpRequestWorker extends DomBehind.Threading.WorkerWrapper {
            get WorkerScript() {
                return "~/Scripts/dombehind-PlainXMLHttpRequest.js";
            }
        }
        Web.PlainXMLHttpRequestWorker = PlainXMLHttpRequestWorker;
    })(Web = DomBehind.Web || (DomBehind.Web = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=PlainXMLHttpRequestWorker.js.map
var DomBehind;
(function (DomBehind) {
    var Web;
    (function (Web) {
        class WebService {
            constructor() {
                this.Timeout = 1000 * 30;
            }
            Execute(request) {
                let ex;
                let option = this.DefaultPostSetting;
                option.data = request;
                option.async = false;
                option.error = (xhr, status, error) => {
                    ex = new DomBehind.AjaxException(xhr, status, error);
                };
                var promise = $.ajax(option);
                if (ex) {
                    throw ex;
                }
                return promise.responseJSON;
            }
            ExecuteAsync(request, option) {
                let d = $.Deferred();
                let p = $.extend(true, this.DefaultPostSetting, option);
                p.data = JSON.stringify(request);
                p.async = true;
                $.ajax(p).done(x => {
                    d.resolve(x);
                }).fail(x => {
                    d.reject(new DomBehind.AjaxException(x));
                });
                return d.promise();
            }
            ExecuteAjax(request, option) {
                let d = $.Deferred();
                let p = $.extend(true, this.DefaultPostSetting, option);
                p.data = request;
                p.async = true;
                $.ajax(p).done(x => {
                    d.resolve(x);
                }).fail(x => {
                    d.reject(new DomBehind.AjaxException(x));
                });
                return d.promise();
            }
            get DefaultPostSetting() {
                return {
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    url: $.AbsoluteUri(this.Url),
                    timeout: this.Timeout,
                    traditional: true
                };
            }
        }
        Web.WebService = WebService;
    })(Web = DomBehind.Web || (DomBehind.Web = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=WebService.js.map
var DomBehind;
(function (DomBehind) {
    class UIElement {
        static RaiseEnabledChanged(element, isEnabled) {
            element.Raise(UIElement.EnabledChanged, (e) => {
                e.isEnabled = isEnabled;
            });
        }
    }
    UIElement.ValueProperty = DomBehind.Data.DependencyProperty.RegisterAttached("val", x => x.val(), (x, y) => x.val(y), DomBehind.Data.UpdateSourceTrigger.LostForcus, DomBehind.Data.BindingMode.TwoWay);
    UIElement.TextProperty = DomBehind.Data.DependencyProperty.RegisterAttached("text", x => x.text(), (x, y) => x.text(y), DomBehind.Data.UpdateSourceTrigger.LostForcus, DomBehind.Data.BindingMode.TwoWay);
    UIElement.SrcProperty = DomBehind.Data.DependencyProperty.RegisterAttached("src", x => x.attr("src"), (x, y) => x.attr("src", y), DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
    UIElement.HrefProperty = DomBehind.Data.DependencyProperty.RegisterAttached("href", x => x.attr("href"), (x, y) => x.attr("href", y), DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
    UIElement.IsEnabledProperty = DomBehind.Data.DependencyProperty.RegisterAttached("enabled", null, (x, y) => {
        let disabled = y === false ? true : false;
        let oldDisabledValue = x.hasClass("disabled");
        if (disabled === true) {
            x.attr("disabled", "");
            x.addClass("disabled");
        }
        else {
            x.removeAttr("disabled");
            x.removeClass("disabled");
        }
        if (x.is('input[type=radio]') ||
            x.is('input[type=checkbox]')) {
            let parent = x.closest("label");
            if (parent) {
                if (disabled) {
                    parent.addClass("disablecheck");
                }
                else {
                    parent.removeClass("disablecheck");
                }
            }
        }
        if (disabled === oldDisabledValue)
            return;
        UIElement.RaiseEnabledChanged(x, !disabled);
    }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
    UIElement.IsVisibleProperty = DomBehind.Data.DependencyProperty.RegisterAttached("display", x => x.attr("display") === "none" ? false : true, (x, y) => {
        let visible = y ? true : false;
        if (visible) {
            x.attr("display", "");
            try {
                x.show();
            }
            catch (e) {
            }
        }
        else {
            x.attr("display", "none");
            try {
                x.hide();
            }
            catch (e) {
            }
        }
    }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.TwoWay);
    UIElement.OpacityProperty = DomBehind.Data.DependencyProperty.RegisterAttached("opacity", x => {
    }, (el, newValue) => {
        el.css("opacity", newValue);
    }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
    UIElement.PlaceHolderProperty = DomBehind.Data.DependencyProperty.RegisterAttached("placeholder", null, (x, y) => x.attr("placeholder", y), DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
    UIElement.IsCheckedProperty = DomBehind.Data.DependencyProperty.RegisterAttached("checked", x => x.get(0).checked, (x, y) => {
        let el = x.get(0);
        el.checked = y;
        if (el.hasAttribute("readonly")) {
            el.onclick = e => false;
        }
    }, DomBehind.Data.UpdateSourceTrigger.LostForcus, DomBehind.Data.BindingMode.TwoWay);
    UIElement.MaxLengthProperty = DomBehind.Data.DependencyProperty.RegisterAttached("maxlength", null, (x, y) => x.attr("maxlength", y), DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
    UIElement.MaxNumericProperty = DomBehind.Data.DependencyProperty.RegisterAttached("maxlength", null, (x, y) => x.attr("max", y), DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
    UIElement.MinNumericProperty = DomBehind.Data.DependencyProperty.RegisterAttached("maxlength", null, (x, y) => x.attr("min", y), DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
    UIElement.BackgroundColorProperty = DomBehind.Data.DependencyProperty.RegisterAttached("background-color", null, (x, y) => x.css("background-color", y), DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
    UIElement.ColorProperty = DomBehind.Data.DependencyProperty.RegisterAttached("color", null, (x, y) => x.css("color", y), DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
    UIElement.BackgroundImageProperty = DomBehind.Data.DependencyProperty.RegisterAttached("background-image", null, (x, y) => x.css("background-image", y), DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
    UIElement.ClassProperty = DomBehind.Data.DependencyProperty.RegisterAttached("", x => x.attr("class"), (x, y) => x.attr("class", y), DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.TwoWay);
    UIElement.HtmlSource = DomBehind.Data.DependencyProperty.RegisterAttached("htmlSource", null, (x, y) => {
        let p = {
            url: y,
            async: true,
            type: "GET",
            cache: true,
        };
        $.ajax(p).done(dom => {
            let body = $(dom).find("#_Layout");
            x.append($(dom));
        }).fail(error => {
            throw new DomBehind.AjaxException(error);
        });
    }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
    UIElement.Click = DomBehind.EventBuilder.RegisterAttached("click");
    UIElement.Enter = DomBehind.EventBuilder.RegisterAttached("enterKeydown", x => {
        if (x && x.Element) {
            x.Element.keydown(e => {
                if (e.which === 13) {
                    x.Element.trigger("enterKeydown");
                }
            });
        }
    });
    UIElement.Keydown = DomBehind.EventBuilder.RegisterAttached("keydown");
    UIElement.FocusIn = DomBehind.EventBuilder.RegisterAttached("focusin");
    UIElement.LostFocus = DomBehind.EventBuilder.RegisterAttached("focusout");
    UIElement.Initialize = DomBehind.EventBuilder.RegisterAttached("initialize");
    UIElement.Activate = DomBehind.EventBuilder.RegisterAttached("activate");
    UIElement.ModalClosing = DomBehind.EventBuilder.RegisterAttached("modalClosing");
    UIElement.EnabledChanged = DomBehind.EventBuilder.RegisterAttached("enabledChanged");
    DomBehind.UIElement = UIElement;
    DomBehind.BindingBehaviorBuilder.prototype.ClearValueWhenDisabled = function (option) {
        let me = this;
        let lastBinding = me.CurrentBehavior;
        if (lastBinding instanceof DomBehind.Data.DataBindingBehavior) {
            me.BindingActionWithOption(UIElement.EnabledChanged, (x, e) => {
                let d = $.Deferred();
                setTimeout((_e) => {
                    let exception;
                    try {
                        let lastBinding = _e.behavior;
                        if (!lastBinding)
                            return;
                        let sender = $(_e.sourceEvent.target);
                        let ele = lastBinding.Element;
                        if (!sender.Equals(ele))
                            return;
                        if (ele.is('input')) {
                            let disabled = ele.hasClass("disabled");
                            if (!disabled)
                                return;
                            if (_e.option && _e.option.clearAction) {
                                _e.option.clearAction(lastBinding.DataContext, lastBinding.ValueCore, ele);
                            }
                            else {
                                if (ele.is('input[type=radio]') ||
                                    ele.is('input[type=checkbox]')) {
                                    let checkEle = ele.get(0);
                                    if (checkEle.checked) {
                                        checkEle.checked = false;
                                    }
                                }
                                else {
                                    ele.val(null);
                                }
                            }
                        }
                        else {
                            let isEnabled = _e.sourceEvent.isEnabled;
                            if (isEnabled)
                                return;
                            if (_e.option && _e.option.clearAction) {
                                _e.option.clearAction(lastBinding.DataContext, lastBinding.ValueCore, ele);
                            }
                            else {
                                let nowValue = lastBinding.ValueCore;
                                if (nowValue instanceof DomBehind.Data.ListCollectionView) {
                                    nowValue.UnSelect();
                                    nowValue.Refresh();
                                }
                            }
                        }
                    }
                    catch (e) {
                        exception = e;
                    }
                    finally {
                        if (exception) {
                            d.reject(exception);
                        }
                        else {
                            d.resolve();
                        }
                    }
                }, 0, { behavior: lastBinding, option: option, sourceEvent: e });
                return d.promise();
            }, { args: lastBinding });
        }
        return me;
    };
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=UIElement.js.map
var DomBehind;
(function (DomBehind) {
    DomBehind.BindingBehaviorBuilder.prototype.InputType = function (inputType) {
        let me = this;
        var typeName = InputType[inputType];
        if (inputType === InputType.DateTimeLocal) {
            typeName = "DateTime-Local";
        }
        typeName = typeName.toLowerCase();
        me.CurrentElement.removeAttr("type");
        me.CurrentElement.attr("type", typeName);
        return me;
    };
    let InputType;
    (function (InputType) {
        InputType[InputType["Hidden"] = 0] = "Hidden";
        InputType[InputType["Text"] = 1] = "Text";
        InputType[InputType["Search"] = 2] = "Search";
        InputType[InputType["Tel"] = 3] = "Tel";
        InputType[InputType["Url"] = 4] = "Url";
        InputType[InputType["Email"] = 5] = "Email";
        InputType[InputType["Password"] = 6] = "Password";
        InputType[InputType["DateTime"] = 7] = "DateTime";
        InputType[InputType["Date"] = 8] = "Date";
        InputType[InputType["Month"] = 9] = "Month";
        InputType[InputType["Week"] = 10] = "Week";
        InputType[InputType["Time"] = 11] = "Time";
        InputType[InputType["DateTimeLocal"] = 12] = "DateTimeLocal";
        InputType[InputType["Number"] = 13] = "Number";
        InputType[InputType["Range"] = 14] = "Range";
        InputType[InputType["Color"] = 15] = "Color";
        InputType[InputType["Checkbox"] = 16] = "Checkbox";
        InputType[InputType["Radio"] = 17] = "Radio";
        InputType[InputType["File"] = 18] = "File";
        InputType[InputType["Submit"] = 19] = "Submit";
        InputType[InputType["Image"] = 20] = "Image";
        InputType[InputType["Reset"] = 21] = "Reset";
        InputType[InputType["Button"] = 22] = "Button";
    })(InputType = DomBehind.InputType || (DomBehind.InputType = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=InputElement.js.map
var DomBehind;
(function (DomBehind) {
    DomBehind.BindingBehaviorBuilder.prototype.Scrolling = function () {
        let me = this;
        me.CurrentElement.click(e => {
            var a = e.target;
            var hash = a.hash;
            var offset = $(hash).offset();
            if (!offset)
                return;
            e.preventDefault();
            $('html, body').animate({
                scrollTop: offset.top
            }, 900, function () {
                window.location.hash = hash;
            });
        });
        return me;
    };
    DomBehind.BindingBehaviorBuilder.prototype.SlideAnimation = function () {
        let me = this;
        var uiElements = me.CurrentElement;
        $(window).scroll(function () {
            uiElements.each(function () {
                var pos = $(this).offset().top;
                var winTop = $(window).scrollTop();
                if (pos < winTop + 600) {
                    $(this).addClass("slide");
                }
            });
        });
        return me;
    };
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=NavbarElement.js.map
var DomBehind;
(function (DomBehind) {
    var Controls;
    (function (Controls) {
        class Selector {
            constructor(Behavior) {
                this.Behavior = Behavior;
                this.UpdateTargetEventHandle = (sender, e) => this.OnUpdateTarget(sender, e);
                Behavior.UpdateTargetEvent.AddHandler(this.UpdateTargetEventHandle);
                this.UpdateSourceEventHandle = e => this.UpdateSource(e);
                Behavior.Element.off('change', this.UpdateSourceEventHandle);
                Behavior.Element.on('change', this.UpdateSourceEventHandle);
                this.PropertyChangedEventHandle = (sender, e) => this.OnDataSourcePropertyChanged(sender, e);
                this.AddedHandle = (sender, e) => this.Added(sender, e);
                this.RemovedHandle = (sender, e) => this.Removed(sender, e);
            }
            static Register(behavior) {
                if (!behavior.Element)
                    return;
                if (behavior.AdditionalInfo[Selector.IgnoreMark])
                    return;
                if (behavior.AdditionalInfo[Selector.InstanceMark])
                    return;
                var tagName = behavior.Element.prop("tagName");
                if (tagName !== "SELECT") {
                    behavior.AdditionalInfo[Selector.IgnoreMark] = true;
                    return;
                }
                behavior.AdditionalInfo[Selector.InstanceMark] = new Selector(behavior);
            }
            UpdateSource(e) {
                if (!this.Behavior.PInfo)
                    return;
                var dataSource = this.Behavior.PInfo.GetValue();
                if (dataSource instanceof DomBehind.Data.ListCollectionView) {
                    var collectionView = dataSource;
                    if (collectionView.OnCurrentChanging().Cancel) {
                        this.Select(collectionView);
                        return false;
                    }
                    let selectedItems = [];
                    $.each(this.Behavior.Element.find("option"), (i, value) => {
                        if (value.selected) {
                            var uid = value.getAttribute("uuid");
                            var item = collectionView.Find(x => x.__uuid === uid);
                            if (item) {
                                selectedItems.push(item);
                            }
                        }
                    });
                    dataSource.Begin();
                    if (this.Multiple) {
                        dataSource.Current = selectedItems;
                    }
                    else {
                        dataSource.Current = 0 < selectedItems.length ? selectedItems[0] : null;
                    }
                    dataSource.End();
                }
            }
            OnUpdateTarget(sender, data) {
                if (data instanceof DomBehind.Data.ListCollectionView) {
                    this.Render(data);
                }
                else if (data instanceof Array) {
                    var list = [];
                    $.each(data, (i, value) => {
                        list.push({ Value: value });
                    });
                    this.Render(new DomBehind.Data.ListCollectionView(list, "Value"));
                }
            }
            OnDataSourcePropertyChanged(sender, e) {
                if (e.Name === "Current") {
                    this.Select(sender);
                }
                if (!e.Name) {
                    this.Render(sender);
                }
            }
            Render(source) {
                if (!this.HasChanges(source))
                    return;
                this.Behavior.Element.empty();
                var arr = source.ToArray();
                if (source.Grouping) {
                    $.each(arr.GroupBy(source.Grouping), (i, group) => {
                        let optgroup = $(`<optgroup>`, { label: group.Key }).appendTo(this.Behavior.Element);
                        $.each(group.Values, (k, each) => {
                            this.RenderOption(optgroup, source, each);
                        });
                    });
                }
                else {
                    $.each(arr, (i, value) => {
                        this.RenderOption(this.Behavior.Element, source, value);
                    });
                }
                this.Select(source);
            }
            get Multiple() {
                return this.Behavior.Element.prop("multiple") ? true : false;
            }
            set Multiple(value) {
                this.Behavior.Element.prop("multiple", value);
            }
            RenderOption(element, source, value) {
                if (!value.__uuid)
                    value = $.extend(value, ExtendIIdentity());
                if (!value.DisplayMemberPath)
                    value = $.extend(value, this.EnsureDisplayMemberPath(source.DisplayMemberPath));
                let option = $(`<option uuid="${value.__uuid}">${Selector.GetDisplayValue(value, source.DisplayMemberPath)}</option>`);
                option.appendTo(element);
                value = $.extend(value, this.EnsureElement(option));
                if (value instanceof DomBehind.NotifiableImp) {
                    if (!value.__EventMarked) {
                        value.__EventMarked = true;
                        value.PropertyChanged.AddHandler((sender, e) => {
                            var selectable = sender;
                            var text = Selector.GetDisplayValue(sender, selectable.DisplayMemberPath);
                            selectable.__Selector.val(text);
                        });
                    }
                }
            }
            EnsureDisplayMemberPath(path) {
                return { DisplayMemberPath: path };
            }
            EnsureElement(option) {
                return {
                    __Selector: option,
                    __Element: option[0],
                };
            }
            Added(source, obj) {
                this.Render(source);
            }
            Removed(source, obj) {
                this.Render(source);
            }
            Select(source) {
                return this.Multiple ? this.MultipleSelect(source) : this.SingleSelect(source);
            }
            SingleSelect(source) {
                var value = source.Current;
                if (Object.IsNullOrUndefined(value)) {
                    this.Behavior.Element.selectpicker('val', null);
                }
                else {
                    value.__Element.selected = true;
                    this.Behavior.Element.selectpicker('refresh');
                }
                source.ViewReflected = DomBehind.Data.ListCollectionView.ViewReflectedStatus.Reflected;
            }
            MultipleSelect(source) {
                var value = source.Current;
                if (Object.IsNullOrUndefined(value)) {
                    this.Behavior.Element.selectpicker("deselectAll");
                }
                else {
                    $.each(value, (i, x) => {
                        var selectable = x;
                        selectable.__Element.selected = true;
                    });
                }
                this.Behavior.Element.selectpicker('refresh');
                source.ViewReflected = DomBehind.Data.ListCollectionView.ViewReflectedStatus.Reflected;
            }
            HasChanges(source) {
                if (source.ViewReflected === DomBehind.Data.ListCollectionView.ViewReflectedStatus.Reflected)
                    return false;
                if (source.ViewReflected === DomBehind.Data.ListCollectionView.ViewReflectedStatus.None) {
                    source.ViewReflected = DomBehind.Data.ListCollectionView.ViewReflectedStatus.NoReflected;
                    source.Begin().Refresh().End();
                    this.Subscribe(source);
                }
                return true;
            }
            Subscribe(source) {
                this.UnSubscribe(source);
                source.Removed.AddHandler(this.RemovedHandle);
                source.Added.AddHandler(this.AddedHandle);
                source.PropertyChanged.AddHandler(this.PropertyChangedEventHandle);
            }
            UnSubscribe(source) {
                source.Added.RemoveHandler(this.AddedHandle);
                source.Removed.RemoveHandler(this.RemovedHandle);
                source.PropertyChanged.RemoveHandler(this.PropertyChangedEventHandle);
            }
            static GetDisplayValue(value, displayMemberPath) {
                var displayValue = value;
                if (displayMemberPath) {
                    displayValue = new DomBehind.PropertyInfo(value, displayMemberPath).GetValue();
                }
                return displayValue;
            }
        }
        Selector.ItemsSourceProperty = DomBehind.Data.DependencyProperty.RegisterAttached("itemsSource", null, (x, y) => { }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay, behavior => {
            Selector.Register(behavior);
        });
        Selector.AllowMultipleProperty = DomBehind.Data.DependencyProperty.RegisterAttached("multiple", null, (x, y) => {
            let old = x.prop('multiple');
            if (old === y)
                return;
            if (y === true) {
                x.prop('multiple', true);
            }
            else {
                x.prop('multiple', false);
            }
            x.selectpicker('destroy');
            x.selectpicker();
        }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
        Selector.IgnoreMark = "Selector.Ignore";
        Selector.InstanceMark = "Selector.Instance";
        Controls.Selector = Selector;
    })(Controls = DomBehind.Controls || (DomBehind.Controls = {}));
})(DomBehind || (DomBehind = {}));
(function (DomBehind) {
    var Data;
    (function (Data) {
        var Selector = DomBehind.Controls.Selector;
        Data.DataBindingBehaviorBuilder.prototype.Multiple = function (allowMultiple) {
            let me = this;
            let behavior = me.Add(new Data.DataBindingBehavior());
            behavior.Property = Selector.AllowMultipleProperty;
            behavior.Priolity = -1;
            if (allowMultiple) {
                behavior.PInfo = new DomBehind.LamdaExpression(me.Owner.DataContext, allowMultiple);
            }
            else {
                behavior.PInfo = new DomBehind.BooleanFakeExpression(true);
            }
            return me;
        };
    })(Data = DomBehind.Data || (DomBehind.Data = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Selector.js.map
var DomBehind;
(function (DomBehind) {
    var Controls;
    (function (Controls) {
        class Tab extends Controls.Selector {
            constructor() {
                super(...arguments);
                this.Options = [];
            }
            static Register(behavior) {
                if (!behavior.Element)
                    return;
                if (behavior.AdditionalInfo[Tab.IgnoreMark])
                    return;
                if (behavior.AdditionalInfo[Tab.InstanceMark])
                    return;
                var tagName = behavior.Element.prop("tagName");
                if (tagName !== "DIV") {
                    behavior.AdditionalInfo[Tab.IgnoreMark] = true;
                    return;
                }
                behavior.AdditionalInfo[Tab.InstanceMark] = new Tab(behavior);
            }
            Render(source) {
                if (!this.HasChanges(source))
                    return;
                this.Behavior.Element.empty();
                this.HeaderContainer = $('<ul class="nav nav-tabs">');
                this.ContentContainer = $(`<div class="tab-content">`);
                this.Options.length = 0;
                var arr = source.ToArray();
                for (let i = 0; i < arr.length; i++) {
                    this.NewAdd(source, arr[i], i === 0);
                }
                this.HeaderContainer.appendTo(this.Behavior.Element);
                this.ContentContainer.appendTo(this.Behavior.Element);
            }
            NewAdd(source, option, isActive = false) {
                let bindingOption = new Tab.BindingOption(this);
                bindingOption.Source = source;
                bindingOption.Option = option;
                bindingOption.IsActive = isActive;
                bindingOption.Ensure();
                this.Options.push(bindingOption);
                return bindingOption;
            }
            Added(source, obj) {
                this.NewAdd(source, obj);
            }
            Removed(source, obj) {
                obj.__header.detach();
                obj.__content.detach();
            }
        }
        Tab.ItemsSourceProperty = DomBehind.Data.DependencyProperty.RegisterAttached("itemsSource", null, (x, y) => { }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay, behavior => {
            Tab.Register(behavior);
        });
        Tab.IgnoreMark = "Tab.Ignore";
        Tab.InstanceMark = "Tab.Instance";
        Controls.Tab = Tab;
        (function (Tab) {
            class BindingOption {
                constructor(Parent) {
                    this.Parent = Parent;
                }
                get HeaderContainer() {
                    return this.Parent.HeaderContainer;
                }
                get ContentContainer() {
                    return this.Parent.ContentContainer;
                }
                Ensure() {
                    if (!this.Option.__uuid)
                        this.Option.__uuid = NewUid();
                    if (!this.Option.DisplayMemberPath)
                        this.Option.DisplayMemberPath = this.Source.DisplayMemberPath;
                    var titleCss = this.IsActive ? 'active' : '';
                    this.Header = $(`<li class="${titleCss}" uuid="${this.Option.__uuid}">`).appendTo(this.HeaderContainer);
                    this.Option.__header = this.Header;
                    var contentCss = this.IsActive ? 'tab-pane fade in active' : 'tab-pane fade';
                    this.Content = $(`<div class="${contentCss}" id="${this.Option.__uuid}">`).appendTo(this.ContentContainer);
                    this.Option.__content = this.Content;
                    this.Content.on('RegisteredViewViewModel', (e, behavior) => {
                        let element = $(e.target);
                        element.off('RegisteredViewViewModel');
                        this.Option.View = behavior.View;
                        this.Option.ViewModel = behavior.ViewModel;
                        let title = Controls.Selector.GetDisplayValue(behavior.ViewModel, this.Option.DisplayMemberPath);
                        $(`<a href="#${this.Option.__uuid}" data-toggle="tab">`)
                            .text(title)
                            .appendTo(this.Header);
                        this.PropertyChangedSafeHandle = (sender, e) => this.OnRecievePropertyChanged(e);
                        behavior.ViewModel.PropertyChanged.AddHandler(this.PropertyChangedSafeHandle);
                    });
                    var uriOption = this.Option;
                    if (uriOption.Uri) {
                        this.Content.load(uriOption.Uri);
                    }
                }
                OnRecievePropertyChanged(e) {
                    switch (e.Name) {
                        case this.Option.DisplayMemberPath:
                            var title = Controls.Selector.GetDisplayValue(this.Option.ViewModel, this.Option.DisplayMemberPath);
                            this.Header.find("a").text(title);
                            break;
                        case DomBehind.LamdaExpression.Path(x => x.IsEnabled):
                            var enabled = this.Option.ViewModel.IsEnabled;
                            DomBehind.UIElement.IsEnabledProperty.SetValue(this.Header.find("a"), enabled);
                            DomBehind.UIElement.IsEnabledProperty.SetValue(this.Header, enabled);
                            break;
                    }
                }
            }
            Tab.BindingOption = BindingOption;
        })(Tab = Controls.Tab || (Controls.Tab = {}));
    })(Controls = DomBehind.Controls || (DomBehind.Controls = {}));
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Tab.js.map
var DomBehind;
(function (DomBehind) {
    let MessageStatus;
    (function (MessageStatus) {
        MessageStatus[MessageStatus["Infomation"] = 0] = "Infomation";
        MessageStatus[MessageStatus["Warning"] = 1] = "Warning";
        MessageStatus[MessageStatus["Error"] = 2] = "Error";
    })(MessageStatus = DomBehind.MessageStatus || (DomBehind.MessageStatus = {}));
    class MessaageBox {
        static ShowInfomation(message, title) {
            MessaageBox.ShowMessage(message, title, MessageStatus.Infomation);
        }
        static ShowWarning(message, title) {
            MessaageBox.ShowMessage(message, title, MessageStatus.Warning);
        }
        static ShowError(message, title) {
            MessaageBox.ShowMessage(message, title, MessageStatus.Error);
        }
        static ShowMessage(message, title, status) {
            MessaageBox.Container.ShowMessage(message, title, status);
        }
        static ShowYesNo(message, title, option) {
            MessaageBox.Container.ShowYesNo(message, title, option);
        }
        static ShowOkCancel(message, title, option) {
            MessaageBox.Container.ShowOkCancel(message, title, option);
        }
        static BuiltIn(lazy) {
            MessaageBox._lazy = lazy;
        }
        ;
        static get Container() {
            if (MessaageBox._container) {
                return MessaageBox._container;
            }
            if (!MessaageBox._lazy) {
                throw new DomBehind.Exception("メッセージ機能をビルドインしてください");
            }
            let fac = new DomBehind.TypedFactory(MessaageBox._lazy());
            MessaageBox._container = fac.CreateInstance();
            return MessaageBox._container;
        }
    }
    DomBehind.MessaageBox = MessaageBox;
    MessaageBox.BuiltIn(() => DefaultMessageContainer);
    class DefaultMessageContainer {
        ShowMessage(message, title, status) {
            window.alert(message);
        }
        ShowYesNo(message, title, option) {
            if (window.confirm(message)) {
                if (option && option.yesCallback) {
                    option.yesCallback();
                }
            }
            else {
                if (option && option.noCallBack) {
                    option.noCallBack();
                }
            }
        }
        ShowOkCancel(message, title, option) {
            if (window.confirm(message)) {
                if (option && option.okCallback) {
                    option.okCallback();
                }
            }
            else {
                if (option && option.cancelCallBack) {
                    option.cancelCallBack();
                }
            }
        }
    }
    DomBehind.DefaultMessageContainer = DefaultMessageContainer;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=MessageBox.js.map
var DomBehind;
(function (DomBehind) {
    class ListView extends DomBehind.Data.DataBindingBehavior {
        set ItemsSource(newValue) {
            if (Object.IsNullOrUndefined(newValue)) {
                this.Clear();
                this._items = newValue;
                return;
            }
            let newItems = newValue.ToArray();
            if (!Object.IsNullOrUndefined(this._items) &&
                newItems.SequenceEqual(this._items.ToArray())) {
                return;
            }
            this.Clear();
            let body = this.Element.find(`#${this.BodyId}`);
            $.each(newItems, (i, value) => {
                let tr = $("<tr></tr>");
                $.each(this.Columns, (k, column) => {
                    let td = $(`<td></td>`);
                    if (column.cellClass) {
                        td.addClass(column.cellClass);
                    }
                    let cellValue = column.value(value);
                    if (column.convertTarget) {
                        cellValue = column.convertTarget(cellValue);
                    }
                    td.text(cellValue);
                    tr.append(td);
                });
                body.append(tr);
            });
        }
        Clear() {
            let body = this.Element.find(`#${this.BodyId}`);
            body.empty();
        }
        get ItemsSource() {
            return this._items;
        }
        get DefaultTableOption() {
            return {
                class: "",
            };
        }
        Ensure() {
            super.Ensure();
            this.Element.empty();
            if (!this.Element.hasClass("table-responsive")) {
                this.Element.addClass("table-responsive");
            }
            let identity = `lv-${NewUid()}`;
            this.Element.attr("listview-identity", identity);
            window[identity] = this;
            this.TableId = `tb-${NewUid()}`;
            this.HeaderId = `th-${NewUid()}`;
            this.BodyId = `tr-${NewUid()}`;
            let table = $(`<table id="${this.TableId}" class="table"></table>`);
            if (this.TableOption.isHover) {
                table.addClass("table-hover");
            }
            if (this.TableOption.isBordered) {
                table.addClass("table-bordered");
            }
            if (this.TableOption.isStriped) {
                table.addClass("table-striped");
            }
            if (this.TableOption.class) {
                table.addClass(this.TableOption.class);
            }
            let header = $(`<thead id="${this.HeaderId}"></thead>`);
            let headerRow = $(`<tr></tr>`);
            $.each(this.Columns, (i, value) => {
                let th = $(`<th>${value.caption}</th>`);
                if (value.width) {
                    th.css('width', value.width);
                }
                if (value.headerClass) {
                    th.addClass(value.headerClass);
                }
                headerRow.append(th);
            });
            header.append(headerRow);
            table.append(header);
            let body = $(`<tbody id="${this.BodyId}"></tbody>`);
            table.append(body);
            this.Element.append(table);
        }
        AddColumn(option) {
            if (!this.Columns) {
                this.Columns = new Array();
            }
            this.Columns.push(option);
        }
    }
    ListView.ItemsSourceProperty = DomBehind.Data.DependencyProperty.RegisterAttached("", el => {
    }, (el, newValue) => {
        let identity = el.attr("listview-identity");
        let me = window[identity];
        if (newValue instanceof DomBehind.Data.ListCollectionView) {
            me.ItemsSource = newValue;
        }
        else {
            me.ItemsSource = new DomBehind.Data.ListCollectionView([]);
        }
    }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
    DomBehind.ListView = ListView;
    class TableBindingBehaviorBuilder extends DomBehind.BindingBehaviorBuilder {
        constructor(owner) {
            super(owner);
        }
        ColumnBinding(title, binding, option) {
            if (this.CurrentBehavior instanceof ListView) {
                let op = $.extend(true, {}, option);
                op.value = binding;
                op.caption = title;
                this.CurrentBehavior.AddColumn(op);
            }
            return this;
        }
    }
    DomBehind.TableBindingBehaviorBuilder = TableBindingBehaviorBuilder;
    DomBehind.BindingBehaviorBuilder.prototype.BuildListView = function (itemSource, option) {
        let me = this;
        let behavior = me.Add(new ListView());
        behavior.Property = ListView.ItemsSourceProperty;
        behavior.PInfo = new DomBehind.LamdaExpression(me.Owner.DataContext, itemSource);
        behavior.TableOption = option;
        let newMe = new TableBindingBehaviorBuilder(me.Owner);
        newMe.CurrentBehavior = me.CurrentBehavior;
        newMe.CurrentElement = me.CurrentElement;
        return newMe;
    };
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=ListView.js.map
var DomBehind;
(function (DomBehind) {
    class TemplateListView extends DomBehind.Data.DataBindingBehavior {
        set ItemsSource(newValue) {
            let jtemplate = $(document.body).find(this.Option.template);
            if (jtemplate.length === 0)
                return;
            let template = this.FindTemplate(jtemplate);
            this.RemoveAll();
            let dataContext = this.DataContext;
            let rowContainer = $(`<div class="templateRowContainer"></div>`);
            $.each(newValue.ToArray(), (i, value) => {
                let newRow = template.clone();
                value.__element = newRow;
                let twowayMarks = new Array();
                $.each(this.Columns, (k, column) => {
                    let el = newRow.find(column.templateSelector);
                    if (el.length === 0) {
                        if (column.templateSelector.StartsWith(".")) {
                            let selector = column.templateSelector.SubString(1, column.templateSelector.length - 1);
                            if (newRow.hasClass(selector)) {
                                el = newRow;
                            }
                        }
                    }
                    if (el.length !== 0) {
                        if (column.expression && column.dependencyProperty) {
                            let ret = column.expression(value);
                            if (column.convertTarget) {
                                ret = column.convertTarget(ret, el);
                            }
                            column.dependencyProperty.SetValue(el, ret);
                            if (column.mode === DomBehind.Data.BindingMode.TwoWay) {
                                let path = DomBehind.LamdaExpression.Path(column.expression);
                                twowayMarks.push({ column: column, element: el, marks: path });
                            }
                        }
                        if (column.expressionAction && column.attachedEvent) {
                            let newEvent = column.attachedEvent.Create();
                            newEvent.AddHandler((sener, e) => {
                                column.expressionAction(dataContext, value);
                            });
                            el.off(newEvent.EventName);
                            el.on(newEvent.EventName, e => {
                                newEvent.Raise(this, e);
                                if (!column.allowBubbling) {
                                    if (e.stopPropagation) {
                                        e.stopPropagation();
                                    }
                                }
                            });
                            if (el.is("a") && !el.attr("href")) {
                                el.attr("href", "javascript:void(0);");
                            }
                        }
                        if (this.AlternateStyle) {
                            if (i % 2 !== 0) {
                                let el = newRow.find(this.AlternateStyle.Selector);
                                if (el.length !== 0) {
                                    el.addClass(this.AlternateStyle.Css);
                                }
                            }
                        }
                    }
                });
                if (twowayMarks.length !== 0) {
                    let observe = DomBehind.Observable.RegisterAttached(value, { marks: twowayMarks.Select(x => x.marks) });
                    observe.PropertyChanged.AddHandler((sender, d) => {
                        if (sender) {
                            let twowayList = twowayMarks.Where(x => x.marks === d.Name);
                            for (var i = 0; i < twowayList.length; i++) {
                                let v = sender[d.Name];
                                let twoway = twowayList[i];
                                if (twoway.column.convertTarget) {
                                    v = twoway.column.convertTarget(v, twoway.element);
                                }
                                twoway.column.dependencyProperty.SetValue(twoway.element, v);
                            }
                        }
                    });
                }
                rowContainer.append(newRow);
            });
            this.Element.append(rowContainer);
            newValue.PropertyChanged.Clear();
            newValue.PropertyChanged.AddHandler((sender, e) => {
                if (!e.Name) {
                    this.ItemsSource = sender;
                }
            });
        }
        FindTemplate(jtemplate) {
            let support = ("content" in document.createElement("template"));
            if (support) {
                let temp = jtemplate[0];
                let template = $(temp.content.querySelector("div"));
                return template;
            }
            else {
                let temp = jtemplate[0];
                let template = $(temp.querySelector("div"));
                return template;
            }
        }
        RemoveAll() {
            this.Element.empty();
        }
        ClearSortMarks() {
            let view = this.Owner.Container;
            let headeArray = this.Columns.Where(x => x.header ? true : false);
            $.each(headeArray, (i, each) => {
                let column = view.find(each.header);
                if (column.length !== 0) {
                    let span = column.find("span");
                    if (span.length !== 0) {
                        span.removeClass();
                    }
                }
            });
        }
        Ensure() {
            super.Ensure();
            this.Option = $.extend(true, this.DefaultOption, this.Option);
            let view = this.Owner.Container;
            let headeArray = this.Columns.Where(x => x.header ? true : false);
            $.each(headeArray, (i, each) => {
                let column = view.find(each.header);
                if (column.length !== 0) {
                    let span = column.find("span");
                    if (span.length === 0) {
                        column.append($("<span></span>"));
                    }
                    if (column.is("a") && !column.attr("href")) {
                        column.attr("href", "javascript:void(0);");
                    }
                    column.off("click");
                    column.on("click", e => this.OnColumnClick(e, each.header));
                }
            });
            let identity = this.Element.attr("templateListView-identity");
            if (!identity) {
                identity = `id-${NewUid()}`;
                this.Element.attr("templateListView-identity", identity);
            }
            window[identity] = this;
        }
        OnColumnClick(e, header) {
            if (header) {
                let target = $(e.target);
                let span = target.find("span");
                let asc = span.hasClass(this.Option.descClass);
                if (span.length !== 0) {
                    this.ClearSortMarks();
                    span.addClass(asc ? this.Option.ascClass : this.Option.descClass);
                }
                let ee = {
                    selector: header,
                    sender: this,
                    target: target,
                    isAsc: asc,
                    text: target.text(),
                    value: target.val(),
                };
                if (this.Option.columnClick) {
                    DomBehind.Application.Current.SafeAction(() => this.Option.columnClick(this.DataContext, ee));
                }
                else {
                    let column = this.Columns.FirstOrDefault(x => x.header === header);
                    let list = this.PInfo.GetValue();
                    if (column && list instanceof DomBehind.Data.ListCollectionView) {
                        let exp = DomBehind.LamdaExpression.Path(column.expression);
                        let filter = list.Filter;
                        list.Filter = null;
                        let sorted = asc ? list.ToArray().OrderBy(x => x[exp]) : list.ToArray().OrderByDecording(x => x[exp]);
                        let newList = new DomBehind.Data.ListCollectionView(sorted);
                        newList.Filter = filter;
                        this.ItemsSource = this.DataContext[this.PInfo.MemberPath] = newList;
                    }
                }
            }
        }
        get DefaultOption() {
            return {
                template: "",
                ascClass: "fa fa-sort-asc",
                descClass: "fa fa-sort-desc",
            };
        }
    }
    TemplateListView.ItemsSourceProperty = DomBehind.Data.DependencyProperty.RegisterAttached("", el => {
    }, (el, newValue) => {
        let identity = el.attr("templateListView-identity");
        let template = window[identity];
        if (newValue instanceof DomBehind.Data.ListCollectionView) {
            template.ItemsSource = newValue;
        }
        else {
            template.ItemsSource = new DomBehind.Data.ListCollectionView([]);
        }
    }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay);
    DomBehind.TemplateListView = TemplateListView;
    class TemplateListViewBindingBehaviorBuilder extends DomBehind.BindingBehaviorBuilder {
        constructor(owner) {
            super(owner);
        }
        BindingColumn(selector, exp, option) {
            return this.BindingProperty(DomBehind.UIElement.TextProperty, selector, exp, option);
        }
        BindingColumnAction(selector, exp, option) {
            return this.BindingEvent(DomBehind.UIElement.Click, selector, exp, option);
        }
        BindingProperty(dp, selector, exp, option) {
            let me = this;
            if (me.CurrentBehavior instanceof TemplateListView) {
                option = $.extend(true, {}, option);
                option.templateSelector = selector;
                option.expression = exp;
                option.dependencyProperty = dp;
                me.CurrentBehavior.LastOption = option;
                me.CurrentBehavior.Columns.push(option);
            }
            return me;
        }
        BindingEvent(ev, selector, exp, option) {
            let me = this;
            if (me.CurrentBehavior instanceof TemplateListView) {
                option = $.extend(true, {}, option);
                option.templateSelector = selector;
                option.expressionAction = exp;
                option.attachedEvent = ev;
                me.CurrentBehavior.LastOption = option;
                me.CurrentBehavior.Columns.push(option);
            }
            return me;
        }
        BindingRowStyle(exp) {
            let me = this;
            if (me.CurrentBehavior instanceof TemplateListView) {
                me.CurrentBehavior.RowStyleExpression = exp;
            }
            return me;
        }
        BindingAlternateRowStyle(selector, css) {
            let me = this;
            if (me.CurrentBehavior instanceof TemplateListView) {
                me.CurrentBehavior.AlternateStyle = { Selector: selector, Css: css };
            }
            return me;
        }
    }
    DomBehind.TemplateListViewBindingBehaviorBuilder = TemplateListViewBindingBehaviorBuilder;
    DomBehind.BindingBehaviorBuilder.prototype.BuildTemplateItems = function (itemsSource, option) {
        let me = this;
        let behavior = me.Add(new TemplateListView());
        behavior.Owner = me.Owner;
        behavior.Property = TemplateListView.ItemsSourceProperty;
        behavior.PInfo = new DomBehind.LamdaExpression(me.Owner.DataContext, itemsSource);
        behavior.BindingPolicy.Mode = TemplateListView.ItemsSourceProperty.BindingMode;
        behavior.Option = $.extend(true, {}, option);
        behavior.Columns = new Array();
        let newMe = new TemplateListViewBindingBehaviorBuilder(me.Owner);
        newMe.CurrentBehavior = me.CurrentBehavior;
        newMe.CurrentElement = me.CurrentElement;
        return newMe;
    };
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=TemplateListView.js.map
var DomBehind;
(function (DomBehind) {
    class FileBrowser extends DomBehind.Data.ActionBindingBehavior {
        constructor() {
            super(...arguments);
            this.MaximumNumberOfAjax = 1;
        }
        Ensure() {
            super.Ensure();
            let element = this.Element;
            element.attr("type", "file");
            element.attr("capture", "camera");
            if (this.AcceptValue) {
                element.attr("accept", this.AcceptValue);
            }
            else {
                element.attr("accept", "image/*");
            }
            if (this.AllowMultiFiles) {
                element.attr("multiple", "multiple");
            }
            element.change((e) => {
                let args = $.extend(true, e, {});
                let arr = new Array();
                $.each(e.target.files, (i, s) => {
                    let uri = URL.createObjectURL(s);
                    let file = $.extend(true, s, {});
                    file.uri = uri;
                    arr.push(file);
                });
                this.Files = args.files = arr;
                this.OnTrigger(args);
            });
            if (this.InstanceExpression) {
                this.InstanceExpression.SetValue(this);
            }
        }
        UpdateAll() {
            if (!this.Files) {
                this.OnCompleted({ file: null, response: null });
                return;
            }
            let pooler = new Pooler(this);
            return pooler.Do().always(() => {
                this.OnAlways();
            });
        }
        Update(file) {
            let executor = new Executor(this, file);
            executor.Do();
            return executor.Pms.always(() => {
                this.OnAlways();
            });
        }
        OnProgress(e) {
            console.trace(`${e.file.name}...${e.loaded} / ${e.total}  ${e.percent} %`);
            if (this.ProgressExpression) {
                this.ProgressExpression(this.DataContext, e);
            }
        }
        OnCompleted(e) {
            if (e.file) {
                console.trace(`${e.file.name}...complete`);
            }
            if (this.CompletedExpression) {
                this.CompletedExpression(this.DataContext, e);
            }
        }
        OnError(e) {
            if (e.file) {
                console.trace(`error...${e.file.name}`);
            }
            if (e.error) {
                console.error(e.error);
            }
            if (this.ErrorExpression) {
                this.ErrorExpression(this.DataContext, e);
            }
        }
        OnAlways() {
            if (this.AlwaysExpression) {
                this.AlwaysExpression(this.DataContext);
            }
        }
    }
    FileBrowser.SelectedFiles = DomBehind.EventBuilder.RegisterAttached("selectedFiles");
    DomBehind.FileBrowser = FileBrowser;
    class Pooler {
        constructor(FileBrowser) {
            this.FileBrowser = FileBrowser;
        }
        Do() {
            let files = this.FileBrowser.Files;
            let chunk = parseInt(String(files.length / this.FileBrowser.MaximumNumberOfAjax));
            if (chunk === 0) {
                chunk = 1;
            }
            let pmslist = new Array();
            let chunkList = files.Chunk(chunk);
            $.each(chunkList, (i, value) => {
                let e = new ChunkFlow(this.FileBrowser, value);
                pmslist.push(e.Do());
            });
            return $.when(pmslist);
        }
    }
    class ChunkFlow {
        constructor(FileBrowser, Queue) {
            this.FileBrowser = FileBrowser;
            this.Queue = Queue;
        }
        Do() {
            let arr = this.Queue.Select(x => new Executor(this.FileBrowser, x));
            $.each(arr, (i, value) => {
                let nextIndex = i + 1;
                if (nextIndex < arr.length) {
                    value.Pms.always(() => {
                        arr[nextIndex].Do();
                    });
                }
            });
            if (0 < arr.length) {
                arr[0].Do();
            }
            return $.when(arr.Select(x => x.Pms));
        }
    }
    class Executor {
        constructor(FileBrowser, File) {
            this.FileBrowser = FileBrowser;
            this.File = File;
            this.Dfd = $.Deferred();
            this.Pms = this.Dfd.promise();
        }
        Do() {
            let formData = new FormData();
            formData.append("userfile", this.File);
            $.ajax({
                xhr: () => {
                    let xhr = new XMLHttpRequest();
                    xhr.upload.addEventListener("progress", evt => {
                        if (evt.lengthComputable) {
                            let percent = (evt.loaded / evt.total) * 100;
                            this.FileBrowser.OnProgress({
                                loaded: evt.loaded,
                                total: evt.total,
                                percent: percent,
                                file: this.File,
                            });
                        }
                    }, false);
                    xhr.addEventListener("progress", evt => {
                        if (evt.lengthComputable) {
                            let percent = (evt.loaded / evt.total) * 100;
                            this.FileBrowser.OnProgress({
                                loaded: evt.loaded,
                                total: evt.total,
                                percent: percent,
                                file: this.File,
                            });
                        }
                    }, false);
                    return xhr;
                },
                type: "POST",
                url: this.FileBrowser.UploadUri,
                data: formData,
                processData: false,
                contentType: false,
                success: e => {
                    this.FileBrowser.OnCompleted({ response: e, file: this.File });
                    this.Dfd.resolve(e);
                },
                error: (x, status, error) => {
                    this.FileBrowser.OnError({ file: this.File, error: error });
                    this.Dfd.reject(error);
                }
            });
        }
    }
    class FileBrowserBindingBehaviorBuilder extends DomBehind.Data.ActionBindingBehaviorBuilder {
        constructor(owner) {
            super(owner);
        }
        AllowMultiFiles() {
            let me = this;
            if (me.CurrentBehavior instanceof FileBrowser) {
                me.CurrentBehavior.AllowMultiFiles = true;
            }
            return me;
        }
        AcceptFilter(filter) {
            let me = this;
            if (me.CurrentBehavior instanceof FileBrowser) {
                me.CurrentBehavior.AcceptValue = filter;
            }
            return me;
        }
        UploadUri(uri) {
            let me = this;
            if (me.CurrentBehavior instanceof FileBrowser) {
                me.CurrentBehavior.UploadUri = uri;
            }
            return me;
        }
        BindingUploader(exp) {
            let me = this;
            if (me.CurrentBehavior instanceof FileBrowser) {
                me.CurrentBehavior.InstanceExpression = new DomBehind.LamdaExpression(me.Owner.DataContext, exp);
            }
            return me;
        }
        BindingUploaderProgress(exp) {
            let me = this;
            if (me.CurrentBehavior instanceof FileBrowser) {
                me.CurrentBehavior.ProgressExpression = exp;
            }
            return me;
        }
        BindingUploaderComplete(exp) {
            let me = this;
            if (me.CurrentBehavior instanceof FileBrowser) {
                me.CurrentBehavior.CompletedExpression = exp;
            }
            return me;
        }
        BindingUploaderError(exp) {
            let me = this;
            if (me.CurrentBehavior instanceof FileBrowser) {
                me.CurrentBehavior.ErrorExpression = exp;
            }
            return me;
        }
        BindingUploaderAlways(exp) {
            let me = this;
            if (me.CurrentBehavior instanceof FileBrowser) {
                me.CurrentBehavior.AlwaysExpression = exp;
            }
            return me;
        }
        MaximumNumberOfAjax(number) {
            let me = this;
            if (me.CurrentBehavior instanceof FileBrowser) {
                me.CurrentBehavior.MaximumNumberOfAjax = number;
            }
            return me;
        }
    }
    DomBehind.FileBrowserBindingBehaviorBuilder = FileBrowserBindingBehaviorBuilder;
    DomBehind.BindingBehaviorBuilder.prototype.BuildFileBrowser = function (selectedEvent) {
        let me = this;
        let behavior = me.Add(new FileBrowser());
        behavior.Event = FileBrowser.SelectedFiles.Create();
        behavior.Action = selectedEvent;
        behavior.ActionParameterCount = behavior.Action.length;
        behavior.AllowBubbling = false;
        let newMe = new FileBrowserBindingBehaviorBuilder(me.Owner);
        newMe.CurrentBehavior = me.CurrentBehavior;
        newMe.CurrentElement = me.CurrentElement;
        return newMe;
    };
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=FileBrowser.js.map
var DomBehind;
(function (DomBehind) {
    class Breadbrumb {
        constructor(Selector) {
            this.Selector = Selector;
        }
        static get AllowLocalStorage() {
            return $.GetLocalStorage("Breadbrumb.AllowLocalStorage", true);
        }
        static set AllowLocalStorage(value) {
            $.SetLocalStorage("Breadbrumb.AllowLocalStorage", value);
        }
        Parse(newUri, title, isRoot) {
            if (!newUri.toLowerCase().StartsWith("http://") &&
                !newUri.toLowerCase().StartsWith("https://")) {
                newUri = $.AbsoluteUri(newUri);
            }
            if (Breadbrumb.AllowLocalStorage)
                return this.ParseSessionStorage(newUri, isRoot, title);
            return this.ParseRestUri(newUri, isRoot, title);
        }
        ParseRestUri(newUri, isRoot, title) {
            let arr = newUri.Split("?");
            let queryString = "";
            if (1 < arr.length) {
                queryString = arr[1];
            }
            let newQueryStrings = Breadbrumb.SplitQueryString(queryString);
            let currentUri = location.href;
            if (isRoot) {
                currentUri = currentUri.Split("?")[0];
            }
            let oldArr = currentUri.Split("?");
            queryString = "";
            if (1 < oldArr.length) {
                queryString = oldArr[1];
            }
            let oldQueryStrings = Breadbrumb.SplitQueryString(queryString);
            let stack = new Array();
            let json = oldQueryStrings.FirstOrDefault(x => x.Key === "b");
            if (json) {
                stack = this.ToDecompress(json.Value);
            }
            if (stack.Any()) {
                if (oldQueryStrings.Any()) {
                    if (!oldQueryStrings.Any(x => x.Key === 'isPop')) {
                        stack.LastOrDefault().Uri = `${currentUri}&isPop=true`;
                    }
                    else {
                        stack.LastOrDefault().Uri = `${currentUri}`;
                    }
                }
                else {
                    stack.LastOrDefault().Uri = `${currentUri}?isPop=true`;
                }
            }
            stack.push({ Uri: newUri, Title: title });
            newQueryStrings.push({ Key: "b", Value: this.ToCompress(stack) });
            let newQuery = newQueryStrings.Select(x => `${x.Key}=${x.Value}`).join("&");
            let result = arr[0];
            if (!String.IsNullOrWhiteSpace(newQuery)) {
                result = `${arr[0]}?${newQuery}`;
            }
            if (0 < stack.length) {
                stack.LastOrDefault().Uri = result;
            }
            return result;
        }
        ParseSessionStorage(newUri, isRoot, title) {
            let arr = newUri.Split("?");
            let queryString = "";
            if (1 < arr.length) {
                queryString = arr[1];
            }
            let newQueryStrings = Breadbrumb.SplitQueryString(queryString);
            let currentUri = location.href;
            if (isRoot) {
                currentUri = currentUri.Split("?")[0];
            }
            let oldArr = currentUri.Split("?");
            queryString = "";
            if (1 < oldArr.length) {
                queryString = oldArr[1];
            }
            let oldQueryStrings = Breadbrumb.SplitQueryString(queryString);
            let stack = new Array();
            let idKeyValue = oldQueryStrings.FirstOrDefault(x => x.Key === "b");
            let oldId = "";
            let newId = NewUid();
            if (idKeyValue) {
                oldId = idKeyValue.Value;
            }
            else {
                oldId = NewUid();
            }
            let json = Breadbrumb.GetLocalStorage(oldId);
            if (json) {
                stack = this.ToDecompress(json);
            }
            if (stack.Any()) {
                if (oldQueryStrings.Any()) {
                    if (!oldQueryStrings.Any(x => x.Key === 'isPop')) {
                        stack.LastOrDefault().Uri = `${currentUri}&isPop=true`;
                    }
                    else {
                        stack.LastOrDefault().Uri = `${currentUri}`;
                    }
                }
                else {
                    stack.LastOrDefault().Uri = `${currentUri}?isPop=true`;
                }
            }
            stack.push({ Uri: newUri, Title: title });
            Breadbrumb.SetLocalStorage(newId, this.ToCompress(stack));
            if (!newQueryStrings.Any(x => x.Key === "b")) {
                newQueryStrings.push({ Key: "b", Value: newId });
            }
            let newQuery = newQueryStrings.Select(x => `${x.Key}=${x.Value}`).join("&");
            let result = arr[0];
            if (!String.IsNullOrWhiteSpace(newQuery)) {
                result = `${arr[0]}?${newQuery}`;
            }
            if (0 < stack.length) {
                stack.LastOrDefault().Uri = result;
            }
            return result;
        }
        ToCompress(input) {
            let json = JSON.stringify(input);
            let comp = LZString.compressToBase64(json);
            return encodeURIComponent(comp);
        }
        ToDecompress(input) {
            let dec = decodeURIComponent(input);
            let json = LZString.decompressFromBase64(dec);
            return JSON.parse(json);
        }
        static SplitQueryString(s) {
            if (!String.IsNullOrWhiteSpace(s)) {
                let dec = $('<div/>').html(s).text();
                let array = dec.Split("&", StringSplitOptions.RemoveEmptyEntries);
                let result = [];
                $.each(array, (i, value) => {
                    let split = value.Split("=", StringSplitOptions.None);
                    if (split.length == 2) {
                        result.push({ Key: split[0], Value: split[1] });
                    }
                });
                return result;
            }
            return new Array();
        }
        static GetLocalStorage(id) {
            return $.GetLocalStorage(id, "");
        }
        static SetLocalStorage(id, value) {
            $.SetLocalStorage(id, value);
        }
        Update() {
            let el = $(this.Selector);
            if (el.length === 0)
                return;
            el.empty();
            let uri = location.href;
            let arr = uri.Split("?");
            let queryString = "";
            if (1 < arr.length) {
                queryString = arr[1];
            }
            if (String.IsNullOrWhiteSpace(queryString)) {
                return;
            }
            let dic = Breadbrumb.SplitQueryString(queryString);
            let id = dic.FirstOrDefault(x => x.Key === "b");
            if (!id) {
                return;
            }
            let stack = this.BuildStack(id.Value);
            if (!stack) {
                return;
            }
            let aList = new Array();
            $.each(stack, (i, value) => {
                if (i === (stack.length - 1)) {
                    aList.push($(`<a>${value.Title}</a>`));
                }
                else {
                    let a = $(`<a href="javascript:void(0);">${value.Title}</a>`);
                    a.click(e => {
                        let newE = new Event("breadbrumbTapped");
                        newE.__title = value.Title;
                        newE.__uri = value.Uri;
                        newE.__e = e;
                        newE.__canceled = false;
                        window.dispatchEvent(newE);
                        if (typeof newE.__canceled === "boolean") {
                            if (!newE.__canceled) {
                                location.replace(value.Uri);
                            }
                        }
                        else if (Object.IsPromise(newE.__canceled)) {
                            let pms = newE.__canceled;
                            pms.then(canceled => {
                                if (!canceled) {
                                    location.replace(value.Uri);
                                }
                            });
                        }
                        else {
                            location.replace(value.Uri);
                        }
                    });
                    aList.push(a);
                }
                aList.push($(`<span> > </span>`));
            });
            for (var i = 0; i < aList.length - 1; i++) {
                el.append(aList[i]);
            }
        }
        BuildStack(s) {
            if (Breadbrumb.AllowLocalStorage) {
                s = Breadbrumb.GetLocalStorage(s);
            }
            return this.ToDecompress(s);
        }
        Pop(count = 1) {
            let el = $(this.Selector);
            if (el.length === 0)
                return;
            let aList = el.find("a");
            let back = ++count;
            if (aList.length <= back)
                return;
            aList[aList.length - back].click();
        }
    }
    DomBehind.Breadbrumb = Breadbrumb;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Breadbrumb.js.map
var DomBehind;
(function (DomBehind) {
    class Appeal {
        static Register(behavior) {
            let style = $(`#${Appeal.styleIdentity}`);
            if (style.length === 0) {
                let head = document.head || document.getElementsByTagName('head')[0];
                let newStyle = document.createElement('style');
                head.appendChild(newStyle);
                newStyle.type = 'text/css';
                newStyle.appendChild(document.createTextNode(Appeal.css));
                newStyle.setAttribute("id", Appeal.styleIdentity);
            }
            let identity = behavior.Element.attr(`appeal-identity`);
            if (!identity) {
                identity = `appeal-${NewUid()}`;
                behavior.Element.attr(`appeal-identity`, identity);
            }
            let appeal = window[identity];
            if (!appeal) {
                window[identity] = appeal = new Appeal();
                appeal.Behavior = behavior;
            }
        }
        Render(newValue) {
            let el = this.Behavior.Element;
            let identity = el.attr("ripple_appeal_identity");
            if (!identity) {
                identity = `ripple-${NewUid()}`;
                el.attr("ripple_appeal_identity", identity);
            }
            let pnl = $(`#${identity}`);
            if (!newValue)
                pnl.remove();
            let oldValueString = el.attr("ripple_appeal_value");
            let oldValue = false;
            if (!String.IsNullOrWhiteSpace(oldValueString)) {
                oldValue = Boolean(oldValue);
            }
            el.attr("ripple_appeal_value", `${newValue}`);
            if (newValue === oldValue) {
                return;
            }
            if (!newValue) {
                return;
            }
            let offset = el.offset();
            let css = {
                "height": `${el.height()}px`,
                "width": `${el.width()}px`,
                "top": `${offset.top}px`,
                "left": `${offset.left}px`,
                "position": "fixed",
                "background-color": "transparent",
                "border-color": "rgba(0, 90, 255, 0.4)",
                "pointer-events": "none"
            };
            let parent = el.closest("div");
            let clone = el.clone().empty();
            if (el.is("input") || el.is("select")) {
                clone = $("<div />");
                let h = el.height();
                let w = el.width();
                if (h < w) {
                    h = w;
                }
                else {
                    w = h;
                }
                if (h < 50) {
                    w = h = 50;
                }
                let top = offset.top;
                let topOffset = Number(el.css("margin-top").replace(/[^-\d\.]/g, '')) +
                    Number(el.css("margin-bottom").replace(/[^-\d\.]/g, ''));
                let left = offset.left;
                let leftOffset = Number(el.css("margin-left").replace(/[^-\d\.]/g, '')) +
                    Number(el.css("margin-right").replace(/[^-\d\.]/g, ''));
                if (el.is('select') && top === 0 && left === 0) {
                    let nextSpan = el.next("span");
                    if (nextSpan.length !== 0) {
                        h = w = nextSpan.height();
                        if (h < 50) {
                            w = h = 50;
                        }
                        let buffOffset = nextSpan.offset();
                        top = buffOffset.top + (nextSpan.height() / 2);
                        left = buffOffset.left + (nextSpan.width() / 2);
                    }
                }
                css = $.extend(true, css, {
                    "height": `${h}px`,
                    "width": `${w}px`,
                    "top": `${top - (el.height() + topOffset)}px`,
                    "left": `${left + leftOffset}px`,
                    "border-radius": "50%",
                    "transform": "scale(0)",
                    "background": "rgba(0, 90, 255, 0.4)",
                });
            }
            clone.attr("id", identity);
            clone.css(css);
            clone.addClass("ripple_appeal");
            parent.append(clone);
            setTimeout(() => {
                clone.remove();
                el.attr("ripple_appeal_value", `false`);
            }, 9 * 1000);
        }
    }
    Appeal.IsEnabledProperty = DomBehind.Data.DependencyProperty.RegisterAttached("appealEnabled", null, (x, y) => {
        let identity = x.attr(`appeal-identity`);
        let timeoutHandle = x.attr(`clearTimeout`);
        let appeal = window[identity];
        if (appeal) {
            if (timeoutHandle) {
                clearTimeout(Number(timeoutHandle));
            }
            let value = setTimeout(() => {
                x.attr(`clearTimeout`, "");
                appeal.Render(!!y);
            }, 1 * 1000);
            x.attr(`clearTimeout`, value);
        }
    }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay, behavior => {
        Appeal.Register(behavior);
    });
    Appeal.styleIdentity = "appeal-style";
    Appeal.css = `
@keyframes rippleAppeal {
    100% {
        transform: scale(2);
        border-width: 10px;
        opacity: 0;
    }
}

@keyframes rippleOut {
    100% {
        opacity: 0;
    }
}

.ripple_appeal {
    animation: rippleAppeal 3s linear 3
}
`;
    DomBehind.Appeal = Appeal;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Appeal.js.map
var DomBehind;
(function (DomBehind) {
    let FlipAnimation;
    (function (FlipAnimation) {
        FlipAnimation[FlipAnimation["HorizontalFlip"] = 0] = "HorizontalFlip";
        FlipAnimation[FlipAnimation["Slide"] = 1] = "Slide";
    })(FlipAnimation = DomBehind.FlipAnimation || (DomBehind.FlipAnimation = {}));
    class FlipBehavior extends DomBehind.Data.DataBindingBehavior {
        SetValue(el, newValue) {
            let oldValue = false;
            let oldValueString = el.attr(FlipBehavior.ValueKey);
            if (!String.IsNullOrWhiteSpace(oldValueString)) {
                oldValue = String.ToBoolean(oldValueString);
            }
            el.attr(FlipBehavior.ValueKey, `${newValue}`);
            if (newValue === oldValue)
                return;
            if (this.Option.animation === FlipAnimation.HorizontalFlip) {
                this.HorizontalFlip(newValue);
            }
            else {
                this.Slide(newValue);
            }
        }
        HorizontalFlip(isBack) {
            if (!this.Option.container.hasClass("flip-container")) {
                this.Option.container.addClass("flip-container");
            }
            if (!this.Option.front.hasClass("flip-item")) {
                this.Option.front.addClass("flip-item");
            }
            if (!this.Option.back.hasClass("flip-item")) {
                this.Option.back.addClass("flip-item");
            }
            if (!this.Option.back.hasClass("flip-horizontal-back")) {
                this.Option.back.addClass("flip-horizontal-back");
            }
            if (isBack) {
                this.Option.container.addClass("flip-horizontal");
            }
            else {
                this.Option.container.removeClass("flip-horizontal");
            }
        }
        Slide(isBack) {
            if (isBack) {
                this.Option.front.removeClass("flip-slide-in");
                this.Option.front.addClass("hidden");
                this.Option.back.removeClass("hidden");
                this.Option.back.addClass("flip-slide-in");
            }
            else {
                this.Option.front.removeClass("hidden");
                this.Option.front.addClass("flip-slide-in");
                this.Option.back.removeClass("flip-slide-in");
                this.Option.back.addClass("hidden");
            }
        }
        static Register(behavior) {
            let identity = `id-${NewUid()}`;
            behavior.Option.container.attr(FlipBehavior.IdentityKey, identity);
            window[identity] = behavior;
            let style = $(`#${FlipBehavior.cssIdentity}`);
            if (style.length === 0) {
                let head = document.head || document.getElementsByTagName('head')[0];
                let newStyle = document.createElement('style');
                head.appendChild(newStyle);
                newStyle.type = 'text/css';
                newStyle.appendChild(document.createTextNode(FlipBehavior.css));
                newStyle.setAttribute("id", FlipBehavior.cssIdentity);
            }
        }
    }
    FlipBehavior.IdentityKey = "flip-identity";
    FlipBehavior.IsFlipProperty = DomBehind.Data.DependencyProperty.RegisterAttached("isflip", el => {
    }, (el, newValue) => {
        let identity = el.attr(FlipBehavior.IdentityKey);
        let behavior = window[identity];
        if (behavior) {
            behavior.SetValue(el, newValue);
        }
    }, DomBehind.Data.UpdateSourceTrigger.Explicit, DomBehind.Data.BindingMode.OneWay, (b) => {
        if (b.Option.animation === FlipAnimation.Slide)
            b.Option.back.addClass("hidden");
    });
    FlipBehavior.ValueKey = "flip-value";
    FlipBehavior.css = `
@keyframes kf-flip-slide-in {
  0% {
    opacity: 0;
    transform: translateX(10px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
.flip-slide-in {
    animation: kf-flip-slide-in 1s linear 1
}

@keyframes kf-flip-slide-out {
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-50px);
  }
}
.flip-slide-out {
    animation: kf-flip-slide-out 1s linear 1
}



.flip-container {
    transition: transform 1s;
    transform-style: preserve-3d;
    position: relative; 
}
.flip-item {
    position: absolute;
    backface-visibility: hidden;
}
.flip-horizontal {
    transform: rotateY(180deg);
}
.flip-horizontal-back {
    transform: rotateY(180deg);
}

`;
    FlipBehavior.cssIdentity = `flip-style`;
    DomBehind.FlipBehavior = FlipBehavior;
    class FlipBindingBehaviorBuilder extends DomBehind.BindingBehaviorBuilder {
        constructor(owner) {
            super(owner);
        }
        BindingFlip(exp, option) {
            let me = this;
            let behavior = me.CurrentBehavior;
            if (behavior instanceof FlipBehavior) {
                if (option) {
                    behavior.Option = $.extend(true, behavior.Option, option);
                }
                behavior.Property = FlipBehavior.IsFlipProperty;
                behavior.PInfo = new DomBehind.LamdaExpression(behavior.DataContext, exp);
                behavior.Marks = [behavior.PInfo.MemberPath];
            }
            return me;
        }
    }
    DomBehind.FlipBindingBehaviorBuilder = FlipBindingBehaviorBuilder;
    DomBehind.BindingBehaviorBuilder.prototype.FlipElement =
        function (containerSelector, frontSelector, backSelector) {
            let me = this;
            let container = me.Owner.Container.find(containerSelector);
            if (container.length === 0) {
                container = $(containerSelector);
            }
            let frontElement = me.Owner.Container.find(frontSelector);
            if (frontElement.length === 0) {
                frontElement = $(frontSelector);
            }
            let backElement = me.Owner.Container.find(backSelector);
            if (backElement.length === 0) {
                backElement = $(backSelector);
            }
            me.CurrentElement = container;
            let behavior = me.Add(new FlipBehavior());
            behavior.Option = {
                container: container,
                front: frontElement,
                back: backElement,
                animation: FlipAnimation.Slide,
            };
            FlipBehavior.Register(behavior);
            let newMe = new FlipBindingBehaviorBuilder(me.Owner);
            newMe.CurrentElement = me.CurrentElement;
            newMe.CurrentBehavior = me.CurrentBehavior;
            return newMe;
        };
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Flip.js.map
var DomBehind;
(function (DomBehind) {
    class Application {
        constructor() {
            this._navigator = new DomBehind.Navigation.DefaultNavigator();
        }
        static get Current() {
            return Application._app;
        }
        static Resolve() {
            if (Application._app)
                return;
            let me = this;
            $(document).ready(function () {
                let appFactory = new DomBehind.TypedFactory(me);
                let app = appFactory.CreateInstance();
                Application._app = app;
                window.history.pushState(null, "", window.location.href);
                window.onpopstate = function () {
                    window.history.pushState(null, "", window.location.href);
                    Application.Current.OnBrowserBack();
                };
            });
        }
        OnBrowserBack() { }
        SafeAction(func, context, ...args) {
            try {
                if (context) {
                    return $.proxy(func, context, args);
                }
                else {
                    return func();
                }
            }
            catch (e) {
                this.UnhandledException(e);
            }
        }
        get DefaultActionPolicy() {
            return [];
        }
        get Navigator() {
            return this._navigator;
        }
    }
    DomBehind.Application = Application;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Application.js.map
var DomBehind;
(function (DomBehind) {
    class BizView {
        constructor() {
            this._disposed = false;
        }
        get Container() {
            return this._container;
        }
        set Container(value) {
            if (this._container !== value) {
                if (this._container) {
                    this._container.empty();
                    this._container = null;
                }
                this._container = value;
            }
        }
        get DataContext() {
            return this._dataContext;
        }
        set DataContext(value) {
            if (this._dataContext !== value) {
                this._dataContext = value;
            }
        }
        OnDataContextPropertyChanged(sender, e) {
            this.UpdateTarget(e.Name);
        }
        ViewLoaded(responseText, textStatus, XMLHttpRequest) { }
        Ensure() {
            if (!this.DataContext)
                return;
            var viewModel = this.DataContext;
            viewModel.View = this;
            if (this.BindingBehaviors) {
                this.BindingBehaviors.Dispose();
                this.BindingBehaviors = null;
            }
            this.BindingBehaviors = new DomBehind.Data.BindingBehaviorCollection();
            this.BuildBinding();
            this.Subscribe();
            this.BindingBehaviors.Ensure();
            if (this.DependencyValidateSetup) {
                this.DependencyValidateSetup();
            }
            let e = null;
            if (!viewModel.Initialized) {
                viewModel.Initialized = true;
                e = this.Container.Raise(DomBehind.UIElement.Initialize);
            }
            let activate = () => {
                this.UpdateTarget();
                this.Container.Raise(DomBehind.UIElement.Activate);
            };
            if (e && Object.IsPromise(e.result)) {
                let pms = e.result;
                pms.always(() => activate());
            }
            else {
                activate();
            }
        }
        UnSubscribe() {
        }
        Subscribe() {
        }
        CreateBindingBuilder() {
            let builder = new DomBehind.BindingBehaviorBuilder(this);
            builder.Element(this.Container).BindingAction(DomBehind.UIElement.Initialize, vm => vm.Initialize());
            builder.Element(this.Container).BindingAction(DomBehind.UIElement.Activate, vm => vm.Activate());
            return builder;
        }
        UpdateTarget(mark) {
            if (this.BindingBehaviors)
                this.BindingBehaviors.UpdateTarget(mark);
        }
        UpdateSource(mark) {
            if (this.BindingBehaviors)
                this.BindingBehaviors.UpdateSource(mark);
        }
        Validate(mark) {
            let result = true;
            if (this.BindingBehaviors) {
                this.RemoveValidator(mark);
                $.each(this.BindingBehaviors.ListDataBindingBehavior(mark), (i, behavior) => {
                    if (!behavior.BindingPolicy.Validators.Validate()) {
                        result = false;
                    }
                });
            }
            if (this.DependencyValidate) {
                this.DependencyValidate(mark);
            }
            return result;
        }
        RemoveValidator(mark) {
            $.each(this.BindingBehaviors.ListDataBindingBehavior(mark), (i, value) => {
                value.BindingPolicy.Validators.RemoveValidator();
            });
            this.Container.ClearCustomError();
            if (this.DependencyValidateClear) {
                this.DependencyValidateClear(mark);
            }
        }
        ClearValidator(mark) {
            $.each(this.BindingBehaviors.ListDataBindingBehavior(mark), (i, value) => {
                value.BindingPolicy.Validators.ClearValidator();
            });
            this.Container.ClearCustomError();
            if (this.DependencyValidateClear) {
                this.DependencyValidateClear(mark);
            }
        }
        Dispose() {
            if (!this._disposed) {
                this.UnSubscribe();
                if (this.BindingBehaviors) {
                    this.BindingBehaviors.Dispose();
                    this.BindingBehaviors = null;
                }
                if (this.DataContext) {
                    var disopsable = this.DataContext;
                    if (disopsable.Dispose) {
                        disopsable.Dispose();
                    }
                    this.DataContext = null;
                }
                if (this.Container) {
                    this.Container.empty();
                    this.Container = null;
                }
            }
            this._disposed = true;
        }
    }
    DomBehind.BizView = BizView;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=BizView.js.map
var DomBehind;
(function (DomBehind) {
    class BizViewModel extends DomBehind.NotifiableImp {
        constructor() {
            super();
            this.Initialized = false;
            DomBehind.Locator.Push(this);
        }
        NotifyEvent(event, args) {
            if (event)
                event.Raise(this, args);
        }
        get Title() {
            return this._title;
        }
        set Title(value) {
            this._title = value;
            document.title = value;
        }
        get IsVisible() {
            let view = this.View;
            if (!view)
                return undefined;
            let container = view.Container;
            if (!container)
                return undefined;
            return container.css("display") !== "none";
        }
        set IsVisible(value) {
            let view = this.View;
            if (!view)
                return;
            let container = view.Container;
            if (!container)
                return;
            container.css("display", value ? "display" : "none");
        }
        get View() {
            return this._view;
        }
        set View(value) {
            if (this._view !== value) {
                this._view = value;
                this.OnViewChanged();
            }
        }
        OnViewChanged() {
        }
        Activate() { }
        UpdateTarget(mark) {
            if (this.View) {
                this.View.UpdateTarget(mark);
            }
        }
        UpdateSource(mark) {
            if (this.View) {
                this.View.UpdateSource(mark);
            }
        }
        Validate(mark) {
            let result = false;
            if (this.View) {
                result = this.View.Validate(mark);
            }
            return result;
        }
        ClearValidation(mark) {
            this.View.ClearValidator(mark);
        }
        LastErrors(mark) {
            let result = [];
            $.each(this.View.BindingBehaviors.ListDataBindingBehavior(mark), (i, behavior) => {
                if (behavior.BindingPolicy &&
                    behavior.BindingPolicy.Validators) {
                    $.each(behavior.BindingPolicy.Validators.toArray(), (x, v) => {
                        if (v.HasError) {
                            result.push(v);
                        }
                    });
                }
            });
            return result;
        }
        ThrownValidate(mark) {
            let result = this.Validate(mark);
            if (result)
                return;
            let lastErrors = this.LastErrors(mark).Select(x => new DomBehind.ApplicationException(x.Message));
            throw new DomBehind.ApplicationAggregateException(lastErrors);
        }
        WaitingOverlay(func, handled, image) {
            var overlayPolocy = new DomBehind.Data.WindowWaitingOverlayActionPolicy();
            if (image) {
                overlayPolocy.Option.Image = image;
            }
            return this.SafeAction(func, handled, overlayPolocy);
        }
        SafeAction(func, handled, ...policies) {
            var behavior = new DomBehind.Data.ActionBindingBehavior();
            var list = [];
            if (!handled) {
                list.push(new DomBehind.Data.ExceptionHandlingActionPolicy());
            }
            if (policies) {
                $.each(policies, (i, value) => list.push(value));
            }
            var invoker = behavior.CreateActionInvoker(list);
            return invoker.Do(func);
        }
        Catch(ex) {
            if (ex.Data instanceof DomBehind.AjaxException) {
            }
        }
        get Navigator() {
            return DomBehind.Application.Current.Navigator;
        }
        get IsEnabled() {
            return this.GetProperty("IsEnabled", true);
        }
        set IsEnabled(value) {
            this.SetProperty("IsEnabled", value);
        }
        ShowInfomation(message, title) {
            DomBehind.MessaageBox.ShowMessage(message, title, DomBehind.MessageStatus.Infomation);
        }
        ShowWarning(message, title) {
            DomBehind.MessaageBox.ShowMessage(message, title, DomBehind.MessageStatus.Warning);
        }
        ShowError(message, title) {
            DomBehind.MessaageBox.ShowMessage(message, title, DomBehind.MessageStatus.Error);
        }
        ShowMessage(message, title, status) {
            DomBehind.MessaageBox.ShowMessage(message, title, status);
        }
        ShowYesNo(message, title, option) {
            DomBehind.MessaageBox.ShowYesNo(message, title, option);
        }
        ShowOkCancel(message, title, option) {
            DomBehind.MessaageBox.ShowOkCancel(message, title, option);
        }
        Dispose() {
            if (!this._disposed) {
                super.Dispose();
            }
        }
    }
    DomBehind.BizViewModel = BizViewModel;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=BizViewModel.js.map
class annotationCollection {
    constructor() {
        this.lazyList = [];
    }
    Any(selector, resolveViewType, resolveViewModelType) {
        return this.lazyList.Any(x => x.Selector === selector &&
            x.ResolveViewType === resolveViewType &&
            x.ResolveViewModelType === resolveViewModelType);
    }
    Add(selector, resolveViewType, resolveViewModelType) {
        this.lazyList.push({
            Selector: selector,
            ResolveViewType: resolveViewType,
            ResolveViewModelType: resolveViewModelType
        });
    }
    Remove(selector, resolveViewType, resolveViewModelType) {
        let newArray = [];
        $.each(this.lazyList, (i, x) => {
            if (!(x.Selector === selector &&
                x.ResolveViewType === x.ResolveViewType &&
                x.ResolveViewModelType === x.ResolveViewModelType)) {
                newArray.push(x);
            }
        });
        this.lazyList = newArray;
    }
    ToArray() {
        let newArray = [];
        $.each(this.lazyList, (i, x) => newArray.push(x));
        return newArray;
    }
    Pop(peek) {
        $.each(this.ToArray(), (i, each) => {
            if (!peek) {
                this.Remove(each.Selector, each.ResolveViewType, each.ResolveViewModelType);
            }
            $.BindingAnnotation(each.Selector, each.ResolveViewType, each.ResolveViewModelType);
        });
    }
}
var __lazyCollection = new annotationCollection();
$.BindingAnnotation = function (selector, resolveViewType, resolveViewModelType) {
    let d = $.Deferred();
    let view = $(selector);
    view.ready(function (e) {
        let ele = $(selector);
        if (ele.length === 0) {
            if (!__lazyCollection.Any(selector, resolveViewType, resolveViewModelType)) {
                __lazyCollection.Add(selector, resolveViewType, resolveViewModelType);
            }
            d.reject();
            return;
        }
        let viewFactory = new DomBehind.TypedFactory(resolveViewType());
        let viewModelFactory = new DomBehind.TypedFactory(resolveViewModelType());
        let behavior = new DomBehind.Data.ViewViewModelBindingBehavior();
        behavior.GetView = x => viewFactory.CreateInstance();
        behavior.GetViewModel = x => viewModelFactory.CreateInstance();
        behavior.Element = $(selector);
        behavior.Ensure();
        ele.trigger("RegisteredViewViewModel", behavior);
        d.resolve();
    });
    return d.promise();
};
//# sourceMappingURL=BindingAnnotation.js.map
var DomBehind;
(function (DomBehind) {
    class Locator {
        static Push(ins) {
            Locator._container.push(ins);
        }
        static ToArray() {
            let array = [];
            $.each(Locator._container, (i, each) => {
                array.push(each);
            });
            return array;
        }
        static List(typeT, predicate) {
            let array = [];
            $.each(Locator._container, (i, each) => {
                if (each instanceof typeT) {
                    if (!predicate) {
                        array.push(each);
                    }
                    else if (predicate(each)) {
                        array.push(each);
                    }
                }
            });
            return array;
        }
        static First(typeT, predicate) {
            let result;
            $.each(Locator._container, (i, each) => {
                if (each instanceof typeT) {
                    if (!predicate) {
                        result = each;
                        return false;
                    }
                    else if (predicate(each)) {
                        result = each;
                        return false;
                    }
                }
            });
            return result;
        }
        static Remove(typeT, predicate) {
            let array = [];
            $.each(Locator._container, (i, each) => {
                if (each instanceof typeT) {
                    if (!(!predicate || predicate(each))) {
                        array.push(each);
                    }
                }
                else {
                    array.push(each);
                }
            });
            Locator._container = array;
        }
        static Clear() {
            Locator._container = [];
        }
    }
    Locator._container = [];
    DomBehind.Locator = Locator;
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=Locator.js.map
$.validator.setDefaults({
    ignore: "",
    errorPlacement: function (error, element) {
        let id = element.attr("id");
        if (id) {
            let pre = element.prevAll(`[for="${id}"]`);
            if (pre.length != 0) {
                error.insertAfter(pre);
            }
            let post = element.nextAll(`[for="${id}"]`);
            if (post.length != 0) {
                error.insertAfter(post);
            }
            let form = element.closest("form");
            let closet = form.find(`[for="${id}"]`);
            if (closet.length != 0) {
                error.insertAfter(closet);
            }
            if (pre.length === 0 && post.length === 0 && closet.length === 0) {
                error.insertAfter(element);
            }
        }
    }
});
var DomBehind;
(function (DomBehind) {
    DomBehind.BizView.prototype.DependencyValidateSetup = function () {
        let me = this;
        let container = me.Container;
        if (!container) {
            return;
        }
        if (!container.is("form")) {
            container = container.find("form");
        }
        if (container.length == 0) {
            container = container.closest("form");
        }
        if (container.length == 0) {
            console.trace("Validation using setCustomValidity must be enclosed in a form tag.");
        }
        $.each(me.BindingBehaviors.ListDataBindingBehavior(), (i, behavior) => {
            $.each(behavior.BindingPolicy.Validators.toArray(), (k, validator) => {
                let el = behavior.Element;
                let identity = el.attr("identity");
                if (!el.attr("identity")) {
                    identity = NewUid().Replace("-", "");
                    el.attr("identity", identity);
                }
                let cls = `cls-${identity}`;
                if (!el.hasClass(cls)) {
                    el.addClass(cls);
                }
                let name = el.attr("name");
                if (String.IsNullOrWhiteSpace(name)) {
                    el.attr("name", `name-${identity}`);
                }
                let funcName = `func-${identity}`;
                let o = JSON.parse(`{ "${funcName}": { "${funcName}": true }  }`);
                $.validator.addClassRules(cls, o);
                if (validator instanceof DomBehind.Validation.RequiredValidator) {
                    let requiredFunc = $.validator.methods.required;
                    if (validator.Message) {
                        $.validator.addMethod(`${funcName}`, requiredFunc, validator.Message);
                    }
                    else {
                        $.validator.addMethod(`${funcName}`, requiredFunc, "必須項目です");
                    }
                }
            });
        });
    };
    DomBehind.BizView.prototype.DependencyValidate = function (mark) {
        let me = this;
        let container = me.Container;
        if (!container) {
            return;
        }
        if (!container.is("form")) {
            container = container.find("form");
        }
        if (container.length == 0) {
            container = container.closest("form");
        }
        if (container.length == 0)
            return;
        $.each(me.BindingBehaviors.ListDataBindingBehavior(mark), (i, behavior) => {
            $.each(behavior.BindingPolicy.Validators.toArray(), (k, validator) => {
                let el = behavior.Element;
                if (validator instanceof DomBehind.Validation.RequiredValidator) {
                    if (el.attr(validator.Attribute)) {
                        el.removeAttr(validator.Attribute);
                    }
                }
                el.valid();
            });
        });
    };
    DomBehind.BizView.prototype.DependencyValidateClear = function (mark) {
        let me = this;
        let container = me.Container;
        if (!container) {
            return;
        }
        if (!container.is("form")) {
            container = container.find("form");
        }
        if (container.length == 0) {
            container = container.closest("form");
        }
        if (container.length == 0)
            return;
        let jqueryValidator = container.validate();
        if (jqueryValidator) {
            jqueryValidator.resetForm();
        }
    };
})(DomBehind || (DomBehind = {}));
//# sourceMappingURL=JQueryValidationExtension.js.map