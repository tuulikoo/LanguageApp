/**
 * Updates the user's points in the database.
 *
 * @param {number} userId - The ID of the user whose points need to be updated.
 * @param {number} pointsToAdd - The number of points to add to the user's current points.
 * @returns {Promise<number>} - The updated point total after adding.
 */
async function updateUserPoints(userId, pointsToAdd) {
  try {
    const response = await fetch("/api/updatePoints", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, newPoints: pointsToAdd }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.updatedPoints;
    } else {
      throw new Error("Failed to update points");
    }
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

export default updateUserPoints;
