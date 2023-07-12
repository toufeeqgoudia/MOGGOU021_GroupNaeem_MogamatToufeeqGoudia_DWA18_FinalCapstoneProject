import ShowList from "../ShowList/ShowList";

export default function DiscoverList() {

    return (
        <div className="carousel">
            <h3>You may be interested in:</h3>
            <ul>
                <li>
                    {Math.random( <ShowList /> )}
                </li>
            </ul>
        </div>
    )
}