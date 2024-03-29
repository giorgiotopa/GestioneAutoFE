export interface iUser {

  id:string;
  nome:string;
  cognome:string;
  email:string;
  username:string;
  password:string;
  avatar?:string | null;
  enabled: boolean;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
  accountNonLocked: boolean;
  authorities: any[] | null;

}
