import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RestaurantsProvider, Restaurant } from '../../providers/restaurant/restaurant'


@IonicPage()
@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage {
  model: Restaurant;


  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, private restaurantProvider: RestaurantsProvider,
  ) {

    this.model = new Restaurant();

    if (this.navParams.data.id) {
      this.restaurantProvider.get(this.navParams.data.id)
        .then((result: any) => {
          this.model = result;
        })
    }
  }

  /**
   * Runs when the page has loaded
   */


  save() {
    this.saveProduct()
      .then(() => {
        this.toast.create({ message: 'Produto salvo.', duration: 3000, position: 'botton' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar o produto.', duration: 3000, position: 'botton' }).present();
      });
  }

  private saveProduct() {
    if (this.model.id) {
      return this.restaurantProvider.update(this.model);
    } else {
      return this.restaurantProvider.insert(this.model);
    }
  }

}