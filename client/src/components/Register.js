import React from 'react';



class RegisterOrg extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div>
                <p> Register Your Cat</p>
                <label for="name">Name:</label>
                < br />
                <input name="name" id="name" />
                < br />
                <label for="organization">Organization</label>
                < br />
                <input name="organization" id="organization" />
                < br />
                <label for="phone">Phone</label>
                < br />
                <input name="phone" id="phone" />
                < br />
                <label for="address">Address</label>
                < br />
                <input name="address" id="address" />
                < br />
                <label for="cats">Cat Type</label>
                < br />
                <input name="cats" id="cats" />
                < br />
                <label for="catdescription">Description of Cat</label>
                < br />
                <input name="catdescription" id="catdescription" />
                < br />
                <label for="password">Password</label>
                < br />
                <input name="password" id="password" />
                < br />
                < br />

                <button onClick={() => { this.props.registerCat() }}>Register Cat</button>
            </div>
        )
    }
}

export default RegisterOrg