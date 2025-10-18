import axios from 'axios'
const apiKey = 'YOUR-VIMEO-API-KEY'

const getVideoThumbnail = async function (video) {
    let videoData = await axios.get(`https://vimeo.com/api/v2/video/${video.id}.json`)
    return videoData?.data?.[0]?.thumbnail_large
}

// const getDownloadLink = async function(video) {
//     let url = `https://api.vimeo.com/videos/${video.id}?access_token=${apiKey}`
//     let videoData = await axios.get(url)
//     videoData = videoData?.data?.download?.filter(download => download?.quality != 'source')
//     let bestDownload = videoData.reduce((challenger, champ) => challenger.height > champ.height ? challenger : champ, videoData[0])
//     return bestDownload?.link
// }

export default {
    type: 'Vimeo',
    inputType: String,
    fields: {
        id: {},
        url: {},
        thumbnail: {
            computed: getVideoThumbnail,
            expireCache: 60 * 60 * 24 * 30
        },
        // download: {
        //     computed: getDownloadLink,
        //     expireCache: 60*60*24*1
        // },
    },
    translateInput: input => ({
        id: `${input}`,
        url: `https://vimeo.com/${input}`,
    })
}
