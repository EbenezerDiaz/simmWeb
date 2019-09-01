import { Roles } from './roles.model';

export class User {
	constructor (
		public id: number,
        public name: string,
		public username: string,
		public email: string,
		public password: string,
		public roles: Array<Roles>
	){}
}