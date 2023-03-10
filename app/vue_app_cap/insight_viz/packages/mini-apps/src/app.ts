import { createApp } from 'vue';
import './app.scss';

const App = createApp({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onShow(_options) {}
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});

export default App;
