var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10; 
var playerMoney = 10; 

// You can also log multiple values at once like this
console.log(playerName, playerAttack, playerHealth);

var enemyName = "Roberto";
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function() {
    //Alert the players that they are starting the round 
    window.alert("Welcome to Robot Gladiators!")
    var promptFight = window.alert("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose. ")

    //If player choses to fight
    if (promptFight === "fight" || promptFight === "FIGHT") {
    // Subtract the value of 'playerAttack' from the value of 'enemyHealth' and use that result to update the value in the 'enemyHealth' variable
    enemyHealth = enemyHealth - playerAttack;
    //Log a resulting message to the console so we know it worked.
    console.log(
        playerName + " attacked " + enemyName + ". " + enemyName + " now has " + + enemyHealth + " health remaining."
    );
    //Check enemy's health
    if (enemyHealth <= 0) {
        window.alert(enemyName + " has died!");
    } else {
        window.alert(enemyName + " still has " + enemyHealth + " health left.");
    }
    // remove player's health by subtracting the amount set in the enemyAttack variable
    playerHealth = playerHealth - enemyAttack; 
    console.log(
        enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining." 
    );
    //check players health
    if(playerHealth <= 0) {
        window.alert(playerName + " has died!");
    } else {
        window.alert(playerName + " still has " + playerHealth + " health left.");
    }
    //if player choses to skip
} else if (promptFight === 'skip' || promptFight === 'SKIP'){
    //confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");
    //if yes (true), leave fight.
    if(confirmSkip) {
        window.alert(playerName + " has decided to skip this fight. Goobye!");
        //subtract money from playerMoney for skipping
        playerMoney = playerMoney - 2;
    }
    //if no (false), ask the question again by running fight()
    else {
        fight();
    }
    window.alert(playerName + " has chosen to skip the fight!");
} else {
    window.alert("You need to chose a valid option. Try again!");
}

    } 

fight(); 