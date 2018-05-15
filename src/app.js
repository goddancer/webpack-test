import Layer from './components/layer/layer';
import './css/common.css';

const App = function(){
  const dom = document.getElementById('app');
  const layer = new Layer();
  dom.innerHTML = layer.tpl;
  console.log(Layer);
};
new App();