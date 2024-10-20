import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Toolbar from './Toolbar';

describe('Toolbar', () => {
    const selectedCountryIso3 = 'AFG';
    test('renders all buttons', () => {
        render(<Toolbar selectedCountryIso3={selectedCountryIso3} />);

        expect(screen.getByRole('button', { name: /IPC/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /FCS/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Climate/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Hazards/i })).toBeInTheDocument();
    });

    test('displays IPC information when IPC button is clicked', () => {
        render(<Toolbar selectedCountryIso3={selectedCountryIso3} />);
        fireEvent.click(screen.getByRole('button', { name: /IPC/i }));
        expect(screen.getByText(/Information from IPC API here/i)).toBeInTheDocument();
    });

    test('displays FCS information when FCS button is clicked', () => {
        render(<Toolbar selectedCountryIso3={selectedCountryIso3} />);
        fireEvent.click(screen.getByRole('button', { name: /FCS/i }));
        expect(screen.getByText(/Information from FCS and rCSI API here/i)).toBeInTheDocument();
    });

    test('displays Climate information when Climate button is clicked', () => {
        render(<Toolbar selectedCountryIso3={selectedCountryIso3} />);
        fireEvent.click(screen.getByRole('button', { name: /Climate/i }));
        expect(screen.getByText(/Information from Climate Data API here/i)).toBeInTheDocument();
    });

    test('displays Hazards information when Hazards button is clicked', () => {
        render(<Toolbar selectedCountryIso3={selectedCountryIso3} />);
        fireEvent.click(screen.getByRole('button', { name: /Hazards/i }));
        expect(screen.getByText(/Information from Hazards Data API here/i)).toBeInTheDocument();
    });
});
