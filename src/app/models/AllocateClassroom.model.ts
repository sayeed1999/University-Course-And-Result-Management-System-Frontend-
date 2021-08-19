import { Course } from "./Course.model";
import { Day } from "./Day.model";
import { Department } from "./Department.model";
import { Room } from "./Room.model";

export class AllocateClassroom {
    constructor(
        public id: number,
        public roomId: string,
        public departmentId: number,
        public courseCode: string,
        public dayId: string,
        public from: Date,
        public to: Date,
        public room?: Room,
        public department?: Department,
        public course?: Course,
        public day?: Day,
    ) {}
}