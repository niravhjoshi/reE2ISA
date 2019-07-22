import React, { Component } from 'react'
import { Segment, Form, Radio, Button } from 'semantic-ui-react';

class PersonForm extends Component {
    render() {
        return (
            <Segment>
                <Form>
                    <Form.Field>
                        <label>Person Full Name</label>
                        <input placeholder="Full Name" />
                    </Form.Field>
                    <Form.Field>
                        <label>Birth Date Name</label>
                        <input type="date" placeholder="Birth Date" />
                    </Form.Field>
                    <Form.Field>
                        <label>Person Sex</label>
                        <Radio label="Male" name="radioGroup" value="Male" />
                        <Radio label="Female" name="radioGroup" value="Female" />
                        <Radio label="NA" name="radioGroup" value="NA" />
                    </Form.Field>

                    <Form.Field>
                        <label>Person Image</label>
                        <input placeholder="Image URL" />
                    </Form.Field>
                    <Button positive type="submit">
                        Submit
                     </Button>
                    <Button type="button">Cancel</Button>
                </Form>
            </Segment>
        )
    }
}


export default PersonForm