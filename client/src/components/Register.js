import React from 'react';



class RegisterOrg extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div>
                <label for="name">Name:</label>
                <input name="name" id="name" />
                <label for="organization">Organization</label>
                <input name="organization" id="organization" />
                <label for="phone">Phone</label>
                <input name="phone" id="phone" />
                <label for="address">Address</label>
                <input name="address" id="address" />
                <label for="cats">Cat Type</label>
                <input name="cats" id="cats" />
                <label for="catdescription">Description of Cat</label>
                <input name="catdescription" id="catdescription" />
                <label for="password">Password</label>
                <input name="password" id="password" />

                <button onClick={() => { this.props.registerCat() }}>Register Cat</button>
            </div>
        )
    }
}

export default RegisterOrg