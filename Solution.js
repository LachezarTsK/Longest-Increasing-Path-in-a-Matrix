
/**
 * @param {number[][]} matrix
 * @return {number}
 */
var longestIncreasingPath = function (matrix) {
    this.rows = matrix.length;
    this.columns = matrix[0].length;
    this.moves = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    const outdegrees = Array.from(new Array(rows), () => new Array(columns).fill(0));
    initialzieArrayOutdegrees(matrix, outdegrees);

    return findLongestIncreasingPathByTopologicalSort(matrix, outdegrees);
};

/**
 * @param {number[][]} matrix
 * @param {number[][]} outdegrees
 * @return {number}
 */
function findLongestIncreasingPathByTopologicalSort(matrix, outdegrees) {
    const leaves = new Queue();
    initialzieQueueLeaves(leaves, outdegrees);
    let longestIncreasingPath = 0;

    while (!leaves.isEmpty()) {

        ++longestIncreasingPath;
        for (let i = leaves.size() - 1; i >= 0; --i) {

            let point = leaves.dequeue();
            for (let move of this.moves) {
                let nextRow = point.row + move[0];
                let nextColumn = point.column + move[1];

                if (isInMatrix(nextRow, nextColumn) && matrix[point.row][point.column] > matrix[nextRow][nextColumn]) {
                    if (--outdegrees[nextRow][nextColumn] === 0) {
                        leaves.enqueue(new Point(nextRow, nextColumn));
                    }
                }
            }
        }
    }
    return longestIncreasingPath;
}

/**
 * @param {Queue of Points} leaves
 * @param {number[][]} outdegrees
 * @return {void}
 */
function initialzieQueueLeaves(leaves, outdegrees) {
    for (let r = 0; r < this.rows; ++r) {
        for (let c = 0; c < this.columns; ++c) {
            if (outdegrees[r][c] === 0) {
                leaves.enqueue(new Point(r, c));
            }
        }
    }
}

/**
 * @param {number[][]} matrix
 * @param {number[][]} outdegrees
 * @return {void}
 */
function initialzieArrayOutdegrees(matrix, outdegrees) {
    for (let r = 0; r < this.rows; ++r) {
        for (let c = 0; c < this.columns; ++c) {

            for (let move of this.moves) {
                let nextRow = r + move[0];
                let nextColumn = c + move[1];

                if (isInMatrix(nextRow, nextColumn) && matrix[r][c] > matrix[nextRow][nextColumn]) {
                    ++outdegrees[nextRow][nextColumn];
                }
            }
        }
    }
}

/**
 * @param {number} row
 * @param {number} column
 * @return {boolean}
 */
function isInMatrix(row, column) {
    return row >= 0 && row < this.rows && column >= 0 && column < this.columns;
}

/**
 * @param {number} row
 * @param {number} column
 */
function Point(row, column) {
    this.row = row;
    this.column = column;
}
