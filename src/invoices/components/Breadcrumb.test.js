import React from 'react'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import Breadcrumb from './Breadcrumb'
import { BrowserRouter as Router } from 'react-router-dom'

it('Invoices', () => {
  // Mount & verify snapshot
  const props = { location: { pathname: '/' }}
  const wrap = mount(<Router><Breadcrumb {...props} /></Router>)
  expect(toJson(wrap)).toMatchSnapshot()
})

it('Invoices / New Invoice', () => {
  // Mount & verify snapshot
  const props = { location: { pathname: '/new' }}
  const wrap = mount(<Router><Breadcrumb {...props} /></Router>)
  expect(toJson(wrap)).toMatchSnapshot()
})

it('Invoices / Edit Invoice', () => {
  // Mount & verify snapshot
  const props = { location: { pathname: '/edit/1' }}
  const wrap = mount(<Router><Breadcrumb {...props} /></Router>)
  expect(toJson(wrap)).toMatchSnapshot()
})
