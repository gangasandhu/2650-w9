import "dotenv/config.js";
import fetch from 'node-fetch'

const genImage = async (req, res) => {
    const { query } = req.body;

    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}`, {
            headers: {
                Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
            }
        });

        const data = await response.json();

        if (data.results.length > 0) {
            const image = data.results[0];
            const imageUrl = image.urls.small;
            const imageAuthorName = image.user.name;
            const imageAuthorLink = image.user.links.html;

            res.json({ imageUrl, imageAuthorName, imageAuthorLink });
        } else {
            res.status(404).json({ message: 'No image found' });
        }
    } catch (error) {
        console.error('Error fetching image from Unsplash:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export default genImage