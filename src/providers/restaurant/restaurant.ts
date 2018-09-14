import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class RestaurantsProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public insert(restaurant: Restaurant) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into restaurants (name, distance, typesOfCulinary, review) values (?, ?, ?, ?)';
        let data = [restaurant.name, restaurant.distance, restaurant.typesOfCulinary, restaurant.review];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public update(restaurant: Restaurant) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update restaurants set name = ?, distance = ?, typesOfCulinary = ?, review = ? where id = ?';
        let data = [restaurant.name, restaurant.distance, restaurant.typesOfCulinary, restaurant.review, restaurant.id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from restaurants where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from restaurants where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let restaurant = new Restaurant();
              restaurant.id = item.id;
              restaurant.name = item.name;
              restaurant.distance = item.distance;
              restaurant.typesOfCulinary = item.typesOfCulinary;
              restaurant.review = item.review;


              return restaurant;
            }

            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getAll(name: string = null) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from  restaurants ';
        var data: any[];

        // filtrando pelo nome
        if (name) {
          sql += 'where name like ?';
          data.push('%' + name + '%');
        }

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let restaurants: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var restaurant = data.rows.item(i);
                restaurants.push(restaurant);
              }
              return restaurants;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
}

export class Restaurant {
  id: number;
  name: string;
  distance: number;
  typesOfCulinary: string;
  review: number;

}