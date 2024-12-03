import { render, screen } from '@testing-library/react';
import Dashboard from '@/pages/Dashboard';

describe('Dashboard Component', () => {
  it('renders dashboard text', () => {
    render(<Dashboard />);
    const dashboardElement = screen.getByText(/dashboard/i);
    expect(dashboardElement).toBeInTheDocument();
  });

  it('renders with correct element type', () => {
    const { container } = render(<Dashboard />);
    const divElement = container.querySelector('div');
    expect(divElement).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<Dashboard />);
    expect(container).toMatchSnapshot();
  });
});
