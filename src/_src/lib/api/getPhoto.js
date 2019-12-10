import xcard from "../../../_apis/xcard";


const getPhoto = async (directory, filename, download = false) => {
    let url = `/file/directory/${directory}/name/${filename}`;
    if (download) url += '/download';
    try {
        const {status,data} = await xcard.get(url,{ responseType: 'blob',});
        if(status==='200' || status===200){
            return data
        }
    }catch (e) {
        console.log(e)
    }


};

export default getPhoto;
