export async function generateId(): Promise<string> {
  const { v7: uuidv7 } = await import('uuid');
  return uuidv7();
}
