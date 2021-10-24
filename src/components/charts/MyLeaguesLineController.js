import {
  LineController,
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";

class MyLeaguesLineController extends LineController {
  draw() {
    super.draw(arguments);

    const ctx = this.chart.ctx;

    // TODO: Can go?
    ctx.save();

    var lastYOffset = undefined;
    let minYOffsetDiff = 15;

    var chartInstance = this.chart;
    var datasets = chartInstance.config.data.datasets;
    datasets.forEach(function (ds, index) {
      var label = ds.label;
      var meta = chartInstance.getDatasetMeta(index);
      var xOffset = meta.data.at(-1).x + 5;
      var yOffset = meta.data.at(-1).y;

      if (!lastYOffset) {
        lastYOffset = yOffset;
      } else if (yOffset - lastYOffset < minYOffsetDiff) {
        yOffset = lastYOffset + minYOffsetDiff;
      }

      lastYOffset = yOffset;

      ctx.fillStyle = ds.borderColor;
      ctx.fillText(label, xOffset, yOffset + 5, 60);
    });
    ctx.restore();
  }
}

MyLeaguesLineController.id = "MyLeaguesLine";
MyLeaguesLineController.defaults = LineController.defaults;

export {
  MyLeaguesLineController,
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
};
