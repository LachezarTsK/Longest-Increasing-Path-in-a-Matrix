
#include <array>
#include <queue>
#include <vector>
using namespace std;

class Solution {

    struct Point {
	    int row{};
	    int column{};
	    Point(int row, int column) : row {row}, column {column} {}
    };

    inline static array<array<int, 2>, 4> moves{ { {-1, 0}, {1, 0}, {0, -1}, {0, 1} } };
    size_t rows;
    size_t columns;

public:

    int longestIncreasingPath(vector<vector<int>>& matrix) {
        rows = matrix.size();
        columns = matrix[0].size();

        vector<vector<int>> outdegrees(rows, vector<int>(columns));
        initialzieArrayOutdegrees(matrix, outdegrees);

        return findLongestIncreasingPathByTopologicalSort(matrix, outdegrees);
    }

private:
    int findLongestIncreasingPathByTopologicalSort(const vector<vector<int>>& matrix, vector<vector<int>>& outdegrees) {
        queue<Point> leaves;
        initialzieQueueLeaves(leaves, outdegrees);
        int longestIncreasingPath = 0;

        while (!leaves.empty()) {

            ++longestIncreasingPath;
            for (int i = leaves.size() - 1; i >= 0; --i) {

                Point point = leaves.front();
                leaves.pop();

                for (const auto& move : moves) {
                    int nextRow = point.row + move[0];
                    int nextColumn = point.column + move[1];

                    if (isInMatrix(nextRow, nextColumn) && matrix[point.row][point.column] > matrix[nextRow][nextColumn]) {
                        if (--outdegrees[nextRow][nextColumn] == 0) {
                            leaves.push(Point(nextRow, nextColumn));
                        }
                    }
                }
            }
        }
        return longestIncreasingPath;
    }

    void initialzieQueueLeaves(queue<Point>& leaves, const vector<vector<int>>& outdegrees) {
        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < columns; ++c) {
                if (outdegrees[r][c] == 0) {
                    leaves.push(Point(r, c));
                }
            }
        }
    }

    void initialzieArrayOutdegrees(const vector<vector<int>>& matrix, vector<vector<int>>& outdegrees) {
        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < columns; ++c) {

                for (const auto& move : moves) {
                    int nextRow = r + move[0];
                    int nextColumn = c + move[1];

                    if (isInMatrix(nextRow, nextColumn) && matrix[r][c] > matrix[nextRow][nextColumn]) {
                        ++outdegrees[nextRow][nextColumn];
                    }
                }
            }
        }
    }

    bool isInMatrix(int row, int column) {
        return row >= 0 && row < rows && column >= 0 && column < columns;
    }
};
