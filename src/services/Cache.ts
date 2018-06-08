import { AsyncStorage } from 'react-native';

interface Item {
    key: string;
    value: any;
}

class Cache {
    setItem = (key: string, value: Object): Promise<any> => {
        return AsyncStorage.setItem(key, JSON.stringify(value));
    }

    getItem = (key: string): Promise<any> => {
        return new Promise(async (resolve) => {
            const item = await AsyncStorage.getItem(key);
            resolve(JSON.parse(item));
        });
    }

    setItems = (dataArray: Array<Item>): Promise<boolean> => {
        return new Promise(resolve => {
            let promises: Array<Promise<any>> = dataArray.map(({ key, value }) => {
                return this.setItem(key, value);
            });

            Promise.all(promises).then(() => {
                resolve(true);
            });

        })
    }

    getAllItems = (): Promise<Array<any>> => {
        return new Promise(resolve => {
            AsyncStorage.getAllKeys().then((keys) => {
                let db = [];

                let promises = keys.map(async (key) => {
                    return this.getItem(key);
                });

                Promise.all(promises).then(res => {
                    keys.map((key, index) => {
                        db[key] = res[index];
                    });

                    resolve(db);
                });
            });
        });
    }

    clear = (): void => {
        AsyncStorage.clear();
    }
}

export default new Cache();