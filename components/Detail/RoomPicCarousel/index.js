const RoomPicCarousel = () => {
    return (
        <div>
            <div className="carousel w-full">
                <div id="item1" className="carousel-item w-full">
                    <img src="https://daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg"
                         className="w-full"/>
                </div>
                <div id="item2" className="carousel-item w-full">
                    <img src="https://daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg"
                         className="w-full"/>
                </div>
                <div id="item3" className="carousel-item w-full">
                    <img src="https://daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg"
                         className="w-full"/>
                </div>
                <div id="item4" className="carousel-item w-full">
                    <img src="https://daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
                         className="w-full"/>
                </div>
            </div>
            <div className="flex justify-center w-full py-2 gap-2">
                <a href="#item1" className="dot-btn" tabIndex="1"></a>
                <a href="#item2" className="dot-btn" tabIndex="2"></a>
                <a href="#item3" className="dot-btn" tabIndex="3"></a>
                <a href="#item4" className="dot-btn" tabIndex="4"></a>
            </div>
        </div>


    )

};

export default RoomPicCarousel;
