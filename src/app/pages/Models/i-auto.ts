import { iUser } from "./i-user";

export interface iAuto {
  id: number;
  marca: string;
  modello: string;
  annoDiImmatricolazione: number;
  cilindrata: number;
  tipoAlimentazione: string;
  descrizione: string;
  prezzo: number;
  foto: string | null;
  utente: iUser;
}
