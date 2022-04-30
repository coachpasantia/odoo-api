var dataset= [
    {
      "name": "Automotriz",
      "count": "2"
    },
    {
      "name": "All",
      "count": "1"
    },
    {
      "name": "Pintura",
      "count": "11"
    },
    {
      "name": "Madera",
      "count": "9"
    },
    {
      "name": "Acabado",
      "count": "3"
    },
    {
      "name": "Jardín",
      "count": "1"
    },
    {
      "name": "Ferretería",
      "count": "11"
    },
    {
      "name": "Construcción",
      "count": "5"
    },
    {
      "name": "Iluminación",
      "count": "9"
    },
    {
      "name": "Sanitarios",
      "count": "1"
    },
    {
      "name": "Decoración",
      "count": "2"
    },
    {
      "name": "PoS",
      "count": "2"
    },
    {
      "name": "Herramienta",
      "count": "10"
    }
  ]
  const dat=[
    {"name":"Automotriz","count":"2"},
    {"name":"All","count":"1"},
    {"name":"Pintura","count":"11"},
    {"name":"Madera","count":"9"},
  ]
  function pieChart2(data){
    const width = 900;
    const height = 450;
    const margin = { top: 30, bottom: 30, left: 10, right: 10 };

    const svg = d3.select("#grafica")
    .append('svg')
    .attr('width', width - margin.left - margin.right)
    .attr('height', height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);

    const radius = Math.min(width, height) / 2;
    const g = svg.append("g").attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

    const pie = d3.pie()
    .value(d => d.count)
    .sort(null);

    const path = g.selectAll("path")
    .data(pie(data))
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", d => color(d.data.name))
    .attr("stroke", "white")
    .attr("stroke-width", "2px")
    .style("opacity", 0.7)
    .on("mouseover", function(d) {
        d3.select(this).style("opacity", 0.5);
    })
    .on("mouseout", function(d) {
        d3.select(this).style("opacity", 0.7);
    });

    var label = d3.arc()
    .outerRadius(radius)
    .innerRadius(0);
    

}


//var dataset = [];  						 //Initialize empty array
  //      for (var i = 0; i < 25; i++) {			 //Loop 25 times
    //        var newNumber = Math.round(Math.random() * 30);  //New random integer (0-30)
      //      dataset = dataset.concat(newNumber); //Add new number to array
       // }
        
d3.select("body").selectAll("div")
    .data(dataset)
    .enter()
    .append("div")
    .attr("class", "bar")
    .style("height", function(d) {
        var barHeight = parseInt(d.count) *5;
        return barHeight + "px";
    })
    .text(function(d) {
        return d.name + ": " + d.count;
    })
    .style("background-color", function(d) {
        return "rgb(0, 0, " + (d.count * 10) + ")";
    })
    .style("margin", "5px")
    .style("padding", "5px")
    .style("border-radius", "5px")
    .style("color", "white")
    .style("font-size", "8px")
    .style("text-align", "center")
    .style("width", "100px");


    const datas= [
      {
        "name": "Automotriz",
        "count": "2"
      },
      {
        "name": "All",
        "count": "1"
      },
      {
        "name": "Pintura",
        "count": "11"
      },
      {
        "name": "Madera",
        "count": "9"
      },
      {
        "name": "Acabado",
        "count": "3"
      },
      {
        "name": "Jardín",
        "count": "1"
      },
      {
        "name": "Ferretería",
        "count": "11"
      },
      {
        "name": "Construcción",
        "count": "5"
      },
      {
        "name": "Iluminación",
        "count": "9"
      },
      {
        "name": "Sanitarios",
        "count": "1"
      },
      {
        "name": "Decoración",
        "count": "2"
      },
      {
        "name": "PoS",
        "count": "2"
      },
      {
        "name": "Herramienta",
        "count": "10"
      }
    ]



    
const api= 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2018-01-01&end=2018-12-31';

function fetchData(){
  fetch(api)
  .then(res=>res.json())
  .then(data=>{
    console.log(data)
    var parsedData = parseData(data);
    drawChart(parsedData);
  })
}

function parseData(da){
  var data=[];
  for(var i in da.bpi){
    data.push({
      date:new Date(i),
      value:+da.bpi[i]
    })
  }
  console.log(data)
  return data;
}



function drawChart(data){
  console.log(data)
  var svgWidth = 600, svgHeight = 400;
  var margin = { top: 20, right: 20, bottom: 30, left: 50 };
  var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;

  var svg = d3.select("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);
  
  var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleTime()
    .rangeRound([0, width]);

  var y = d3.scaleLinear()
    .rangeRound([height, 0]);
  
  var line = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.value); })
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain(d3.extent(data, function(d) { return d.value; }));

  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .select(".domain")
    .remove();

  g.append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Price ($)");
  
  g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line);
}