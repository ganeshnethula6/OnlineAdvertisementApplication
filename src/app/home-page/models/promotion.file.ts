import { Byte } from "@angular/compiler/src/util";

export class FileDetail
{
  public fileId!:number;
  public fileName!:string;
  public filetype!:string;
  public picByte!:Byte[];
  public retrivedImage!:any;
  constructor()
  {

  }

}
