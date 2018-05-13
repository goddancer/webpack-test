/**
 * Created by zjc on 2018/5/12.
 */
// require('./world');
import {world} from './world'
require('style-loader!css-loader!./reset.css');

function hello(str){
  alert(str);
}
hello(world());