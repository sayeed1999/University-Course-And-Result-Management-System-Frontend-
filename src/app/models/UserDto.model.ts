import { RoleDto } from "./RoleDto.model";

export class UserDto {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public roles: RoleDto[],
        public userName?: string,
    ) {}
}