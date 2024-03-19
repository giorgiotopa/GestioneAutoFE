export interface iRegisterAuto {

  id:string;
  marca: string;
  modello: string;
  annoDiImmatricolazione: number;
  cilindrata: number;
  tipoAlimentazione: string;
  descrizione: string;
  prezzo: number;
  foto: string | null;
  utenteId: string;
}
