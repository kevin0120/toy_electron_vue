import { Tabbar, TabbarItem } from '@nutui/nutui';
import { App } from 'vue';

const components = [Tabbar, TabbarItem];

export function setupNutUi(app: App) {
  components.forEach((c) => {
    app.use(c);
  });
}
