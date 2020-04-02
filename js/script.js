const imageLocation = document.getElementById('imageLocation');
const myInput = document.getElementById('myInput');
const myOptions = document.getElementById('possibilities');
const inv = document.getElementById('inv');
const ErrorMSG = document.getElementById("error");

let inventory = [];


class room {
    constructor(options, imagePath, items, requiredItem) {
        this.options = options;
        this.image = imagePath;
        this.items = items;
        this.requiredItem = requiredItem;
    }
}


let grid = [
    [
        ["1", "2", "3"],
        ["4", "5", "6"], 
        ["7", "8", "9"]
    ]
];

let rooms = [];

rooms[1] = new room(["right"], "media/room0.png", [], "");
rooms[2] = new room(["left", "down"], "media/room1.png", [], "");
rooms[3] = new room(["down"], "media/room2.png", [], "Sleutel");
rooms[4] = new room(["right"], "media/room3.png", [], "");
rooms[5] = new room(["up", "left", "down"], "media/room4.png", [], "");
rooms[6] = new room(["up", "down"], "media/room5.png", [], "");
rooms[7] = new room(["right"], "media/room6.png", ["Sleutel"], "");
rooms[8] = new room(["left", "up", "right"], "media/room7.png", [], "");
rooms[9] = new room(["left", "up"], "media/room8.png", [], "");


let currentX = 0;
let currentY = 0;
let currentZ = 0;

function getPlayerRoom() {
    return grid[currentX][currentY][currentZ];
}

function forwarddate() {

    imageLocation.src = rooms[getPlayerRoom()].image;

    let optionsMSG = "";
    for (let i = 0; i < rooms[getPlayerRoom()].options.length; i++) {
        optionsMSG += "<li>" + rooms[getPlayerRoom()].options[i] + "</li>"
    }

    if (rooms[getPlayerRoom()].items.length != 0) {
        optionsMSG += "pickup ";
    }
    myOptions.innerHTML = optionsMSG;

    let items = "";
    for (let i = 0; i < inventory.length; i++) {
        items += "<li>" + inventory[i] + "</li>";
        if (i + 1 < inventory.length) {
           items += " - "
        }
    }

    inv.innerHTML = items;
}
myInput.addEventListener('keydown', getInput, false);
function getInput(e) {
    if (e.key == "Enter") {
        let inputArray = myInput.value.split(" ");

        let isOption = false;
        for (let i = 0; i < rooms[getPlayerRoom()].options.length; i++) {
            if (rooms[getPlayerRoom()].options[i] == inputArray[0]) {
                isOption = true;
            }
        }

        if (rooms[getPlayerRoom()].items.length != 0) {
            if (inputArray[0] === "pickup") {
                isOption = true;
            }
        }

        if (isOption) {
            console.log("true")
            switch (inputArray[0]) {
                case "down":
                    currentY += 1;
                    if (rooms[getPlayerRoom()].requiredItem != "") {
                        if (!(inventory.includes(rooms[getPlayerRoom()].requiredItem))) {
                            currentY -= 1;
                            invalidItems();
                        } else {
                            inventory = inventory.filter(el => el !== rooms[getPlayerRoom()].requiredItem);
                        }
                    }
                    break;
                case "right":
                    currentZ += 1;
                    if (rooms[getPlayerRoom()].requiredItem != "") {
                        if (!(inventory.includes(rooms[getPlayerRoom()].requiredItem))) {
                            console.log("je hebt niet de juiste items")
                            currentZ -= 1;
                            invalidItems();
                        } else {
                            inventory = inventory.filter(el => el !== rooms[getPlayerRoom()].requiredItem);
                        }
                    }
                    break;
                case "left":
                    currentZ -= 1;
                    if (rooms[getPlayerRoom()].requiredItem != "") {
                        if (!(inventory.includes(rooms[getPlayerRoom()].requiredItem))) {
                            currentZ += 1;
                            invalidItems();
                        } else {
                            inventory = inventory.filter(el => el !== rooms[getPlayerRoom()].requiredItem);
                        }
                    }
                    break;
                case "up":
                    currentY -= 1;
                    if (rooms[getPlayerRoom()].requiredItem != "") {
                        if (!(inventory.includes(rooms[getPlayerRoom()].requiredItem))) {
                            currentY += 1;
                            invalidItems();
                        } else {
                            inventory = inventory.filter(el => el !== rooms[getPlayerRoom()].requiredItem);
                        }
                    }
                    break;
                case "pickup":
                    let item = Math.floor(Math.random() * rooms[getPlayerRoom()].items.length);
                    console.log(rooms[getPlayerRoom()].items[item]);
                    console.log(item);

                    // doe het item van de room in jou inventory.
                    inventory.push(rooms[getPlayerRoom()].items[item]);

                    // idk waarom maar zo remove je iets uit de items array van een room... "splice werkte niet"
                    rooms[getPlayerRoom()].items = rooms[getPlayerRoom()].items.filter(el => el !== rooms[getPlayerRoom()].items[item]);
                    break;
            }
        } else {
            ErrorMSG.innerHTML = "Invalid movement";

            setTimeout(function () {
                if (ErrorMSG.innerHTML == "Invalid movement") {
                    ErrorMSG.innerHTML = "";
                }
            }, 1500);
        }

        forwarddate();
        myInput.value = "";
    }
}

forwarddate();

function invalidItems() {
    ErrorMSG.innerHTML = "Je hebt een sleutel nodig om deze kamer te betreden!";

    setTimeout(function () {
        if (ErrorMSG.innerHTML == "Je hebt een sleutel nodig om deze kamer te betreden!") {
            ErrorMSG.innerHTML = "";
        }
    }, 3000);
}