// JavaScript source code -- making a chart with chart.js
// chart js linked in html - <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

let data =  {
    //Bring in data
    labels: [],
    datasets: [
        {
            label: "unsorted list",
            data: [],
            pointBackgroundColor: [],
            pointRadius: 10,
        }
                ],
        

options: {


    scales: {
        yAxes: [{
            ticks: {
                min: 0,
                max: 20,
                stepSize: 1,
            }
        }]
    }
}

};

let CHART;
let CTX;
let SIZE = 20    

   
for (let i = 0; i < SIZE; i++) {

    let label = "" + i
    data.labels.push(label)
    data.datasets[0].pointBackgroundColor.push("silver")
    let rand = Math.floor(Math.random() * 200);
    data.datasets[0].data.push(rand)

}

const config = {
    type: 'line',
    data,
    options: {}
};



function setUp() {
    var ctx = document.getElementById("chart").getContext("2d");
    CTX = ctx;
    
    console.log(data)

    CHART = new Chart(
        ctx,
        config
    );
}


// reference: quicksort : https://stackabuse.com/quicksort-in-javascript/


function partition(arr, start, end) {
    // Taking the last element as the pivot
    const pivotValue = arr[end];
    let pivotIndex = start;
    for (let i = start; i < end; i++) {
        if (arr[i] < pivotValue) {
            // Swapping elements
            [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
            // Moving to next element
            pivotIndex++;
        }
    }
    
    // Putting the pivot value in the middle
    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]]
    return pivotIndex
};
function quickSort(arr, start, end) {
    // Base case or terminating case
 
    if (start >= end) {
       
        return;
    }

    // Returns pivotIndex
    let index = partition(arr, start, end)
    highlight(index, end, start)
    console.log("start=", start, "end=", end)
    animate(arr)
    
    
    // Recursively apply the same logic to the left and right subarrays
    setTimeout(() => { quickSort(arr, start, index - 1); quickSort(arr, index + 1, end); }, 2000);
    
   
}


function sort() {
    let obj = data.datasets[0]   
    let list = obj.data.slice(0, SIZE)   
    let midpoint = Math.floor(list.length / 2)
    let size = list.length - 1
    
    quickSort(list, 0, size)
}

function animate(list) {
    data.datasets[0].data = list
    CHART.update()
    //console.log(list)
}

function highlight(mid_index, max_index, min_index) {
    colors = ["silver", "silver", "silver", "silver", "silver", "silver", "silver", "silver", "silver", "silver", "silver", "silver", "silver", "silver", "silver", "silver", "silver", "silver", "silver", "silver"]
    data.datasets[0].pointBackgroundColor = colors
    data.datasets[0].pointBackgroundColor[min_index] = "yellow";
    data.datasets[0].pointBackgroundColor[mid_index] = "green";
    data.datasets[0].pointBackgroundColor[max_index] = "red";
    
    CHART.update();



}

document.addEventListener("DOMContentLoaded", function (event) {
    setUp();
    
});

