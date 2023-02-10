import define1 from "./7a9e12f9fb3d8e06@459.js";
import define2 from "./a33468b95d0b15b0@808.js";

function _1(md){return(
md`# Table 6 - D3 Visualizations`
)}

function _2(md){return(
md`### Google Doc link:
https://docs.google.com/document/d/1_ZIO4pQtSosJjzlg7lPf0nLL7SeKNSCyzvZtjsCvhts/edit

### Dataset 
Download the .csv file from this Google Drive link

https://drive.google.com/file/d/1Wl5EkJOUrZGluVk_wjn1itU-sNQuS7LF/view?usp=share_link`
)}

function _3(md){return(
md`Note: To run the Observable notebook, download the .csv file from the Google Drive link and upload it to the notebook.`
)}

function _4(md){return(
md`### Data Preprocessing`
)}

function _5(htl){return(
htl.html`<h3 style= "white-space: nowrap">Click Choose File and select the Trending Youtube Videos Dataset from your local system </h3>`
)}

function _csvfile(Inputs){return(
Inputs.file({label: "Upload the .csv file", accept: ".csv", required: true})
)}

function _data(csvfile){return(
csvfile.csv({typed: true})
)}

function _8(md){return(
md`# Design 1`
)}

function _9(htl){return(
htl.html`<html>
  <head>
  </head>
  <body height: 650px; border: 2px solid black; background-color: #F8F5F0; justify-content: center;>
    <div class="col-md-4 align-self-center"; style="height: 100%; width:45%; />
    <div class="col-md-5" style="padding-top: 100px; font-size: 27px; text-align: justify" >
      <p style="font-size: 25px; font-weight: bolder; text-align: left;white-space: nowrap"> Net Popularity Index vs Sentiment Scores </p>
      <ul style="list-style: square; margin-left: 20px; margin-top: 40px;">
        <li style="white-space: nowrap">Below is the visualisation where we map the derived data "Net Popularity Index" against the calculated sentiment scores.<br> The purpose of this visualisation is to find the correlation between sentiment analysis results and the general viewing trend of people.</li>
        <li style="white-space: nowrap">Hovering over the below graph gives the exact values of the particular score and their comparison.</li>
        
      <li align="justify">Net Popularity Index is calculated as follows:<be>
        <ol>
      <li style="white-space: nowrap"> The net popularity of a specific video will be the subtraction of <i>"Number of Likes" </i>  and  <i>"Number of Dislikes" </i> </i></li>
       <li style="white-space: nowrap">The net popularity index of a specific video will be the division of <i>"Net Popularity" </i>  and  <i>"Number of Views" </i> </i></li>
      <li style="white-space: nowrap">Further more the values are normalised on a scale of 0 to 1 to make it comparable to the sentiment score</li>
      </ol>
      </li>

        <li style="white-space: nowrap">Important inference like the following ones can be concluded from this visualization:
        <ol>
        <li style="white-space: nowrap">The general trend between sentiment score and Net Popularity index appears to be linear, as expected. 
        <li style="white-space: nowrap">More positive the sentiment, more the net popularity index of the category.
        <li style="white-space: nowrap">The News and Politics section which appears to have the least sentiment score, appears to be the least favorite among the viewers, <br>this can be interpreted as Politics videos dividing the viewers as number of Likes and Dislikes are almost equal.
        <li style="white-space: nowrap">Comedy appears to be the most popular and liked category of the lot. This conclusion is expected as well, because who doesn't like laughing?
          <li style="white-space: nowrap">Science & Technology, and Travel videos which are generally positive in sentiment aren't as popular as expected.
          <li style="white-space: nowrap">If the video uploaded did not trend within 10 days of publishing, the chances of trending are slim to none.
          <li style="white-space: nowrap">The number of Education videos uploaded on weekends is very less compared to weekdays.
        <li style="white-space: nowrap">People & Blog videos are evenly spread out during the week.</li>
      </ol>
      </li>
      </ul>
    </div>
  </body>
</html>`
)}

function _chartClustered(d3,DOM,width,height,titleText,titleSize,dataNew,x0,groupKey,keys,x1,y,margin,color,tooltipSize,xAxis,yAxis,legend)
{
  const svg = d3.select(DOM.svg(width, height));
  
  svg.append('text')
     .attr('class', 'title')
     .text(titleText)
     .attr('y', 15)
      .attr('x', width/3)
     .attr('font-size', titleSize);

  var bars = svg.append("g")
    .selectAll("g")
    .data(dataNew.dat);
  
  bars
    .join("g")
      .attr("transform", d => `translate(${x0(d[groupKey])},0)`)
    .selectAll("rect")
    .data(d => keys.map(key => ({key, value: d[key]})))
    .join("rect")
      .attr("x", d => x1(d.key))
      .attr("y", d => d.value ? y(d.value) : margin.top)
      .attr("width", x1.bandwidth())
      .attr("height", d => d.value ? y(0) - y(d.value) : height - margin.bottom - margin.top)
      .attr("fill", d => d.value ? color(d.key) : 'transparent')
    .on("mouseenter", function(d) {
        svg.append("text").attr("class", "tool")
          .attr("x", x0(d.path[1].__data__[groupKey]) + x1(d.path[0].__data__.key))
          // .attr("y", y(d.path[0].__data__.value)-25)
          .attr("y", margin.top - 50)
          .style("display", null)
          // .style("fill", color(d.path[0].__data__.key))
    .style("fill", 'black')
          .text("Catergory: " + d.path[0].__data__.key.charAt(0).toUpperCase() + d.path[0].__data__.key.slice(1))
          .attr('font-size', tooltipSize)
        svg.append("text").attr("class", "tool1")
          .attr("x", x0(d.path[1].__data__[groupKey]) + x1(d.path[0].__data__.key))
          // .attr("y", y(d.path[0].__data__.value)-10)
          .attr("y", margin.top - 35)
          .style("display", null)
          // .style("fill", color(d.path[0].__data__.key))
    .style("fill", 'black')
          .text("Score: " + Number(d.path[0].__data__.value).toFixed(2))
          .attr('font-size', tooltipSize)
      })					
      .on("mouseout", function(d) {		
        svg.selectAll("text.tool").style("display", "none")
        svg.selectAll("text.tool1").style("display", "none")
      });

  svg.append("g")
  .attr("class", "x-axis")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  svg.append("g")
      .call(legend);
  
  svg.node().scrollBy(5, 0);

  return svg.node();
}


function _11(md){return(
md`# Design 2`
)}

function _12(md){return(
md`## PIE CHART 1: Categories`
)}

function _13(htl){return(
htl.html`<html>
  <head>
  </head>
  <body height: 650px; border: 2px solid black; background-color: #F8F5F0; justify-content: center;>
    <div class="col-md-4 align-self-center"; style="height: 100%; width:45%; />
    <div class="col-md-5" style="padding-top: 100px; font-size: 27px; text-align: justify" >
      <p style="font-size: 25px; font-weight: bolder; text-align: left;white-space: nowrap"> Category wise feature visualization </p>
      <ul style="list-style: square; margin-left: 20px; margin-top: 40px;">
        <li style="white-space: nowrap">In the below dashboard, the pie chart denotes the video distribution by different categories.</li>
        <li style="white-space: nowrap">If you hover on the pie chart, you can see the category and number of videos below change in real time.</li>
      <li style="white-space: nowrap">Clicking on a category shows the different properties specific to that category in the following three charts.
        <br>1. The number of Likes vs Dislikes over the period of time. 
        <br>2. Number of videos released on each day of the week. 
        <br>3. No of days taken for the videos to trend. </li>
        <li style="white-space: nowrap">Important inference like the following ones can be concluded from this visualization:
        <br>1. Most of the music videos are published on Fridays and most of them trend in 2-3 days utilizing the weekend.
        <br>2. Most of the News & Politics videos are published on Mondays indicating the start of a working week.
        <br>3. Novermber of 2020 indicates the most number of disliked for political videos in general, indicating the possible divide <br> because of the Presidential Elections.
          <br>4. November and December has seen the most number of video uploads from Comedy, indicating the overall sentiment <br> taking into the account the holiday season.
          <br>5. If the video uploaded did not trend in 10 days of publishing, the chances of trending are slim to none.
          <br>6. The number of Education videos uploaded on weekend is very less compared to weekdays.
        <br>6. People & Blog videos are evenly spread out during the week.</li>
      </ul>
    </div>
  </body>
</html>
`
)}

function _14(textPieChart1,textPieChart2){return(
textPieChart1 + textPieChart2
)}

function _pie1(d3_v5,width,radius,pieData,arc,colorSeq,onMouseOver,onMouseOut,$0,labelHeight)
{
  const svg = d3_v5
    .create('svg')
    .attr('width', width)
    .attr('height', 400);
  const chart = svg
    .append('g')
    .attr('transform', `translate(${radius},${radius})`);

  const text = svg
    .append('text')
    .attr("id", 'toptext')
    .attr("x", width - 450)
    .attr("y", 550)
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("font-family", "sans-serif")
    //.text(textPieChart1 + textPieChart2);

  chart
    .selectAll(null)
    .data(pieData)
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', d => colorSeq(d.index))
    .attr('stroke', 'grey')
    .style('stroke-width', '1px')
    .on('mouseover', onMouseOver)
    .on('mouseout', onMouseOut)
  .on('click', (event , r) => {
      $0.value = event.data.key;
    //mutable desiredCategory = hoverCategory;
    });

  const legend = svg
    .append('g')
    .attr('transform', `translate(${radius * 2 + 20},0)`);

  legend
    .selectAll(null)
    .data(pieData)
    .enter()
    .append('rect')
    .attr('y', d => labelHeight * d.index * 1)
    .attr('width', labelHeight)
    .attr('height', labelHeight)
    .attr('fill', d => colorSeq(d.index))
    .attr('stroke', 'grey')
    .style('stroke-width', '1px');

  legend
    .selectAll(null)
    .data(pieData)
    .enter()
    .append('text')
    .text(d => d.data.key)
    .attr('x', labelHeight * 1.1)
    .attr('y', d => labelHeight * d.index * 1 + labelHeight)
    .style('font-family', 'sans-serif')
    .style('font-size', `${10}px`);
    // .style('font-size', `${labelHeight}px`);

  return svg.node();
}


function _16(md){return(
md`## BAR CHART 1: Likes vs Dislikes for different categories`
)}

function _chart1(d3_v5,DOM,width,height,titleText_D2,titleSize,dataDesign2,x0_D2,groupKey_D2,keys_D2,x1_D2,y_D2,margin,color_D2,xAxis_D2,yAxis_D2,legend_D2)
{
  const svg = d3_v5.select(DOM.svg(width, height ));
  
  svg.append('text')
     .attr('class', 'title')
     .text(titleText_D2)
     .attr('y', 15)
      .attr('x', width/3)
     .attr('font-size', titleSize);

  var bars = svg.append("g")
    .selectAll("g")
    .data(dataDesign2.dat);
  
  bars
    .join("g")
      .attr("transform", d => `translate(${x0_D2(d[groupKey_D2])},0)`)
    .selectAll("rect")
    .data(d => keys_D2.map(key => ({key, value: d[key]})))
    .join("rect")
      .attr("x", d => x1_D2(d.key))
      .attr("y", d => d.value ? y_D2(d.value) : margin.top)
      .attr("width", x1_D2.bandwidth())
      .attr("height", d => d.value ? y_D2(0) - y_D2(d.value) : height - margin.bottom - margin.top)
      .attr("fill", d => d.value ? color_D2(d.key) : 'transparent')
    // .on("mouseenter", function(d) {
    //     svg.append("text").attr("class", "tool")
    //       .attr("x", x0(d.path[1].__data__[groupKey]) + x1(d.path[0].__data__.key))
    //       // .attr("y", y(d.path[0].__data__.value)-25)
    //       .attr("y", margin.top - 50)
    //       .style("display", null)
    //       // .style("fill", color(d.path[0].__data__.key))
    // .style("fill", 'black')
    //       .text("Catergory: " + d.path[0].__data__.key.charAt(0).toUpperCase() + d.path[0].__data__.key.slice(1))
    //       .attr('font-size', tooltipSize)
    //     svg.append("text").attr("class", "tool1")
    //       .attr("x", x0(d.path[1].__data__[groupKey]) + x1(d.path[0].__data__.key))
    //       // .attr("y", y(d.path[0].__data__.value)-10)
    //       .attr("y", margin.top - 35)
    //       .style("display", null)
    //       // .style("fill", color(d.path[0].__data__.key))
    // .style("fill", 'black')
    //       .text("Score: " + Number(d.path[0].__data__.value).toFixed(2))
    //       .attr('font-size', tooltipSize)
    //   })					
    //   .on("mouseout", function(d) {		
    //     svg.selectAll("text.tool").style("display", "none")
    //     svg.selectAll("text.tool1").style("display", "none")
    //   });

  svg.append("g")
  .attr("class", "x-axis")
      .call(xAxis_D2);

  svg.append("g")
      .call(yAxis_D2);

  svg.append("g")
      .call(legend_D2);
  
  svg.node().scrollBy(5, 0);

  return svg.node();
}


function _18(md){return(
md`#### *Note that YouTube disabled the dislike count from December 2021`
)}

function _19(md){return(
md`## BAR CHART 2: No of Videos vs Publishing date`
)}

function _chart3(BarChart,dataBarChart2,desiredCategory){return(
BarChart(dataBarChart2, {
  x: d => d.day,
  y: d => d.no_of_videos,
  xDomain: dataBarChart2.day, // sort by descending frequency
  yLabel: "↑ No of Videos vs Publishing Data for category: " + desiredCategory,
  width: 500,
  height: 500,
  color: "#3288bd"
})
)}

function _21(md){return(
md`## BAR CHART 3: No of Days to Trend Specific to Category`
)}

function _chart4(BarChart,dataBarChart3,dataBarChart2,desiredCategory){return(
BarChart(dataBarChart3, {
  x: d => d.date_range_to_trend,
  y: d => d.no_of_videos,
  xDomain: dataBarChart2.date_range_to_trend, // sort by descending frequency
  yLabel: "↑ No of Days to Trend for category: " + desiredCategory,
  width: 500,
  height: 500,
  color: "rgb(108,99,255)"
})
)}

function _23(md){return(
md`# Design 3`
)}

function _24(htl){return(
htl.html`<html>
  <head>
  </head>
  <body height: 650px; border: 2px solid black; background-color: #F8F5F0; justify-content: center;>
    <div class="col-md-4 align-self-center"; style="height: 100%; width:45%; />
    <div class="col-md-5" style="padding-top: 100px; font-size: 27px; text-align: justify" >
      <p style="font-size: 25px; font-weight: bolder; text-align: left;white-space: nowrap">Sentiment Category Distribution for top-n categories based on popularity </p>
      <ul style="list-style: square; margin-left: 20px; margin-top: 40px;">
      <li style="white-space: nowrap">Clicking on a category shows the sentiment category distribution for it, based on popularity.</li>
      <li align="justify">Popularity is calculated as follows:<br>
          Popularity is set to <b>"TRUE" </b>  when the <i>number of views, count of likes</i> + <i> dislikes</i>, and <i> number of comments</i> of a category is             greater than the <b>median</b> <i>number of views,  count of likes</i> + <i> dislikes</i>, and <i>number of comments</i></li>
      <li style="white-space: nowrap"> First level is the category level, second level is sentiment category level, third level is the popularity                                             level (True/False).  
      <li>Click the center circle to revert to the previous visualization.</li>
      <li style="white-space: nowrap">We can answer the correlation between video popularity with the sentiment score with this visualization.</li>
       <li style="white-space: nowrap"> Also, this visualization gives us an overview of the distribution of sentiment categories for the top-n categories in the dataset.</li>
      </ul>
      <p class="mt-5">Hover your mouse over the pie chart to see more information.</p>
    </div>
  </body>
</html>
`
)}

function _25(html,filter){return(
html`You have chosen to view top <b>${filter}</b> categories. Please move the slider to change the number of categories. Ideally, choosing 5 is recommended`
)}

function _filter(html){return(
html`<input type="range" min=5 max=15 value=0 step=1>`
)}

function _custom_chart(d3,width,novelData,data)
{

  let svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", 1000)
    .style("border", "1px solid black");

  const g = svg
    .append("g")
    .attr("transform", `translate(${width/2},${1000/2})`);
  
  function partition(data_array) {
            const root = d3.hierarchy(data_array)
                           .sum(d => d.value)
                           .sort((a, b) => b.value - a.value);
            return d3.partition()
                     .size([2 * Math.PI, root.height + 1])
                     (root);
    }
    const tooltip = d3.select("body")
                    .append('div')
                    .attr('class', "tooltip")
                    .attr('id', 'NovelTooltip')
                    .style('position', 'absolute');
    const radius = width/8
    var categorycolor = d3.scaleOrdinal(d3.schemeCategory10);
    const color = { Positive:'#93C572', Negative:'#E97451', Neutral:'lightblue', TRUE:'orange', FALSE:'steelblue'}
    var arc = d3.arc()
          .startAngle(d => d.x0)
          .endAngle(d => d.x1)
          .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
          .padRadius(radius * 1.5)
          .innerRadius(d => d.y0 * radius)
          .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1))
    var root = partition(novelData(data));
    root.each(d => d.current = d);
    var path =  g.append("g")
         .selectAll("path")
         .data(root.descendants().slice(1))
         .join("path")
         .attr("fill", (d,i) => {
                if(d.depth === 1)
                    return 'white'
                else {
                    return color[d.data.name];
                }
            })
         .attr('stroke-width', '1px')
         .attr('stroke', function (d){
              if (d.depth === 1)
                return 'black';
            })
            .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.8 : 0.8) : 0)
            .attr("pointer-events", d => arcVisible(d.current) ? "auto" : "none")
            .attr("d", d => arc(d.current))
            .on('mouseover', function(event, d){
              d3.select(this)
                    .attr('stroke-width', '1px')
                    .attr('stroke', 'black')
            let value = 0;
            if(d.depth !== 3)
                  value = d.data.length;
            else
                  value = d.data.value
            tooltip
                    .style("opacity", 2)
                    .style("left", event.pageX + 20 + "px")
                    .style("top", event.pageY + "px")
                    .html(`
                     <div style="border: thin solid grey; border-radius: 5px; background: lightgrey; padding: 10px; width: 100px">
                         <h5>${d.data.name}<h3>
                         <h6> <span style="color:darkorange"><b>Value: </b>${value}</h6></span>
                     </div>`);
              })
            .on('mouseout', function(event, d){
              d3.select(this)
                    .attr('stroke-width', '1px')
                    .attr('stroke', function (d){
                        if (d.depth === 1)
                            return 'black';
                    })
             tooltip
                    .style("opacity", 0)
                    .style("left", 0)
                    .style("top", 0)
                    .html(``);
            });
            path.filter(d => d.children)
            .style("cursor", "pointer")
            .on("click", clicked);

        var label = g.append("g")
            .attr("pointer-events", "none")
            .attr("text-anchor", "middle")
            .style("user-select", "none")
            .selectAll("text")
            .data(root.descendants().slice(1))
            .join("text")
            .attr("dy", "0.35em")
            .attr("fill-opacity", d => + labelVisible(d.current))
            .attr("transform", d => labelTransform(d.current))
            .text(function (d) {
                if(d.data.name === 'TRUE')
                    return 'TRUE';
                else if (d.data.name === 'FALSE')
                    return 'FALSE';
                else
                    return d.data.name;
            });
  
        var parent = g.append("circle")
            .datum(root)
            .attr("r", radius)
            .attr("fill", "#dbd5c9")
            .attr("pointer-events", "all")
            .on("click", clicked);

            function clicked(event, p) {
              parent.datum(p.parent || root);

              root.each(d => d.target = {
                x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
                x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
                y0: Math.max(0, d.y0 - p.depth),
                y1: Math.max(0, d.y1 - p.depth)
              });
              
              const t = g.transition().duration(750);

              path.transition(t)
                .tween("data", d => {
                    const i = d3.interpolate(d.current, d.target);
                    return t => d.current = i(t);
                })
                .filter(function(d) {
                    return + this.getAttribute("fill-opacity") || arcVisible(d.target);
                })
              .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.9 : 0.8) : 0)
              .attr("pointer-events", d => arcVisible(d.target) ? "auto" : "none")
              .attrTween("d", d => () => arc(d.current));

              label.filter(function(d) {
                return + this.getAttribute("fill-opacity") || labelVisible(d.target);
              }).transition(t)
              .attr("fill-opacity", d => +labelVisible(d.target))
              .attrTween("transform", d => () => labelTransform(d.current));
            }

            function arcVisible(d) {
              return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
            }

            function labelVisible(d) {
              return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
            }
  
            function labelTransform(d) {
              const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
              const y = (d.y0 + d.y1) / 2 * radius;
              return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
            }




  



  return svg.node();
}


function _28(md){return(
md`# Design 4`
)}

function _29(htl){return(
htl.html`<html>
  <head>
  </head>
  <body height: 750px; border: 2px solid black; background-color: #F8F5F0; justify-content: center;>
    <div class="col-md-4 align-self-center"; style="height: 100%; width:45%; />
    <div class="col-md-5" style="padding-top: 100px; font-size: 27px; text-align: justify" >
      <p style="font-size: 25px; font-weight: bolder; text-align: left;white-space: nowrap">Average Sentiment Scores Trend (per day)</p>
      <ul style="list-style: square; margin-left: 20px; margin-top: 40px;">
      <li style="white-space: nowrap">The chart displays the sentiment scores across all categories for each day mapped to a scale that might help understand  <br>the variations througout the period for which the data has been collected.</li> 
      <li style="white-space: nowrap">The visualization attempts to answer our domain question - "Is negative sentiment increasing over time, or are there <br> noticeable patterns  on how a video trends with respect to the sentiment for a given year?" </li> 
<!--       <li style="white-space: nowrap">For example, we see that negative sentiment is more prevalent in the months of January, and February, in comparison, and December </br> seems to be leaning more towards positive sentiment for 2020 and 2021.</li> -->
        <li style="white-space: nowrap">Except for few months such as January and February 2022, April, June, and July 2021, the general sentiment of the trending <br> videos are generally positive.</li> 
        <li style="white-space: nowrap">Unusual spike in negative sentiment in the aforementioned months can be explained by Capitol Hill incident (January 2022), <br>COVID pandemic peak (Delta phase of COVID from April 2021 - June 2021).</li>
      <li style="white-space: nowrap">The original design was to link the calendar chart to a multi-series line chart showing the sentiment score trend for each category. </br>A brushable interaction was planned to achieve this visualization (yet to be completed).</li>
      </ul>
      <p class="mt-5">Hover your mouse over the calendar chart to see more information: date along with the corresponding average sentiment score</p>
    </div>
  </body>
</html>`
)}

function _key(Legend,chart){return(
Legend(chart.scales.color, {title: "Sentiment Scores", marginLeft: 40})
)}

function _chart(Calendar,data,width){return(
Calendar(data, {
  x: d => d.trending_date,
  y: d => d.Sentiment_Scores,
  width
})
)}

function _32(md){return(
md`#### Design 1 - Code`
)}

function _data_title(data){return(
data.filter(i=>i.view_count != 0).map(i => {const viewdata = {
    categories: i.category,
    net_popularity_per_view: (i.likes - i.dislikes)/i.view_count,
    sentiment_scores:i["Sentiment_Scores"]
  }
  
  return viewdata})
)}

function _columnsToSum(data_title){return(
Object.keys(data_title[0]).slice(1)
)}

function _columnsToSum2(data_view){return(
Object.keys(data_view[0]).slice(5)
)}

function _view_sentiment_array(d3,data_title,columnsToSum){return(
Array.from((d3.rollup(data_title,
                  v => Object.fromEntries(columnsToSum.map(col => [col, d3.mean(v, d => d[col])])),
                  d => d.categories)), ([categories, counts]) => {
  const result={}
  result.category = categories;
  result.net_popularity_per_view = (counts.net_popularity_per_view - 0.012014798319959788) / 0.06709932458
  result.sentiment_scores = counts.sentiment_scores
  return result;
}).sort((a, b) => d3.ascending(a.category, b.category))
)}

function _data_view(data){return(
data.map(i => {const viewdata = {
    video:i.video_id,
    category:i.category,
    published_week:String(i.publishedAt).split(" ")[0],
    published_month:String(i.publishedAt).split(" ")[1]+"-"+String(i.publishedAt).split(" ")[3],
    views:i.view_count,
    likes:i.likes,
    dislikes:i.dislikes
    
  }
  
  return viewdata})
)}

function _month_year_array(d3,data_view,columnsToSum2){return(
Array.from((d3.rollup(data_view,
                  v => Object.fromEntries(columnsToSum2.map(col => [col, d3.sum(v, d => d[col])])),
                  d => d.category,d => d.published_month)), ([categories, counts]) => {
  const result={}
  result.category = categories;
    result.week= Array.from(counts, ([month_year, metrics]) => ({ month_year, likes:metrics.likes, dislikes:metrics.dislikes}));
  // result.week = Array.from(counts.values());
  // result.week.day= Array.from(counts.keys());
  return result;
}).sort((a, b) => d3.ascending(a.category, b.category))
)}

function _week_array(d3,data_view){return(
Array.from((d3.rollup(data_view,
                  v => v.length,
                  d => d.category,d => d.published_week)), ([categories, counts]) => {
  const result={}
  result.category = categories;
    result.week= Array.from(counts, ([day, no_of_videos]) => ({ day, no_of_videos})).sort((a, b) => d3.ascending(a.day, b.day));
  // result.week = Array.from(counts.values());
  // result.week.day= Array.from(counts.keys());
  return result;
}).sort((a, b) => d3.ascending(a.category, b.category))
)}

function _days_to_trend(data){return(
(data.filter(i=>(i.days_to_trend>=0 && i.days_to_trend<=1)).map(i=> ({date_range:"0-1",video_id:i.video_id,category:i.category}))).concat(data.filter(i=>(i.days_to_trend>=2 && i.days_to_trend<=3)).map(i=> ({date_range:"2-3",video_id:i.video_id,category:i.category}))).concat(data.filter(i=>(i.days_to_trend>=4 && i.days_to_trend<=5)).map(i=> ({date_range:"4-5",video_id:i.video_id,category:i.category}))).concat(data.filter(i=>(i.days_to_trend>=6 && i.days_to_trend<=7)).map(i=> ({date_range:"6-7",video_id:i.video_id,category:i.category}))).concat(data.filter(i=>(i.days_to_trend>=8 && i.days_to_trend<=9)).map(i=> ({date_range:"8-9",video_id:i.video_id,category:i.category}))).concat(data.filter(i=>(i.days_to_trend>=10 && i.days_to_trend<=11)).map(i=> ({date_range:"10-11",video_id:i.video_id,category:i.category}))).concat(data.filter(i=>(i.days_to_trend>=12)).map(i=> ({date_range:">=12",video_id:i.video_id,category:i.category})))
)}

function _days_to_trend_array(d3,days_to_trend){return(
Array.from((d3.rollup(days_to_trend,
                  v => v.length,
                  d => d.category,d => d.date_range)), ([categories, counts]) => {
  const result={}
  result.category = categories;
    result.week= Array.from(counts, ([date_range_to_trend, no_of_videos]) => ({ date_range_to_trend, no_of_videos}));
  // result.week = Array.from(counts.values());
  // result.week.day= Array.from(counts.keys());
  return result;
}).sort((a, b) => d3.ascending(a.category, b.category))
)}

function _BarChart(d3){return(
function BarChart(data, {
  x = (d, i) => i, // given d in data, returns the (ordinal) x-value
  y = d => d, // given d in data, returns the (quantitative) y-value
  title, // given d in data, returns the title text
  marginTop = 20, // the top margin, in pixels
  marginRight = 0, // the right margin, in pixels
  marginBottom = 30, // the bottom margin, in pixels
  marginLeft = 40, // the left margin, in pixels
  width = 640, // the outer width of the chart, in pixels
  height = 400, // the outer height of the chart, in pixels
  xDomain, // an array of (ordinal) x-values
  xRange = [marginLeft, width - marginRight], // [left, right]
  yType = d3.scaleLinear, // y-scale type
  yDomain, // [ymin, ymax]
  yRange = [height - marginBottom, marginTop], // [bottom, top]
  xPadding = 0.1, // amount of x-range to reserve to separate bars
  yFormat, // a format specifier string for the y-axis
  yLabel, // a label for the y-axis
  color = "currentColor" // bar fill color
} = {}) {
  // Compute values.
  const X = d3.map(data, x);
  const Y = d3.map(data, y);

  // Compute default domains, and unique the x-domain.
  if (xDomain === undefined) xDomain = X;
  if (yDomain === undefined) yDomain = [0, d3.max(Y)];
  xDomain = new d3.InternSet(xDomain);

  // Omit any data not present in the x-domain.
  const I = d3.range(X.length).filter(i => xDomain.has(X[i]));

  // Construct scales, axes, and formats.
  const xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);
  const yScale = yType(yDomain, yRange);
  const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
  const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);

  // Compute titles.
  if (title === undefined) {
    const formatValue = yScale.tickFormat(100, yFormat);
    title = i => `${X[i]}\n${formatValue(Y[i])}`;
  } else {
    const O = d3.map(data, d => d);
    const T = title;
    title = i => T(O[i], i, data);
  }

  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(yAxis)
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1))
      .call(g => g.append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(yLabel));

  const bar = svg.append("g")
      .attr("fill", color)
    .selectAll("rect")
    .data(I)
    .join("rect")
      .attr("x", i => xScale(X[i]))
      .attr("y", i => yScale(Y[i]))
      .attr("height", i => yScale(0) - yScale(Y[i]))
      .attr("width", xScale.bandwidth());

  if (title) bar.append("title")
      .text(title);

  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(xAxis);

  return svg.node();
}
)}

function _zoom(margin,width,height,d3,x0,data,groupKey,keys,x1,xAxis){return(
function zoom(svg) {
  const extent = [[margin.left, margin.top], [width - margin.right, height - margin.top]];

  svg.call(d3.zoom()
      .scaleExtent([1, 8])
      .translateExtent(extent)
      .extent(extent)
      .on("zoom", zoomed));

  function zoomed(event) {
    x0.range([margin.left, width - margin.right].map(d => event.transform.applyX(d)));
    svg.selectAll("rect").data(data.dat)
      .attr("x", d => x0(d[groupKey])).attr("width", x0.bandwidth())
    // .attr("transform", d => `translate(${x0(d[groupKey])},0)`)
    .data(d => keys.map(key => ({key, value: d[key]}))).selectAll("rect")
    .attr("x", d => x1(d.key)).attr("width", x1.bandwidth());
    svg.selectAll(".x-axis").call(xAxis);
  }
}
)}

function _wrap(d3){return(
(text) => {
        const width=50
        text.each(function() {
          var text = d3.select(this),
              words = text.text().split(/\s+/).reverse(),
              word,
              line = [],
              lineNumber = 0,
              lineHeight = 1.1, // ems
              y = text.attr("y"),
              dy = parseFloat(text.attr("dy")),
              tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
          while (words.length >0) {
              word=words.pop()
            line.push(word);
            tspan.text(line.join(" "));
            // if (tspan.node().getComputedTextLength() > width) {
              line.pop();
              tspan.text(line.join(" "));
              line = [word];
              tspan = text.append("tspan").attr("x", 0).attr("y", y-10).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            // }
          }
        });
      }
)}

function _legend(width,legendDistanceFromRight,margin,legendTextSize,color){return(
svg => {
  const g = svg
      .attr("transform", `translate(${width-legendDistanceFromRight},${margin.top})`)
      .attr("text-anchor", "end")
      .attr("font-family", "sans-serif")
      .attr("font-size", legendTextSize)
    .selectAll("g")
    .data(color.domain().slice().reverse())
    .join("g")
      .attr("transform", (d, i) => `translate(0,${i * 20})`);

  g.append("rect")
      .attr("x", -19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", color);

  g.append("text")
      .attr("x", -24)
      .attr("y", 9.5)
      .attr("dy", "0.35em")
      .text(d => d);
}
)}

function _x0(d3,dataNew,groupKey,margin,width){return(
d3.scaleBand()
    .domain(dataNew.dat.map(d => d[groupKey]))
    .rangeRound([margin.left, width - margin.right])
    .paddingInner(0.15)
)}

function _x1(d3,keys,x0){return(
d3.scaleBand()
    .domain(keys)
    .rangeRound([0, x0.bandwidth()])
    .padding(0.05)
)}

function _y(d3,dataNew,keys,height,margin){return(
d3.scaleLinear()
    .domain([0, d3.max(dataNew.dat, d => d3.max(keys, key => d[key]))]).nice()
    .rangeRound([height - margin.bottom, margin.top])
)}

function _legendDistanceFromRight(){return(
20
)}

function _color(d3_v5,colorType,keys){return(
d3_v5.scaleOrdinal(d3_v5.quantize(colorType, keys.length))
)}

function _colorType(d3){return(
d3.interpolate("rgb(10, 100, 220)", "red")
)}

function _xAxis(height,margin,d3,x0,xAxisFontSize,wrap){return(
g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x0).tickSizeOuter(0))
    .attr("font-size", xAxisFontSize)
    .selectAll("text").call(wrap, x0.bandwidth())
    .call(g => g.select(".domain").remove())
)}

function _yAxis(margin,d3,y,dataNew){return(
g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null, "s"))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", -10)
          .attr("y", -20)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(dataNew.y))
)}

function _groupKey(dataNew){return(
dataNew.columns[0]
)}

function _margin(){return(
{top: 90, right: 120, bottom: 50, left: 40}
)}

function _xAxisFontSize(){return(
8
)}

function _titleSize(){return(
20
)}

function _legendTextSize(){return(
12
)}

function _tooltipSize(){return(
12
)}

function _titleText(){return(
"Net Popularity Index vs Sentiment Score"
)}

function _yAxisText(){return(
"Score"
)}

function _height(){return(
450
)}

function _keys(view_sentiment_array){return(
Object.keys(view_sentiment_array[0]).slice(1)
)}

function _d3(require){return(
require("d3@6")
)}

function _dataNew(view_sentiment_array,yAxisText){return(
{
    "dat": view_sentiment_array,
    "columns": ["category", "net_popularity_per_view", "sentiment_scores"],
    "y": yAxisText
  }
)}

function _69(md){return(
md`#### Design 2 - Code`
)}

function _color_D2(d3_v5,colorType_D2,keys_D2){return(
d3_v5.scaleOrdinal(d3_v5.quantize(colorType_D2, keys_D2.length))
)}

function _colorType_D2(d3){return(
d3.interpolate("rgb(148, 220, 121)", "red")
)}

function _x0_D2(d3,dataDesign2,groupKey_D2,margin,width){return(
d3.scaleBand()
    .domain(dataDesign2.dat.map(d => d[groupKey_D2]))
    .rangeRound([margin.left, width - margin.right])
    .paddingInner(0.15)
)}

function _x1_D2(d3,keys_D2,x0_D2){return(
d3.scaleBand()
    .domain(keys_D2)
    .rangeRound([0, x0_D2.bandwidth()])
    .padding(0.05)
)}

function _y_D2(d3,dataDesign2,keys_D2,height,margin){return(
d3.scaleLinear()
    .domain([0, d3.max(dataDesign2.dat, d => d3.max(keys_D2, key => d[key]))]).nice()
    .rangeRound([height - margin.bottom, margin.top])
)}

function _yAxis_D2(margin,d3,y_D2,dataDesign2){return(
g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y_D2).ticks(null, "s"))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", -10)
          .attr("y", -20)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(dataDesign2.y_D2))
)}

function _xAxis_D2(height,margin,d3,x0_D2,xAxisFontSize,wrap){return(
g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x0_D2).tickSizeOuter(0))
    .attr("font-size", xAxisFontSize)
    .selectAll("text").call(wrap, x0_D2.bandwidth())
    .call(g => g.select(".domain").remove())
)}

function _groupKey_D2(dataDesign2){return(
dataDesign2.columns[0]
)}

function _keys_D2(dataModified){return(
Object.keys(dataModified[0]).slice(1)
)}

function _yAxisText_D2(){return(
"Score"
)}

function _zoom_D2(margin,width,height,d3,x0_D2,data,groupKey_D2,keys_D2,x1_D2,xAxis_D2){return(
function zoom_D2(svg) {
  const extent = [[margin.left, margin.top], [width - margin.right, height - margin.top]];

  svg.call(d3.zoom()
      .scaleExtent([1, 8])
      .translateExtent(extent)
      .extent(extent)
      .on("zoom", zoomed));

  function zoomed(event) {
    x0_D2.range([margin.left, width - margin.right].map(d => event.transform.applyX(d)));
    svg.selectAll("rect").data(data.dat)
      .attr("x", d => x0_D2(d[groupKey_D2])).attr("width", x0_D2.bandwidth())
    // .attr("transform", d => `translate(${x0(d[groupKey])},0)`)
    .data(d => keys_D2.map(key => ({key, value: d[key]}))).selectAll("rect")
    .attr("x", d => x1_D2(d.key)).attr("width", x1_D2.bandwidth());
    svg.selectAll(".x-axis").call(xAxis_D2);
  }
}
)}

function _viewsTotalByCategory(d3,data){return(
d3.rollup(
  data,
  v => v.length, //Aggregate by the sum of amount
  d => d.category, // group first by name
)
)}

function _r1(viewsTotalByCategory){return(
Array.from(viewsTotalByCategory, ([categories, counts]) => {
  
 
  // result.week = Array.from(counts.values());
  // result.week.day= Array.from(counts.keys());
  return categories;
})
)}

function _r2(viewsTotalByCategory){return(
Array.from(viewsTotalByCategory, ([categories, counts]) => {
  
 
  // result.week = Array.from(counts.values());
  // result.week.day= Array.from(counts.keys());
  return counts;
})
)}

function _viewCountByCategories(r1,r2)
{const result = {};
for (let index = 0; index < r1.length; ++index) {
    result[r1[index]] = r2[index];
}
 return result
}


function _desiredCategory(){return(
"Music"
)}

function _arc(d3,radius){return(
d3
  .arc()
  .innerRadius(0)
  .outerRadius(radius)
)}

function _colorSeq(d3_v5,pieData){return(
d3_v5
  .scaleSequential()
  .domain([0, pieData.length])
  .interpolator(d3_v5.interpolateRainbow)
)}

function _pieData(pie,d3_v5,viewCountByCategories){return(
pie(d3_v5.entries(viewCountByCategories))
)}

function _d3_v5(require){return(
require("d3@5")
)}

function _d4(require){return(
require("d3@6")
)}

function _pie(d3){return(
d3.pie().value(d => d.value)
)}

function _labelHeight(){return(
18
)}

function _radius(){return(
150
)}

function _dataDesign2(dataModified,yAxisText){return(
{
    "dat": dataModified,
    "columns": ["month_year", "likes", "dislikes"],
    "y": yAxisText
  }
)}

function _map1()
{const map = {
   'Mon': 2,'Tue': 3,'Wed': 4,'Thu': 5,'Fri': 6,'Sat': 7,
   'Sun': 1
};
     return map}


function _dataBarChart4(week_array,desiredCategory){return(
(week_array.filter(i=>i.category == desiredCategory).map(i=>i.week))[0]
)}

function _97(desiredCategory){return(
desiredCategory
)}

function _dataBarChart2(dataBarChart4,map1){return(
dataBarChart4.sort((a, b) => {
   return map1[a.day] - map1[b.day];
})
)}

function _dataBarChart3(days_to_trend_array,desiredCategory){return(
(days_to_trend_array.filter(i=>i.category == desiredCategory).map(i=>i.week))[0]
)}

function _hoverCategory(){return(
"Gaming"
)}

function _textPieChart1(hoverCategory){return(
"Category:" + hoverCategory
)}

function _textPieChart2(viewCountByCategories,hoverCategory){return(
"; No of Videos: " + viewCountByCategories[hoverCategory]
)}

function _colorTemp(){return(
""
)}

function _onMouseOut(d3_v5){return(
function(d, i) {
  d3_v5.select(this).attr('style', 'fill: colorTemp')
  d3_v5.select(this).style("cursor", "default");
}
)}

function _onMouseOver($0,colorSeq,d3,$1,d3_v5){return(
function(d, i) {
  $0.value = colorSeq(d.index);
  d3.select(this).attr('style', 'fill: pink;');
  $1.value = d.data.key  
  d3_v5.select(this).style("cursor", "pointer");
  // d3.select("#toptext").text(`Category: ${i.category}`);
  // d3.select("#toptext").text(`No Of Videos: ${viewCountByCategories[hoverCategory]}`);
}
)}

function _legend_D2(width,legendDistanceFromRight,margin,legendTextSize,color_D2){return(
svg => {
  const g = svg
      .attr("transform", `translate(${width-legendDistanceFromRight},${margin.top})`)
      .attr("text-anchor", "end")
      .attr("font-family", "sans-serif")
      .attr("font-size", legendTextSize)
    .selectAll("g")
    .data(color_D2.domain().slice().reverse())
    .join("g")
      .attr("transform", (d, i) => `translate(0,${i * 20})`);

  g.append("rect")
      .attr("x", -19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", color_D2);

  g.append("text")
      .attr("x", -24)
      .attr("y", 9.5)
      .attr("dy", "0.35em")
      .text(d => d);
}
)}

function _titleText_D2(desiredCategory){return(
"Likes vs Dislikes over a period of Time for Category: " + desiredCategory
)}

function _110(width){return(
width
)}

function _dataModified(month_year_array,desiredCategory){return(
(month_year_array.filter(i=>i.category == desiredCategory).map(i=>i.week))[0]
)}

function _112(md){return(
md`#### Design 3 - Code`
)}

function _novelData(d3,filter){return(
function novelData(filterData){
    let dataset = {}
    let mf = []
    let finalData = []

    let Categorygroup = Array.from(d3.group(filterData, d=>d.category));
    let l1=0;
    Categorygroup.forEach(function(d) {
        d.forEach(k => {
            dataset[d[0]]= Array.from(d3.group(k, k=>k.Sentiment_Category));
        })
    let name = d[0];
    finalData.push(
            {
                children: [],
                name: name,
                length:0
            }
        )
    let objIndex = 0;
      dataset[d[0]].forEach(k => {
        mf= Array.from(d3.rollup(k[1], k=>k.length, k=>k.popularity));
        objIndex = finalData.findIndex((obj => obj.name === name));
        if(k[0] !== 'none') {
          finalData[objIndex].children.push(
            {
              children: [],
              length: k[1].length,
              name: k[0]
            }
          )
          l1 += k[1].length
          mf.forEach(dx => {
            let objIndex2 = finalData[objIndex].children.findIndex((obj => obj.name === k[0]));
            finalData[objIndex].children[objIndex2].children.push(
              {
                name: dx[0],
                value: dx[1]
              }
            )
          })
        }
      })
      finalData[objIndex].length = l1;
      l1 = 0;
    })
  let sliceData = finalData.sort((a,b) => {return b.length - a.length}).slice(0,filter)

  let data = {
    name: 'data',
    children: sliceData
  }
  return data;
}
)}

function _114(md){return(
md`#### Design 4 - Code`
)}

function _Calendar(d3){return(
function Calendar(data, {
  x = ([x]) => x, // given d in data, returns the (temporal) x-value
  y = ([, y]) => y, // given d in data, returns the (quantitative) y-value
  title, // given d in data, returns the title text
  width = 928, // width of the chart, in pixels
  cellSize = 17, // width and height of an individual day, in pixels
  weekday = "monday", // either: weekday, sunday, or monday
  formatDay = i => "SMTWTFS"[i], // given a day number in [0, 6], the day-of-week label
  formatMonth = "%b", // format specifier string for months (above the chart)
  yFormat, // format specifier string for values (in the title)
  colors = d3.interpolatePiYG
} = {}) {
  // Compute values.
  const X = d3.map(data, x);
  const Y = d3.map(data, y);
  const I = d3.range(X.length);

  const countDay = weekday === "sunday" ? i => i : i => (i + 6) % 7;
  const timeWeek = weekday === "sunday" ? d3.utcSunday : d3.utcMonday;
  const weekDays = weekday === "weekday" ? 5 : 7;
  const height = cellSize * (weekDays + 2);

  // Compute a color scale. This assumes a diverging color scheme where the pivot
  // is zero, and we want symmetric difference around zero.
  const max = d3.quantile(Y, 0.9975, Math.abs);
  const color = d3.scaleSequential([-max, +max], colors).unknown("none");

  // Construct formats.
  formatMonth = d3.utcFormat(formatMonth);

  // Compute titles.
  if (title === undefined) {
    const formatDate = d3.utcFormat("%B %-d, %Y");
    const formatValue = color.tickFormat(100, yFormat);
    title = i => `${formatDate(X[i])}\n${formatValue(Y[i])}`;
  } else if (title !== null) {
    const T = d3.map(data, title);
    title = i => T[i];
  }

  // Group the index by year, in reverse input order. (Assuming that the input is
  // chronological, this will show years in reverse chronological order.)
  const years = d3.groups(I, i => X[i].getUTCFullYear()).reverse();

  function pathMonth(t) {
    const d = Math.max(0, Math.min(weekDays, countDay(t.getUTCDay())));
    const w = timeWeek.count(d3.utcYear(t), t);
    return `${d === 0 ? `M${w * cellSize},0`
        : d === weekDays ? `M${(w + 1) * cellSize},0`
        : `M${(w + 1) * cellSize},0V${d * cellSize}H${w * cellSize}`}V${weekDays * cellSize}`;
  }

  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height * years.length)
      .attr("viewBox", [0, 0, width, height * years.length])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10);

  const year = svg.selectAll("g")
    .data(years)
    .join("g")
      .attr("transform", (d, i) => `translate(40.5,${height * i + cellSize * 1.5})`);

  year.append("text")
      .attr("x", -5)
      .attr("y", -5)
      .attr("font-weight", "bold")
      .attr("text-anchor", "end")
      .text(([key]) => key);

  year.append("g")
      .attr("text-anchor", "end")
    .selectAll("text")
    .data(weekday === "weekday" ? d3.range(1, 6) : d3.range(7))
    .join("text")
      .attr("x", -5)
      .attr("y", i => (countDay(i) + 0.5) * cellSize)
      .attr("dy", "0.31em")
      .text(formatDay);

  const cell = year.append("g")
    .selectAll("rect")
    .data(weekday === "weekday"
        ? ([, I]) => I.filter(i => ![0, 6].includes(X[i].getUTCDay()))
        : ([, I]) => I)
    .join("rect")
      .attr("width", cellSize - 1)
      .attr("height", cellSize - 1)
      .attr("x", i => timeWeek.count(d3.utcYear(X[i]), X[i]) * cellSize + 0.5)
      .attr("y", i => countDay(X[i].getUTCDay()) * cellSize + 0.5)
      .attr("fill", i => color(Y[i]));

  if (title) cell.append("title")
      .text(title);

  const month = year.append("g")
    .selectAll("g")
    .data(([, I]) => d3.utcMonths(d3.utcMonth(X[I[0]]), X[I[I.length - 1]]))
    .join("g");

  month.filter((d, i) => i).append("path")
      .attr("fill", "none")
      .attr("stroke", "#fff")
      .attr("stroke-width", 3)
      .attr("d", pathMonth);

  month.append("text")
      .attr("x", d => timeWeek.count(d3.utcYear(d), timeWeek.ceil(d)) * cellSize + 2)
      .attr("y", -5)
      .text(formatMonth);

  return Object.assign(svg.node(), {scales: {color}});
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["htl"], _5);
  main.variable(observer("viewof csvfile")).define("viewof csvfile", ["Inputs"], _csvfile);
  main.variable(observer("csvfile")).define("csvfile", ["Generators", "viewof csvfile"], (G, _) => G.input(_));
  main.variable(observer("data")).define("data", ["csvfile"], _data);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["htl"], _9);
  main.variable(observer("chartClustered")).define("chartClustered", ["d3","DOM","width","height","titleText","titleSize","dataNew","x0","groupKey","keys","x1","y","margin","color","tooltipSize","xAxis","yAxis","legend"], _chartClustered);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["htl"], _13);
  main.variable(observer()).define(["textPieChart1","textPieChart2"], _14);
  main.variable(observer("pie1")).define("pie1", ["d3_v5","width","radius","pieData","arc","colorSeq","onMouseOver","onMouseOut","mutable desiredCategory","labelHeight"], _pie1);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("chart1")).define("chart1", ["d3_v5","DOM","width","height","titleText_D2","titleSize","dataDesign2","x0_D2","groupKey_D2","keys_D2","x1_D2","y_D2","margin","color_D2","xAxis_D2","yAxis_D2","legend_D2"], _chart1);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("chart3")).define("chart3", ["BarChart","dataBarChart2","desiredCategory"], _chart3);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("chart4")).define("chart4", ["BarChart","dataBarChart3","dataBarChart2","desiredCategory"], _chart4);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer()).define(["htl"], _24);
  main.variable(observer()).define(["html","filter"], _25);
  main.variable(observer("viewof filter")).define("viewof filter", ["html"], _filter);
  main.variable(observer("filter")).define("filter", ["Generators", "viewof filter"], (G, _) => G.input(_));
  main.variable(observer("custom_chart")).define("custom_chart", ["d3","width","novelData","data"], _custom_chart);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["htl"], _29);
  main.variable(observer("key")).define("key", ["Legend","chart"], _key);
  main.variable(observer("chart")).define("chart", ["Calendar","data","width"], _chart);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer("data_title")).define("data_title", ["data"], _data_title);
  main.variable(observer("columnsToSum")).define("columnsToSum", ["data_title"], _columnsToSum);
  main.variable(observer("columnsToSum2")).define("columnsToSum2", ["data_view"], _columnsToSum2);
  main.variable(observer("view_sentiment_array")).define("view_sentiment_array", ["d3","data_title","columnsToSum"], _view_sentiment_array);
  main.variable(observer("data_view")).define("data_view", ["data"], _data_view);
  main.variable(observer("month_year_array")).define("month_year_array", ["d3","data_view","columnsToSum2"], _month_year_array);
  main.variable(observer("week_array")).define("week_array", ["d3","data_view"], _week_array);
  main.variable(observer("days_to_trend")).define("days_to_trend", ["data"], _days_to_trend);
  main.variable(observer("days_to_trend_array")).define("days_to_trend_array", ["d3","days_to_trend"], _days_to_trend_array);
  const child1 = runtime.module(define1);
  main.import("howto", child1);
  main.import("altplot", child1);
  const child2 = runtime.module(define1);
  main.import("howto", child2);
  main.import("altplot", child2);
  main.variable(observer("BarChart")).define("BarChart", ["d3"], _BarChart);
  main.variable(observer("zoom")).define("zoom", ["margin","width","height","d3","x0","data","groupKey","keys","x1","xAxis"], _zoom);
  main.variable(observer("wrap")).define("wrap", ["d3"], _wrap);
  main.variable(observer("legend")).define("legend", ["width","legendDistanceFromRight","margin","legendTextSize","color"], _legend);
  main.variable(observer("x0")).define("x0", ["d3","dataNew","groupKey","margin","width"], _x0);
  main.variable(observer("x1")).define("x1", ["d3","keys","x0"], _x1);
  main.variable(observer("y")).define("y", ["d3","dataNew","keys","height","margin"], _y);
  main.variable(observer("legendDistanceFromRight")).define("legendDistanceFromRight", _legendDistanceFromRight);
  main.variable(observer("color")).define("color", ["d3_v5","colorType","keys"], _color);
  main.variable(observer("colorType")).define("colorType", ["d3"], _colorType);
  main.variable(observer("xAxis")).define("xAxis", ["height","margin","d3","x0","xAxisFontSize","wrap"], _xAxis);
  main.variable(observer("yAxis")).define("yAxis", ["margin","d3","y","dataNew"], _yAxis);
  main.variable(observer("groupKey")).define("groupKey", ["dataNew"], _groupKey);
  main.variable(observer("margin")).define("margin", _margin);
  main.variable(observer("xAxisFontSize")).define("xAxisFontSize", _xAxisFontSize);
  main.variable(observer("titleSize")).define("titleSize", _titleSize);
  main.variable(observer("legendTextSize")).define("legendTextSize", _legendTextSize);
  main.variable(observer("tooltipSize")).define("tooltipSize", _tooltipSize);
  main.variable(observer("titleText")).define("titleText", _titleText);
  main.variable(observer("yAxisText")).define("yAxisText", _yAxisText);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("keys")).define("keys", ["view_sentiment_array"], _keys);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("dataNew")).define("dataNew", ["view_sentiment_array","yAxisText"], _dataNew);
  main.variable(observer()).define(["md"], _69);
  main.variable(observer("color_D2")).define("color_D2", ["d3_v5","colorType_D2","keys_D2"], _color_D2);
  main.variable(observer("colorType_D2")).define("colorType_D2", ["d3"], _colorType_D2);
  main.variable(observer("x0_D2")).define("x0_D2", ["d3","dataDesign2","groupKey_D2","margin","width"], _x0_D2);
  main.variable(observer("x1_D2")).define("x1_D2", ["d3","keys_D2","x0_D2"], _x1_D2);
  main.variable(observer("y_D2")).define("y_D2", ["d3","dataDesign2","keys_D2","height","margin"], _y_D2);
  main.variable(observer("yAxis_D2")).define("yAxis_D2", ["margin","d3","y_D2","dataDesign2"], _yAxis_D2);
  main.variable(observer("xAxis_D2")).define("xAxis_D2", ["height","margin","d3","x0_D2","xAxisFontSize","wrap"], _xAxis_D2);
  main.variable(observer("groupKey_D2")).define("groupKey_D2", ["dataDesign2"], _groupKey_D2);
  main.variable(observer("keys_D2")).define("keys_D2", ["dataModified"], _keys_D2);
  main.variable(observer("yAxisText_D2")).define("yAxisText_D2", _yAxisText_D2);
  main.variable(observer("zoom_D2")).define("zoom_D2", ["margin","width","height","d3","x0_D2","data","groupKey_D2","keys_D2","x1_D2","xAxis_D2"], _zoom_D2);
  main.variable(observer("viewsTotalByCategory")).define("viewsTotalByCategory", ["d3","data"], _viewsTotalByCategory);
  main.variable(observer("r1")).define("r1", ["viewsTotalByCategory"], _r1);
  main.variable(observer("r2")).define("r2", ["viewsTotalByCategory"], _r2);
  main.variable(observer("viewCountByCategories")).define("viewCountByCategories", ["r1","r2"], _viewCountByCategories);
  main.define("initial desiredCategory", _desiredCategory);
  main.variable(observer("mutable desiredCategory")).define("mutable desiredCategory", ["Mutable", "initial desiredCategory"], (M, _) => new M(_));
  main.variable(observer("desiredCategory")).define("desiredCategory", ["mutable desiredCategory"], _ => _.generator);
  main.variable(observer("arc")).define("arc", ["d3","radius"], _arc);
  main.variable(observer("colorSeq")).define("colorSeq", ["d3_v5","pieData"], _colorSeq);
  main.variable(observer("pieData")).define("pieData", ["pie","d3_v5","viewCountByCategories"], _pieData);
  main.variable(observer("d3_v5")).define("d3_v5", ["require"], _d3_v5);
  main.variable(observer("d4")).define("d4", ["require"], _d4);
  main.variable(observer("pie")).define("pie", ["d3"], _pie);
  main.variable(observer("labelHeight")).define("labelHeight", _labelHeight);
  main.variable(observer("radius")).define("radius", _radius);
  main.variable(observer("dataDesign2")).define("dataDesign2", ["dataModified","yAxisText"], _dataDesign2);
  main.variable(observer("map1")).define("map1", _map1);
  main.variable(observer("dataBarChart4")).define("dataBarChart4", ["week_array","desiredCategory"], _dataBarChart4);
  main.variable(observer()).define(["desiredCategory"], _97);
  main.variable(observer("dataBarChart2")).define("dataBarChart2", ["dataBarChart4","map1"], _dataBarChart2);
  const child3 = runtime.module(define1);
  main.import("howto", child3);
  main.import("altplot", child3);
  const child4 = runtime.module(define2);
  main.import("Legend", child4);
  main.import("Swatches", child4);
  main.variable(observer("dataBarChart3")).define("dataBarChart3", ["days_to_trend_array","desiredCategory"], _dataBarChart3);
  main.define("initial hoverCategory", _hoverCategory);
  main.variable(observer("mutable hoverCategory")).define("mutable hoverCategory", ["Mutable", "initial hoverCategory"], (M, _) => new M(_));
  main.variable(observer("hoverCategory")).define("hoverCategory", ["mutable hoverCategory"], _ => _.generator);
  main.variable(observer("textPieChart1")).define("textPieChart1", ["hoverCategory"], _textPieChart1);
  main.variable(observer("textPieChart2")).define("textPieChart2", ["viewCountByCategories","hoverCategory"], _textPieChart2);
  main.define("initial colorTemp", _colorTemp);
  main.variable(observer("mutable colorTemp")).define("mutable colorTemp", ["Mutable", "initial colorTemp"], (M, _) => new M(_));
  main.variable(observer("colorTemp")).define("colorTemp", ["mutable colorTemp"], _ => _.generator);
  main.variable(observer("onMouseOut")).define("onMouseOut", ["d3_v5"], _onMouseOut);
  main.variable(observer("onMouseOver")).define("onMouseOver", ["mutable colorTemp","colorSeq","d3","mutable hoverCategory","d3_v5"], _onMouseOver);
  main.variable(observer("legend_D2")).define("legend_D2", ["width","legendDistanceFromRight","margin","legendTextSize","color_D2"], _legend_D2);
  main.variable(observer("titleText_D2")).define("titleText_D2", ["desiredCategory"], _titleText_D2);
  main.variable(observer()).define(["width"], _110);
  main.variable(observer("dataModified")).define("dataModified", ["month_year_array","desiredCategory"], _dataModified);
  main.variable(observer()).define(["md"], _112);
  main.variable(observer("novelData")).define("novelData", ["d3","filter"], _novelData);
  main.variable(observer()).define(["md"], _114);
  main.variable(observer("Calendar")).define("Calendar", ["d3"], _Calendar);
  const child5 = runtime.module(define2);
  main.import("Legend1", child5);
  return main;
}
