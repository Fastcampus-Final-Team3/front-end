export const hasWallTemporary = async (memberId: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`/api/wall-temporary/storage/${memberId}/1`, {
      headers: {
        'Content-type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(
        `Failed to check temp wall: ${response.status} - ${response.statusText}`,
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
