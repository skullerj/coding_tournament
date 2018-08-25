import React from 'react';
import {mount} from 'enzyme';
import Map from '../Map';

const filters = mount(<Map/>);

describe('Map tests',()=>{

  it('should render normally',()=>{

    expect(filters.ref('map')).toBeDefined();

  });

});
