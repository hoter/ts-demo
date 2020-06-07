var NUMBER_OF_LINES = 10;
var TIMER = 3000;
var canvas = document.getElementById('main');
var Field = /** @class */ (function () {
    function Field(canvas, numberOfLines, timer) {
        this.canvas = canvas;
        this.numberOfLines = numberOfLines;
        this.timer = timer;
        this.state = [];
        this.scene = canvas.getContext('2d');
        this.scene.fillStyle = 'grey';
        this.widthOfCell = this.canvas.width / numberOfLines;
        this.heightOfCell = this.canvas.height / numberOfLines;
        this.draw();
        this.bigBang();
    }
    // Draw two-dimensional orthogonal grid of cells
    Field.prototype.draw = function () {
        for (var i = 0; i < this.numberOfLines; i++) {
            for (var j = 0; j < this.numberOfLines; j++) {
                this.drawCell(i, j);
            }
        }
    };
    Field.prototype.findNeighbors = function (rowIndex, colIndex) {
        var numberOfNeighbors = 0;
        if (rowIndex != 0) {
            numberOfNeighbors += (this.state[rowIndex - 1][colIndex - 1] ? 1 : 0)
                + (this.state[rowIndex - 1][colIndex] ? 1 : 0)
                + (this.state[rowIndex - 1][colIndex + 1] ? 1 : 0);
        }
        if (rowIndex < (this.numberOfLines - 2)) {
            numberOfNeighbors += (this.state[rowIndex + 1][colIndex - 1] ? 1 : 0)
                + (this.state[rowIndex + 1][colIndex] ? 1 : 0)
                + (this.state[rowIndex + 1][colIndex + 1] ? 1 : 0);
        }
        numberOfNeighbors += (this.state[rowIndex][colIndex - 1] ? 1 : 0)
            + (this.state[rowIndex][colIndex + 1] ? 1 : 0);
        return numberOfNeighbors;
    };
    Field.prototype.drawCell = function (rowIndex, colIndex) {
        this.scene.fillRect(rowIndex * this.widthOfCell, colIndex * this.heightOfCell, this.widthOfCell, this.heightOfCell);
        this.scene.strokeRect(rowIndex * this.widthOfCell, colIndex * this.heightOfCell, this.widthOfCell, this.heightOfCell);
    };
    Field.prototype.tick = function () {
        for (var i = 0; i < this.numberOfLines; i++) {
            for (var j = 0; j < this.numberOfLines; j++) {
                var numberOfNeighbors = this.findNeighbors(i, j);
                if (this.state[i][j]) {
                    if (numberOfNeighbors < 2 || numberOfNeighbors > 3) {
                        this.state[i][j] = false;
                        this.scene.fillStyle = 'grey';
                        this.drawCell(i, j);
                    }
                    continue;
                }
                if (numberOfNeighbors == 3) {
                    this.scene.fillStyle = 'green';
                    this.state[i][j] = true;
                    this.drawCell(i, j);
                }
            }
        }
    };
    // Birth of the first population
    Field.prototype.bigBang = function () {
        var _this = this;
        this.scene.fillStyle = 'green';
        for (var i = 0; i < this.numberOfLines; i++) {
            this.state[i] = [];
            for (var j = 0; j < this.numberOfLines; j++) {
                this.state[i].push(Math.random() >= 0.5);
                if (this.state[i][j]) {
                    this.drawCell(i, j);
                }
            }
        }
        setInterval(function () { return _this.tick(); }, this.timer);
    };
    return Field;
}());
var field = new Field(canvas, NUMBER_OF_LINES, TIMER);
