// Updated to call YOUR backend instead of client-side generation

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

/**
 * Generate QR code via YOUR backend BaaS
 * @param {string} text - URL or text to encode
 * @param {object} options - QR options (format, size, scale)
 * @returns {Promise<string|null>} - Base64 QR code or null
 */
export const generateQRCode = async (text, options = {}) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/qr/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: text,
                format: options.format || 'png',
                size: options.size || 300,
                scale: options.scale || 4
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('QR Generation failed:', errorData);
            return null;
        }

        const result = await response.json();
        return result.data.qrCode;

    } catch (err) {
        console.error('QR Code generation error:', err);
        return null;
    }
};

/**
 * Get QR generation stats from backend
 * @returns {Promise<object|null>}
 */
export const getQRStats = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/qr/stats`);
        if (!response.ok) return null;

        const result = await response.json();
        return result.data;
    } catch (err) {
        console.error('Failed to fetch QR stats:', err);
        return null;
    }
};
