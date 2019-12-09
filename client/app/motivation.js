const MotivationContainer = (props) => {
    $('#calorieMessage').animate({height:'hide'}, 350);

    if(props.motivations.length === 0) {
        return (
            <div>No Motivation Videos yet!</div>
        );
    }
    const motivationList = props.motivations.map((motivation) => {
        return (
            <div className="motivations" key={motivation.name}>
                <p id='videoName'><strong>{motivation.name}</strong></p>
                <p id="videoUrl"><strong>{motivation.url}</strong></p>
                <p id="videDesc"><strong>{motivation.description}</strong></p>
            </div>
        );
    });
    return (
        <div>
            {motivationList}
        </div>
    ); 
};

const loadVideos = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/getVideos');

    const setVideos = () => {
        const motivationResponse = JSON.parse(xhr.response);

            ReactDOM.render(
                <MotivationContainer motivations={motivationResponse} />,
                document.getElementById('foods')
            );
    };

    xhr.onload = setVideos;
    xhr.send();
};


const VideoTitle = (props) => {
    return (
        <h3 id="videoTitle">Videos to Motivate</h3>
    );
};

const Nothing = (prop) =>{
    return(
        <div></div>
    );
};

const createVideoTitle = () => {
        ReactDOM.render(
            <VideoTitle />,
            document.querySelector('#makeFood')
        );
};

const createNothing = () => {
    ReactDOM.render(
        <Nothing />,
        document.querySelector('#deleteFood')
    );
}

const createVideoContainer = () => {
            <MotivationContainer motivations={[]} />, 
            document.getElementById('foods')
    loadVideos();
};

const createVideoViews = () => {
    createVideoTitle();
    createVideoContainer();
    createNothing();
};

const handleVideoClicks = () => {
	const vidClicks = document.querySelector('#vids');
	
	vidClicks.addEventListener('click', e => {
		e.preventDefault();
		createVideoViews();
	});
};