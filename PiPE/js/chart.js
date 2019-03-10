window.addEventListener("click", getData(genFunction));

function getData(callbackIN) {
    var ref = firebase.database().ref("data");
        ref.once('value').then(function (snapshot) {
        callbackIN(snapshot.val())
    });
}

function genFunction(data) {
    var cdata = [];
    var len = data.length;
    for(var i=1; i<len; i++) {
    cdata.push({
        label: data[i]['label'],
        value: data[i]['value']
    });
}
var firebaseChart = new FusionCharts({
    type: "spline",
    renderAt: "chart-container",
    width: "100.2%",
    height: "100%",
    dataFormat: "json",
    dataSource: {
        "chart": {
            "caption": "PiPE Device Monitor",
            "subCaption": "Patient's Progress Per Day",
            "xAxisName": "Time (s)",
            "yAxisName": "Stability Factor",
            "refreshinterval": "5",
            "yaxisminvalue": "0.0",
            "yaxismaxvalue": "2",
            "numdisplaysets": "11",
            "showRealTimeValue": "1",
            "theme": "fusion"
        },
        "data": cdata
    }
});

firebaseChart.render();
}