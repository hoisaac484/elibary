export async function fetchDefaultThumbnail() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/default-thumbnail?populate=*`);
        const data = await response.json();
        const thumbnail = data.picture ? {
            url: data.picture.url || '',
            alternativeText: data.alternativeText || '',
        } : [];

        return { props: { defaultThumbnail: thumbnail } };
    } catch (error) {
        console.error('Error fetching defaultThumbnail:', error);
        return { props: { defaultThumbnail: [] } };
    }
}