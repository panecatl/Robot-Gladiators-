var randomNumber = function(min,max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
}

var fight = function(enemy) {
        while (playerInfo.health > 0 && enemy.health > 0) {
        //ask player if they'd like to fight or run
        var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter FIGHT or "SKIP" to choose.');

        //if player picks "skip" confirm and then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {
            //confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?"); 

            //if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
                //subtract money from playerInfo.money for skipping
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("playerInfo.money", playerInfo.money)
                break;
            }
        }

        //remove enemy's health by subtracting the amount set in the playerInfo.attack variable 
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

        enemy.health = Math.max(0, enemy.health - damage);
        console.log(
            playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health reamining.'
        );

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

        //remove player's health by subtracting the amout set in the enemy.attack variable
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
        
            //pass the pickedenemy.name variable into the fight funxtion
            fight(pickedEnemyObj);
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                //ask if player wants to go to the store
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
                //if yes, take them to the store() function
                if (storeConfirm) {
                shop();
                }
            }
        }
        else {
            window.alert("You have lost your robot in battle! Game over!");
            break; 
        }
    }
    //play again
    endGame();
};

//function to end the entire game
var endGame = function() {
    window.alert("The game has ended. Let's see how you did!");
    //if player is still alive, player wins!
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    } 
    else {
        window.alert("You've lost your robot in battle.");
    }

    var playAgainConfrim = window.alert("Would you like to play agian?");
    if (playAgainConfrim) {
        //restart the game
        startGame(); 
    }
    else{
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function() {
    //ask player what they would like to do 
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );
    switch(shopOptionPrompt) {
        case "REFILL":
        case "refill":
            playerInfo.refillHelath();
            break;

            case "UPGRADE":
            case "upgrade":
            playerInfo.upgradeAttack(); 
            break;

            case "LEAVE":
            case "leave":
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

var playerInfo = {
    name: window.prompt("What is your robot's name?"),
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

startGame()

