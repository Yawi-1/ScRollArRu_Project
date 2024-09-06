import { useEffect, useState } from "react";


export default function ProductReviewGraph({ reviews }) {
    const [rating, setRating] = useState([0, 0, 0, 0, 0]);

    function getRatingPercentage() {
        if (reviews.length == 0) {
            setRating([0, 0, 0, 0, 0]);
        } else {
            let fiveStars = parseInt(((reviews.filter((review) => { return review.userRating == 5 }).length) / reviews.length) * 100);
            let fourStars = parseInt(((reviews.filter((review) => { return review.userRating == 4 }).length) / reviews.length) * 100);
            let threeStars = parseInt(((reviews.filter((review) => { return review.userRating == 3 }).length) / reviews.length) * 100);
            let twoStars = parseInt(((reviews.filter((review) => { return review.userRating == 2 }).length) / reviews.length) * 100);
            let oneStars = parseInt(((reviews.filter((review) => { return review.userRating == 1 }).length) / reviews.length) * 100);
            setRating([fiveStars, fourStars, threeStars, twoStars, oneStars]);
        }
    }

    useEffect(getRatingPercentage, []);

    //----------------- Review Graph ------------------
    return (
        <div className="flex flex-col align-center">
            {
                rating.map((data, index) => (
                    <div key={index} className="flex my-1">
                        <div className="inline-flex w-1/5">{5 - index}&nbsp;Stars</div>
                        <div className="w-3/5 h-8 border border-slate-500 mx-2 rounded bg-white/80 dark:bg-black/30">
                            <div style={{ width: `${(data)}%` }} className="h-full bg-yellow-500 rounded-l"></div>
                        </div>
                        <div className="w-1/5">
                            {data}%
                        </div>
                    </div>
                ))
            }
        </div>
    )
}