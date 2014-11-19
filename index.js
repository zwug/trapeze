/**
 * Created by zwug on 11/19/14.
 */
var app = new angular.module('trapeze', []);


app.controller('controller', function(){
    var FinalInt;
    this.build = function(dep, eps, a, b, n){
        Chart.defaults = {
            showScale: false
        };
        eps = eval(eps);
        a = eval(a);
        b = eval(b);
        var y=[];
        var xVals = [];
        for(var x = a; x <= b;){
            y.push(eval(dep));
            xVals.push(x);
            x = x + eps;
        }

        //trapeze
        var h = (b - a) / n;
        var x = a;
        var Int = 0;
        var IntVals = [];
        var IntXvals = [];
        for(var i = 0; i < n; ++i){
            f1 = eval(dep);
            IntVals.push(f1);
            IntXvals.push(x);
            x += h;
            f2 = eval(dep);
            Int += (f1 + f2) * h / 2;
        }
        FinalInt = Int;
        console.log(FinalInt);

        var lineChartData = {
            labels : xVals,
            datasets : [
                {
                    fillColor : "rgba(220,220,220,0.5)",
                    strokeColor : "rgba(220,220,220,1)",
                    pointColor : "rgba(220,220,220,1)",
                    pointStrokeColor : "#fff",
                    data : y
                }
            ]
        }
        var myLine = new Chart(document.getElementById("canvas").getContext("2d")).Line(lineChartData, {
            bezierCurve: false,
            pointDotRadius : 0,
            scaleIntegersOnly: true,
            maintainAspectRatio: true,
            scaleShowLabels: false
        });
        var lineChartData1 = {
            labels : IntXvals,
            datasets : [
                {
                    fillColor : "rgba(220,220,220,0.5)",
                    strokeColor : "rgba(220,220,220,1)",
                    pointColor : "rgba(220,220,220,1)",
                    pointStrokeColor : "#fff",
                    data : IntVals
                }
            ]
        }
        var myLine1 = new Chart(document.getElementById("canvas1").getContext("2d")).Line(lineChartData1, {
            bezierCurve: false,
            pointDotRadius : 0,
            scaleIntegersOnly: true,
            maintainAspectRatio: true
        });
    };
});