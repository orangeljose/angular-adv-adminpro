
const base_url = 'http://localhost:3000/api';

export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?:  string,
        public google?: boolean,
        public role?: string,
        public uid?: string,
    ) { }

    get imageUrl(){     

        if ( this.img?.includes('https') ) {
            return this.img;
        }   

        if( this.img ){
            return `${ base_url }/uploads/user/${ this.img }`;
        }else{
            return `${ base_url }/uploads/user/no-image`;
        }
    }

}