export function URLHasValidUuid(url) {
  const urlParams = url.searchParams;
  const uuidRegex = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$|^[a-f0-9]{24}$/;
  return urlParams.has("id") && uuidRegex.test(urlParams.get("id"));
}

export function getUrlPathname(urlString) {
  const url = new URL(urlString);
  return url.pathname.replace(/(?<=^.+)\/$/, "");
}
