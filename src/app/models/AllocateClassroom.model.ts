import { Course } from "./Course.model";
import { Day } from "./Day.model";
import { Department } from "./Department.model";
import { Room } from "./Room.model";

export class AllocateClassroom {
    constructor(
        public id: number,
        public roomId: number,
        public departmentId: number,
        public courseId: number,
        public dayId: number,
        public from: number,
        public to: number,
        public room?: Room,
        public department?: Department,
        public course?: Course,
        public day?: Day,
    ) {}
}