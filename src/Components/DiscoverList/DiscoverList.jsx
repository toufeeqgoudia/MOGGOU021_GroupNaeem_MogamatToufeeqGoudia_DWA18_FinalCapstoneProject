import ShowList from "../ShowList/ShowList";
import './DiscoverList.css'

export default function DiscoverList() {

    return (
        <div className="carousel">
            <h3>You may be interested in:</h3>
            <ul>
                <li>
                    <ShowList />
                </li>
            </ul>
        </div>
    )
}