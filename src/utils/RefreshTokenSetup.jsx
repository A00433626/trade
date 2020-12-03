

export const RefreshTokenSetup=(res)=>{
    let refreshTiming=(res.tokenObj.expires_in|| 3600-5*60)*1000;
    const refreshToken=async()=>{
        const newAuthRes=await res.reloadAuthResponse();
        refreshTiming=(newAuthRes.expires_in|| 3600-5*60)*1000;

        console.log("newAuth",newAuthRes.id_token,newAuthRes);
        //Setup other timer after the first one
        setTimeout(refreshToken,refreshTiming);
    };
    //Setup first refresh timer
    setTimeout(refreshToken,refreshTiming);
};