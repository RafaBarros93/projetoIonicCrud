import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { RestaurantsProvider, Restaurant } from '../../providers/restaurant/restaurant'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  restaurants: any[] = [];
  searchText: string = null;



  constructor(public navCtrl: NavController, private toast: ToastController, private restaurantProvider: RestaurantsProvider) { }

  ionViewDidEnter() {
    this.getAllRestaurant();
  }

  getAllFilterName() {
    this.restaurantProvider.getAll(this.searchText)
      .then((result: any[]) => {
        this.restaurants = result;
      });
  }
  getAllRestaurant() {
    this.restaurantProvider.getRestaurant()
      .then((result: any[]) => {
        this.restaurants = result;
      });
  }

  addProduct() {
    this.navCtrl.push('EditProductPage');
  }

  editProduct(id: number) {
    this.navCtrl.push('EditProductPage', { id: id });
  }

  removeRestaurant(restaurant: Restaurant) {
    this.restaurantProvider.remove(restaurant.id)
      .then(() => {

        var index = this.restaurants.indexOf(restaurant);
        this.restaurants.splice(index, 1);
        this.toast.create({ message: 'Produto removido.', duration: 3000, position: 'botton' }).present();
      })
  }

  filterRestaurant(ev: any) {
    this.getAllFilterName();
  }

}