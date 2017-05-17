import 'jest-enzyme'
import { shallow, render, mount } from 'enzyme'

global.shallow = shallow
global.render = render
global.mount = mount

// Fail tests on any warning
console.error = message => { // eslint-disable-line no-console
  throw new Error(message)
}
