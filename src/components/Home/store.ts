import { action, observable } from 'mobx';


class HomeStore {
    @observable text: string = 'Hey buddy';

    sayHello = (): void => {
        alert('Hello');
    }

    @action
    changeText = (): void => {
        this.text = 'Yo motherfucker';
    }
}

export default HomeStore;