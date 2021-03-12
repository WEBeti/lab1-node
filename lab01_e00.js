"use strict" ;

function string_normalize4(strings){
    
    for (let [i,s] of strings.entries()){

        if (s.length < 2){
            strings[i] = '';
        } else {
            let s_new = s.substring(0,2);       // take first two chars
            s_new = s_new.concat(s.substring(s.length-2));  // concat last two chars
            strings[i] = s_new;
        }
    }
}

const test_strings = ['spring','a','bb','aba','cicao','webapp','ozerodb'];
console.log(test_strings);
string_normalize4(test_strings);
console.log(test_strings);