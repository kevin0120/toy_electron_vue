import { Tabbar, TabbarItem } from '@nutui/nutui';
const components = [Tabbar, TabbarItem];
export function setupNutUi(app) {
    components.forEach((c) => {
        app.use(c);
    });
}
