import { describe, it, expect, vi, beforeEach } from "vitest";
import { useSelectedLanguage } from "../src/utils/selectedLanguage";
import { useUser } from "@/utils/userContext";
import Cookies from "js-cookie";

vi.mock("@/utils/userContext", () => ({
    useUser: vi.fn(),
}));

describe("useSelectedLanguage", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        Cookies.get = vi.fn();
    });

    it("returns user language if user object exists and has language property", () => {
        useUser.mockReturnValue({ user: { language: "ja_JP" } });
        expect(useSelectedLanguage()).toBe("ja_JP");
    });

    it("returns cookie language if user object exists but has no language property", () => {
        useUser.mockReturnValue({ user: {} });
        Cookies.get.mockReturnValue("ja_JP");
        expect(useSelectedLanguage()).toBe("ja_JP");
    });

    it("returns cookie language if user object does not exist", () => {
        useUser.mockReturnValue({});
        Cookies.get.mockReturnValue("sv_SE");
        expect(useSelectedLanguage()).toBe("sv_SE");
    });

    it("returns default language if no user object and no cookie", () => {
        useUser.mockReturnValue({});
        Cookies.get.mockReturnValue(null);
        expect(useSelectedLanguage()).toBe("fi_FI");
    });
});
