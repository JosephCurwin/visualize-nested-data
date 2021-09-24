
import d3 from "./index";


// data change

// data 


// let root = d3.hierarchy(packageJson, function(d) {
//     if(typeof d == "object")
//      return Object.keys(d).filter(d=>d!="$name").map(k=>{
//        if(typeof d[k] == "object") d[k].$name = k;
//        else d[k] = k + " : " + d[k];
//        return d[k];
//      }); 
//   })

// layout function 

function dataTransformation(d) {
  if(typeof d == "object")
  return Object.keys(d).filter(d=>d!="$name").map(k=>{
    if(typeof d[k] == "object") d[k].$name = k;
    else d[k] = k + " : " + d[k];
    return d[k];
  }); 

}

function stackGraph(root, margin, width, height){

  // orthogonale

  const svg = d3.create("svg")

  svg
  .attr("width", width )
  .attr("height", height)

  const g = svg.append("g")

  g
  .attr('transform','translate('+ margin.left +','+ margin.right +')');

  // fill the graph
  // what are links 
  // layout function
  

    // **** layout function *****************

  const tree = d3.tree()
  .size([height-margin.top-margin.bottom,width-margin.left-margin.right]);

  // **** links *****************
  const link = g.selectAll(".link")
  .data(tree(root).links())
 .join("path")
  .attr("class", "link")
  .attr("d", d3.linkHorizontal()
  .x(function(d) { return d.y; })
  .y(function(d) { return d.x; }));


  // **** nodes *****************
  const node = g.selectAll(".node")
  .data(root.descendants())
  .join("g")
  .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
  .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })


  node.append("circle")
  .attr("r", 2.5);
  
node.append("text")
 .text(function(d) { return d.data.$name || d.data; })
 .attr('y',-10)
 .attr('x',-10)
 .attr('text-anchor','middle');


 return svg

}





//  *******************************************************************




// create hierarchiic graph



function graph(
  root,
  {
    // label = d => d.data.id,
    // highlight = () => false,
    marginLeft = 40,
  } = {}
) {
  // Research -- deconstructing  line 32

  // Research -- linkHorizontal  was macht das
  // WHY unklar
  const treeLink = d3
    .linkHorizontal()
    .x((d) => d.y)
    .y((d) => d.x);

  // geändert Treelayout
  root = treeLayout(root);

  let x0 = Infinity;
  let x1 = -x0;
  root.each((d) => {
    if (d.x > x1) x1 = d.x;
    if (d.x < x0) x0 = d.x;
  });

  const svg = d3
    .create("svg")
    .classed("graph", true)
    .attr("viewBox", [0, 0, 33, x1 - x0 + dx * 2])
    .style("overflow", "visible");

  const g = svg
    .append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("transform", `translate(${marginLeft},${dx - x0})`);

  const link = g
    .append("g")
    .attr("fill", "none")
    .attr("stroke", "#555")
    .attr("stroke-opacity", 0.4)
    .attr("stroke-width", 1.5)
    .selectAll("path")
    .data(root.links())
    .join("path")

    // .attr("stroke", d => highlight(d.source) && highlight(d.target) ? "red" : null)
    // .attr("stroke-opacity", d => highlight(d.source) && highlight(d.target) ? 1 : null)

    .attr("d", treeLink);

  const node = g
    .append("g")
    .attr("stroke-linejoin", "round")
    .attr("stroke-width", 3)
    .selectAll("g")
    .data(root.descendants())
    .join("g")
    .attr("transform", (d) => `translate(${d.y},${d.x})`);

  // node.append("circle")
  //     .attr("fill", d => highlight(d) ? "red" : d.children ? "#555" : "#999")
  //     .attr("r", 2.5);

  // node.append("text")
  //     .attr("fill", d => highlight(d) ? "red" : null)
  //     .attr("dy", "0.31em")
  //     .attr("x", d => d.children ? -6 : 6)
  //     .attr("text-anchor", d => d.children ? "end" : "start")
  //     .text(label)
  //   .clone(true).lower()
  //     .attr("stroke", "white");

  //     d3.select(divRef).append(function(){return svg.node();});

  return svg.node();
}

export {dataTransformation, graph}

