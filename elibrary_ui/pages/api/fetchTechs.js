export async function fetchTechs() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contents?populate=*`);
    const data = await response.json();
    const techs = data.map(item => {
      const publishDate = new Date(item.publishedAt) > new Date(item.createdAt)
        ? item.publishedAt
        : item.createdAt;

      return {
        id: item.id,
        title: item.TechName,
        description: item.Descrption || '',
        category: item.Categories,
        publishDate: publishDate,
        images: item.Picture || [{ url: null }],
      };
    });

    return { props: { initialTechs: techs } };
  } catch (error) {
    console.error('Error fetching techs:', error);
    return { props: { initialTechs: [] } };
  }
}