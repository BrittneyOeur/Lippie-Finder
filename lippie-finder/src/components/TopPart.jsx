// Functional Component
function Button({text, color, fontSize}){
    const buttonStyle = {
        color: color,
        fontSize: fontSize + 'px'
    };

    return (
        <button style={buttonStyle}>{text}</button>
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
                        placeholder="Search lip product..." 
                        style={{marginRight: "10px", padding: "5px", width: "220px", transition: "border-color 0.25s"}}/>

                <Button text="Search" color="pink" fontSize={12}/>
            </div>
        </>
    );
}

export default TopPart;