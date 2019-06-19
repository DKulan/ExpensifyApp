import React from 'react'
import Header from '../../components/Header'
import {shallow} from 'enzyme'
// import toJSON from 'enzyme-to-json'

test('should render Header correct', () => {
  const wrapper = shallow(<Header/>)
  expect(wrapper).toMatchSnapshot()
  // expect(wrapper.find('h1').text()).toBe('Expensify')
})