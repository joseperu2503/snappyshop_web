import { Injectable, inject } from '@angular/core';
import { UtilService } from '../util/util.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GoogleMapsService {
  utilservice = inject(UtilService);

  loadGoogleMapsScript(): void {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&loading=async`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      this.utilservice.openSnackBar('Hubo un error al cargar el Mapa');
    };
    document.body.appendChild(script);
  }
}
