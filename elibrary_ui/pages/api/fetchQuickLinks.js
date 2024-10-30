export async function fetchQuickLinks() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/quick-links`);
        const data = await response.json();
        const links = data.data.map(item => ({
            name: item.attributes.name || `Link${item.id}`,
            link: item.attributes.link || '',
        }));
        return { props: { quickLinks: links } };
    } catch (error) {
        console.error('Error fetching defaultThumbnail:', error);
        return { props: { quickLinks: [] } };
    }
}