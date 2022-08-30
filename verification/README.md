Thank you so much for helping us.

Here is some introduction of the JSON schema we use:

- Designs: a list of all the visualization designs. The specification is similar to Vega-Lite.
- Results: the final outcomes from the experiment. They are grouped by the metric, and under each metric, visualizations are sorted based on the task performance.
  - Significance: stores pairs of visualizations whose performances are significantly different, where the first entry performs significantly better than the second in the list.

We did **not** include the designs with **length** and **angle** encodings due to the limitation of the visualization specification.

We mainly care about if **the significance lists** record the experimental results correctly.
