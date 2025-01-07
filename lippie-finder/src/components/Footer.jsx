function Footer() {
    return (
        <div style={{ 
            backgroundColor: "#d19da4",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            height: "7vh",
            display: "flex",
        }}>
            <div style={{ 
                display: "flex",
                alignItems: "center", 
                justifyContent: "center", 
                gap: "10px"
            }}>
                <p style={{
                    textAlign: "center",
                    fontSize: "12px",
                    color: "white",
                }}>
                    © 2025 Brittney Oeur
                </p>
                <p style={{ color: "white" }}>|</p>
                <a href="https://github.com/BrittneyOeur/Lippie-Finder"
                    style={{ 
                        textDecoration: "none",
                        fontSize: "12px",
                    }}
                >
                    GitHub
                </a>
            </div>    
        </div>
    );
}

export default Footer;