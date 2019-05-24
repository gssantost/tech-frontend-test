import { Component, OnInit } from '@angular/core';
import { UsersService } from '../api/users.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  user: {} = {
    name: '',
    street: '',
    phone: '',
    email: '',
    thumbnail: ''
  }

  loading: any;

  random: {} = {
    contacts: this.getRandomNumber(),
    favourites: this.getRandomNumber(),
    groups: this.getRandomNumber()
  }

  constructor(private userService: UsersService, private loadingCtrl: LoadingController) {
    this.userService.getUserDetail()
      .subscribe((data) => {
        console.log(data.results[0]);
        const { name: { first, last }, location: { street }, email, phone, picture: { thumbnail }} = data.results[0];
        this.user = {
          name: `${this.capitalize(first)} ${this.capitalize(last)}`,
          street,
          email,
          phone,
          thumbnail
        }
        //console.log(this.user);
      });
  }

  ngOnInit() { }

  capitalize(s: string): string {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  getRandomNumber() {
    return Math.floor(Math.random() * 20);
  }

}
