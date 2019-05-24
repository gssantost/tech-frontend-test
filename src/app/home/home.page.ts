import { Component } from '@angular/core';
import { UsersService } from '../api/users.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  users: Array<{}>[];
  orderedUsers: Array<[]>[];

  constructor(private userService: UsersService, private navController: NavController) {
    this.userService.getUsers()
      .subscribe((data) => {
        this.users = data.results[0];
        this.users.sort((first, second) => {
          return this.compare(first, second)
        });
        this.orderedUsers = this.groupByLetter(this.users);
        //console.log(this.orderedUsers);
      });
  }

  showDetail() {
    this.navController.navigateForward('/detail');
  }

  compare(firstItem, secondItem) {
    let letter1 = firstItem.first.charAt(0);
    let letter2 = secondItem.first.charAt(0);
    return letter1<letter2 ? -1:letter1>letter2? 1:0;
  }

  groupByLetter(users: Array<any>) {
    let groups = [];
    let currentItems = [];
    let currentLetter= users[0].first.charAt(0);

    users.forEach((item) => {
      if (item.first.charAt(0) !== currentLetter && currentItems.length > 0) {
        groups.push({
          letter: currentLetter,
          users: currentItems
        });
        currentItems = [];
        currentLetter = item.first.charAt(0);
      } else {
        currentItems.push(item)
      }
    })
    return groups;
  }

}
