import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Order from '../components/Order';

Enzyme.configure({ adapter: new Adapter() });

it("Should show line asking for type of meal", () => {
	const wrapper = shallow(<Order />);
	const html = "Please select type of meal";
	expect(wrapper.contains(html)).to.equal(true);
});

it("State should equal to the initial value of people", () => {
	const wrapper = mount(<Order />);
	expect(wrapper.state().data.people).to.equal(1);
});

it("Method validateDish should return true", () => {
	const wrapper = mount(<Order />);

    var dishes = wrapper.state().data.dishes;
    var arr = dishes.slice();

    arr.push({
      dish_id: dishes.length + 1,
      dishname: 'Sushi',
      servings: '3'
    });

    arr.push({
      dish_id: dishes.length + 1,
      dishname: 'Teriyaki',
      servings: '2'
    });

    wrapper.setState({
    	data: {
    		dishes: arr
    	}
    });

    expect(wrapper.instance().validateDish()).equals(true);
});
