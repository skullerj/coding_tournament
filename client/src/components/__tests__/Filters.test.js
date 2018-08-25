import React from 'react';
import {shallow} from 'enzyme';
import Filters from '../Filters';

const filters = shallow(<Filters/>);

describe('Filters tests',()=>{

  it('should render normally',()=>{

    expect(filters.find('h1').length).toEqual(1);

  });

});
