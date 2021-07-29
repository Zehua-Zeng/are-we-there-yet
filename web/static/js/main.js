// global vars
var all_papers;
var paper_names;
var filters;
var original_lists = {};
var current_lists = {};
var checked_encodings = [];

//pre-defined global vars
var task_map = {
  "retrieve-value": "task1",
  filter: "task1",
  "compute-derived-value": "task1",
  "find-extremum": "task1",
  sort: "task1",
  "determine-range": "task1",
  "characterize-distribution": "task1",
  "find-anomalies": "task1",
  cluster: "task1",
  correlate: "task1",
  "compare-derived-values": "task2",
  "detect-presence": "task2",
  "estimate-trend": "task2",
  "estimate-difference": "task2",
  locate: "task2",
  recognize: "task2",
  "explore-adjacency": "task2",
  "judge-similarity": "task3",
  "compare-chart-structure": "task3",
  overall: "task3",
  "find-maximum": "task1",
  "find-minimum": "task1",
  "compare-objects": "task1",
  "detect-number-of-clusters": "task1",
  "detect-correlation": "task1",
  "estimate-correlation": "task1",
};

var all_encodings = [
  "01PX",
  "02PY",
  "03L",
  "04Ar",
  "05CH",
  "06CS",
  "07An",
  "08O",
  "09T",
  "10S",
  "11D",
  "12V",
];

var encoding_map = {
  PX: "01PX",
  PY: "02PY",
  L: "03L",
  Ar: "04Ar",
  CH: "05CH",
  CS: "06CS",
  An: "07An",
  O: "08O",
  T: "09T",
  S: "10S",
  D: "11D",
  V: "12V",
};

var text_width = {
  PX: 22,
  PY: 22,
  L: 12,
  Ar: 21,
  CH: 24,
  CS: 23,
  An: 20,
  O: 13,
  T: 10,
  S: 12,
  D: 13,
  V: 12,
};

// display

init();

// initialize
function init() {
  // get data from the server
  $.get("/processed_data", function (data) {
    var server_data = JSON.parse(data);
    console.log(server_data);
    all_papers = server_data["papers"];
    console.log(all_papers);
    paper_names = Object.keys(all_papers);
    console.log(paper_names);
    filters = server_data["filter"];
    console.log(filters);
    // original lists
    for (const [key, value] of Object.entries(filters)) {
      original_lists[key] = Object.keys(filters[key]);
    }
    console.log(original_lists);
    // current lists
    for (const [key, value] of Object.entries(filters)) {
      if (key != "design") {
        current_lists[key] = Object.keys(filters[key]);
      } else {
        current_lists[key] = [];
      }
    }

    document.getElementById("paper-summary").innerHTML = "";
    for (const [key, value] of Object.entries(all_papers)) {
      paper_summary_view(key, value);
    }

    document.getElementById("num-of-papers").innerHTML =
      Object.keys(all_papers).length.toString();

    covered_designs(paper_names);
  });

  document.getElementById("paper-detail").innerHTML =
    "<p>&nbsp; &nbsp; Please select a paper to check its detail information.</p>";

  // initial encoding designs filter
  document.getElementById("encoding-matrix").innerHTML = "";
  var matrix_str = `<p style="margin-top:10px; margin-left:10px; margin-bottom: 0">`;
  for (var encoding of all_encodings) {
    matrix_str += `<span style="margin-right:${
      34 - text_width[encoding.substring(2)]
    }px"><b>${encoding.substring(2)}</b></span>`;
  }
  matrix_str += `</p>`;
  for (var i = 0; i < 3; i++) {
    matrix_str += `<div class="form-inline my-2 my-lg-0">`;
    for (var encoding of all_encodings) {
      matrix_str += `<div class="squaredThree">
      <input
        type="checkbox"
        name="encodeOptions"
        id="${i.toString()}-${encoding}"
        value="${encoding}"
      />
      <label
        for="${i.toString()}-${encoding}"
        id="${i.toString()}-${encoding}-label"
        style="background-color: #f0ad4e"
        ;
      ></label>
    </div>`;
    }
    matrix_str += `</div>`;
  }

  document.getElementById("encoding-matrix").innerHTML = matrix_str;
  document.getElementById("design-selection").innerHTML = "";

  var encode_elms = document.getElementsByName("encodeOptions");
  for (var elm of encode_elms) {
    elm.addEventListener("click", click_on_encode);
  }

  // add listeners to filters
  var cat_elms = document.getElementsByName("catOptions");
  for (var elm of cat_elms) {
    elm.addEventListener("click", click_on_cat);
  }

  var task_elms = document.getElementsByName("taskOptions");
  for (var elm of task_elms) {
    elm.addEventListener("click", click_on_task);
  }

  var num_elms = document.getElementsByName("numOptions");
  for (var elm of num_elms) {
    elm.addEventListener("click", click_on_number);
  }

  // add listeners to butoons
  document
    .getElementById("select-all-tasks")
    .addEventListener("click", select_all_tasks);

  document
    .getElementById("clear-all-tasks")
    .addEventListener("click", clear_all_tasks);

  document
    .getElementById("submit-encoding-matrix")
    .addEventListener("click", submit_encoding_matrix);

  document
    .getElementById("clear-encoding-matrix")
    .addEventListener("click", clear_encoding_matrix);

  document
    .getElementById("clear-design-seclection")
    .addEventListener("click", clear_design_selection);
}

// helper functions

// listeners
function click_on_cat(e) {
  var box = e.target;
  if (box != null) {
    let clicked = box.value;
    if (box.checked) {
      if (!current_lists["category"].includes(clicked)) {
        current_lists["category"].push(clicked);
      }
    } else {
      if (current_lists["category"].includes(clicked)) {
        var idx = current_lists["category"].indexOf(clicked);
        current_lists["category"].splice(idx, 1);
      }
    }
  }
  console.log(current_lists);
  filter();
}

function click_on_task(e) {
  var box = e.target;
  if (box != null) {
    let clicked = box.value;
    if (box.checked) {
      if (!current_lists["task"].includes(clicked)) {
        current_lists["task"].push(clicked);
      }
    } else {
      if (current_lists["task"].includes(clicked)) {
        var idx = current_lists["task"].indexOf(clicked);
        current_lists["task"].splice(idx, 1);
      }
    }
  }
  console.log(current_lists);
  filter();
}

function click_on_number(e) {
  var box = e.target;
  if (box != null) {
    let clicked = box.value[0];
    if (box.checked) {
      if (!current_lists["num"].includes(clicked)) {
        current_lists["num"].push(clicked);
      }
    } else {
      if (current_lists["num"].includes(clicked)) {
        var idx = current_lists["num"].indexOf(clicked);
        current_lists["num"].splice(idx, 1);
      }
    }
  }
  console.log(current_lists);
  filter();
}

function click_on_encode(e) {
  var box = e.target;
  if (box != null) {
    if (box.checked) {
      if (!checked_encodings.includes(box.id)) {
        checked_encodings.push(box.id);
      }
      checkbox_disable(box.id);
    } else {
      if (checked_encodings.includes(box.id)) {
        var idx = checked_encodings.indexOf(box.id);
        checked_encodings.splice(idx, 1);
      }
      checkbox_enable(box.id);
    }
  }
}

// select all task button
function select_all_tasks() {
  var task_elms = document.getElementsByName("taskOptions");
  for (var elm of task_elms) {
    elm.checked = true;
  }
  current_lists["task"] = [];
  for (var elm of original_lists["task"]) {
    current_lists["task"].push(elm);
  }
  filter();
}

// clear all task button
function clear_all_tasks() {
  var task_elms = document.getElementsByName("taskOptions");
  for (var elm of task_elms) {
    elm.checked = false;
  }
  current_lists["task"] = [];
  filter();
}

function checkbox_enable(id) {
  console.log(id);
  var ids = ["0", "1", "2"];
  var head = id.substring(0, 1);
  // cannot enable the line already have encoding selected
  // cannot enable the encoding already selected
  var other_channels = [];
  for (var other_encode of checked_encodings) {
    var other_head = other_encode[0];
    if (ids.includes(other_head)) {
      var idx = ids.indexOf(other_head);
      ids.splice(idx, 1);
    }
    var other_channel = other_encode.substring(2);
    other_channels.push(other_channel);
  }
  console.log(ids, other_channels);
  var value = id.substring(2);
  for (var idd of ids) {
    if (idd != head) {
      document.getElementById(idd + "-" + value).disabled = false;
      document.getElementById(
        idd + "-" + value + "-label"
      ).style.backgroundColor = "#f0ad4e";
    } else {
      for (var encoding of all_encodings) {
        if (!other_channels.includes(encoding)) {
          document.getElementById(idd + "-" + encoding).disabled = false;
          document.getElementById(
            idd + "-" + encoding + "-label"
          ).style.backgroundColor = "#f0ad4e";
        }
      }
    }
  }
}

function checkbox_disable(id) {
  // console.log(id, value);
  var ids = ["0", "1", "2"];
  var head = id.substring(0, 1);
  var value = id.substring(2);
  for (var idd of ids) {
    if (idd != head) {
      document.getElementById(idd + "-" + value).disabled = true;
      document.getElementById(
        idd + "-" + value + "-label"
      ).style.backgroundColor = "grey";
    }
    if (idd == head) {
      for (var encoding of all_encodings) {
        if (encoding != value) {
          document.getElementById(idd + "-" + encoding).disabled = true;
          document.getElementById(
            idd + "-" + encoding + "-label"
          ).style.backgroundColor = "grey";
        }
      }
    }
  }
}

function clear_encoding_matrix() {
  console.log(checked_encodings);
  var saved_ids = [];
  for (var id of checked_encodings) {
    saved_ids.push(id);
  }
  checked_encodings = [];
  for (var id of saved_ids) {
    var box = document.getElementById(id);
    if (box.checked) {
      box.checked = false;
      checkbox_enable(id);
    }
  }
}

function submit_encoding_matrix() {
  console.log(current_lists);
  if (checked_encodings.length === 0) {
    alert("Please select encodings to build the combination.");
  } else {
    var pretty_encodings = [];
    var checked_lists = [];
    checked_encodings.sort();
    for (var encoding of checked_encodings) {
      pretty_encodings.push(encoding.substring(4));
      checked_lists.push(encoding.substring(2));
    }
    var pretty_str = pretty_encodings.join("+");
    var checked_str = checked_lists.join("+");
    if (!current_lists["design"].includes(checked_str)) {
      current_lists["design"].push(checked_str);
      document.getElementById("design-selection").innerHTML += `
      <div class="btn-group btn-group-toggle" data-toggle="buttons" id="${checked_str}-button">
        <button type="button" class="btn btn-sm btn-warning">${pretty_str}</button>
        <button type="button" class="btn btn-sm btn-warning"><i class="fa fa-times" id="${checked_str}" onclick="delete_encoding(id)"></i></button>
      </div>`;

      clear_encoding_matrix();
      filter();
    } else {
      clear_encoding_matrix();
      alert("This design has already been added.");
    }
  }
}

function delete_encoding(idd) {
  console.log(idd);
  console.log(current_lists);
  if (current_lists["design"].includes(idd)) {
    var idx = current_lists["design"].indexOf(idd);
    current_lists["design"].splice(idx, 1);
    filter();
  }
  console.log(current_lists);
  // refresh the encoding design
  document.getElementById(idd + "-button").remove();
}

function clear_design_selection() {
  current_lists["design"] = [];
  document.getElementById("design-selection").innerHTML = "";
  filter();
}

function covered_designs(paper_list) {
  console.log(paper_list);
  var designs = [];
  for (var paper of paper_list) {
    designs = designs.concat(all_papers[paper]["encoding_designs"]);
  }
  designs = [...new Set(designs)];
  console.log(designs);

  var final_str = "";
  for (var design of designs) {
    design_list = design.split("+");
    // console.log(design_list);
    if (design_list.length === 1) {
      var dess = design_list[0].substring(2);
      final_str += `
      <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="${dess}" id="${dess}" onclick="click_on_coverage(id)">
        <span class="dot dot-one"></span>
      </span>`;
    } else if (design_list.length === 2) {
      var dess_list = [];
      for (var des of design_list) {
        dess_list.push(des.substring(2));
      }
      var dess = dess_list.join("+");
      final_str += `
      <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="${dess}" id="${dess}" onclick="click_on_coverage(id)" >
        <span class="dot dot-two"></span>
      </span>`;
    } else {
      var dess_list = [];
      for (var des of design_list) {
        dess_list.push(des.substring(2));
      }
      var dess = dess_list.join("+");
      final_str += `
      <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="${dess}" id="${dess}" onclick="click_on_coverage(id)">
        <span class="dot dot-three"></span>
      </span>`;
    }
  }
  document.getElementById("covered-designs").innerHTML = final_str;
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
  document.getElementById("num-of-designs").innerHTML =
    designs.length.toString();
}

function click_on_coverage(id) {
  console.log(id);
  encoding_list = id.split("+");
}

// filter
function filter() {
  document.getElementById("paper-summary").innerHTML = "";
  current_paper_list = [];
  for (const [key, value] of Object.entries(current_lists)) {
    console.log(key, value);
    temp_paper_list = [];
    if (key == "design") {
      if (value.length === 0) {
        continue;
      } else {
        for (var encode of value) {
          temp_paper_list = temp_paper_list.concat(filters[key][encode]);
        }
      }
    } else if (value.length === 0) {
      document.getElementById("paper-summary").innerHTML =
        "<p>&nbsp; &nbsp; No papers match the current filter condition.</p>";
      current_paper_list = [];
      break;
    } else if (value.length == original_lists[key].length) {
      temp_paper_list = Object.keys(all_papers);
    } else {
      for (var group of value) {
        temp_paper_list = temp_paper_list.concat(filters[key][group]);
      }
    }
    temp_paper_list = [...new Set(temp_paper_list)];
    if (current_paper_list.length === 0) {
      current_paper_list = current_paper_list.concat(temp_paper_list);
    } else {
      current_paper_list = current_paper_list.filter((value) =>
        temp_paper_list.includes(value)
      );
    }
  }
  console.log(current_paper_list);
  for (var paper of current_paper_list) {
    paper_summary_view(paper, all_papers[paper]);
  }
  document.getElementById("num-of-papers").innerHTML =
    current_paper_list.length.toString();

  covered_designs(current_paper_list);
}

// sort objects by value
function sort_objects(obj) {
  return Object.entries(obj).sort((a, b) => b[1] - a[1]);
}

function display_design(design) {
  var final_str = "";
  var des = "";
  var mark = "";

  if (design.includes("#")) {
    des = design.split("#")[0];
    mark = design.split("#")[1];
  } else {
    des = design;
  }

  if (des.includes(";")) {
    split_design = des.split(";");
    for (let i = 0; i < split_design.length; i++) {
      final_str += display_attribute(split_design[i]);
      if (i != split_design.length - 1) {
        final_str += `<b> , </b>`;
      }
    }
  } else {
    final_str += display_attribute(des);
  }
  if (mark != "") {
    final_str += `<b> , </b>`;
    final_str += `<span class="badge badge-outline badge-mark">${mark}</span>`;
  }
  return final_str;
}

function display_attribute(attr) {
  var final_str = "";
  split_attr = attr.split(",");
  final_str += `<span class="badge badge-outline badge-data">${split_attr[0][1]}</span> `;
  if (split_attr[1].includes("=")) {
    split_encoding = split_attr[1].split("=");
    final_str += `<span class="badge badge-outline badge-encoding">${split_encoding[0].substring(
      2
    )}</span><span class="badge badge-outline badge-encoding">${split_encoding[1].substring(
      2
    )}</span>`;
  } else {
    final_str += `<span class="badge badge-outline badge-encoding">${split_attr[1].substring(
      2
    )}</span>`;
  }
  return final_str;
}

// paper detailed view
function paper_detailed_view(id) {
  document.getElementById("paper-detail").innerHTML = "";

  var paperID = id.split("-")[0];
  console.log(paperID);

  var paper = all_papers[paperID];

  var detail_view = `
    <div class="card detail-card" id="${paperID}-detail">
        <div class="card-body">
        <h5 class="card-title"><span class="badge ${paper.category}-bg">${
    paper.category
  }</span>&nbsp;${paper.title}</h5>
        <p class="card-text"><b>Tasks:</b>&nbsp; ${paper.tasks.join(", ")}</p>
        <p class="card-text"><b>Designs:</b></p>
    `;
  // show design
  for (const [key, value] of Object.entries(paper.designs)) {
    detail_view += `<p class="card-text tab">  <span class="badge badge-pill ${key[1]}-bg">${key}</span> &nbsp;`;
    if (value.includes("+")) {
      designs = value.split("+");
      for (let i = 0; i < designs.length; i++) {
        detail_view += display_design(designs[i]);
        if (i != designs.length - 1) {
          detail_view += `&nbsp;<i class="fa fa-plus"></i>&nbsp;`;
        }
      }
    } else {
      detail_view += display_design(value);
    }
    detail_view += `</p>`;
  }
  // show result
  // if (Object.keys(paper.results).length == 0) {
  //   detail_view += `<p class="card-text"><b>No Results</b></p>`;
  // } else {
  //   detail_view += `<p class="card-text"><b>Results:</b>&nbsp; </p>`;
  //   for (const [key, value] of Object.entries(paper.results)) {
  //     result_head = key.split("@");
  //     detail_view += `<p class="card-text tab">  <span class="badge ${result_head[0]}-bg">${result_head[0]}</span> <span class="badge ${result_head[1]}-bg">${result_head[1]}</span> `;
  //     if ($.isNumeric(result_head[2][result_head[2].length - 1])) {
  //       task = result_head[2].slice(0, -2);
  //       detail_view += `<span class="badge ${task_map[task]}-bg">${result_head[2]}</span> &nbsp;<i class="fa fa-arrow-right"></i> `;
  //     } else {
  //       detail_view += `<span class="badge ${task_map[result_head[2]]}-bg">${
  //         result_head[2]
  //       }</span> &nbsp;<i class="fa fa-arrow-right"></i> `;
  //     }

  //     for (const [design, rank] of sort_objects(value)) {
  //       detail_view += `<span class="badge badge-pill ${design[1]}-bg" style="opacity: ${rank}">${design}</span> `;
  //     }
  //     detail_view += `</p>`;
  //   }
  // }
  // detail_view += `</div>
  // </div>`;

  // show result - table
  if (Object.keys(paper.results).length == 0) {
    detail_view += `<p class="card-text"><b>No Results</b></p>`;
  } else {
    detail_view += `<p class="card-text"><b>Results:</b>&nbsp; </p>`;
    detail_view += `<table class="table table-sm table-hover table-striped">
    <thead>
    <tr>
      <th scope="col">Tasks</th>
      <th scope="col">Metrics</th>
      <th scope="col">Results</th>
    </tr>
  </thead><tbody>`;
    for (const [key, value] of Object.entries(paper.results)) {
      result_head = key.split("@");
      detail_view += `
      <tr>
        <td>${result_head[2]}</td>
        <td>${result_head[1]}</td>`;
      detail_view += `<td>`;
      for (const [design, rank] of sort_objects(value)) {
        detail_view += `<span class="badge badge-pill ${design[1]}-bg" style="opacity: ${rank}">${design}</span> `;
      }
      detail_view += `</td></tr>`;
    }
    detail_view += `</tbody></table>`;
  }

  document.getElementById("paper-detail").innerHTML = detail_view;
}

// paper summary view
function paper_summary_view(paperID, paper) {
  //   console.log(paperID, paper);
  document.getElementById("paper-summary").innerHTML += `
    <div class="card summary-card" id="${paperID}-summary" onClick="paper_detailed_view(this.id)">
        <div class="card-body">
        <h5 class="card-title"><span class="badge ${paper.category}-bg">${
    paper.category
  }</span>&nbsp;${paper.title}</h5>
        <p class="card-text"><b>Tasks:</b>&nbsp; ${paper.tasks.join(", ")}</p>
        </div>
    </div>
    `;
}
