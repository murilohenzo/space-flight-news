export const Queries = {
  pagination(take: number, page: number): string {
    return `
    select * from articles
    order by d.id
    offset ${(page - 1) * take} rows fetch next ${take} rows only
    `;
  },
}