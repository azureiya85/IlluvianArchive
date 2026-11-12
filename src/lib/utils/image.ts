export function directImageUrl(url?: string | null): string | null {
	if (!url) return null;

	const match =
		url.match(/drive\.google\.com\/file\/d\/([\w-]+)/) ??
		url.match(/drive\.google\.com\/(?:open|uc)\?(?:.*&)?id=([\w-]+)/);

	return match ? `https://lh3.googleusercontent.com/d/${match[1]}` : url;
}
