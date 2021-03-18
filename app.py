from flask import Flask, render_template, request, jsonify, send_from_directory, current_app
import os
import json

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

@app.route('/')
def test():
    return render_template("index.html")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)