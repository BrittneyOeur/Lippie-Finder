// Functional Component
function Button({text, color, fontSize}){
    const buttonStyle = {
        color: color,
        fontSize: fontSize + 'px'
    };

    return (
        <button style={buttonStyle}>{props.text}</button>
    );
}

function TopPart() {
    return (
        <>
            <h1>Lippie Finder</h1>
            <div className="container">
                <input className="searchBar"
                        type="text"
                        name="search" 
                        placeholder="Search lip product..." />

                <Button text="Search" color="pink" fontSize={12}/>
                <Button text="Filter" color="grey" fontSize={12}/>
            </div>
        </>
    );
}

export default TopPart;