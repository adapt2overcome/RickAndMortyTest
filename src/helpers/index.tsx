export function formulateURL(name: string, status: string, page: number) {
  let query = `/?page=${page}`;
  if (status !== "all") query += `&status=${status.toLocaleLowerCase()}`;
  if (name !== "") query += `&name=${name}`;
  return "/character" + query;
}
