import './Footer.css'

const footer = () => {
    const openExternalSite = site => {
        window.open(site);
    };

    return (
        <>
            <div className="footerContainer">
                <div className='aboutMeDiv'>
                    <h1 className='aboutMeText'>
                        Project developed using a MERN Stack
                    </h1>
                    <br/>
                    <h3 className='smallAboutMe'>
                        A MERN Stack application E-Commerce site
                        centered around selling E-Bikes!
                    </h3>
                    <p>
                        Looking for Software Engineering roles
                    </p>
                    <br/>
                    <br/>
                    <p>
                        Powered by
                        2023 @Nestor Vega
                    </p>
                </div>
                <div className='ReachMeLinks'>
                    <h1 className='quickLinks'>Quick Links</h1>
                    <a className="dropdownNoButton" target="_blank" href="https://github.com/nvega23">Github</a>
                    <a className="dropdownNoButton" target="_blank" href="https://www.linkedin.com/in/nestor-vega-233b43238/">Linkedin</a>
                    <a className="dropdownNoButton" target="_blank" href="https://angel.co/u/nestorvega23">Wellfound</a>
                    <a className="dropdownNoButton" target="_blank" href="https://twitter.com/nvega24">Twitter</a>
                </div>
                <div className='emailMeLink'>
                    <p className='emailMeText'>
                        I value your feedback! Feel free to get in touch.
                    </p>
                    <br/>
                    <br/>
                    <button className="emailMeButton" onClick={() => openExternalSite(
                        window.open('mailto:vega.nestor1@gmail.com?subject=subject&body='))
                    }>
                        <a className="emailDev">
                            Click to email me!
                        </a>
                    </button>
                </div>
            </div>
        </>
    )
};

export default footer;
