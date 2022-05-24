
import java.util.LinkedList;
import java.util.Queue;

public class Solution {

    private static record Point(int row, int column) {}
    private static final int[][] moves = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
    int rows;
    int columns;

    public int longestIncreasingPath(int[][] matrix) {
        rows = matrix.length;
        columns = matrix[0].length;

        int[][] outdegrees = new int[rows][columns];
        initialzieArrayOutdegrees(matrix, outdegrees);

        return findLongestIncreasingPathByTopologicalSort(matrix, outdegrees);
    }

    private int findLongestIncreasingPathByTopologicalSort(int[][] matrix, int[][] outdegrees) {
        Queue<Point> leaves = new LinkedList<>();
        initialzieQueueLeaves(leaves, outdegrees);
        int longestIncreasingPath = 0;

        while (!leaves.isEmpty()) {

            ++longestIncreasingPath;
            for (int i = leaves.size() - 1; i >= 0; --i) {

                Point point = leaves.poll();
                for (int[] move : moves) {
                    int nextRow = point.row + move[0];
                    int nextColumn = point.column + move[1];

                    if (isInMatrix(nextRow, nextColumn) && matrix[point.row][point.column] > matrix[nextRow][nextColumn]) {
                        if (--outdegrees[nextRow][nextColumn] == 0) {
                            leaves.add(new Point(nextRow, nextColumn));
                        }
                    }
                }
            }
        }
        return longestIncreasingPath;
    }

    private void initialzieQueueLeaves(Queue<Point> leaves, int[][] outdegrees) {
        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < columns; ++c) {
                if (outdegrees[r][c] == 0) {
                    leaves.add(new Point(r, c));
                }
            }
        }
    }

    private void initialzieArrayOutdegrees(int[][] matrix, int[][] outdegrees) {
        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < columns; ++c) {

                for (int[] move : moves) {
                    int nextRow = r + move[0];
                    int nextColumn = c + move[1];

                    if (isInMatrix(nextRow, nextColumn) && matrix[r][c] > matrix[nextRow][nextColumn]) {
                        ++outdegrees[nextRow][nextColumn];
                    }
                }
            }
        }
    }

    private boolean isInMatrix(int row, int column) {
        return row >= 0 && row < rows && column >= 0 && column < columns;
    }
}
