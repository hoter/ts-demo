const NUMBER_OF_LINES: number = 10;
const TIMER: number = 3000;
let canvas = <HTMLCanvasElement> document.getElementById('main');

class Field {
  readonly scene: CanvasRenderingContext2D;
  readonly widthOfCell: number;
  readonly heightOfCell: number;
  private state: boolean[][] = [];

  constructor(readonly canvas: HTMLCanvasElement, readonly numberOfLines: number, readonly timer: number) {
    this.scene = canvas.getContext('2d');
    this.scene.fillStyle = 'grey';
    this.widthOfCell = this.canvas.width / numberOfLines;
    this.heightOfCell = this.canvas.height / numberOfLines;
    this.draw();
    this.bigBang();
  }

  // Draw two-dimensional orthogonal grid of cells
  public draw(): void {
    for (let i = 0; i < this.numberOfLines; i++) {
      for (let j = 0; j < this.numberOfLines; j++) {
        this.drawCell(i, j);
      }
    }
  }

  private findNeighbors(rowIndex: number, colIndex: number): number {
    let numberOfNeighbors = 0;

    if (rowIndex != 0 ) {
      numberOfNeighbors += (this.state[rowIndex - 1][colIndex - 1] ? 1 : 0) 
  		+ (this.state[rowIndex - 1][colIndex] ? 1 : 0) 
  		+ (this.state[rowIndex - 1][colIndex + 1] ? 1 : 0);
    }
    if (rowIndex < (this.numberOfLines - 2) ) {
      numberOfNeighbors += (this.state[rowIndex + 1][colIndex - 1] ? 1 : 0)
  		+ (this.state[rowIndex + 1][colIndex] ? 1 : 0) 
  		+ (this.state[rowIndex + 1][colIndex + 1] ? 1 : 0);
    }
    numberOfNeighbors += (this.state[rowIndex][colIndex - 1] ? 1 : 0) 
  		+ (this.state[rowIndex][colIndex + 1] ? 1 : 0);

  	return numberOfNeighbors;
  }

  private drawCell(rowIndex: number, colIndex: number): void {
    this.scene.fillRect(rowIndex * this.widthOfCell, colIndex * this.heightOfCell,  this.widthOfCell, this.heightOfCell);
    this.scene.strokeRect(rowIndex * this.widthOfCell, colIndex * this.heightOfCell,  this.widthOfCell, this.heightOfCell);
  }

  private tick(): void {
  	for (let i = 0; i < this.numberOfLines; i++) {
      for (let j = 0; j < this.numberOfLines; j++) {
        let numberOfNeighbors = this.findNeighbors(i, j);
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
  }

  // Birth of the first population
  private bigBang(): void {
    this.scene.fillStyle = 'green';
  	for (let i = 0; i < this.numberOfLines; i++) {
  	  this.state[i] = [];
      for (let j = 0; j < this.numberOfLines; j++) {
        this.state[i].push(Math.random() >= 0.5);
        if (this.state[i][j]) {
          this.drawCell(i, j);
        }
      }
    }
    setInterval(() => this.tick(), this.timer);
  }
}

const field = new Field(canvas, NUMBER_OF_LINES, TIMER);
