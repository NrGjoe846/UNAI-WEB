import { render, screen } from '@testing-library/react'
import { Achievements } from './Achievements'

describe('Achievements', () => {
  it('renders the component', () => {
    render(<Achievements />)
    expect(screen.getByText('Achievements')).toBeInTheDocument()
  })

  it('displays achievement categories', () => {
    render(<Achievements />)
    expect(screen.getByText('Learning Path')).toBeInTheDocument()
    expect(screen.getByText('Coding Mastery')).toBeInTheDocument()
    expect(screen.getByText('Community')).toBeInTheDocument()
  })

  // Add more tests as needed
})

