// from data.js
var tableData = data;

// YOUR CODE HERE!

//  code that appends a table to your web page and then adds new rows of data for each UFO sighting.
// d3 to select table body
var tbody = d3.select("tbody");

var newEntry= [{
  datetime: "2/25/2020",
  city: "boston",
  state: "ma",
  country: "us",
  shape: "imperfect circle",
  durationMinutes: "24 hours",
  comments: "Witness said it looked like a floating rock"
}];


// input new entry into table
var newTable = tableData.concat(newEntry);

// test print 
// console.log(tableData.length);
// console.log(newEntry.length);
// console.log(newTable.length);

// loop through data and display table table records
newTable.forEach((UFOsighting) => {
  var row = tbody.append("tr");
  Object.entries(UFOsighting).forEach(([key, value]) => {
    var cell = row.append("td");
    cell.text(value);
  });
});

// listen for events and search through the date/time column to find rows that match user input.

// clear table
function deleteTbody() {
  d3.select("tbody")
    .selectAll("tr").remove()
    .selectAll("td").remove();
};

// work on filter button
var button = d3.select("#filter-btn");

button.on("click", function(event) {
  d3.event.preventDefault();
  deleteTbody();
  var dateInput = d3.select("#datetime").property("value");
  if (dateInput.trim() === "" ) {
    var filteredData = tableData;
  } else { 
    var filteredData = tableData.filter(ufoSighting => 
      ufoSighting.datetime === dateInput.trim());
  };

   // error message if date isn't in dataset
   if (filteredData.length == 0) {
    d3.select("tbody")
      .append("tr")
      .append("td")
        .attr("colspan", 7)
        .html("<h4>Invalid, no date found!</h4>");
  };

  console.log(filteredData);
  tableDisplay(filteredData);
});
