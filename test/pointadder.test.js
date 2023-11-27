import { describe, it, expect, vi } from "vitest";
import updateUserPoints from "../src/helpers/PointAdder";

global.fetch = vi.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ updatedPoints: 169 }),
    })
);

describe("PointAdder", () => {
    it("should return total points of user after adding points", async () => {
        const userId = "12345";
        const pointsToAdd = 69;
        const expectedPoints = 169;

        const updatedPoints = await updateUserPoints(userId, pointsToAdd);

        expect(updatedPoints).toBe(expectedPoints);
        expect(fetch).toHaveBeenCalledWith("/api/updatePoints", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, newPoints: pointsToAdd }),
        });
    });
});
