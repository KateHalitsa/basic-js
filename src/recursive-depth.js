const { NotImplementedError } = require('../lib');

/**
 * Implement class DepthCalculator with method calculateDepth
 * that calculates depth of nested array
 *
 * @example
 *
 * const depthCalc = new DepthCalculator();
 * depthCalc.calculateDepth([1, 2, 3, 4, 5]) => 1
 * depthCalc.calculateDepth([1, 2, 3, [4, 5]]) => 2
 * depthCalc.calculateDepth([[[]]]) => 3
 *
 */
class DepthCalculator {
  calculateDepth( arr ) {
    let depth = 1;

    for (const element of arr) {
      if (Array.isArray(element)) {
        const currentDepth = this.calculateDepth(element) + 1;
        depth = Math.max(depth, currentDepth);
      }
    }
    return depth;
  }
}

module.exports = {
  depthCalculator: new DepthCalculator(),
};
