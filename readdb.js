var fs = require("fs");
var csv = require("csv");

var headers = [
  "id",
  "name",
  "type",
  "description",
  "prerequisites",
  "prerequisite_feats",
  "benefit",
  "normal",
  "special",
  "source",
  "fulltext",
  "teamwork",
  "critical",
  "grit",
  "style",
  "performance",
  "racial",
  "companion_familiar",
  "race_name",
  "note",
  "goal",
  "completion_benefit",
  "multiples",
  "suggested_traits",
]

var isHeader = null;

csv()
  .from.path("./db/feats.csv")
  .to.stream(fs.createWriteStream("./feats.json"))
  .transform(function (row) {
    var hash = {};
    for (var i = 0; i < headers.length; i++) {
      var header = headers[i];
      hash[header] = row.shift();
    }
    if (isHeader) {
      return JSON.stringify(hash);
    } else {
      isHeader = row;
      return null;
    }
  })
  .on("record", function (row, index) {
    console.log("On " + index);
  })
