import React from 'react';
import { render, screen } from '@testing-library/react';
import CountryInfo from './CountryInfo';

describe('CountryInfo Component', () => {
    test('displays country information when countryName is provided', () => {
        render(
            <CountryInfo
                countryName="Aruba"
                incomeGroup="High"
                population="105845"
            />
        );

        expect(screen.getByText(/Aruba/i)).toBeInTheDocument();
        expect(screen.getByText(/Population:/i)).toBeInTheDocument();
        expect(screen.getByText(/105845/i)).toBeInTheDocument();
        expect(screen.getByText(/Income Group:/i)).toBeInTheDocument();
        expect(screen.getByText(/High/i)).toBeInTheDocument();
    });

    test('displays N/A for population when it is null', () => {
        render(
            <CountryInfo
                countryName="Aruba"
                incomeGroup="High"
                population={null}
            />
        );

        expect(screen.getByText(/Population:/i)).toBeInTheDocument();
        expect(screen.getByText(/N\/A/i)).toBeInTheDocument(); // Check for N/A
    });

    test('displays a message when no country is selected', () => {
        render(
            <CountryInfo
                countryName={null}
                incomeGroup={null}
                population={null}
            />
        );

        expect(screen.getByText(/Select a country to see its information./i)).toBeInTheDocument();
    });
});
