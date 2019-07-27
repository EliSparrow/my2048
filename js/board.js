class Board {


    constructor(size) {
        this.table_data = [];
        this.size = size;
        var table_body = '<table>';
        for (var row = 1; row <= size; row++) {
            table_body += '<tr id="tr' + row + '">';
            for (var col = 1; col <= size; col++) {
                var table_row = [0, 0, 0, 0]
                table_body += '<td id="' + row + '-' + col + '">';
                table_body += table_row[col - 1];
                table_body += '</td>';
            }
            this.table_data.push(table_row);
            table_body += '</tr>';
        }
        table_body += '</table>';
        $('.boardGame').append(table_body);
    }

    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    getFreeCases() {
        var freeCases = [];
        for (var row = 0; row < this.size; ++row) {
            for (var col = 0; col < this.size; ++col) {
                if (this.table_data[row][col] == 0) {
                    freeCases.push([row, col]);
                }
            }
        }
        return freeCases;
    }

    generateBoardCase() {
        var free_cases = this.getFreeCases();
        var size_free_cases = free_cases.length;
        console.log(free_cases);
        console.log('size_free_cases' + size_free_cases);

        var random_case_coord = this.randomIntFromInterval(0, size_free_cases - 1);
        var row = free_cases[random_case_coord][0];
        var y = free_cases[random_case_coord][1];

        console.log(random_case_coord);
        console.log(free_cases[random_case_coord]);
        console.log(row);
        console.log(y);

        if (this.randomIntFromInterval(1, 10) < 4) {
            console.log('done4');
            this.table_data[row][y] = 4;
            // console.log('case' + row + y + '=' + this.table_data[row][y]);
        } else {
            // console.log('done2');
            this.table_data[row][y] = 2;
            // console.log('case' + row + y + '=' + this.table_data[row][y]);
        }

    }

    refreshBoard() {
        // console.log('inside refresh');
        $('td').removeClass();
        for (var row = 0; row < this.size; ++row) {
            var x = row + 1;
            for (var col = 0; col < this.size; ++col) {
                var y = col + 1;
                $('#' + x + '-' + y).text(this.table_data[row][col]);
                $('#' + x + '-' + y).addClass('td-' + this.table_data[row][col]);
            }
        }
    }

    // MOVE FUNCTIONS
    moveUp() {
        // this.moveOk = false;
        for (var col = 0; col < this.size; col++) {
            for (var row = 0; row < this.size; row++) {
                var temp = row - 1;
                while (temp >= 0 && this.table_data[temp][col] == 0) {
                    temp--;
                }
                temp++;
                if (this.table_data[row][col] !== 0 && this.table_data[temp][col] === 0 && temp >= 0) {
                    var actualPos = this.table_data[row][col];
                    this.table_data[temp][col] = actualPos;
                    this.table_data[row][col] = 0;
                    // this.moveOk = true;
                };
            };
        };
    };

    moveDown() {
        // this.moveOk = false;
        for (var col = 3; col >= 0; col--) {
            for (var row = 0; row < this.size; row++) {
                var temp = row + 1;
                while (temp <= 3 && this.table_data[temp][col] == 0) {
                    temp++;
                }
                temp--;
                if (this.table_data[row][col] !== 0 && this.table_data[temp][col] === 0 && temp <= 3) {
                    var actualPos = this.table_data[row][col];
                    this.table_data[temp][col] = actualPos;
                    this.table_data[row][col] = 0;
                    // this.moveOk = true;
                };
            };
        };
    };

    moveLeft() {
        // this.moveOk = false;
        for (var row = 0; row < this.size; row++) {
            for (var col = 0; col < this.size; col++) {
                var temp = col - 1;
                while (temp >= 0 && this.table_data[row][temp] == 0) {
                    temp--;
                }
                temp++;
                if (this.table_data[row][col] !== 0 && this.table_data[row][temp] === 0 && temp >= 0) {
                    var actualPos = this.table_data[row][col];
                    this.table_data[row][temp] = actualPos;
                    this.table_data[row][col] = 0;
                    // this.moveOk = true;
                };
            };
        };
    };

    moveRight() {
        // this.moveOk = false;
        for (var row = 0; row < this.size; row++) {
            for (var col = 3; col >= 0; col--) {
                var temp = col + 1;
                while (temp <= 3 && this.table_data[row][temp] == 0) {
                    temp++;
                }
                temp--;
                if (this.table_data[row][col] !== 0 && this.table_data[row][temp] === 0 && temp <= 3) {
                    var actualPos = this.table_data[row][col];
                    this.table_data[row][temp] = actualPos;
                    this.table_data[row][col] = 0;
                    // this.moveOk = true;
                };
            };
        };
    };

    // MERGE FUNCTIONS
    mergeUp(){
        // this.mergeOk = false;
        for (var col = 3; col >= 0; col--) {
            for (var row = 0; row < this.size; row++) {
                var next_row1 = row + 1;
                var next_row2 = row + 2;
                var next_row3 = row + 3;
                if(this.table_data[row][col] !== 0){
                    if(next_row1 <= 3 && this.table_data[row][col] === this.table_data[next_row1][col]){
                        this.table_data[row][col] += this.table_data[next_row1][col];
                        this.table_data[next_row1][col] = 0;
                        // this.mergeOk = true;
                    }
                    else if(next_row2 <= 3 && this.table_data[row][col] === this.table_data[next_row2][col] && this.table_data[next_row1][col] === 0 ){
                        this.table_data[row][col] += this.table_data[next_row2][col];
                        this.table_data[next_row2][col] = 0;
                        // this.mergeOk = true;
                    }
                    else if(next_row3 <= 3 && this.table_data[row][col] === this.table_data[next_row3][col] && this.table_data[next_row1][col] === 0 && this.table_data[next_row2][col] === 0){
                        this.table_data[row][col] += this.table_data[next_row3][col];
                        this.table_data[next_row3][col] = 0;
                        // this.mergeOk = true;
                    }
                }
            }
        }
    }

    mergeDown(){
        // this.mergeOk = false;
        for (var col = 0; col < this.size; col++) {
            for (var row = 3; row >= 0 ; row--) {
                var next_row1 = row - 1;
                var next_row2 = row - 2;
                var next_row3 = row - 3;
                if(this.table_data[row][col] !== 0){
                    if(next_row1 >= 0 && this.table_data[row][col] === this.table_data[next_row1][col]){
                        this.table_data[row][col] += this.table_data[next_row1][col];
                        this.table_data[next_row1][col] = 0;
                        // this.mergeOk = true;
                    }
                    else if(next_row2 >= 0 && this.table_data[row][col] === this.table_data[next_row2][col] && this.table_data[next_row1][col] === 0 ){
                        this.table_data[row][col] += this.table_data[next_row2][col];
                        this.table_data[next_row2][col] = 0;
                        // this.mergeOk = true;
                    }
                    else if(next_row3 >= 0 && this.table_data[row][col] === this.table_data[next_row3][col] && this.table_data[next_row1][col] === 0 && this.table_data[next_row2][col] === 0){
                        this.table_data[row][col] += this.table_data[next_row3][col];
                        this.table_data[next_row3][col] = 0;
                        // this.mergeOk = true;
                    }
                }
            }
        }
    }

    mergeLeft(){
        // this.mergeOk = false;
        for (var row = 0; row < this.size; row++) {
            for (var col = 0; col < this.size; col++) {
                var next_col1 = col + 1;
                var next_col2 = col + 2;
                var next_col3 = col + 3;
                if(this.table_data[row][col] !== 0){
                    if(next_col1 <= 3 && this.table_data[row][col] === this.table_data[row][next_col1]){
                        this.table_data[row][next_col1] += this.table_data[row][col];
                        this.table_data[row][col] = 0;
                        // this.mergeOk = true;
                    }
                    else if(next_col2 <= 3 && this.table_data[row][col] === this.table_data[row][next_col2] && this.table_data[row][next_col1] === 0 ){
                        this.table_data[row][next_col2] += this.table_data[row][col];
                        this.table_data[row][col] = 0;
                        // this.mergeOk = true;
                    }
                    else if(next_col3 <= 3 && this.table_data[row][col] === this.table_data[row][next_col3] && this.table_data[row][next_col2] === 0 && this.table_data[row][next_col1] === 0){
                        this.table_data[row][next_col3] += this.table_data[row][col];
                        this.table_data[row][col] = 0;
                        // this.mergeOk = true;
                    }
                }
            }
        }
    }

    mergeRight(){
        // this.mergeOk = false;
        for (var row = 0; row < this.size; row++) {
            for (var col = 3; col >= 0; col--) {
                var next_col1 = col - 1;
                var next_col2 = col - 2;
                var next_col3 = col - 3;
                if(this.table_data[row][col] !== 0){
                    if(next_col1 >= 0 && this.table_data[row][col] === this.table_data[row][next_col1]){
                        this.table_data[row][col] += this.table_data[row][next_col1];
                        this.table_data[row][next_col1] = 0;
                        // this.mergeOk = true;
                    }
                    else if(next_col2 >= 0 && this.table_data[row][col] === this.table_data[row][next_col2] && this.table_data[row][next_col1] === 0 ){
                        this.table_data[row][col] += this.table_data[row][next_col2];
                        this.table_data[row][next_col2] = 0;
                        // this.mergeOk = true;
                    }
                    else if(next_col3 >= 0 && this.table_data[row][col] === this.table_data[row][next_col3] && this.table_data[row][next_col2] === 0 && this.table_data[row][next_col1] === 0){
                        this.table_data[row][col] += this.table_data[row][next_col3];
                        this.table_data[row][next_col3] = 0;
                        // this.mergeOk = true;
                    }
                }
            }
        }
    }


}


// var Board = new Board(4);

// moveUp() {
//     var x = 0;
//     var a = 1;
//     var y = 0;
//     while (y < this.size) {
//         while (row < this.size) {
//             // console.log(this.table_data[row][y]);
//             if (this.table_data[row][y] == 0 && (a) < 4) {
//                 var temp = this.table_data[row][y];
//                 this.table_data[row][y] = this.table_data[a][y];
//                 this.table_data[a][y] = temp;
//             }
//             a++;
//             row++;
//         }
//         y++
//     }
// }

// function moveLeft() {
//     for (var row = 0; row < this.size; row++) {
//         for (var y = 0; y < this.size; y++) {
//             var temp = y - 1;
//             while (temp >= 0 && this.table_data[row][temp] == 0) {
//                 temp--;
//             }
//             temp++;
//             if (this.table_data[row][y] !== 0 && this.table_data[row][temp] === 0 && temp >= 0) {
//                 var actualPos = this.table_data[row][y];
//                 this.table_data[row][temp] = actualPos;
//                 this.table_data[row][y] = 0;
//             };
//         };
//     };
// };