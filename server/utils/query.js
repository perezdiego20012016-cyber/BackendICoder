export function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
export function paginationLinks(req, result) {
  const makeLink = (page) => {
    if (!page) return null;
    const params = new URLSearchParams(req.query);
    params.set("page", page);
    return `${req.baseUrl}${req.path}?${params.toString()}`;
  };
  return { prevLink: makeLink(result.prevPage), nextLink: makeLink(result.nextPage) };
}
