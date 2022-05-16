var randomNumber = function(min,max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
}

var fightOrSkip = function() {
    //ask player if they'd like to fight or skip using fightOrSkip function
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    //conditional recursive call here!
    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again!");
        return fightOrSkip
    }

    //if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || "SKIP") {
        //confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        //if yes, leave fight
        if(confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            //subtract money for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);

            //return true if player wants to leave
            return true; 
            shop();
        }
    }
    return false;
}

var fight = function(enemy) {
        // to keep track who gpes first (human or enemy)
        var isPlayerTurn = true;

        //to randomize who goes first 
        if (Math.random() > 0.5) {
            isPlayerTurn = false;
        }

        while (playerInfo.health > 0 && enemy.health > 0) {
        if(isPlayerTurn) {
            //ask player if they'd like to fight or skip using fightOrSKip function
            if (fightOrSkip()) {
                // if true, leave fight by breaking loop
                break;
            }
        

        //remove enemy's health by subtracting the amount set in the playerInfo.attack variable 
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

        enemy.health = Math.max(0, enemy.health - damage);
        console.log(playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health reamining.');

        //check enemy's health
        if (enemy.health <= 0) {
            window.alert(enemy.name + ' has died!');

            //award player money for winning
            playerInfo.money = playerInfo.money + 20;

            //leave while() loop since enemy is dead
            break;
        } else { 
            window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
        }
            //player gets attacked first
        } else { 
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
        
        playerInfo.health = Math.max(0, playerInfo.health - damage); 

        console.log(
            enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health reamining.'
        );
        //check player's health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + ' has died!');
            //leave while() loop if player is dead
            break;
        } else {
            window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
            }
        }
        //switch turn prder for next round
        isPlayerTurn = !isPlayerTurn;
    } // end of while loop
}; // end of fight function

// function to start a new game
var startGame = function () {
    // reset player stats 
    playerInfo.reset();
    
    //fight each enemy robot by looping them and fighting them one at a time
    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            //let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to is
            window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));

            //pick new enemy to fight based on the index of the enemy.names array
            var pickedEnemyObj = enemyInfo[i];

            //reset enenmyhealth before starting a new fight
            pickedEnemyObj.health = randomNumber (40, 60);
        
            //pass the pickedenemyObj object variable into the fight function
            fight(pickedEnemyObj);

            //if player is still alive and we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                //ask if player wants to go to the store
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
                //if yes, take them to the store() function
                if (storeConfirm) {
                shop();
                }
            }
        }
        //if player is not alive, break out of the loop and let endGame function run
        else {
            window.alert("You have lost your robot in battle! Game over!");
            break; 
        }
    }

    //after loop ends, we are either out of player.health or enemies to fight
    endGame();
};

//function to end the entire game
var endGame = function() {
    window.alert("The game has ended. Let's see how you did!");
    
    //check localStorage for high score, if it's not there use 0
    var highScore = localStorage.getItem("highscore");
    if (highScore === null) {
        highScore = 0;
    }

    //if player as more money than the high score, player has new high score!
    if (playerInfo.money > highScore) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
    } 
    else {
        alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
    }

    //ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if(playAgainConfirm) {
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come bacl soon!");
    }
};

var shop = function() {
    //ask player what they would like to do 
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 for REFILL, 2 for UPGRADE, 3 for LEAVE."
    );

    //converts answer from prompt tp an actual number
    shopOptionPrompt = parseInt(shopOptionPrompt);

    switch(shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;

            case 2:
            playerInfo.upgradeAttack(); 
            break;

            case 3:
            window.alert("Leaving the store.");
            //do nothing, so function will end
            break;
        
            default:
                window.alert("You did not pick a valid option. Try again.");

        //call shop() again to force player to pick a valid option
        shop();
        break;
        }
    };

//function to set name
var getPlayerName = function() {
    var name = "";
    //while loop that checks for a null name
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;
};

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth : function() {
        if (this.money >= 7) {
        window.alert ("Refilling player's health by 20 for 7 dollars.");
        this.health += 20;
        this.money -= 7;
        }
    else {
        window.alert("You don't have enough money!");
        }
    },


upgradeAttack: function() {
    if (this.money >= 7) {
        window.alert("Upgrading player's attack by 6 for 7 dollars.");
        this.attack += 6;
        this.money -= 7;
        }
    else {
        window.alert("You don't have enough money!");
        }
    }   
};

// You can also log multiple values at once like this
console.log(playerInfo.name, playerInfo.attack, playerInfo.health);

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

console.log(enemyInfo);
console.log(enemyInfo[0]);
console.log(enemyInfo[0].name);
console.log(enemyInfo[0]['attack']);



startGame()

