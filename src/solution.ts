import { Solution } from "./types";

const solution: Solution = {
    init: function (elevators, floors) {
        // Do stuff with the elevators and floors, which are both arrays of objects
        // Whenever the elevator is idle (has no more queued destinations) ...
        const elevator = elevators[0]; // Let's use the first elevator

        elevator.on("idle", function () {
            // let's go to all the floors (or did we forget one?)
            elevator.goToFloor(0);
            elevator.goToFloor(1);
            elevator.goToFloor(2);
            elevator.goToFloor(1);
        });
    },
    update: function (dt, elevators, floors) {
        // Do more stuff with the elevators and floors
        // dt is the number of game seconds that passed since the last time update was called
    },
};
