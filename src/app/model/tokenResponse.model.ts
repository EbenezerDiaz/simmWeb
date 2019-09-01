export class TokenResponse {
	constructor (
		public sub: string,
        public name: string,
        public roles: Array<String>,
        public iat: number,
        public exp: number,
	){}
}