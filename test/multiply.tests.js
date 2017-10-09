let func = require('azure-functions-node-harness');
let mocha = require('mocha');
let assert = require('chai').assert;

describe('matrix multiply', function() {
    var matrixMultiply = func('matrixMultiply', {dirname: `${__dirname}/../src`});

    it('handles identity matrix', function(done) {
        var invocation = matrixMultiply.invoke({
            input: {
                matrixA: [
                    [1, 2],
                    [3, 4]
                ],
                matrixB: [
                    [1, 0],
                    [0, 1]
                ]
            }
        });
        
        invocation
        .then((ctx) => {
            assert.deepEqual(ctx.bindings.result, [
                [1, 2],
                [3, 4]
            ]);
            done();
        })
        .catch(done);
    });

    it('performs rotation', function(done) {
        var invocation = matrixMultiply.invoke({
            input: {
                matrixA: [
                    [1, 2],
                    [3, 4]
                ],
                matrixB: [
                    [0, -1],
                    [1, 0]
                ]
            }
        });
        
        invocation
            .then((ctx) => {
                assert.deepEqual(ctx.bindings.result, [
                    [2, -1],
                    [4, -3]
                ]);
                done();
            })
            .catch(done);
    });
});

