import React from 'react'; 

export default function Header() {
return (
    <header className="header">
            <div className="header-logo-one">
                <a href="https://ortp.railways.gov.mm/">
                <img className="nav-logo-one" src="https://ortp.railways.gov.mm/imgs/logo/logo.jpg" alt="header-logo"/>
                </a>
            </div>
            <div className="header-logo-text">
                <p>Republic of the Union of Myanmar<br/>Ministry of Transport<br/>Myanma Railways</p>
            </div>
            <div className="header-logo-two">
                <a href="https://ortp.railways.gov.mm/">
                    <img src="https://ortp.railways.gov.mm/imgs/logo/mr_logo.png" className="nav-logo-two" alt="header-logo"></img>
                </a>
            </div>
    </header>
)
}