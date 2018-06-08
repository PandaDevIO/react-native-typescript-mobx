/*
* Author : Damien Assany
* Email : damien.assany@live.fr
* GitHub : https://github.com/PandaDevIO
*/

'use strict';

import { Alert } from 'react-native';
import Cache from './Cache';

const URL = 'API_URL';

class Requester {
  public defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': null
  }

  constructor() {
    Cache.getItem('token').then((token: string) => {
      this.defaultHeaders.Authorization = token;
    });
  }

  defaultNoNetworkCallback(): void {
    Alert.alert('Une erreur est survenue !', 'Vous n\'avez pas de connexion. Veuillez vérifier vos données ou votre connexion wifi.');
  }

  get(url: string, noNetworkCallback = this.defaultNoNetworkCallback): Promise<any> {
    return this.send(url, {
      method: 'GET',
      headers: this.defaultHeaders,
      body: null
    }, noNetworkCallback);
  }

  post(url: string, data: any, noNetworkCallback = this.defaultNoNetworkCallback): Promise<any> {
    return this.send(url, {
      method: 'POST',
      headers: this.defaultHeaders,
      body: JSON.stringify(data)
    }, noNetworkCallback);
  }

  async put(url: string, data: any, noNetworkCallback = this.defaultNoNetworkCallback): Promise<any> {
    this.defaultHeaders.Authorization = this.defaultHeaders.Authorization || await Cache.getItem('token');
    
    return this.send(url, {
      method: 'PUT',
      headers: this.defaultHeaders,
      body: JSON.stringify(data)
    }, noNetworkCallback);
  }

  delete(url: string, noNetworkCallback = this.defaultNoNetworkCallback): Promise<any> {
    return this.send(url, {
      method: 'DELETE',
      headers: this.defaultHeaders,
      body: JSON.stringify({})
    }, noNetworkCallback);
  }

  send(url, options, noNetworkCallback = this.defaultNoNetworkCallback): Promise<any> {
      let timeout = new Promise((resolve) => {
        setTimeout(() => {
          // noNetworkCallback();
          resolve({ error: 'request timed out' });
        }, 5000);
      });
      let request = new Promise((resolve, reject) => {
        fetch(URL + url, options)
          .then(res => res.json())
          .then(res => resolve(res))
          .catch(reject);
      });

      return Promise
        .race([timeout, request])
        .then(json => Promise.resolve(json))
        .catch(err => Promise.reject({ error: err }));
  }
}

export default new Requester();