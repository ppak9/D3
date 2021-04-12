array_elements = ["2", "1", "2", "2", "3", "4", "3", "3", "3", "5"];

array_elements.sort();

var current = null;
var cnt = 0;
for (var i = 0; i < array_elements.length; i++) {
    if (array_elements[i] != current) {
        if (cnt > 0) {
            console.log(current + ' comes --> ' + cnt + ' times');
        }
        current = array_elements[i];
        cnt = 1;
    } else {
        cnt++;
    }
}
