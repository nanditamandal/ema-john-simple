import React from 'react';

const User = (props) => {
    let friend;
    if(props.familiar)
    {
        friend=<h4>Hello Friend , how are you?</h4>
    }
    else{
        friend= <h4>Who r u?</h4>
    }
    return (
        <div>
             <div>
                <h3>Greetings</h3>
            {friend}
            </div>
        <div>
            <h3>food</h3>
            {
               ( props.familiar) ? <p>i Will buy food for u</p> : <p>Buy ur own food </p>
            }
        </div>
        <div>
            <h3>Connection</h3>
            {
               props.familiar && <p>Let,s join in Facebook</p>
            }
        </div>

        </div>
       
    );
};

export default User;