import React from 'react';
import ReactDOM from 'react-dom';

import { configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


import { expect } from 'chai';
import sinon from 'sinon';

configure({ adapter: new Adapter() });
global.React = React;
global.ReactDOM = ReactDOM;
global.expect = expect;
global.sinon = sinon;
global.shallow = shallow;
global.mount = mount;