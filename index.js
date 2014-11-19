/**
 * Created by zwug on 11/19/14.
 */
var app = new angular.module('trapeze', []);


app.controller('controller', function(){
    this.build = function(dep, eps, a, b){
        eps = eval(eps);
        a = eval(a);
        b = eval(b);
        var y=[];
        var xVals = [];
        for(var x = a; x < b;){
            y.push(eval(dep));
            xVals.push(x);
            x = x + eps;
        }
        var lineChartData = {
            labels : xVals,
            datasets : [
                {
                    fillColor : "rgba(220,220,220,0.5)",
                    strokeColor : "rgba(220,220,220,1)",
                    pointColor : "rgba(220,220,220,1)",
                    pointStrokeColor : "#fff",
                    data : y
                },
//                {
//
//                    fillColor : "rgba(151,187,205,0.5)",
//                    strokeColor : "rgba(151,187,205,1)",
//                    pointColor : "rgba(151,187,205,1)",
//                    pointStrokeColor : "#fff",
//                    data : xVals
//
//                }
            ]
        }
        var myLine = new Chart(document.getElementById("canvas").getContext("2d")).Line(lineChartData);
    };



//    var lineChartData = {
//        labels : ["January","February","March","April","May","June","July"],
//        datasets : [
//            {
//                fillColor : "rgba(220,220,220,0.5)",
//                strokeColor : "rgba(220,220,220,1)",
//                pointColor : "rgba(220,220,220,1)",
//                pointStrokeColor : "#fff",
//                data : [65,59,90,81,56,55,40]
//            },
//            {
//                fillColor : "rgba(151,187,205,0.5)",
//                strokeColor : "rgba(151,187,205,1)",
//                pointColor : "rgba(151,187,205,1)",
//                pointStrokeColor : "#fff",
//                data : [28,48,40,19,96,27,100]
//            }
//        ]
//
//    }
//
//    var myLine = new Chart(document.getElementById("canvas").getContext("2d")).Line(lineChartData);
});