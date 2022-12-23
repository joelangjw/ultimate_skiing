# ultimate_skiing

- About this game
This game is called ultimate skiing!
It is compatible on all modern browsers

- How does it run?
Simply click on the index.html file to get started!

- How do you play this game?
We will arrive at a loading screen, which will instruct the user to click on any button to start the game.
To play the game, simply use the left and right arrow keys to avoid obstacles(trees).
If you run into obstacles, a "GAME OVER" will appear and you will have to restart the game by pressing the "space" key.
The distance travelled will be shown at the top of the screen.
A high score will recorded, and a new high score would replace the old one.

- Technologies used
HTML, CSS, vanilla Javascript
Canvas is also used in the designing of the game.

- My Approach
On the initial load, the player will be shown a start screen and instructions to press any key to start the game.
On key press our handleKey function will be called.
thereafter, drawing obstacles into the canvas and also setting intervals to set obstacles.
While the game is running user can move its player(skier) left and right to avoid obstacles.
If player gets collides into an obstacle(tree) we are showing a crash image on the same spot and the GAME STOPS and it will clear the intervals.
As soon as the game stops, a summary on the top left of the screen will be shown mentioning how far user travelled, highest score and instructions saying "press space to restart a new game".
when user presses space, the window will reload and a new game will start. score will be reset but the highest scored will be set(if any)

- Unsolved problems
Unable to implement the difficulty level as the game progresses
unable to implement more obstacles in the game
unable to add a speed boost button for the player
