export async function getWakapiStats(endpoint: string, username: string) {
	const res = await fetch(
		endpoint.replace(/\/$/, "") + `/compat/shields/v1/${username}/interval:7_days`
	);
	if (!res.ok) return "error";
	const data = await res.json();
	if (data.message) {
		return data.message;
	} else return "error";
}
