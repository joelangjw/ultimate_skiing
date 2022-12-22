# ultimate_skiing

- About this game
This game is for Ski Lovers
It runs on the browser

- How it runs ?
Click open the index file to any modern browser(chrome) to run this game

- How to play ?
We will arrive at a loading screen, which will instruct the user to click on any button to start the game.
To play the game, simply use the left and right arrow keys to avoid obstacles(trees).
If you run into obstacles, a "GAME OVER" will appear and you will have the restart the game by pressing the "space" key.
The distance travelled will be shown at the top of the screen.
A high score will recorded, and a new high score would replace the old one.

- Technologies used
HTML, CSS, vanilla Javascript
Canvas is also used in the designing of the game.

- My Approach
On initial load we are showing a welcome screen and instructing to press any key to start the game.
On key press our handleKey function is being called and GAME STARTS there we are drawing obstacles into the canvas and we are also setting intervals to set obstacles.
While the game is running user can move it's player(skier) left and right to avoid obstacles.
If player get's in touch with a obstacle(tree) we are showing a crash image on the same spot and the GAME STOPS and it will clear the intervals.
As soon as the game stops on top left a summary will be shown mentioning how much user scored, highest score and an instruction saying "press space to restart a new game"
if user presses space, window will reload and a new game will start score will be reset but the highest scored will be set(if any)

- Unsolved problems
Unable to implement the difficulty level as the game progresses
unable to implement more obstacles in the game
unable to add a speed boost button for the player
