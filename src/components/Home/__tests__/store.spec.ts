import HomeStore from '@Components/Home/store';

describe('HomeStore', () => {
    const store = new HomeStore();

    it('should update text', () => {
        expect(store.text).toEqual('Hey buddy');

        store.changeText();

        expect(store.text).toEqual('Yo motherfucker');
    });
});