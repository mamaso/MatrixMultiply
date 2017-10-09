// function is triggered by queue input. Input ia a number and function generates to random square matixes of input x input size
// then in multiplies matrixes, prints "Finish." when calculation is done.
// This operation is very heavily using CPU resources, concurrent executions on single container cause function to execute slower

module.exports = {
    run: run,
    multiply_matrix: multiply_matrix,
    get_column_from_matrix: get_column_from_matrix,
    get_row_from_matrix: get_row_from_matrix
};

function run(context, input) {
    let { matrixA, matrixB } = input;
    
    context.log("Multiplying matrices AxB");
    context.log("Matrix A:");
    context.log(matrix_to_string(matrixA));
    context.log("Matrix B:");
    context.log(matrix_to_string(matrixB));

    let result = multiply_matrix(matrixA, matrixB);

    context.log("Result:")
    context.log(matrix_to_string(result));

    context.bindings.result = result;
    context.done();
}

var multiply_row_and_column = function(row, column){
    // assume same length of row and column
    var result = 0;
    for(var i = 0; i < row.length; i++)
    {
        result += row[i] * column[i];
    }

    return result;
}

var create_random_matrix = function(size, seed, value_min, value_max) {
    var matrix = [];

    for (var i = 0; i < size; i++) {
        var row = [];
        for (var j = 0; j < size; j++){
            var val = parseInt(Math.random(seed) * (value_max - value_min), 10);
            row.push(val);
        }

        matrix.push(row);
    }

    return matrix;
}

function get_row_from_matrix(matrix, i){
    return matrix[i];
};

function get_column_from_matrix(matrix, j){
    var column = [];
    for(var i = 0; i < matrix.length; i++){
        column.push(matrix[i][j]);
    }

    return column;
};

function multiply_matrix(matrixA, matrixB) {
    var result = [];

    for (var i = 0; i < matrixA.length; i++) {
        var result_row = [];
        for (var j = 0; j < matrixA[0].length; j++) {
            var row = get_row_from_matrix(matrixA, i);
            var column = get_column_from_matrix(matrixB, j);
            result_row.push(multiply_row_and_column(row, column));
        }
        result.push(result_row);
    }

    return result;    
}

var matrix_to_string = function(matrix){
    let mat = ""; 
    for (var i = 0; i < matrix.length; i++) {
        var row = '';
        for (var j = 0; j < matrix[0].length; j++) {
            row += (' ' + matrix[i][j]);
        }

        mat += `${row}\n`;
    }
    return mat;
}