const BASE_URL = "https://api.tvmaze.com";

export async function searchShows(query) {
  const res = await fetch(`${BASE_URL}/search/shows?q=${query}`);
  if (!res.ok) throw new Error("Search failed");
  const data = await res.json();
  return data.map(item => item.show);
}

export async function getShowDetails(id) {
  const res = await fetch(`${BASE_URL}/shows/${id}`);
  if (!res.ok) throw new Error("Details fetch failed");
  return res.json();
}

export async function getShowCast(id) {
  const res = await fetch(`${BASE_URL}/shows/${id}/cast`);
  if (!res.ok) throw new Error("Cast fetch failed");
  return res.json();
}
