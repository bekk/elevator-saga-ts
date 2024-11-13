/** Typescript definitions for Elevator Saga
 * https://play.elevatorsaga.com/
 *
 * Definitions from
 * https://play.elevatorsaga.com/documentation.html#docs
 */
export type Solution = {
    init: (elevators: Elevator[], floors: Floor[]) => void;
    update: (dt: number, elevators: Elevator[], floors: Floor[]) => void;
};

export type Elevator = {
    /** Register an event handler.
     * First argument is the event name, second is the handler function.
     * Note that handlers have different signatures depending on the event type.
     *
     * `"idle"`, `() => void`: Elevator is not doing anything.
     *
     * `"floor_button_pressed"`, `(floorNum: number) => void`:
     * Triggered when a passenger has pressed a button inside the elevator.
     *
     * `"passing_floor"`, `(floorNum: number, direction: "up" | "down") => void`:
     * Triggered slightly before the elevator will pass a floor. A good time to decide whether to stop at that floor. Note that this event is not triggered for the destination floor. Direction is either "up" or "down".
     *
     * `"stopped_at_floor"`, `(floorNum: number) => void`:
     * Triggered when the elevator has arrived at a floor.
     */
    on<K extends keyof ElevatorEventHandlers>(
        event: K,
        handler: ElevatorEventHandlers[K]
    ): void;
    /** Queue the elevator to go to specified floor number.
     * If you specify true as second argument, the elevator will go to that floor directly,
     * and then go to any other queued floors. */
    goToFloor(floorNum: number, force?: boolean): void;
    /** Clear the destination queue and stop the elevator if it is moving.
     * Note that you normally don't need to stop elevators - it
     * is intended for advanced solutions with in-transit rescheduling logic.
     * Also, note that the elevator will probably not stop at a floor, sso passengers will not get out. */
    stop(): void;
    /** Gets the floor number that the elevator currently is on. */
    currentFloor(): number;
    /** Gets or sets the going up indicator, which will affect passenger behaviour when stopping at floors. */
    goingUpIndicator(newValue?: boolean): boolean;
    /** Gets or sets the going down indicator, which will affect passenger behaviour when stopping at floors. */
    goingDownIndicator(newValue?: boolean): boolean;
    /** Gets the maximum number of passengers that can occupy the elevator at the same time.	 */
    maxPassengerCount(): number;
    /** Gets the load factor of the elevator. 0 means empty, 1 means full.
     * Varies with passenger weights, which vary - not an exact measure. */
    loadFactor(): number;
    /** Gets the direction the elevator is currently going to move toward.
     * Can be "up", "down" or "stopped". */
    destinationDirection(): "up" | "down" | "stopped";
    /** The current destination queue, meaning the floor numbers the elevator is scheduled to go to.
     * Can be modified and emptied if desired.
     * Note that you need to call checkDestinationQueue() for the change to take effect immediately. */
    destinationQueue: number[];
    /** Checks the destination queue for any new destinations to go to.
     * Note that you only need to call this if you modify the destination queue explicitly. */
    checkDestinationQueue(): void;
    /** Gets the currently pressed floor numbers as an array.	 */
    getPressedFloors(): number[];
};

type ElevatorEventHandlers = {
    idle: () => void;
    floor_button_pressed: (floorNum: number) => void;
    passing_floor: (floorNum: number, direction: "up" | "down") => void;
    stopped_at_floor: (floorNum: number) => void;
};

export type Floor = {
    /** Gets the floor number of the floor object. */
    floorNum: () => number;
    /** Register an event handler.
     * First argument is the event name, second is the handler function.
     * Note that handlers have different signatures depending on the event type.
     *
     * `"up_button_pressed"`, `() => void`:
     * Triggered when someone has pressed the up button at a floor.
     * Note that passengers will press the button again if they fail to enter an elevator.
     *
     * `"down_button_pressed"`, `() => void`:
     * Triggered when someone has pressed the down button at a floor.
     * Note that passengers will press the button again if they fail to enter an elevator.
     */
    on<K extends keyof FloorEventHandlers>(
        event: K,
        handler: FloorEventHandlers[K]
    ): void;
};

type FloorEventHandlers = {
    up_button_pressed: () => void;
    down_button_pressed: () => void;
};
