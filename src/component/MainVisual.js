import React from 'react';

function MainVisual() {
    
    const getImg = () => {
        const today = new Date();
        const hour = today.getHours();
        console.log(hour);
        const timeline = ["dawn","morning","afternoon", "night"];
        let imgUrl = "https://source.unsplash.com/600x400/?";
        if(hour >=2 && hour < 5 ) {
            return imgUrl+timeline[0];
        }else if(hour >= 5 && hour < 12 ){
            return imgUrl+timeline[1];
        }else if(hour >= 12 && hour < 16){
            return imgUrl+timeline[2];
        }else{
            console.log(imgUrl+timeline[3]);
            return imgUrl+timeline[3];
        }
    }

    return(
        <section className="main_visual">
            <div className="img"
                style={{
                    backgroundImage: `url(${getImg()})`,
                }}
            />
        </section>
    )
}

export default MainVisual;
