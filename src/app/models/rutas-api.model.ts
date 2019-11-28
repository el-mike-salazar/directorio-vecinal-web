export class RutasApiModel {
    _id: string;
    blnActivo: boolean;
    strNombre: string;
    strDescripcion: string;
    aJsnRutas: [{
        blnActivo: boolean;
        _id: string;
        strNombre: string;
        strRuta: string;
    }];
}