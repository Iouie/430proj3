const handlePasswordChange = (e) => {
    e.preventDefault();

    $('#calorieMessage').animate({height:'hide'}, 350);
    
    if($('currPass').val() == '' || $('#newPass').val() == '' || $('#newPass2').val() == '') {
        handleError('All fields are required');
        return false;
    }

    if ($('#newPass').val() !== $('#newPass2').val()) {
        handleError('Passwords do not match');
        return false;
    }

    sendAjax('POST', '/changePassword', $('#changePassForm').serialize(), function(){
        handleError('Password successfully changed');
    });

    return false;
};

const ChangePassword = (props) => {
    return (
        <form id='changePassForm' 
        name='changePassForm' 
        action='changePassword' 
        onSubmit={handlePasswordChange} 
        method='POST'>
            <label htmlFor='currPass'> Current Password: </label>
            <input id='currPass' type='password' name='currPass' placeholder='Current Password' />

            <label htmlFor='newPass'> New Password: </label>
            <input id='newPass' type='password' name='newPass' placeholder='New Password'/>

            <label htmlFor='newPass2'> Retype New Password: </label>
            <input id='newPass2' type='password' name='newPass2' placeholder='Retype New Password'/>
            <input type='hidden' name='_csrf' value={props.csrf} placeholder={props.csrf}/>
            <input className='submitForm' type='submit' value='Change'/>
        </form>
    );
};

const PassTitle = (props) => {
    return (
        <h2 id="passwordTitle">Change Password</h2>
    );
};

const createPassTitle = () => {
        ReactDOM.render(
            <PassTitle />,
            document.querySelector('#makeFood')
        );
};

const createChangePasswordForm = (csrf) => {
        ReactDOM.render(
            <ChangePassword csrf={csrf} />,
            document.querySelector('#foods')
        );
};

const createChangePasswordView = (csrf) => {
    createPassTitle();
	createChangePasswordForm(csrf);
};

const handleChangePassword = (csrf) => {
	const changePass = document.querySelector('#changePassword');
	
	changePass.addEventListener('click', e => {
		e.preventDefault();
		createChangePasswordView(csrf);
	});
};