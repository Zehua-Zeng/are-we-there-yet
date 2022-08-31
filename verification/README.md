Thank you so much for helping us.

Here is some introduction of the JSON schema we use:

- Designs: a list of the visualization designs studied by the paper. We assign an ID for each recorded
  visualization design. The ID will be used in the result to record the ranking among visualizations.

  - fields: a list of data attributes visualized by the visualization design
  - design: specifying the visualization design with the coordinates, mark type, encodings. The visualization specification is similar to Vega-Lite.

- Results: the final outcomes from the experiment. They are grouped by the metric, and under each metric, visualizations are sorted based on the task performance.

  - Significance: stores pairs of visualizations whose performances are significantly different, where the first entry performs significantly better than the second in the list.

We did **not** include the designs with **length** and **angle** encodings due to the limitation of the visualization specification.

We mainly care about if **the significance lists** record the experimental results correctly.
