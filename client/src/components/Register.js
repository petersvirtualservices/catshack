import React from 'react';



class Register extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div>
                <p> Register Your Cat</p>
                <label for="firstName">First Name:</label>
                < br />
                <input name="firstName" id="firstName" />
                < br />
                <label for="lastName"> Last Name:</label>
                < br />
                <input name="lastName" id="lastName" />
                < br />
                <label for="email">Email:</label>
                < br />
                <input type="email" name="email" id="email" />
                < br />
                <label for="password">Password:</label>
                < br />
                <input name="password" id="password" />
                < br />
                < br />
                < br />

                <button onClick={() => { this.props.registerNow() }}>Register Cat</button>
            </div>
        )
    }
}

export default Register