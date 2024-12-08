import useAxios from "."; 

export const getKomentars = async (contentId) => {
    try {
        const response = await axios.get(`${BASE_URL}/contents/${contentId}/comments`);
        return response.data.data; // Pastikan frontend hanya mengambil data dari 'data' yang dikirimkan oleh backend
    } catch (error) {
        throw error.response.data;
    }
};

export const addKomentar = async (contentId, komentarData) => {
    try {
        const response = await axios.post(`${BASE_URL}/contents/${contentId}/comments`, komentarData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data; // Pastikan frontend menangani data yang dikirimkan dengan benar
    } catch (error) {
        throw error.response.data;
    }
};