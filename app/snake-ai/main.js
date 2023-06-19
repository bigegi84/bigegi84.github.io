(function () {
  var CANVAS_HEIGHT,
    CANVAS_WIDTH,
    DOWN,
    FIELD_AREA,
    Game,
    HEIGHT,
    H_SCALE,
    INIT_FPS,
    LEFT,
    PathNotFoundError,
    Point,
    RIGHT,
    SearchState,
    Snake,
    UP,
    WIDTH,
    W_SCALE,
    isOpposite,
    randInt,
    ref,
    rgba;

  INIT_FPS = 20;

  WIDTH = 10;

  HEIGHT = 10;

  CANVAS_WIDTH = 500;

  CANVAS_HEIGHT = 500;

  FIELD_AREA = HEIGHT * WIDTH;

  W_SCALE = CANVAS_WIDTH / WIDTH;

  H_SCALE = CANVAS_HEIGHT / HEIGHT;

  (ref = ["u", "d", "l", "r"]),
    (UP = ref[0]),
    (DOWN = ref[1]),
    (LEFT = ref[2]),
    (RIGHT = ref[3]);

  rgba = function (r, g, b, a) {
    // console.log(r, g, b, a);
    return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
  };

  randInt = function (start, end) {
    return Math.floor(Math.random() * (end - start) + start);
  };

  isOpposite = function (d1, d2) {
    switch (d1) {
      case UP:
        if (d2 === DOWN) {
          return true;
        } else {
          return false;
        }
        break;
      case DOWN:
        if (d2 === UP) {
          return true;
        } else {
          return false;
        }
        break;
      case LEFT:
        if (d2 === RIGHT) {
          return true;
        } else {
          return false;
        }
        break;
      case RIGHT:
        if (d2 === LEFT) {
          return true;
        } else {
          return false;
        }
        break;
      default:
        throw new Error("Invalid direction " + d1);
    }
  };

  Point = (function () {
    function Point(x1, y1) {
      this.x = x1;
      this.y = y1;
    }

    Point.prototype.add = function (x, y) {
      return new Point(this.x + x, this.y + y);
    };

    Point.prototype.equals = function (other) {
      return this.x === other.x && this.y === other.y;
    };

    Point.prototype.toString = function () {
      return "(" + this.x + ", " + this.y + ")";
    };

    return Point;
  })();

  Snake = (function () {
    function Snake(head) {
      this.body = [head];
      this.direction = RIGHT;
    }

    Snake.prototype.head = function () {
      return this.body[0];
    };

    Snake.prototype.tail = function () {
      return this.body[this.body.length - 1];
    };

    Snake.prototype.fork = function () {
      var snake;
      snake = new Snake(new Point(0, 0));
      snake.body = this.body.slice(0);
      snake.direction = this.direction;
      return snake;
    };

    Snake.prototype.advance = function (command) {
      var nextHead;
      if (isOpposite(command, this.direction)) {
        command = this.direction;
      }
      nextHead = Game.adjacentCell(command, this.head());
      this.body.unshift(nextHead);
      return (this.direction = command);
    };

    Snake.prototype.move = function (command) {
      if (isOpposite(command, this.direction)) {
        command = this.direction;
      }
      this.advance(command);
      return this.moveTail();
    };

    Snake.prototype.moveTail = function () {
      return this.body.pop();
    };

    Snake.prototype.bodyHit = function () {
      var k, len, ref1, seg;
      ref1 = this.body.slice(1, this.body.length);
      for (k = 0, len = ref1.length; k < len; k++) {
        seg = ref1[k];
        if (this.head().equals(seg)) {
          return true;
        }
      }
      return false;
    };

    Snake.prototype.wallHit = function () {
      var ref1, ref2;
      return !(
        0 <= (ref1 = this.head().x) &&
        ref1 < WIDTH &&
        0 <= (ref2 = this.head().y) &&
        ref2 < HEIGHT
      );
    };

    return Snake;
  })();

  PathNotFoundError = {};

  Game = (function () {
    Game.adjacentCell = function (direction, cell) {
      switch (direction.toLowerCase()) {
        case "u":
          return cell.add(0, -1);
        case "d":
          return cell.add(0, 1);
        case "l":
          return cell.add(-1, 0);
        case "r":
          return cell.add(1, 0);
        default:
          throw new Error("Invalid direction " + direction);
      }
    };

    function Game(ctx) {
      var i, j;
      this.ctx = ctx;
      this.fps = INIT_FPS;
      this.food = new Point(3, 3);
      this.score = 0;
      this.snake = new Snake(new Point(1, 1));
      this.commands = [];
      this.map = (function () {
        var k, ref1, results;
        results = [];
        for (
          j = k = 0, ref1 = WIDTH;
          0 <= ref1 ? k < ref1 : k > ref1;
          j = 0 <= ref1 ? ++k : --k
        ) {
          results.push(
            (function () {
              var l, ref2, results1;
              results1 = [];
              for (
                i = l = 0, ref2 = HEIGHT;
                0 <= ref2 ? l < ref2 : l > ref2;
                i = 0 <= ref2 ? ++l : --l
              ) {
                results1.push(null);
              }
              return results1;
            })()
          );
        }
        return results;
      })();
      this.marks = (function () {
        var k, ref1, results;
        results = [];
        for (
          j = k = 0, ref1 = WIDTH;
          0 <= ref1 ? k < ref1 : k > ref1;
          j = 0 <= ref1 ? ++k : --k
        ) {
          results.push(
            (function () {
              var l, ref2, results1;
              results1 = [];
              for (
                i = l = 0, ref2 = HEIGHT;
                0 <= ref2 ? l < ref2 : l > ref2;
                i = 0 <= ref2 ? ++l : --l
              ) {
                results1.push(false);
              }
              return results1;
            })()
          );
        }
        return results;
      })();
    }

    Game.prototype.draw = function () {
      var i, k, ref1, seg;
      this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      for (
        i = k = 0, ref1 = this.snake.body.length;
        0 <= ref1 ? k < ref1 : k > ref1;
        i = 0 <= ref1 ? ++k : --k
      ) {
        seg = this.snake.body[i];
        this.ctx.fillStyle = rgba(
          133,
          22,
          88,
          1 - 0.7 * (i / this.snake.body.length)
        );
        this.ctx.fillRect(seg.x * W_SCALE, seg.y * H_SCALE, W_SCALE, H_SCALE);
      }
      this.ctx.fillStyle = "yellow";
      return this.ctx.fillRect(
        this.food.x * W_SCALE,
        this.food.y * H_SCALE,
        W_SCALE,
        H_SCALE
      );
    };

    Game.prototype.placeFood = function () {
      var food, results;
      results = [];
      while (true) {
        food = new Point(randInt(0, WIDTH), randInt(0, HEIGHT));
        if (
          this.snake.body.every(function (s) {
            return !s.equals(food);
          })
        ) {
          this.lastFood = this.food;
          this.food = food;
          break;
        } else {
          results.push(void 0);
        }
      }
      return results;
    };

    Game.prototype.onTick = function () {
      if (this.commands.length === 0) {
        console.log(this.makeMoves());
        this.commands = Array.prototype.slice.apply(this.makeMoves());
      }
      this.snake.advance(this.commands.shift());
      $(this).trigger("updateInfo", "Score: " + this.score);
      if (this.snake.head().equals(this.food)) {
        this.placeFood();
        this.score++;
      } else {
        this.snake.moveTail();
      }
      if (this.snake.wallHit() || this.snake.bodyHit()) {
        this.stop();
        $(this).trigger("updateInfo", "GAME OVER");
        return;
      }
      if (this.snake.body.length >= WIDTH * HEIGHT - 1) {
        this.stop();
        $(this).trigger("updateInfo", "Unbelievable!");
        return;
      }
      this.draw();
      return (this.ticker = setTimeout(
        (function (_this) {
          return function () {
            return _this.onTick();
          };
        })(this),
        1000 / this.fps
      ));
    };

    Game.prototype.play = function () {
      return this.onTick();
    };

    Game.prototype.stop = function () {
      return clearTimeout(this.ticker);
    };

    Game.prototype.isCellFree = function (cell, snake) {
      var ref1, ref2;
      return (
        0 <= (ref1 = cell.x) &&
        ref1 < WIDTH &&
        0 <= (ref2 = cell.y) &&
        ref2 < HEIGHT &&
        snake.body.every(function (s) {
          return !s.equals(cell);
        })
      );
    };

    Game.prototype.findPathToCell = function (snake, dest) {
      var cell, dir, head, i, j, k, l, len, m, node, queue, ref1, ref2, ref3;
      head = snake.head();
      for (
        j = k = 0, ref1 = WIDTH;
        0 <= ref1 ? k < ref1 : k > ref1;
        j = 0 <= ref1 ? ++k : --k
      ) {
        for (
          i = l = 0, ref2 = HEIGHT;
          0 <= ref2 ? l < ref2 : l > ref2;
          i = 0 <= ref2 ? ++l : --l
        ) {
          this.marks[j][i] = false;
        }
      }
      queue = [new SearchState(head)];
      while (queue.length !== 0) {
        node = queue.shift();
        if (this.marks[node.head.x][node.head.y] === true) {
          continue;
        }
        this.marks[node.head.x][node.head.y] = true;
        ref3 = [UP, DOWN, LEFT, RIGHT];
        for (m = 0, len = ref3.length; m < len; m++) {
          dir = ref3[m];
          cell = Game.adjacentCell(dir, node.head);
          if (cell.equals(dest)) {
            return node.traceCmd() + dir;
          }
          if (this.isCellFree(cell, snake)) {
            queue.push(new SearchState(cell, dir, node));
          }
        }
      }
      throw PathNotFoundError;
    };

    Game.prototype.followTail = function (snake) {
      var cell,
        dir,
        found,
        head,
        i,
        j,
        k,
        l,
        len,
        len1,
        m,
        max,
        move,
        n,
        next,
        node,
        o,
        p,
        queue,
        ref1,
        ref2,
        ref3,
        ref4,
        ref5,
        ref6,
        tail;
      head = snake.head();
      tail = snake.tail();
      for (
        j = k = 0, ref1 = WIDTH;
        0 <= ref1 ? k < ref1 : k > ref1;
        j = 0 <= ref1 ? ++k : --k
      ) {
        for (
          i = l = 0, ref2 = HEIGHT;
          0 <= ref2 ? l < ref2 : l > ref2;
          i = 0 <= ref2 ? ++l : --l
        ) {
          this.map[j][i] = null;
        }
      }
      this.map[tail.x][tail.y] = 0;
      for (
        j = m = 0, ref3 = WIDTH;
        0 <= ref3 ? m < ref3 : m > ref3;
        j = 0 <= ref3 ? ++m : --m
      ) {
        for (
          i = n = 0, ref4 = HEIGHT;
          0 <= ref4 ? n < ref4 : n > ref4;
          i = 0 <= ref4 ? ++n : --n
        ) {
          this.marks[j][i] = false;
        }
      }
      queue = [tail];
      found = false;
      while (queue.length !== 0) {
        node = queue.shift();
        if (this.marks[node.x][node.y] === true) {
          continue;
        }
        this.marks[node.x][node.y] = true;
        ref5 = [UP, DOWN, LEFT, RIGHT];
        for (o = 0, len = ref5.length; o < len; o++) {
          dir = ref5[o];
          cell = Game.adjacentCell(dir, node);
          if (cell.equals(head)) {
            found = true;
          }
          if (this.isCellFree(cell, snake)) {
            if (this.map[cell.x][cell.y] === null) {
              this.map[cell.x][cell.y] = this.map[node.x][node.y] + 1;
            }
            queue.push(cell);
          }
        }
      }
      if (found) {
        max = -1;
        move = null;
        ref6 = [UP, DOWN, LEFT, RIGHT];
        for (p = 0, len1 = ref6.length; p < len1; p++) {
          dir = ref6[p];
          next = Game.adjacentCell(dir, head);
          if (this.isCellFree(next, snake) || next.equals(tail)) {
            if (
              this.map[next.x][next.y] > max &&
              this.map[next.x][next.y] !== null
            ) {
              max = this.map[next.x][next.y];
              move = dir;
            }
          }
        }
        return move;
      } else {
        throw PathNotFoundError;
      }
    };

    Game.prototype.makeMoves = function () {
      var cmd, direction, e, fork, k, l, len, len1, next, path, ref1;
      try {
        path = this.findPathToCell(this.snake, this.food);
        console.log(path);
        fork = this.snake.fork();
        for (k = 0, len = path.length; k < len; k++) {
          cmd = path[k];
          fork.advance(cmd);
          if (!fork.head().equals(this.food)) {
            fork.moveTail();
          }
        }
        this.findPathToCell(fork, fork.tail());
        return path;
      } catch (error) {
        e = error;
        if (e === PathNotFoundError) {
          try {
            return this.followTail(this.snake);
          } catch (error) {
            e = error;
            if (e === PathNotFoundError) {
              ref1 = [UP, DOWN, LEFT, RIGHT];
              for (l = 0, len1 = ref1.length; l < len1; l++) {
                direction = ref1[l];
                next = Game.adjacentCell(direction, this.snake.head());
                if (this.isCellFree(next, this.snake)) {
                  return direction;
                }
              }
              return this.snake.direction;
            } else {
              throw e;
            }
          }
        } else {
          throw e;
        }
      }
    };

    return Game;
  })();

  SearchState = (function () {
    function SearchState(head1, cmd1, parent) {
      this.head = head1;
      this.cmd = cmd1 != null ? cmd1 : "";
      this.parent = parent != null ? parent : null;
    }

    SearchState.prototype.traceCmd = function () {
      if (this.parent === null) {
        return this.cmd;
      } else {
        return this.parent.traceCmd() + this.cmd;
      }
    };

    SearchState.prototype.toString = function () {
      return this.head + ", '" + this.traceCmd() + "'";
    };

    return SearchState;
  })();

  $(document).ready(function () {
    var context, game;
    context = $(".main_canvas")[0].getContext("2d");
    game = new Game(context);
    $(game).on("updateInfo", function (e, info) {
      return $("#score").text(info);
    });
    return game.play();
  });
}.call(this));
