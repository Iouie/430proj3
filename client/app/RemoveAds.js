
const UpgradeAccount = (props) => {

    $('#calorieMessage').animate({height:'hide'}, 350);

    return (
        <div id="upgradeContent">
            <h3>Upgrade your account to get rid of ads!</h3>
            <button className="upgradeButton" onClick={RemoveAds}>Upgrade</button>
        </div>
    );
};

function RemoveAds(e) {
    e.preventDefault();
    document.querySelector('#ad').style.display = "none";
}

const UpgradeTitle = (props) => {
    return (
        <h2 id="upgradeTitle">Upgrade Account</h2>
    );
};

const Nothing = (props) => {
    return(
        <div id='hi'></div>
    );
}

const Footer = (props) => {
    return(
        <footer id='ad'></footer>
    );
}

const createFooter = () => {
    <Footer />,
    document.querySelector('#ad')
}

const createUpgradeTitle = () => {
            <UpgradeTitle />,
            document.querySelector('#makeFood')

};

const createNothing = () => {
    <Nothing />,
    document.querySelector('#deleteFood')
}


const createUpgradeAccountInfo = () => {
            <UpgradeAccount />,
            document.querySelector('#foods')
};

const createUpgradeView = () => {
    createUpgradeTitle();
    createNothing()
    createUpgradeAccountInfo();
    createFooter();
};

const handleUpgradeClick = () => {
	const upgrade = document.querySelector('#upgrade');
	
	upgrade.addEventListener('click', e => {
        e.preventDefault();
        createUpgradeView();
	});
};