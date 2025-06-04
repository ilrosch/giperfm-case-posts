import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import preloadComponent from './ulils'

import Card from '../components/Card/Card'


let
  btnAll: HTMLElement,
  btnActive: HTMLElement,
  btnCompleted: HTMLElement,
  count: HTMLElement

beforeEach(() => {
  preloadComponent(<Card />)
  btnAll = screen.getByRole('button', { name: 'all' })
  btnActive = screen.getByRole('button', { name: 'active' })
  btnCompleted = screen.getByRole('button', { name: 'completed' })
  count = screen.getByTestId('items-left')
})

describe('Card component', () => {
  test('default', () => {
    expect(btnAll).toBeInTheDocument()
    expect(btnActive).toBeInTheDocument()
    expect(btnCompleted).toBeInTheDocument()
    expect(count).toBeInTheDocument()
    expect(screen.getByText(/tasks not found/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Check all' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Clear completed' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Clear all' })).toBeInTheDocument()
  })

  test('change classname sort button', () => {
    expect(btnAll).toHaveClass('btn_primary')
    fireEvent.click(btnActive)
    expect(btnAll).not.toHaveClass('btn_primary')
    expect(btnActive).toHaveClass('btn_primary')  
  })

  test('tasks list', () => {
    const form = screen.getByTestId('add-form')
    const input = screen.getByTestId('add-input')

    fireEvent.change(input, { target: { value: 'First task' } })
    fireEvent.submit(form)

    fireEvent.change(input, { target: { value: 'Second task' } })
    fireEvent.submit(form)

    expect(screen.getByText('First task')).toBeInTheDocument()
    expect(screen.getByText('Second task')).toBeInTheDocument()
    expect(count).toHaveTextContent('2 items left')

    fireEvent.click(btnCompleted)
    expect(screen.getByText(/tasks not found/i)).toBeInTheDocument()

    fireEvent.click(btnActive)
    fireEvent.click(screen.getByText('First task'))
    expect(count).toHaveTextContent('1 items left')
  })

  test('check all', () => {
    const form = screen.getByTestId('add-form')
    const input = screen.getByTestId('add-input')

    fireEvent.change(input, { target: { value: 'First task' } })
    fireEvent.submit(form)

    fireEvent.change(input, { target: { value: 'Second task' } })
    fireEvent.submit(form)

    fireEvent.click(screen.getByRole('button', { name: 'Check all' }))
    fireEvent.click(btnActive)
    
    expect(screen.getByText(/tasks not found/i)).toBeInTheDocument()
    expect(count).toHaveTextContent('0 items left')
  })

    test('clear comleted', () => {
    const form = screen.getByTestId('add-form')
    const input = screen.getByTestId('add-input')

    fireEvent.change(input, { target: { value: 'First task' } })
    fireEvent.submit(form)

    fireEvent.change(input, { target: { value: 'Second task' } })
    fireEvent.submit(form)

    fireEvent.click(screen.getByText('First task'))
    fireEvent.click(screen.getByRole('button', { name: 'Clear completed' }))
    fireEvent.click(btnCompleted)

    expect(screen.getByText(/tasks not found/i)).toBeInTheDocument()
    expect(count).toHaveTextContent('1 items left')
  })

    test('clear all', () => {
    const form = screen.getByTestId('add-form')
    const input = screen.getByTestId('add-input')

    fireEvent.change(input, { target: { value: 'First task' } })
    fireEvent.submit(form)

    fireEvent.change(input, { target: { value: 'Second task' } })
    fireEvent.submit(form)

    fireEvent.click(screen.getByRole('button', { name: 'Clear all' }))
    expect(screen.getByText(/tasks not found/i)).toBeInTheDocument()
    expect(count).toHaveTextContent('0 items left')
  })
})