import { describe, it, expect, vi } from 'vitest';
import { getSelectedLanguage } from '../src/utils/selectedLanguage';
import Cookies from 'js-cookie';

vi.mock('js-cookie', async () => {
    const actual = await vi.importActual('js-cookie'); return {
        ...actual,
        get: vi.fn(),
    };
});

describe('getSelectedLanguage', () => {
    it('should return the value of the i18next cookie if it exists', () => {

        Cookies.get = vi.fn((key) => key === 'i18next' ? 'sv_SE' : null);


        expect(getSelectedLanguage()).toBe('sv_SE');
    });

    it('should return "fi_FI" if the i18next cookie does not exist', () => {

        Cookies.get = vi.fn(() => null);


        expect(getSelectedLanguage()).toBe('fi_FI');
    });
});

