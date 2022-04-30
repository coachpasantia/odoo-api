const fetchData= async (option,query)=>{
    const response = await fetch(`/api/v1/${option}?${query}`);
    const data = await response.json();
    console.log(data.body);
    return data;
}

async function btnCustomer(){
    const result = await fetchData("producto","option=1");
    drawBar("#grafica",result.body);
   // pieChart(dat)
   drawPie("#pie",result.body)
   drawBarMultiple("#barm",result.body)
   //fetchData();
}




function drawPie(selector,data){
  console.log('click')
  var svgWidth=500,svgHeight=300,radius=Math.min(svgWidth,svgHeight)/2;
  var svg=d3.select(selector)
    .attr("width",svgWidth)
    .attr("height",svgHeight);

  var g=svg.append("g")
    .attr("transform","translate("+radius+","+radius+")");

  var color=d3.scaleOrdinal(d3.schemeCategory10);

  var pie=d3.pie().value(function(d){return parseInt(d.count);});

  var path = d3.arc()
    .outerRadius(radius)
    .innerRadius(0);

  var arc = g.selectAll("arc")
    .data(pie(data))
    .enter()
    .append("g")
    .on("mouseover",function(d){
      d3.select(this).attr("stroke","purple")
      d3.select(this).attr("stroke-width","2px");
    })
    .on("mouseout",function(d){
      d3.select(this).attr("stroke","none");
    });

  arc.append("path")
    .attr("d",path)
    .attr("fill",function(d){return color(parseInt(d.data.count));});

  var label = d3.arc()
  .outerRadius(radius)
  .innerRadius(0);

  

  arc.append("text")
    .attr("transform",function(d){return "translate("+label.centroid(d)+")";})
    .text(function(d){return parseInt(d.data.count);})
    .attr("text-anchor","middle")
    .attr("font-size","20px")
    .attr("fill","white");
}



    //let result = await fetchData("cliente","option=proxcatg"
function drawBar(selector,data){
    const width = 900;
    const height = 450;
    const margin = { top: 30, bottom: 30, left: 10, right: 10 };

    const svg = d3.select(selector)
    .append('svg')
    .attr('width', width - margin.left - margin.right)
    .attr('height', height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);

    const x = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1)


    const y = d3.scaleLinear()
    .domain([0, 60])
    .range([height - margin.bottom, margin.top])


    svg
    .append("g")
    .attr("fill", 'royalblue')
    .selectAll("rect")
    .data(data.sort((a, b) => d3.descending(parseInt(a.count),parseInt(b.count))))
    .join("rect")
        .attr("x", (d, i) => x(i))
        .attr("y", d => y(parseInt(d.count)))
        .attr('title', (d) => parseInt(d.count))
        .attr("class", "rect")
        .attr("height", d => y(0) - y(parseInt(d.count)))
        .attr("width", x.bandwidth())
        .on("mouseover", function(d) {
            d3.select(this).style("fill", "green");
            d3.select(this).text(d.count);    
        })
        .on("mouseout", function(d) {
            d3.select(this).style("fill", "royalblue");
        });

    svg.selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text(function(d) { return d.count; })
    .attr("x", function(d, i) {
        return x(i) + x.bandwidth() / 2;
    })
    .attr("y", function(d) {
        return y(parseInt(d.count)) - 10;
    })
    .attr("text-anchor", "middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "black");

    function yAxis(g) {
    g.attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y).ticks(null, data.format))
        .attr("font-size", '12px')
    }

    function xAxis(g) {
    g.attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat(i => data[i].name))
        .attr("font-size", '12px')
    }

    svg.append('text')
    .attr('x', width/4 )
    .attr('y', 40)
    .attr('text-anchor', 'middle')
    .text('Cantidad de productos x categoria')

    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);
    svg.node();
}


function drawBarMultiple(selector,data){
  var width = 300 
     scaleFactor = 20, 
     barHeight = 30;
  
  var graph = d3.select(selector)
     .append("svg")
     .attr("width", width)
     .attr("height", barHeight * data.length);
  
  var bar = graph.selectAll("g")
     .data(data)
     .enter()
     .append("g")
     .attr("transform", function(d, i) {
        return "translate(0," + i * barHeight + ")";
     })
     .attr("fill", "royalblue");
  bar.append("rect").attr("width", function(d) {
     return parseInt(d.count) * scaleFactor;
  })
  
  .attr("height", barHeight - 1);
  
  bar.append("text")
     .attr("x", function(d) { return (parseInt(d.count)*scaleFactor); })
     .attr("y", barHeight / 2)
     .attr("dy", ".35em")
     .text(function(d) { return d.count; })
     .attr("text-anchor", "end")
     .attr("font-family", "sans-serif")
     .attr("font-size", "11px")
     .attr("fill", "white");
}