import { fireEvent, screen } from "@testing-library/react";
import preloadComponent from './ulils'

import Form from "../components/Form/Form";


let input: HTMLElement, button: HTMLElement

beforeEach(() => {
  preloadComponent(<Form />)
  input = screen.getByTestId('add-input')
  button = screen.getByRole('button', { name: /add/i })
})

describe('Form component', () => {
  test('default state', () => {
    expect(screen.getByTestId('add-form')).toBeInTheDocument()
  
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('placeholder', 'Whats needs to be done?')
  
    expect(input).toHaveValue('')
    fireEvent.change(input, { target: { value: 'test' } })
    expect(input).toHaveValue('test')
  })

  test('validation', () => {
    fireEvent.change(input, { target: { value: '1' } })
    fireEvent.click(button)
    expect(screen.getByText(/minimum 2 symbols/i)).toBeInTheDocument()
  })

  test('clear after submit', () => {
    fireEvent.change(input, { target: { value: 'New task' } })
    fireEvent.click(button)
    expect(input).toHaveValue('')
  })
})
