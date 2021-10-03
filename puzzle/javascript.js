var grid = [];
var turn = 0;
var urls = ['url("images/1.jpg")', 'url("images/2.jpg")'];

var randomUrl = Math.floor(Math.round(Math.random() * (urls.length - 1)));
var $data = window.location.search;
$data = $data.split("&");
var $username = $data[0].split("=");
$(function (event) {
  console.log("Puzzle-d!");
  var currentBoard = $("#piece").toArray();
  var easyHeight = 169;
  var easyWidth = 451;
  var mediumHeight = 84.5;
  var mediumWidth = 225.5;
  var hardHeight = 84.5;
  var hardWidth = 112.75;
  var expertHeight = 50.7;
  var expertWidth = 56.375;
  var createGridEasy = function () {
    for (var i = 0; i < 2; i++) {
      grid[i] = [];
      for (var j = 0; j < 3; j++) {
        grid[i][j] = { x: i * -easyWidth, y: j * -easyHeight };
      }
    }
  };

  var createGridMedium = function () {
    for (var i = 0; i < 4; i++) {
      grid[i] = [];
      for (var j = 0; j < 6; j++) {
        grid[i][j] = { x: i * -mediumWidth, y: j * -mediumHeight };
      }
    }
  };

  var createGridHard = function () {
    for (var i = 0; i < 8; i++) {
      grid[i] = [];
      for (var j = 0; j < 6; j++) {
        grid[i][j] = { x: i * -hardWidth, y: j * -hardHeight };
      }
    }
  };

  var createGridExpert = function () {
    for (var i = 0; i < 16; i++) {
      grid[i] = [];
      for (var j = 0; j < 10; j++) {
        grid[i][j] = { x: i * -expertWidth, y: j * -expertHeight };
      }
    }
  };

  var $container = $(".container");
  var createBoardEasy = function () {
    var counter = 0;
    for (var a = 0; a < grid.length; a++) {
      for (var b = 0; b < grid[a].length; b++) {
        var block = $("<div>");
        block.addClass("piece");
        block.attr("id", "piece" + counter);
        block.css({
          "background-image": urls[randomUrl],
          "background-position": grid[a][b].x + "px " + grid[a][b].y + "px",
          height: easyHeight,
          width: easyWidth,
        });
        $container.append(block);
        counter++;
      }
    }
    this.disabled = true;
  };

  var $container = $(".container");
  var createBoardMedium = function () {
    var counter = 0;
    for (var a = 0; a < grid.length; a++) {
      for (var b = 0; b < grid[a].length; b++) {
        var block = $("<div>");
        block.addClass("piece");
        block.attr("id", "piece" + counter);
        block.css({
          "background-image": urls[randomUrl],
          "background-position": grid[a][b].x + "px " + grid[a][b].y + "px",
          height: mediumHeight,
          width: mediumWidth,
        });
        $container.append(block);
        counter++;
      }
    }
    this.disabled = true;
  };

  var $container = $(".container");
  var createBoardHard = function () {
    var counter = 0;
    for (var a = 0; a < grid.length; a++) {
      for (var b = 0; b < grid[a].length; b++) {
        var block = $("<div>");
        block.addClass("piece");
        block.attr("id", "piece" + counter);
        block.css({
          "background-image": urls[randomUrl],
          "background-position": grid[a][b].x + "px " + grid[a][b].y + "px",
          height: hardHeight,
          width: hardWidth,
        });
        $container.append(block);
        counter++;
      }
    }
    this.disabled = true;
  };

  var $container = $(".container");
  var createBoardExpert = function () {
    var counter = 0;
    for (var a = 0; a < grid.length; a++) {
      for (var b = 0; b < grid[a].length; b++) {
        var block = $("<div>");
        block.addClass("piece");
        block.attr("id", "piece" + counter);
        block.css({
          "background-image": urls[randomUrl],
          "background-position": grid[a][b].x + "px " + grid[a][b].y + "px",
          height: expertHeight,
          width: expertWidth,
        });
        $container.append(block);
        counter++;
      }
    }
    this.disabled = true;
  };

  // Function that shuffles the the puzzle pieces.
  var startPuzzle = function () {
    boxes = $(".piece");
    for (var i = 0; i < boxes.length; i++) {
      boxes.addClass("clickPiece");
      var target = Math.floor(Math.random() * boxes.length - 1) + 1;
      var target2 = Math.floor(Math.random() * boxes.length - 1) + 1;
      boxes.eq(target).before(boxes.eq(target2));
    }
    currentBoard = $(".piece").toArray();
    this.disabled = true;
  };

  // On first click collect piece ID, on second cick switch previous piece with current piece.
  function swapTiles() {
    $(".clickPiece").on("click", function () {
      console.log("test!");
      // the first click
      if (turn === 0) {
        console.log("turn 0");
        // assign the div to the variable divA
        divA = this;
        // increase turn counter
        turn++;
        // the second click
      } else if (turn === 1) {
        // assign the second clicked div to variable divB
        divB = this;
        // create a holder variable that holds divB's backgroundPosition
        holder = this.style.backgroundPosition;
        // create another holder variable that holds divB's id
        holderId = this.id;
        console.log("turn 1");
        // give divB divA's backgroundPosition
        divB.style.backgroundPosition = divA.style.backgroundPosition;
        // give divA divB's backgroundPosition
        divA.style.backgroundPosition = holder;
        // give divB divA's id
        divB.id = divA.id;
        // give divA divB's id
        divA.id = holderId;
        // checks to see if you've put the puzzle back together
        checkWin();
        // reset counter to 0
        turn--;
      }
    });
  }

  function checkWin() {
    var win = true;
    for (var i = 0; i < currentBoard.length; i++) {
      if (currentBoard[i].id != "piece" + i) {
        win = false;
      }
    }
    console.log(win);
    if (win === true) {
      setTimeout(function () {
        clearInterval(timer);
        alert('You win! Click "New Puzzle" to try again');
      }, 1250);
    }
  }

  var startTimer = function () {
    var sec = 0;

    var pad = function (val) {
      return val > 9 ? val : "0" + val;
    };

    timer = setInterval(function () {
      $("#seconds").html(pad(++sec % 60));
      $("#minutes").html(pad(parseInt(sec / 60, 10)));
    }, 1000);

    setTimeout(function () {
      clearInterval(timer);
    }, 9900000);
  };

  // EVENT LISTENERS

  // Loads puzzle

  // EASY PUZZLE LOADING
  $(".loadEasy").on("click", createGridEasy);
  $(".loadEasy").on("click", createBoardEasy);

  // MEDIUM PUZZLE LOADING
  $(".loadMedium").on("click", createGridMedium);
  $(".loadMedium").on("click", createBoardMedium);

  // HARD PUZZLE LOADING
  $(".loadHard").on("click", createGridHard);
  $(".loadHard").on("click", createBoardHard);

  // EXPERT PUZZLE LOADING
  $(".loadExpert").on("click", createGridExpert);
  $(".loadExpert").on("click", createBoardExpert);

  // DISABLE LOAD BUTTONS AFTER PRESSED
  $(".load").on("click", function () {
    $(".load").prop("disabled", true);
  });

  // Generates puzzle
  $(".generatePuzzle").on("click", startPuzzle);
  $(".generatePuzzle").on("click", swapTiles);
  $(".generatePuzzle").on("click", startTimer);

  // Logins in the username in the top righthand corner
  $(".user-information").text("Good luck, " + $username[1] + "!");

  // Re-loads website to generate to puzzle
  $(".newPuzzle").on("click", function () {
    window.location.reload();
  });
});
