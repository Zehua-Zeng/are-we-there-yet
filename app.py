from flask import Flask, render_template, request, jsonify, send_from_directory, current_app
import os
import json
import pprint

## flask
app = Flask(__name__, static_folder='web/static',
            template_folder='web/templates')

# send static files from directory (data)
@app.route('/data/<path:filename>')
def send_data(filename):
    return send_from_directory('web/static/data', filename)

@app.route('/css/<path:filename>')
def send_css(filename):
    return send_from_directory('web/static/css', filename)

@app.route('/js/<path:filename>')
def send_js(filename):
    return send_from_directory('web/static/js', filename)

@app.route('/images/<path:filename>')
def send_img(filename):
    return send_from_directory('web/static/images', filename)

# routes
@app.route('/')
def index():
    return render_template("index.html")

# global variables
data_map = {
    "quantitative": "1Q",
    "nominal": "2N",
    "ordinal": "3O"
}

encoding_map = {
    "positionX": "01PX",
    "positionY": "02PY",
    "length": "03L",
    "area": "04Ar",
    "color-hue": "05CH",
    "color-saturation": "06CS",
    "angle": "07An",
    "orientation": "08O",
    "texture": "09T",
    "shape": "10S",
    "density": "11D",
    "volume": "12V"
}

all_tasks = [
  "retrieve-value",
  "filter",
  "compute-derived-value",
  "find-extremum",
  "sort",
  "determine-range",
  "characterize-distribution",
  "find-anomalies",
  "cluster",
  "correlate",
  "compare-derived-values",
  "detect-presence",
  "estimate-trend",
  "estimate-difference",
  "locate",
  "recognize",
  "explore-adjacency",
  "judge-similarity",
  "compare-chart-structure"
]

sub_tasks = {
    "find-maximum": "find-extremum",
    "find-minimum": "find-extremum",
    "compare-objects": "sort",
    "detect-number-of-clusters": "cluster",
    "detect-correlation": "correlate",
    "estimate-correlation": "correlate"
}

def process_data():
    ## data directory
    directory = './web/static/data/'

    processed = {}
    for file in os.listdir(directory):
        if file.endswith(".json"):
            read_json = open(os.path.join(directory, file), 'r')
            json_data = json.load(read_json)
            filename = file.split('.')[0]

            temp = {}
            temp["title"] = json_data["Title"]
            temp["category"] = json_data["Category"]
            temp["tasks"] = json_data["Tasks"]
            temp["designs"] = {}
            temp["results"] = {}
            temp["num_of_encodings"] = []
            temp["encoding_designs"] = []

            for design in json_data["Covered Designs"].keys():
                temp["designs"][design] = design_to_string(json_data["Covered Designs"][design]["layers"])

            for cat in ["Experiment", "Theory"]:
                for metric in json_data["Results"][cat].keys():
                    for task in json_data["Results"][cat][metric].keys():
                        temp["results"][cat+"@"+metric+"@"+task]= parse_result(json_data["Results"][cat][metric][task]["rank"], json_data["Results"][cat][metric][task]["significance"])
            
            for design in json_data["Covered Designs"].keys():
                temp["num_of_encodings"] += count_num_of_encodings(json_data["Covered Designs"][design]["layers"])
            
            temp["num_of_encodings"] = list(set(temp["num_of_encodings"]))
            
            for design in json_data["Covered Designs"].keys():
                temp["encoding_designs"] += get_encoding_designs(json_data["Covered Designs"][design]["layers"])
            
            temp["encoding_designs"] = list(set(temp["encoding_designs"]))
    
            processed[filename] = temp
    
    return processed

def filter_data():
    processed = process_data()
    
    filtered = {}
    # filter by cat:
    filtered["category"] = {}
    for cat in ["theory", "experiment", "hybrid"]:
        filtered["category"][cat] = []

    for paper in processed:
        if processed[paper]["category"] == "Theory":
            filtered["category"]["theory"].append(paper)
        elif processed[paper]["category"] == "Experiment":
            filtered["category"]["experiment"].append(paper)
        else:
            filtered["category"]["hybrid"].append(paper)
    
    # filter by task:
    filtered["task"] = {}
    for task in all_tasks:
        filtered["task"][task] = []
    for paper in processed:
        for task in processed[paper]["tasks"]:
            if task in filtered["task"]:
                filtered["task"][task].append(paper)
            elif task != "overall":
                filtered["task"][sub_tasks[task]].append(paper)
    
    # filter by num of encodings:
    filtered["num"] = {}
    for num in ["1", "2", "3"]:
        filtered["num"][num] = []
    
    for paper in processed:
        for num in processed[paper]["num_of_encodings"]:
            filtered["num"][num].append(paper)
    
    # filter by encoding design:
    filtered["design"] = {}
    for paper in processed:
        for design in processed[paper]["encoding_designs"]:
            if design in filtered["design"]:
                filtered["design"][design].append(paper)
            else:
                filtered["design"][design] = [paper]
    
    return filtered

## send data to front-end
@app.route('/processed_data')
def p2j_processed_data():
    processed_data = process_data()
    filtered_data = filter_data()
    return json.dumps({"papers": processed_data, "filter": filtered_data})
    
## helpers
def design_to_string(layers):

    lst_final = []
    
    for layer in layers:
        
        encodings = layer["encodings"]
        lst_encoding = []
        
        for encoding in encodings:
            str_channel = ""
            if len(encoding["channels"]) == 1:
                # lst_encoding.append(encoding_map[encoding["channels"][0]] + "," + data_map[encoding["attribute-type"]])
                str_channel = encoding_map[encoding["channels"][0]]
            else:
                lst_channel = []
                channels = encoding["channels"]
                for channel in channels:
                    lst_channel.append(encoding_map[channel])
                lst_channel.sort()
                str_channel = "=".join(lst_channel)
            
            if "-" in encoding["attribute-type"]:
                lst_encoding.append(data_map[encoding["attribute-type"].split("-")[0]] + "," + str_channel )
            else:
                lst_encoding.append(data_map[encoding["attribute-type"]] + "," + str_channel)
        
        lst_encoding.sort()
        str_encoding = ";".join(lst_encoding)

        # if len(layer["marks"]) == 1:
        #     lst_final.append(str_encoding + "#" + layer["marks"][0])
        # else:
        #     lst_final.append(str_encoding)

        lst_final.append(str_encoding + "#" + (" | ").join(layer["marks"]))
    
    return "+".join(lst_final)

def parse_result(rank, significance):
    final_rank = {}
    
    # second plan, significance, then rank
    for pair in significance:
        if pair[0] not in final_rank:
            final_rank[pair[0]] = 1.0
        
        if pair[1] not in final_rank:
            final_rank[pair[1]] = final_rank[pair[0]] * 0.8
        elif final_rank[pair[1]] > final_rank[pair[0]] * 0.8:
            final_rank[pair[1]] = final_rank[pair[0]] * 0.8
    
    prev_design = ""
    
    for design in rank:
        if isinstance(design, list):
            if prev_design == "":
                for des in design:
                    if des not in final_rank:
                        final_rank[des] = 1.0
            else:
                for des in design:
                    if des not in final_rank or final_rank[des] > final_rank[prev_design] - 0.05:
                        final_rank[des] = final_rank[prev_design] - 0.05
            
            prev_design = design[0]
        else:
            if prev_design == "":
                final_rank[design] = 1.0
            elif design not in final_rank or final_rank[design] > final_rank[prev_design] - 0.05:
                final_rank[design] = final_rank[prev_design] - 0.05
            prev_design = design
    
    # remove other designs
    final_rank_no_O = {}
    for k in final_rank:
        if not k.startswith('O'):
            final_rank_no_O[k] = final_rank[k]

    return final_rank_no_O

def count_num_of_encodings(layers):
    num_of_encodings = []
    for layer in layers:
        num_of_encodings.append(str(len(layer["encodings"])))

    return list(set(num_of_encodings))

def get_encoding_designs(layers):
    encoding_designs = []
    for layer in layers:
        
        temp_encoding = []
        encodings = layer["encodings"]
        
        for encoding in encodings:
            if len(encoding["channels"]) == 1:
                temp_encoding.append(encoding["channels"][0])
            else:
                temp_encoding.append(encoding["channels"])
        
        exist_list = False
        list_idx = -1

        for i in range(0, len(temp_encoding)):
            if type(temp_encoding[i]) == list:
                exist_list = True
                list_idx = i
        
        if not exist_list:
            temp_designs = []
            for encoding in temp_encoding:
                temp_designs.append(encoding_map[encoding])
            temp_designs.sort()
            encoding_designs.append("+".join(temp_designs))
        else:
            temp_designs = []
            for i in range(0, len(temp_encoding)):
                if i != list_idx:
                    temp_designs.append(encoding_map[temp_encoding[i]])
            for encode in temp_encoding[list_idx]:
                temp = temp_designs + [encoding_map[encode]]
                temp.sort()
                encoding_designs.append("+".join(temp))

    return encoding_designs

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8088, debug=True)