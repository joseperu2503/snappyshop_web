import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './features/user/services/user.service';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private userService = inject(UserService);
  private _messaging = inject(Messaging);

  ngOnInit() {
    this.userService.getUser();
    this._getDeviceToken();
    this._onMessage();
  }

  private _getDeviceToken(): void {
    getToken(this._messaging, {
      vapidKey:
        '',
    })
      .then((token) => {
        console.log(token);
        // save the token in the server, or do whathever you want
      })
      .catch((error) => console.log('Token error', error));
  }

  private _onMessage(): void {
    onMessage(this._messaging, {
      next: (payload) => console.log('Message', payload),
      error: (error) => console.log('Message error', error),
      complete: () => console.log('Done listening to messages'),
    });
  }
}
