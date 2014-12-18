/**
 * Created by zwug on 11/19/14.
 */
var app = new angular.module('trapeze', []);


app.controller('controller', function ($http) {
    this.finalInt = 0;
    this.a = 1;
    this.b = 11;
    this.n = 2;
    this.eps = 0.001;
    var funcArr = [];
    this.dep = "sin(x)";

    this.fromTxt = function () {
        $http.get('math.txt').success(function (data, status) {
            if (data && status === 200) {
                funcArr = data.split(';');
            }
        }).then(function () {
            return funcArr[0];
        })

    };
    this.fromTxt();

    this.update = function(){
        this.fromTxt();
        this.dep = funcArr[0];
    }



    this.build = function (dep, a, b, n, accur) {
        Chart.defaults = {
            showScale: false
        };
        a = eval(a);
        b = eval(b);
        var eps = (b - a) / 150;

        var y = [];
        var Xvalue;
        var xVals = [];
        for (Xvalue = a; Xvalue <= b;) {
            y.push(Parser.evaluate(dep, { x: Xvalue }));
            xVals.push(Xvalue.toFixed(1));
            Xvalue += eps;
        }

        //trapeze

        var Int = 0;
        var IntNext = 2 * accur;
        var func = Parser.parse(dep);
        while (Math.abs(IntNext - Int) > accur) {
            Xvalue = a;
            n *= 2;
            var h = (b - a) / n;
            Int = IntNext;
            IntNext = 0;
            for (var i = 0; i <= n; ++i) {
                var f1 = func.evaluate({ x: Xvalue });
                Xvalue += h;
                var f2 = func.evaluate({ x: Xvalue });
                IntNext += (f1 + f2) * h / 2;
            }
            console.log(n);
            console.log(IntNext);
            console.log(Math.abs(IntNext - Int));
            console.log("------------------");
        }

        Xvalue = a;
        n = 10;
        var h = (b - a) / n;
        var IntVals = [];
        var IntXvals = [];
        for (var i = 0; i <= n; ++i) {
            f1 = func.evaluate({ x: Xvalue });
            IntVals.push(f1);
            IntXvals.push(Xvalue);
            Xvalue += h;
        }

        this.finalInt = IntNext.toFixed(2);
        console.log(this.finalInt);

        var lineChartData = {
            labels: xVals,
            datasets: [
                {
                    fillColor: "rgba(220,220,220,0.5)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    data: y
                }
            ]
        }
        var myLine = new Chart(document.getElementById("canvas").getContext("2d")).Line(lineChartData, {
            bezierCurve: false,
            pointDotRadius: 0,
            scaleIntegersOnly: true,
            maintainAspectRatio: true,
            scaleShowLabels: true
        });
        var lineChartData1 = {
            labels: IntXvals,
            datasets: [
                {
                    fillColor: "rgba(220,220,220,0.5)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    data: IntVals
                }
            ]
        }
        var myLine1 = new Chart(document.getElementById("canvas1").getContext("2d")).Line(lineChartData1, {
            bezierCurve: false,
            pointDotRadius: 0,
            scaleIntegersOnly: true,
            maintainAspectRatio: true
        });
    };
})
;
